'use client'
import Button from '@/app/components/button'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function UploadSuccessPage() {
  
  return (
    <div className="flex flex-col flex-1">
      <h1 className='text-lg text-center font-medium mb-4 pl-4'>Biometria cadastrada com sucesso!</h1>
      <div className='flex items-center justify-center mt-8'>
        <Image src={'/success.svg'} alt='Success' width={200} height={200} />
      </div>
      <span className='text-base px-4 my-8 text-zinc-500 max-w-2xl leading-relaxed text-center self-center'>
        Seu cadastro de biometria facial foi concluído com sucesso!
      </span>
      
    </div>
  )
}