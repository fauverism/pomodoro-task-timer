'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Task } from '../types'

type TaskFormProps = {
  onAddTask: (task: Task) => void
}

export function TaskForm({ onAddTask }: TaskFormProps) {
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState<Task['priority']>('medium')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim()) {
      onAddTask({
        id: 0, // This will be set in the parent component
        title: title.trim(),
        status: 'todo',
        priority,
        completed: false
      })
      setTitle('')
      setPriority('medium')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
      <Input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task title"
        required
      />
      <Select value={priority} onValueChange={(value: Task['priority']) => setPriority(value)}>
        <SelectTrigger>
          <SelectValue placeholder="Select priority" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="low">Low</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="high">High</SelectItem>
        </SelectContent>
      </Select>
      <Button type="submit">Add Task</Button>
    </form>
  )
}

