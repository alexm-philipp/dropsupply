import { NextRequest } from "next/server";
import * as cheerio from 'cheerio';
import puppeteer from 'puppeteer';

export interface QuantityPriceItem {
  quantity: string;
  price: number;
}

export interface QuantityLeadTimeItem {
  quantity: string;
  leadTime: number;
}

export interface SideCard{
  storeRating?: string,
  onTimeDelivery?: string,
  responseTime?: string,
  onlineRevenue?: string,
  floorSpace?: string,
  staff?: string,
  collaborating_suppliers?: string
}

const SideCardMap: { [key: string]: keyof SideCard } = {
  "Store rating": "storeRating",
  "On-time delivery rate": "onTimeDelivery",
  "Response time": "responseTime",
  "Online revenue": "onlineRevenue",
  "Floorspace": "floorSpace",
  "Collaborating suppliers": "collaborating_suppliers",
  "Staff": "staff"
};


export async function GET(req: NextRequest) {
  const requestUrl = new URL(req.url as string);
  const urlParam = requestUrl.searchParams.get('url');

  if (!urlParam) {
    return new Response(JSON.stringify({error: 'URL parameter is missing'}), {status: 400});
  }

  const url = decodeURIComponent(urlParam);

  //pupeteer starts
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    await page.goto(url);
    await page.waitForSelector('#container');
  } catch (error){
    console.log('Wrong URL')
  }
  //better way to select?
  //content loads
  const content = await page.content();
  //load it into cheerio to extract from. CHEERIO BELOW.
  const $ = cheerio.load(content);

  const title = $("#container .product-title h1").clone().children().remove().end().text().trim();
  
  const ratingText = $('.review-conclusion .review-value').text().trim();
  const rating = parseFloat(ratingText);

  const reviewsText = $('.review-conclusion span:last-child').text().trim();
  const reviewsDigits = reviewsText.replace(/\D/g, '');
  const reviews = parseInt(reviewsDigits);

  const buyersText = $('.quantity-sold').text().trim();
  const buyersDigits = buyersText.replace(/\D/g, '');
  const buyers = parseInt(buyersDigits);

  //Quantity and Price Per Item
  
  const quantities: QuantityPriceItem[] = [];
  const priceItems = $('.price-list .price-item');
  priceItems.each((_, element) => {
  
    const quantityRaw = $(element).find('.quality').text().trim();
    const priceText = $(element).find('.price span').text().trim();
    const price = parseFloat(priceText.replace('$', ''));
    const quantityClean = quantityRaw.replace(/[^0-9 -]/g, '');
    quantities.push({ quantity: quantityClean, price});
  
  });  

  //Lead Times
  
  const quantityLeadTime: QuantityLeadTimeItem[] = [];
  
  const leadListRows = $('.lead-time .lead-list table tbody tr');
  const quantitiesRaw = leadListRows.eq(0).find('td').slice(1).map(function() {
    return $(this).text().trim();
  }).get();
  const leadTimesRaw = leadListRows.eq(1).find('td').slice(1).map(function() {
    return $(this).text().trim();
  }).get();
  
  for(let i = 0; i < quantitiesRaw.length; i++) {
    let modifiedQuantity: string;
    modifiedQuantity = quantitiesRaw[i];
      
    let modifiedLeadTime: number;
    modifiedLeadTime = parseInt(leadTimesRaw[i]);

    if (!modifiedLeadTime){
      continue
    }
    
    quantityLeadTime.push({ quantity: modifiedQuantity, leadTime: modifiedLeadTime });
  }  

  //Side Card Info. 

  const resultZ: SideCard = {};
  const sideCardCheerio = $(".attr-item");

  sideCardCheerio.each(function(_, element) {
    const title = $(this).find('.attr-title').text().trim();
    const content = $(this).find('.attr-content').text().trim();
    const sideCardFeatures = SideCardMap[title];

    if (sideCardFeatures){
      resultZ[sideCardFeatures] = content;
    }
  });

  let src;  

  await page.evaluate(() => {
      const imageDiv = document.querySelector('.image-view');
      if (imageDiv) {
        (imageDiv as HTMLElement).style.display = 'block';
        const img = imageDiv.querySelector('.main-img');
        if (img) {
          return (img as HTMLImageElement).src;  // Return the source
        }
      }
      return '';  // Return empty string if no image found
  }).then((source) => {
      src = source;  // Assign the returned source to the variable
  });
  
  await browser.close();


  const scrapedData = {
    'title': title,
    'rating': rating,
    'reviews': reviews,
    'buyers': buyers,
    'quantPer': quantities,
    'leadTime': quantityLeadTime,
    'moreInfo': resultZ,
    'imageLink': src
  }
  
  return new Response(JSON.stringify(scrapedData), { headers: { 'Content-Type': 'application/json' }});

}