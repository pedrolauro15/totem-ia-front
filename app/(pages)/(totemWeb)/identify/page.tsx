'use client'
import FaceDetection from '@mediapipe/face_detection';
import { Camera } from '@mediapipe/camera_utils';
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { toast } from "react-toastify"
import { CameraOptions, useFaceDetection } from "react-use-face-detection"
import Webcam from "react-webcam"
import { CameraFrame } from '@/app/components/cameraFrame';
import Image from 'next/image';
import { api } from '@/app/lib/axios';
import { useCameraTimer } from '@/app/hooks/useCameraTimer';
import { ApiRecognitionResponse } from '@/app/models/apiRecognitionResponse';
import Button from '@/app/components/button';
import dynamic from 'next/dynamic';


function IdentifyPage() {
  const [windowWidth, setWindwowWidth] = useState(1080)
  const [base64Img, setBase64Img] = useState('')
  const router = useRouter()
  const { webcamRef, boundingBox, detected } = useFaceDetection({
    faceDetectionOptions: {
      model: 'short',
      minDetectionConfidence: 0.8,
      selfieMode: false
    },
    faceDetection: new FaceDetection.FaceDetection({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`
      },
    }),
    camera: ({ mediaSrc, onFrame }: CameraOptions) =>
      new Camera(mediaSrc, {
        onFrame,
        width: SIZE,
        height: SIZE,
      }),
  });

  const takeCapture = useCallback(() => {
    if ((webcamRef as any)?.current) {
      const imageUrl = (webcamRef as any)?.current.getScreenshot()
      if (imageUrl) {
        setBase64Img(imageUrl)
      }
    }
  }, [webcamRef])

  const { isTimerDown, timer } = useCameraTimer({
    detected,
    onTimerEnd: takeCapture,
    isShowingWebcam: !base64Img
  })

  const SIZE = windowWidth * 0.7

  const handleClearImage = useCallback(() => {
    setBase64Img('')
  }, [])

  const handleConfirmImageSend = useCallback(async () => {
    const result = await api.post<ApiRecognitionResponse>('recognitions', { fileString: base64Img })
    if (result.data.code === 'F') {
      toast('Encontramos seu cadastro!', { pauseOnHover: true, type: 'success' })
      router.push(`/client-checkin?ref=${result.data.personId}`)
    }
    else {
      toast('Não encontramos seu cadastro!', { pauseOnHover: true, type: 'info' })
      router.push(`/client-qrcode`)
    }
  }, [base64Img, router])

  useEffect(() => {
    setWindwowWidth(window.innerWidth || 1080)
  }, [])
  

  return (
      <div className="flex flex-1 flex-col">
      <h1 className="px-8 mt-12 mb-24 text-4xl leading-relaxed">
        Escolha seu tipo de atendimento: {' '} <br />
        <strong className="font-medium text-brand">(Reconhecimento facial)</strong>
      </h1>

      <div className="self-center flex relative bg-blue" style={{ width: SIZE, height: SIZE }}>
        <div className="z-50">
          {
            !base64Img && boundingBox.map(box => (
              <div
                key={box.rectId}
                style={{
                  width: `${box.width * 100}%`,
                  height: `${box.height * 100}%`,
                  top: `${box.yCenter * 100}%`,
                  left: `${box.xCenter * 100}%`,
                }}
                className="absolute z-50 left-1/2 border-4 border-brand rounded-3xl"
              />
            ))
          }
          {
            isTimerDown && (
              <div className="z-50 absolute w-full h-full flex items-center justify-center bg-black/20">
                <strong className="text-brand text-[140px] font-normal">{timer}</strong>
              </div>
            )
          }
          {<Webcam
            ref={webcamRef}
            forceScreenshotSourceSize
            screenshotFormat="image/jpeg"
            style={{
              width: SIZE,
              height: SIZE,
              display: base64Img ? 'none' : 'inherit'
            }}
            width={SIZE}
            height={SIZE}
            autoPlay
            muted
            className="h-full w-full object-cover"
          />}
          {base64Img &&
            <Image src={base64Img} className="h-full w-full object-cover" width={SIZE} height={SIZE} alt="Screenshot" />
          }
        </div>

        <CameraFrame />
      </div>
      {!base64Img && <h2 className="text-center max-w-xl self-center mt-20 text-2xl text-slate-500">Centralize seu rosto na moldura e fique parado para realizar o reconhecimento</h2>}
      {base64Img && (
        <div className="flex flex-col gap-4 self-center mt-16" style={{ width: SIZE * 0.7 }}>
          <Button onClick={handleConfirmImageSend}>
            Enviar
          </Button>
          <Button variant="outlined" onClick={handleClearImage}>
            Repetir
          </Button>
        </div>
      )}
    </div>
  )
}
// export it with SSR disabled
const IdPage = dynamic(() => Promise.resolve(IdentifyPage), {
ssr: false,
})

export default IdPage