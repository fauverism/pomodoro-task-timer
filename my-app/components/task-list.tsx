'use client'

import { Task } from '../types'
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { PomodoroTimer } from './pomodoro-timer'

type TaskListProps = {
  tasks: Task[]
  onUpdateTask: (task: Task) => void
  onDeleteTask: (id: number) => void
  onCompleteTask: (task: Task) => void
}

const statusEmojis = {
  'todo': '📝',
  'in-progress': '🚀',
  'done': '✅'
}

const priorityColors = {
  'low': 'text-blue-500',
  'medium': 'text-yellow-500',
  'high': 'text-red-500'
}

export function TaskList({ tasks, onUpdateTask, onDeleteTask, onCompleteTask }: TaskListProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">Done</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead>Timer</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task) => (
          <TableRow key={task.id} className={task.completed ? 'opacity-50' : ''}>
            <TableCell>
              <Checkbox
                checked={task.completed}
                onCheckedChange={(checked) => onCompleteTask({ ...task, completed: checked as boolean })}
              />
            </TableCell>
            <TableCell>{task.title}</TableCell>
            <TableCell>
              <Select
                value={task.status}
                onValueChange={(value: Task['status']) =>
                  onUpdateTask({ ...task, status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue>
                    {statusEmojis[task.status]} {task.status}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todo">📝 To Do</SelectItem>
                  <SelectItem value="in-progress">🚀 In Progress</SelectItem>
                  <SelectItem value="done">✅ Done</SelectItem>
                </SelectContent>
              </Select>
            </TableCell>
            <TableCell>
              <Select
                value={task.priority}
                onValueChange={(value: Task['priority']) =>
                  onUpdateTask({ ...task, priority: value })
                }
              >
                <SelectTrigger>
                  <SelectValue>
                    <span className={priorityColors[task.priority]}>{task.priority}</span>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">
                    <span className="text-blue-500">Low</span>
                  </SelectItem>
                  <SelectItem value="medium">
                    <span className="text-yellow-500">Medium</span>
                  </SelectItem>
                  <SelectItem value="high">
                    <span className="text-red-500">High</span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </TableCell>
            <TableCell>
              <PomodoroTimer
                task={task}
                onUpdateTask={onUpdateTask}
              />
            </TableCell>
            <TableCell>
              <Button variant="destructive" onClick={() => onDeleteTask(task.id)}>Delete</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

