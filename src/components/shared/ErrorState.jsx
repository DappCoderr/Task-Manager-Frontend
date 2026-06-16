import { AlertCircle } from "lucide-react"

export function ErrorState({ title = "Something went wrong", message, onRetry }) {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center gap-4 text-center">
      <div className="rounded-full bg-red-50 p-4">
        <AlertCircle className="h-8 w-8 text-red-500" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {message && <p className="mt-1 text-sm text-gray-500">{message}</p>}
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Try again
        </button>
      )}
    </div>
  )
}