import NavBar from '../components/NavBar';
import '../styles/globals.css'
import {SessionProvider} from 'next-auth/react'
import { Toaster } from "@/components/ui/Toaster"


function MyApp({ Component, pageProps, session }) {
  return (
    <>
      <SessionProvider session={session}>
        <NavBar />
        <Component {...pageProps} />
        <Toaster />
      </SessionProvider>
    </>
  );
}

export default MyApp;
