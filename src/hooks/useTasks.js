"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getActivityLogs,
} from "@/api/tasks";
import { toast } from "sonner";

export const useGetTasks = (filters) => {
  return useQuery({
    queryKey: ["tasks", filters],
    queryFn: () => getTasks(filters),
    keepPreviousData: true,
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTask,
    onSuccess: (res) => {
      queryClient.invalidateQueries(["tasks"]);
      toast.success(res.message);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create task");
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTask,
    onSuccess: (res) => {
      queryClient.invalidateQueries(["tasks"]);
      queryClient.invalidateQueries(["activity-logs"]);
      toast.success(res.message);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update task");
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTask,
    onSuccess: (res) => {
      queryClient.invalidateQueries(["tasks"]);
      toast.success(res.message);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete task");
    },
  });
};

export const useActivityLogs = (params = {}) => {
  return useQuery({
    queryKey: ["activity-logs", params],
    queryFn: () => getActivityLogs(params),
  });
};