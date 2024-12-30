'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

type BreakModalProps = {
  breakTime: number
  onBreakComplete: () => void
}

export function BreakModal({ breakTime, onBreakComplete }: BreakModalProps) {
  const [time, setTime] = useState(breakTime)

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prevTime => {
        if (prevTime > 0) {
          return prevTime - 1
        } else {
          clearInterval(interval)
          return 0
        }
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (time === 0) {
      onBreakComplete()
    }
  }, [time, onBreakComplete])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`
  }

  return (
    <Dialog open={true} onOpenChange={() => {}}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Break Time!</DialogTitle>
          <DialogDescription>
            Take a short break. Your next work session will start soon.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="text-4xl font-bold">{formatTime(time)}</div>
          <Button onClick={onBreakComplete}>Skip Break</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

