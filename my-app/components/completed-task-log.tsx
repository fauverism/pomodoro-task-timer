import { CompletedTask } from '../types'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type CompletedTaskLogProps = {
  completedTasks: CompletedTask[]
}

export function CompletedTaskLog({ completedTasks }: CompletedTaskLogProps) {
  const totalTimeWorked = completedTasks.reduce((total, task) => total + (task.totalTime || 0), 0)
  const totalTasksCompleted = completedTasks.length

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Completed Tasks Log</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Start Time</TableHead>
              <TableHead>End Time</TableHead>
              <TableHead>Total Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {completedTasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.startTime?.toLocaleString()}</TableCell>
                <TableCell>{task.endTime?.toLocaleString()}</TableCell>
                <TableCell>{formatTime(task.totalTime || 0)}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={3} className="font-bold">Total</TableCell>
              <TableCell className="font-bold">{formatTime(totalTimeWorked)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div className="mt-4">
          <p>Total tasks completed: {totalTasksCompleted}</p>
        </div>
      </CardContent>
    </Card>
  )
}

