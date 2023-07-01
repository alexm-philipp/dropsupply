import { FC } from 'react'
import LogIn from '@/components/ui/LogIn'
import { Separator } from "@/components/ui/separator"
import Link from 'next/link'
import {useSession, getSession} from 'next-auth/react'
import {signOut} from 'next-auth/react'
import UserAccountNav from '@/components/UserAccountNav'
import NavPricing from '@/components/NavPricing'

const NavBar = ({}) => {
  const {data: session} = useSession();
  return (
    <div className = "bg-zinc-950 fixed w-full top-0 z-50 shadow-md border-b-[1px] border-zinc-700">
        <div className = "container mx-auto sm:px-5 sm:py-4 xl:px-1 px-2 py-6 flex items-center justify-between">
            <div>
                DROPSUPPLY.io
            </div>
            <div>
              {session ? 
              <UserAccountNav/> 
              :
                <Link href= '/start' 
                className="inline-block px-5 py-2 text-base font-medium 
                leading-6 text-center text-zinc-50 transition bg-blue-700 
                rounded-xl shadow-lg ripple hover:shadow-lg hover:bg-blue-500 
                focus:outline-none">
                  Log in
                </Link>
              }
            </div>
        </div>
    </div>
  )
}

export default NavBar;
