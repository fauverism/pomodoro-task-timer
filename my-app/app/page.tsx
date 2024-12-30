'use client'

import { useState, useEffect } from 'react'
import { TaskList } from './components/task-list'
import { TaskForm } from './components/task-form'
import { CompletedTaskLog } from './components/completed-task-log'
import { DeletedTaskLog } from './components/deleted-task-log'
import { Task, CompletedTask, DeletedTask } from './types'

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [completedTasks, setCompletedTasks] = useState<CompletedTask[]>([])
  const [deletedTasks, setDeletedTasks] = useState<DeletedTask[]>([])

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks')
    const storedCompletedTasks = localStorage.getItem('completedTasks')
    const storedDeletedTasks = localStorage.getItem('deletedTasks')
    if (storedTasks) setTasks(JSON.parse(storedTasks))
    if (storedCompletedTasks) setCompletedTasks(JSON.parse(storedCompletedTasks))
    if (storedDeletedTasks) setDeletedTasks(JSON.parse(storedDeletedTasks))
  }, [])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks))
    localStorage.setItem('deletedTasks', JSON.stringify(deletedTasks))
  }, [tasks, completedTasks, deletedTasks])

  const addTask = (task: Task) => {
    setTasks([...tasks, { ...task, id: Date.now() }])
  }

  const updateTask = (updatedTask: Task) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task))
  }

  const deleteTask = (id: number) => {
    const taskToDelete = tasks.find(task => task.id === id)
    if (taskToDelete) {
      setDeletedTasks([...deletedTasks, { ...taskToDelete, deletedAt: new Date() }])
      setTasks(tasks.filter(task => task.id !== id))
    }
  }

  const completeTask = (completedTask: Task) => {
    if (completedTask.completed) {
      setCompletedTasks([...completedTasks, { ...completedTask, completedAt: new Date() }])
      setTasks(tasks.filter(task => task.id !== completedTask.id))
    } else {
      updateTask(completedTask)
    }
  }

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Pomodoro Task Manager</h1>
      <div className="space-y-6">
        <TaskForm onAddTask={addTask} />
        <TaskList 
          tasks={tasks} 
          onUpdateTask={updateTask} 
          onDeleteTask={deleteTask}
          onCompleteTask={completeTask}
        />
        <CompletedTaskLog completedTasks={completedTasks} />
        <DeletedTaskLog deletedTasks={deletedTasks} />
      </div>
    </main>
  )
}

