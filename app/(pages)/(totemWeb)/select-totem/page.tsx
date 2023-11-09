'use client'
import Button from '@/app/components/button'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  return (
    <>
      <h2 className="text-4xl w-1/2 leading-relaxed px-8 mt-12">
        Escolha o seu tipo de atendimento
      </h2>
      <div className="flex flex-col flex-1 items-center justify-center">
        <div className="flex flex-col gap-6 min-w-[30rem]">
          <Button>Imprimir senha</Button>
          <Button
            onClick={() => {
              router.push('identify')
            }}
          >
            Reconhecimento facial
          </Button>
        </div>
      </div>
    </>
  )
}
