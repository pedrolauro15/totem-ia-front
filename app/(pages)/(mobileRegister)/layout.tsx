'use client'
import MobileHeader from '@/app/components/mobileHeader'
import { PropsWithChildren } from 'react'
import { ToastContainer } from 'react-toastify'

export default function MobileLayout({ children }: PropsWithChildren) {
  return (
    <main className="w-screen h-screen flex flex-col">
      <MobileHeader />
      {children}
      <ToastContainer />
    </main>
  )
}
