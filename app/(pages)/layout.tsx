'use client'
import { PropsWithChildren } from 'react';
import { ToastContainer } from 'react-toastify';
import Header from '../components/header';
import Footer from '../components/footer';

export default function PagesLayout({ children }: PropsWithChildren) {
  return (
    <main className='w-screen h-screen flex flex-col'>
      <Header />
      {children}
      <div className='px-8'>
        <Footer />
      </div>
      <ToastContainer />
    </main>

  )
}