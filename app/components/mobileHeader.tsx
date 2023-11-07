import Image from "next/image";

export default function MobileHeader() {
  return (
    <header className="mb-10 flex items-center justify-center pt-8">
       <Image alt="Logo" height={52} width={188} src="https://healthdev-assets.s3.us-east-1.amazonaws.com/saudehd-logo-brand-new.png" />
    </header>
  )
}