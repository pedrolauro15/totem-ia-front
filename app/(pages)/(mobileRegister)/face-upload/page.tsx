'use client'

import FaceDetection from '@mediapipe/face_detection';
import { Camera } from '@mediapipe/camera_utils';
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { toast } from "react-toastify"
import { CameraOptions, useFaceDetection } from "react-use-face-detection"
import Webcam from "react-webcam"
import { CameraFrame } from '@/app/components/cameraFrame';
import Image from 'next/image';
import { api } from '@/app/lib/axios';

export default function FaceUpload() {
  const params = useSearchParams()
  const router = useRouter()

  const [windowWidth, setWindwowWidth] = useState(1080)
  const [base64Img, setBase64Img] = useState('')
  const { webcamRef, boundingBox, isLoading, detected, facesDetected } = useFaceDetection({
    faceDetectionOptions: {
      model: 'short',
      minDetectionConfidence: 0.8,
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


  const SIZE = windowWidth * 0.7

  const handleClearImage = useCallback(() => {
    setBase64Img('')
  }, [])

  const handleUpload = useCallback(async () => {
    try {
      await api.post('recognitions/upload', { base64Img, personId: params.get('ref') }) 
      toast('Upload realizado!', {type: 'success'})
      router.replace('/upload-success')
    } catch (error) {
      toast('Erro ao fazer upload', { type: 'error' })
    }
  }, [base64Img, params, router])

  useEffect(() => {
    setWindwowWidth(window.innerWidth || 1080)
  }, [])

  useEffect(() => {
    if (!params.get('ref')) {
      toast('Pessoa inválida', { type: 'error' })
      router.replace('/register')
    }
  }, [params, router])

  return (
    <div className="flex flex-1 flex-col">
      <h1 className="w-full text-center text-xl front-mediu pb-8 border-b">Biometria facial</h1>
      <div className="flex flex-1 pt-10 bg-background">
        <div className='flex flex-col items-center w-full'>
          <div className='relative self-center'>
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
              <CameraFrame />
            </div>
          </div>
          {!base64Img && <button onClick={takeCapture} disabled={!detected} className="bg-brand py-4 text-white text-sm rounded disabled:bg-gray-400 w-2/3 mt-8 self-center">Capturar selfie</button>}
          {base64Img && (
            <div className='flex flex-col w-2/3 gap-4'>
              <button onClick={handleUpload} className="bg-brand py-4 text-white text-sm rounded disabled:bg-gray-400 w-2/3 self-center mt-4">Enviar</button>
              <button onClick={handleClearImage} className="bg-transparent border py-4 text-brand text-sm rounded disabled:bg-gray-400 w-2/3  self-center">Repetir</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}