'use client'

import { useEffect, useState } from 'react'

export function ClockDisplay() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const formatTime = (date: Date) =>
    date.toLocaleTimeString('es-AR', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })

  const formatDate = (date: Date) =>
    date.toLocaleDateString('es-AR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })

  return (
    <div className="text-center space-y-1">
      <div className="text-4xl font-mono text-cyan-400">{formatTime(currentTime)}</div>
      <div className="text-sm text-muted-foreground">{formatDate(currentTime)}</div>
    </div>
  )
}
