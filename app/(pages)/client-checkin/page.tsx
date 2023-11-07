'use client'

import { ApiPersonResponse } from "@/app/models/apiPersonResponse"
import { useCallback, useEffect, useState } from "react"
import { useSearchParams } from 'next/navigation'
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import { api } from "@/app/lib/axios"
import Image from "next/image"
import dayjs from 'dayjs'
import Button from "@/app/components/button"
import QRCode from "react-qr-code";
import { CameraFrame } from "@/app/components/cameraFrame"
import Link from "next/link"

dayjs.locale('pt-br')

export default function ClientCheckinPage() {
  const [clientData, setClientData] = useState<null | ApiPersonResponse>(null)
  const [loading, setLoading] = useState(false)
  const searchParams = useSearchParams()
  const router = useRouter()

  const loadClientData = useCallback(async () => {
    const personId = searchParams.get('ref')
    if (!personId) {
      toast('Agendamento inválido!', { type: 'error' })
      router.replace('/')
      return;
    }

    try {
      setLoading(true)
      const result = await api.get<ApiPersonResponse>(`recognitions/${personId}/scheduling`)
      console.log('>> ', result);

      setClientData(result.data)
    } catch (error) {
      toast('Agendamento inválido!', { type: 'error' })
      router.replace('/')
      return;
    } finally {
      setLoading(false)
    }
  }, [router, searchParams])

  const handleCheckin = useCallback(async () => {
    try {
      await api.post(`checkin/${clientData?.pendingScheduling?.id}`)
      router.push('/success-feedback')
    } catch (error) {
      toast('Erro ao fazer checkin!', { type: 'error' })
    }
  }, [clientData, router])

  useEffect(() => {
    loadClientData()
  }, [loadClientData])

  if (loading) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center">
        <h1 className="text-4xl">Carregando...</h1>
      </div>
    )
  }

  return (
    <div className="flex flex-col flex-1 px-8">
      <h1 className="text-4xl font-medium mb-14">Encontramos o seu cadastro!</h1>
      <div className="flex items-center gap-6 mb-14">
        <Image src={`${process.env.NEXT_PUBLIC_API_URL}/recognitions/${searchParams.get('ref')}/image`} width={180} height={180} alt="Profile" />
        <div className="flex flex-col text-2xl gap-6">
          <span className="text-zinc-500">
            <strong className="font-medium text-black">Cliente:</strong> {clientData?.person.name || '-'}
          </span>
          <span className="text-zinc-500">
            <strong className="font-medium text-black">Especialidade:</strong> {clientData?.pendingScheduling?.specialities?.name || '-'}
          </span>
          <span className="text-zinc-500">
            <strong className="font-medium text-black">Profissional:</strong> {clientData?.pendingScheduling?.schedules?.professionals?.persons?.name || '-'}
          </span>
          <span className="text-zinc-500">
            <strong className="font-medium text-black">Data / Hora:</strong> {clientData?.pendingScheduling?.schedules?.date ? `${dayjs(clientData?.pendingScheduling?.schedules?.date).format('DD/MM/YYYY')} - ${dayjs(clientData?.pendingScheduling?.time).add(3, 'hours').format('HH:mm')}` : '-'}
          </span>
        </div>
      </div>
      {clientData?.pendingScheduling && (
        <>
          <div className="max-w-xl self-center">
            <h2 className="text-center text-2xl text-zinc-500">Detectamos sua consulta agendada para hoje, deseja fazer check-in?</h2>
          </div>
          <div className="flex flex-col self-center gap-4 mt-16 w-96">
            <Button onClick={handleCheckin}>Check-In</Button>
            <Button variant="outlined">
              <Link href='/'>Cancelar</Link> 
            </Button>
          </div>
        </>
      )}
      {!clientData?.pendingScheduling && (
        <>
          <span className="mt-14 max-w-2xl text-2xl text-zinc-500 self-center text-center mb-14">Parece que você não tem nenhum atendimento
            agendado, aponte a câmera do seu celular para o <strong className="text-zinc-800 font-medium">QR Code</strong> e marque sua
            consulta agora!</span>
            <div className="self-center relative p-8">
              <QRCode className="w-[344px] h-[344px]" width={344} height={344} value="https://saudehd.com.br" />
              <CameraFrame />
            </div>
            <Button className="w-[344px] mt-16 self-center" variant="outlined">
              <Link href='/'>Voltar para o início</Link>
            </Button>
        </>
      )}
    </div>
  )
}