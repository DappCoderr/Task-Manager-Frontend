import { TaskCard } from "./TaskCard"
import { EmptyState } from "@/components/shared/EmptyState"
import { ClipboardList } from "lucide-react"

export function TaskList({ tasks }) {
  if (!tasks || tasks.length === 0) {
    return (
      <EmptyState
        icon={ClipboardList}
        title="No tasks yet"
        message="Create your first task to get started."
      />
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  )
}