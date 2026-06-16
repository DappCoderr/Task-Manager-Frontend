import { getTasksRequest, createTaskRequest } from "@/api/tasks"

export const taskService = {
  getTasks: async () => {
    const response = await getTasksRequest()
    return response
  },

  createTask: async (data) => {
    const response = await createTaskRequest(data)
    return response
  },
}