import { useEffect } from 'react'
import { useState } from 'react'

export function useDebounce(value, timeout = 500, callback) {
  const [timer, setTimer] = useState(null)

  const clearTimer = () => {
    if (timer) clearTimeout(timer)
  }

  useEffect(() => {
    clearTimer()

    if (value && callback) {
      const newTimer = setTimeout(callback, timeout)
      setTimer(newTimer)
    }
  }, [value])
}
