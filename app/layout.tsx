import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Feline Minimalist - Premium Cat Accessories',
  description: 'Elevated play for modern cats. Discover our curated collection of minimalist cat accessories designed to seamlessly blend with your contemporary home.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
