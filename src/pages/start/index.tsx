import UserAuthForm from '@/components/UserAuthForm'


export default function Home() {
  return (
    <>
      <div className="grid grid-rows-9 place-items-center min-h-screen text-center text-zinc-50 bg-zinc-900">
        <div></div>
        <div></div>
        <div className="text-4xl ">Choose Winning Products</div>
        <div>Start leveraging our free toolkit to optimise your dropshipping workflow.</div>
        <div>
          <UserAuthForm/>
        </div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </>
  )
}
