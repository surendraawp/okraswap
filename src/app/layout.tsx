
import Navbar from '@/components/navbar'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
export const metadata = {
  title: 'Okra Token Swap',
  description: 'Okra Token',
}

import {RecoilRootC} from './recoil'
import { AuthHandler } from '@/services/auth'
import { usePathname } from 'next/navigation'
import Footer from '@/components/footer'
import Script from 'next/script'
// import { useEffect } from 'react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
    
  return (
    <html lang="en">
      <head>
        {/* <script src="https://blockonomics.co/js/pay_widget.js"  async></script> */}
      </head>
      <body className={inter.className}>

        <Script src="https://blockonomics.co/js/pay_widget.js" />
        <Navbar />
          <RecoilRootC>
              {children}
          </RecoilRootC>
        <Footer/>
        </body>
        

    </html>
  )
}
