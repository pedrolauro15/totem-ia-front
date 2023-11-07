import Image from "next/image";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-8">
      <Image alt="Logo" height={50} width={200} src="https://healthdev-assets.s3.us-east-1.amazonaws.com/saudehd-logo-brand-new.png" />
      <h1 className="text-slate-700 text-lg">Hospital Healthdev LTDA</h1>
    </header>
  )
}