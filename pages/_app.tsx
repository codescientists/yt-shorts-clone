import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { GoogleOAuthProvider } from '@react-oauth/google';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, [])

  if (isSSR) return null;

  return (
    <GoogleOAuthProvider clientId={`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`}>
      <div className='bg-neutral-900'>
        <Navbar />
        <div className="flex">
          <Sidebar />
          <Component {...pageProps} />
        </div>
      </div>
    </GoogleOAuthProvider>
  )
}

export default MyApp
