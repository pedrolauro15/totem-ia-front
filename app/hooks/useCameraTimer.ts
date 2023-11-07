import { useCallback, useEffect, useState } from "react"

interface Data {
  detected: boolean
  onTimerEnd: () => void
  isShowingWebcam: boolean
}

let timeout: NodeJS.Timeout;

export function useCameraTimer({ detected, onTimerEnd, isShowingWebcam }: Data) {
  const [timer, setTimer] = useState(4)
  const [isTimerDown, setIsTimerDown] = useState(false)
  const ONE_SECOND_IN_MILISECONDS = 1 * 1000

  const handleTime = useCallback(() => {
    if (timer === 0) {
      onTimerEnd()
      setTimer(4)
      setIsTimerDown(false)
      return
    }
    setIsTimerDown(true)
    timeout = setTimeout(() => {
      setTimer(previous => previous === 0 ? previous : previous - 1)
    }, ONE_SECOND_IN_MILISECONDS)
  }, [ONE_SECOND_IN_MILISECONDS, onTimerEnd, timer])

  useEffect(() => {
    if (detected && isShowingWebcam) {
      handleTime()
    } else {
      clearTimeout(timeout)
      setTimer(4)
      setIsTimerDown(false)
    }

    return () => clearTimeout(timeout)
  }, [detected, handleTime, isShowingWebcam])

  return { isTimerDown, timer }
}