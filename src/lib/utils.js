import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString) {
  if (!dateString) return "No date"
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export function getPriorityColor(priority) {
  const colors = {
    HIGH: "text-red-600 bg-red-50 border-red-200",
    MEDIUM: "text-yellow-600 bg-yellow-50 border-yellow-200",
    LOW: "text-green-600 bg-green-50 border-green-200",
  }
  return colors[priority] || "text-gray-600 bg-gray-50 border-gray-200"
}

export function getStatusColor(status) {
  const colors = {
    TODO: "text-blue-600 bg-blue-50 border-blue-200",
    IN_PROGRESS: "text-purple-600 bg-purple-50 border-purple-200",
    DONE: "text-green-600 bg-green-50 border-green-200",
  }
  return colors[status] || "text-gray-600 bg-gray-50 border-gray-200"
}