import { CameraFrame } from '@/app/components/cameraFrame'
import Footer from '@/app/components/footer'
import LoginStep from '@/app/components/loginStep'
import Image from 'next/image'
import QRCode from 'react-qr-code'

export default function LoginPage() {
  return (
    <main className="flex flex-col h-screen w-screen">
      <header>
        <Image
          className="p-8"
          alt="Logo"
          height={50}
          width={200}
          src="https://healthdev-assets.s3.us-east-1.amazonaws.com/saudehd-logo-brand-new.png"
        />
      </header>
      <div className="flex flex-col gap-10 flex-1">
        <h1 className="text-4xl p-8 max-w-4xl leading-relaxed">
          Siga os seguintes passos para fazer login no{' '}
          <strong className="text-brand font-medium">TOTEM SaudeHD</strong>:
        </h1>

        <ul className="flex flex-col gap-8 p-8">
          <LoginStep
            stepTitle="PASSO 1"
            stepDescription="Escaneie o QR Code com a câmera do seu celular ou acesse:"
            extraText="saudehd.com.br/apps/totem/qr-code"
          />
          <LoginStep
            stepTitle="PASSO 2"
            stepDescription="Se necessário, faça login no sistema."
          />
          <LoginStep
            stepTitle="PASSO 3"
            stepDescription="Digite o seguinte código:"
            extraText="2211-4443"
          />
        </ul>
        <h2 className="px-8 mt-4 font-medium text-2xl text-center text-gray-800">
          ACESSE O LINK VIA QRCODE:
        </h2>
        <div className="relative p-5 self-center">
          <CameraFrame />
          <QRCode
            className="w-[396] h-[396]"
            value="https://saudehd.com.br/apps/totem/qr-code"
          />
        </div>
      </div>
      <Footer />
    </main>
  )
}
