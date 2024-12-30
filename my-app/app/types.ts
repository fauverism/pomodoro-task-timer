export type Task = {
  id: number
  title: string
  status: 'todo' | 'in-progress' | 'done'
  priority: 'low' | 'medium' | 'high'
  completed: boolean
  startTime?: Date
  endTime?: Date
  totalTime?: number
}

export type CompletedTask = Task & {
  completedAt: Date
}

export type DeletedTask = Task & {
  deletedAt: Date
}

