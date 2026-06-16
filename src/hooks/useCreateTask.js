"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { taskService } from "@/services/task.service"

export function useCreateTask() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: taskService.createTask,
    onSuccess: (data) => {
      toast.success(data.message || "Task created successfully")
      queryClient.invalidateQueries({ queryKey: ["tasks"] })
    },
    onError: (error) => {
      const message =
        error?.message || error?.err?.message || "Failed to create task"
      toast.error(message)
    },
  })
}