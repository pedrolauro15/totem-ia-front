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

  return (
    <div className="flex flex-col flex-1 px-8">
      <h1 className="text-4xl font-medium mb-14">Não encontramos o seu cadastro!</h1>

      <>
        <span className="mt-14 max-w-2xl text-2xl text-zinc-500 self-center text-center mb-14">Parece que você não está cadastrado,
           aponte a câmera do seu celular para o <strong className="text-zinc-800 font-medium">QR Code</strong> e cadastre-se
          agora mesmo!</span>
        <div className="self-center relative p-8">
          <QRCode className="w-[344px] h-[344px]" width={344} height={344} value={`${process.env.NEXT_PUBLIC_APP_URL}/register`} />
          <CameraFrame />
        </div>
        <Button className="w-[344px] mt-16 self-center" variant="outlined">
          <Link href='/'>Voltar para o início</Link>
        </Button>
      </>

    </div>
  )
}