import { FC, useState } from 'react';
import axios from 'axios';
import { QuantityPriceItem, QuantityLeadTimeItem, SideCard } from '../api/alibaba';

interface AdminEntryProps {}

interface Data{
  'title': string,
  'rating': number,
  'reviews': number,
  'buyers': number,
  'quantPer': QuantityPriceItem[],
  'leadTime': QuantityLeadTimeItem[],
  'moreInfo': SideCard,
  'imageLink': string
}

const AdminEntry: FC<AdminEntryProps> = ({}) => {
  const [data, setData] = useState<Data | null>(null);
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  //deal with search from user
  const search = async () => {
    try {
      const { data } = await axios.get(`/api/alibaba?url=${encodeURIComponent(url)}`);
      setData(data);
      setError('')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setError('Invalid Link')
        }
        else {
          console.error('Error message:', error.message);
        }
      } 
      else {
        console.error('An unexpected error occurred:', error);
      }
    }
  };
  //No on sale item
  return (
  <div>
    <input 
      type="text" 
      value={url}
      onChange={(e) => setUrl(e.target.value)}
      placeholder="Alibaba.com URL"
      className='text-black w-1/2'
    />
    <button onClick={search} className='bg-blue-600'>SCRAPE</button>
    {error}


    {data && (
      <div>
        <p>Title: {data.title}</p>
        <p>Rating: {data.rating}</p>
        <p>Reviews: {data.reviews}</p>
        <p>Buyers: {data.buyers}</p>
        <ul>
          <p>Quantity / Per Item:</p>
        {data?.quantPer?.map((item, index) => (
          <li key={index}>Quantity: {item.quantity}, Price: {item.price}</li>
        ))}
      </ul>
      <ul>
        <p>Quantity / Lead Time:</p>
        {data?.leadTime?.map((item, index) =>(
          <li key = {index}>Quantity: {item.quantity}, Lead Time: {item.leadTime}</li>
        ))}
      </ul>
      <ul>
        <p>Additional Info:</p>
          <div>
            <div>Store Rating: {data.moreInfo?.storeRating}</div>
            <div>Floor Space: {data.moreInfo?.floorSpace}</div>
            <div>On Time Delivery: {data.moreInfo?.onTimeDelivery}</div>
            <div>Staff: {data.moreInfo?.staff}</div>
            <div>Collaborators: {data.moreInfo?.collaborating_suppliers}</div>
            <div>Response Time: {data.moreInfo?.responseTime}</div>
            <div>Online Revenue: {data.moreInfo?.onlineRevenue}</div>
        </div>
      </ul>
      <img src={data.imageLink}></img>
      </div>
    )}
  </div>
  )
}

export default AdminEntry;
