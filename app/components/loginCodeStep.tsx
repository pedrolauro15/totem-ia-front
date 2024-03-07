'use client'
import { useEffect, useMemo, useState } from 'react'
import { io as socket } from 'socket.io-client'
import { WebsocketDictionary } from '../utils/dictionary/websocket.dictionary'
import { maskCode } from '../utils/mask/maskCode'
import LoginStep from './loginStep'

let timeout: NodeJS.Timeout

export default function LoginCodeStep() {
  const [code, setCode] = useState('')
  const [time, setTime] = useState(0)
  const io = useMemo(() => socket('http://localhost:3333', { path: '/ws' }), [])

  useEffect(() => {
    io.on('connect', () => {
      console.log('Socket connected')
      io.on(WebsocketDictionary.NEW_CODE_GENERATED, (received) => {
        console.log(received)
        setCode(received.code)
      })
    })

    return () => {
      io.disconnect()
    }
  }, [io])

  useEffect(() => {
    if (time === 15) {
      io.emit(WebsocketDictionary.CLIENT_REQUEST_NEW_CODE)
      setTime(0)
    }

    timeout = setTimeout(() => {
      setTime((state) => state + 1)
    }, 1000)

    return () => {
      clearTimeout(timeout)
    }
  }, [io, time])

  return (
    <LoginStep
      stepTitle="PASSO 3"
      stepDescription="Digite o seguinte código:"
      extraText={maskCode(code)}
    />
  )
}
