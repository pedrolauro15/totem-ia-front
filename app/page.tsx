'use client'
import { useRouter } from 'next/navigation'
import Button from './components/button'
import Footer from './components/footer'
import Header from './components/header'


export default function Home() {
  const router = useRouter()
  return (
    <main className='w-screen h-screen flex flex-col'>
      <Header />
      <h2 className='text-4xl w-1/2 leading-relaxed px-8 mt-12'>
        Escolha o seu tipo de atendimento
      </h2>
      <div className='flex flex-col flex-1 items-center justify-center'>
        <div className='flex flex-col gap-6 min-w-[30rem]'>
          <Button>Imprimir senha</Button>
          <Button onClick={() => {
            router.push('identify')
          }}>
            Reconhecimento facial
            {/* <Link className='flex items-center justify-center'  href=''><span className='py-7 px-8'>Reconhecimento facial</span></Link> */}
          </Button>
        </div>
      </div>
      <div className='px-8'>
        <Footer />
      </div>
    </main>
  )
}
