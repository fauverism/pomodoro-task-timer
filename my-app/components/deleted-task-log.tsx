import { DeletedTask } from '../types'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type DeletedTaskLogProps = {
  deletedTasks: DeletedTask[]
}

export function DeletedTaskLog({ deletedTasks }: DeletedTaskLogProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Deleted Tasks Log</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Deleted At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {deletedTasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.deletedAt.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4">
          <p>Total tasks deleted: {deletedTasks.length}</p>
        </div>
      </CardContent>
    </Card>
  )
}

