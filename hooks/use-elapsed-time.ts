import * as React from 'react'

export function useElapsedTime() {
  const [elapsedTime, setElapsedTime] = React.useState(0)
  const [isRunning, setIsRunning] = React.useState(false)

  React.useEffect(() => {
    let timer: NodeJS.Timeout

    if (isRunning) {
      timer = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1)
      }, 1000)
    }

    return () => clearInterval(timer)
  }, [isRunning])

  const startTimer = React.useCallback(() => setIsRunning(true), [setIsRunning])
  const stopTimer = React.useCallback(() => setIsRunning(false), [setIsRunning])
  const resetTimer = React.useCallback(() => {
    setIsRunning(false)
    setElapsedTime(0)
  }, [setIsRunning, setElapsedTime])

  return { elapsedTime, startTimer, stopTimer, resetTimer }
}
