import { Inbox } from "lucide-react"

export function EmptyState({
  title = "Nothing here yet",
  message,
  icon: Icon = Inbox,
  children,
}) {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center gap-4 text-center">
      <div className="rounded-full bg-gray-50 p-4">
        <Icon className="h-8 w-8 text-gray-400" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {message && <p className="mt-1 text-sm text-gray-500">{message}</p>}
      </div>
      {children}
    </div>
  )
}