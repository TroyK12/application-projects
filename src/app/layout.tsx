import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Footer from './Footer'
import './globals.css'
import Navbar from './Navbar/Navbar'
import SessionProvider from './SessionProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Garage Shop',
  description: 'Shop your favorite Items',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  )
}
