import {Icons} from '@/components/Icons'
import {Button} from '@/components/ui/Button'
import {useState, FC} from 'react'

interface UserAuthFormProps {
  
}

const UserAuthForm: FC<UserAuthFormProps> = ({}) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const googleLogIn = async ()=>{
        setIsLoading(true)
        try{
           
        } catch(err) {
            
        }
        finally{
            setIsLoading(false)
        }
    }

    return (
        <>
        <Button isLoading={isLoading} onClick={googleLogIn} className={'outline'} size={'lg'}>
            {isLoading ? null: <Icons.google className="h-4 w-4 mr-2"/>}
            Sign in with Google
        </Button>
        <button>X</button>
        </>
  )
}

export default UserAuthForm