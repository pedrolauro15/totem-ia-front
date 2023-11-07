'use client'
import { PropsWithChildren } from 'react';
import { ToastContainer } from 'react-toastify';

export default function PagesLayout({children}: PropsWithChildren) {
  return (
    <>
      <ToastContainer />
      {children}
    </>
  )
}