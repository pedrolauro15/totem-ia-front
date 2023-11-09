'use client'
import Footer from '@/app/components/footer'
import Header from '@/app/components/header'
import { PropsWithChildren } from 'react'
import { ToastContainer } from 'react-toastify'

export default function PagesLayout({ children }: PropsWithChildren) {
  return (
    <main className="w-screen h-screen flex flex-col">
      <Header />
      {children}
      <div className="px-8">
        <Footer />
      </div>
      <ToastContainer />
    </main>
  )
}
