'use client'
import Button from '@/app/components/button'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

let timeout: NodeJS.Timeout;

export default function SuccessFeedbackPage() {
  const [time, setTime] = useState(0)
  const router = useRouter()

  useEffect(() => {
    if(time === 20) {
      router.replace('/')
    } else {
      setTimeout(() => {
        setTime(old => old + 1)
      }, 1000)
    }

    return () => {
      clearTimeout(timeout)
      setTime(0)
    }
  }, [router, time])
  return (
    <div className="flex flex-col flex-1">
      <div className='fixed top-0 left-0 right-0 h-1 bg-slate-200'>
        <span className='bg-brand fixed top-0 left-0 h-1 z-20' style={{ right: `${time * 5}%` }} />
      </div>
      <h1 className='text-4xl font-medium mb-14 pl-8 max-w-md'>Check-in realizado com sucesso!</h1>
      <div className='flex items-center justify-center mt-24'>
        <Image src={'/success.svg'} alt='Success' width={500} height={500} />
      </div>
      <span className='text-xl my-8 text-zinc-500 max-w-2xl leading-relaxed text-center self-center'>
        Seu check-in foi realizado com sucesso, em breve seu nome será chamado no painel de atendimento e você deve se dirigir para o consultório solicitado!
      </span>
      <div className='mt-12 justify-center self-center'>
        <Button variant='outlined' onClick={() => {
          router.replace('/')
        }}>Voltar para o início</Button>
      </div>
    </div>
  )
}