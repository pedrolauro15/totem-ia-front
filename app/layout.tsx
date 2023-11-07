import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SaudeHD - Totem',
  description: 'Totem SaudeHD com inteligência artificial',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>{children}</body>

    </html>
  )
}
