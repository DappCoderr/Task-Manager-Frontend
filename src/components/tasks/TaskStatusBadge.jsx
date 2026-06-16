import { getStatusColor, getPriorityColor } from "@/lib/utils"

export function TaskStatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${getStatusColor(status)}`}
    >
      {status?.replace("_", " ")}
    </span>
  )
}

export function TaskPriorityBadge({ priority }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${getPriorityColor(priority)}`}
    >
      {priority}
    </span>
  )
}