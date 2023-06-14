
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
// import { useEffect } from 'react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
    
  return (
    <html lang="en">

      <body className={inter.className}>

        <Navbar />
        <RecoilRootC>
            
            {children}

        </RecoilRootC>

        </body>

    </html>
  )
}
