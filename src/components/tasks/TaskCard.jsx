import { Calendar } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { TaskStatusBadge, TaskPriorityBadge } from "./TaskStatusBadge"
import { formatDate } from "@/lib/utils"

export function TaskCard({ task }) {
  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-gray-900 truncate">
              {task.title}
            </h3>
            {task.description && (
              <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                {task.description}
              </p>
            )}
          </div>
          <TaskStatusBadge status={task.status} />
        </div>

        <div className="mt-4 flex items-center gap-3">
          <TaskPriorityBadge priority={task.priority} />
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <Calendar className="h-3.5 w-3.5" />
            <span>{formatDate(task.dueDate)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}