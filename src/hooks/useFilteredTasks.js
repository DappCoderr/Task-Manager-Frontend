"use client"

import { useMemo, useState } from "react"
import { useTasks } from "@/hooks/useTasks"

export function useFilteredTasks() {
  const { data, isLoading, isError, error, refetch } = useTasks()

  const [search, setSearch] = useState("")
  const [sortBy, setSortBy] = useState("createdAt")
  const [sortOrder, setSortOrder] = useState("desc")
  const [filterStatus, setFilterStatus] = useState("ALL")
  const [filterPriority, setFilterPriority] = useState("ALL")

  const tasks = data?.data || []

  const filteredTasks = useMemo(() => {
    let result = [...tasks]

    if (search.trim()) {
      const query = search.toLowerCase().trim()
      result = result.filter((task) =>
        task.title?.toLowerCase().includes(query)
      )
    }

    if (filterStatus !== "ALL") {
      result = result.filter((task) => task.status === filterStatus)
    }

    if (filterPriority !== "ALL") {
      result = result.filter((task) => task.priority === filterPriority)
    }

    result.sort((a, b) => {
      let valueA, valueB

      switch (sortBy) {
        case "dueDate":
          valueA = a.dueDate ? new Date(a.dueDate).getTime() : 0
          valueB = b.dueDate ? new Date(b.dueDate).getTime() : 0
          break
        case "priority": {
          const priorityOrder = { HIGH: 3, MEDIUM: 2, LOW: 1 }
          valueA = priorityOrder[a.priority] || 0
          valueB = priorityOrder[b.priority] || 0
          break
        }
        case "createdAt":
        default:
          valueA = a.createdAt ? new Date(a.createdAt).getTime() : 0
          valueB = b.createdAt ? new Date(b.createdAt).getTime() : 0
          break
      }

      return sortOrder === "asc" ? valueA - valueB : valueB - valueA
    })

    return result
  }, [tasks, search, sortBy, sortOrder, filterStatus, filterPriority])

  return {
    tasks: filteredTasks,
    allTasks: tasks,
    isLoading,
    isError,
    error,
    refetch,
    search,
    setSearch,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    filterStatus,
    setFilterStatus,
    filterPriority,
    setFilterPriority,
  }
}