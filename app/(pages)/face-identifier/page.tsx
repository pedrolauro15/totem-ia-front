'use client'
import { CameraFrame } from "@/app/components/cameraFrame"
import Footer from "@/app/components/footer"
import Header from "@/app/components/header"
import { useEffect, useState } from "react";
import Webcam from 'react-webcam';
import { CameraOptions, useFaceDetection } from 'react-use-face-detection';
import FaceDetection from '@mediapipe/face_detection';
import { Camera } from '@mediapipe/camera_utils';


export default function FaceIdentifierPage() {
  const [windowWidth, setWindwowWidth] = useState(1080)
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

  const SIZE = windowWidth * 0.7

  useEffect(() => {
    setWindwowWidth(window.innerWidth || 1080)
  }, [])

  return (
    <main className="flex flex-col w-screen h-screen">
      <Header />
      <div className="flex flex-1 flex-col">
        <h1 className="px-8 mt-12 mb-24 text-4xl leading-relaxed">
          Escolha seu tipo de atendimento: {' '} <br />
          <strong className="font-medium text-brand">(Reconhecimento facial)</strong>
        </h1>

        <div className="self-center flex relative bg-blue" style={{ width: SIZE, height: SIZE }}>
          <div className="z-50">
            {
              boundingBox.map(box => (
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
            <Webcam
              ref={webcamRef}
              forceScreenshotSourceSize
              screenshotFormat="image/jpeg"
              style={{
                width: SIZE,
                height: SIZE,
              }}
              width={SIZE}
              height={SIZE}
              autoPlay
              muted
              className="h-full w-full object-cover"
            />
          </div>

          <CameraFrame />
        </div>
        <h2 className="text-center max-w-xl self-center mt-20 text-2xl text-slate-500">Centralize seu rosto na moldura e fique parado para realizar o reconhecimento</h2>
      </div>
      <div className="px-8">
        <Footer />
      </div>
    </main>
  )
}