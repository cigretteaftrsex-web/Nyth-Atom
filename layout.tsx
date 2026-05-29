import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Nyth Atom - ATOM Self Care App',
  description: 'Manage your ATOM account easily',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="my">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Myanmar:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
