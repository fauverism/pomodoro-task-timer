'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Task } from '../types'
import { BreakModal } from './break-modal'

type PomodoroTimerProps = {
  task: Task
  onUpdateTask: (task: Task) => void
}

const WORK_TIME = 25 * 60 // 25 minutes in seconds
const BREAK_TIME = 5 * 60 // 5 minutes in seconds

export function PomodoroTimer({ task, onUpdateTask }: PomodoroTimerProps) {
  const [isActive, setIsActive] = useState(false)
  const [time, setTime] = useState(WORK_TIME)
  const [showBreakModal, setShowBreakModal] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime - 1)
      }, 1000)
    } else if (time === 0 && !showBreakModal) {
      setShowBreakModal(true)
      setIsActive(false)
    } else {
      clearInterval(interval)
    }

    return () => clearInterval(interval)
  }, [isActive, time, showBreakModal])

  const toggleTimer = () => {
    if (!isActive) {
      onUpdateTask({ ...task, startTime: new Date() })
    } else {
      const endTime = new Date()
      const totalTime = task.totalTime || 0
      onUpdateTask({ 
        ...task, 
        endTime, 
        totalTime: totalTime + (WORK_TIME - time)
      })
    }
    setIsActive(!isActive)
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`
  }

  const resetTimer = () => {
    setTime(WORK_TIME)
    setIsActive(false)
    onUpdateTask({ ...task, startTime: undefined, endTime: undefined, totalTime: 0 })
  }

  const handleBreakComplete = () => {
    setShowBreakModal(false)
    resetTimer()
  }

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm font-mono">{formatTime(time)}</span>
      <Button size="sm" onClick={toggleTimer} disabled={time === 0}>
        {isActive ? 'Pause' : 'Start'}
      </Button>
      <Button size="sm" onClick={resetTimer}>Reset</Button>
      {showBreakModal && (
        <BreakModal
          breakTime={BREAK_TIME}
          onBreakComplete={handleBreakComplete}
        />
      )}
    </div>
  )
}

