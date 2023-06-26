import { FC } from 'react'
import LogIn from '@/components/ui/LogIn'
import { Separator } from "@/components/ui/separator"
import Link from 'next/Link'


const NavBar = ({}) => {
  return (
    <div className = "bg-zinc-950 fixed w-full top-0 z-50 shadow-md border-b-[1px] border-zinc-700">
        <div className = "container mx-auto sm:px-5 sm:py-4 xl:px-1 px-2 py-6 flex justify-between items-center">
            <div>
                {/* Logo here */}
                DROPSUPPLY.io
            </div>
            <div>
                <Link href= '/start' 
                className="inline-block px-5 py-2 text-base font-medium 
                leading-6 text-center text-zinc-50 transition bg-blue-700 
                rounded-xl shadow-lg ripple hover:shadow-lg hover:bg-blue-600 
                focus:outline-none">
                  Log in
                </Link>
            </div>
        </div>
    </div>
  )
}

export default NavBar