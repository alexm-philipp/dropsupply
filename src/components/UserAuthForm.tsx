import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { Icons } from '@/components/Icons'
import {useSession, signIn, signOut} from 'next-auth/react'
import { useToast } from "@/hooks/use-toast"


export default function UserAuthForm() {
  const [isLoading, setIsLoading] = useState(false)
  const {toast} = useToast()

  const handleClick = async () => {
    setIsLoading(true)
    try{
      signIn('google')
    } catch (err){
        toast({
          title: 'Something went wrong',
          description: 'There was a problem logging in with Google'
        })
    }
    finally {
        setIsLoading(false)
    }
    
  }

  return (
    <button
      className={`${
        isLoading ? 'opacity-50 cursor-not-allowed' : 'active:bg-zinc-200 bg-zinc-50'
      } inline-flex items-center justify-center rounded-lg
      text-base font-medium transition-all transform focus:outline-none 
      disabled:opacity-50 disabled:pointer-events-none h-10 py-6 px-8 
      text-zinc-950 border-2 border-transparent`}
      onClick={handleClick}
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
      ) : (
        <Icons.google className="h-5 w-5 mr-2"/>
      )}
      Sign in with Google
    </button>
  )
}
