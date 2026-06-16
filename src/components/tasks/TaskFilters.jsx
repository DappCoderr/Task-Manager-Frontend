"use client"

import { Search, X, ArrowUpDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { TASK_STATUS, TASK_PRIORITY } from "@/lib/constants"

export function TaskFilters({
  search,
  onSearchChange,
  sortBy,
  onSortByChange,
  sortOrder,
  onSortOrderChange,
  filterStatus,
  onFilterStatusChange,
  filterPriority,
  onFilterPriorityChange,
  totalTasks,
  filteredCount,
}) {
  const hasActiveFilters =
    search || filterStatus !== "ALL" || filterPriority !== "ALL"

  const clearAllFilters = () => {
    onSearchChange("")
    onFilterStatusChange("ALL")
    onFilterPriorityChange("ALL")
  }

  return (
    <div className="space-y-3">
      {/* Search + Clear */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search tasks by title..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 pr-9"
          />
          {search && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={clearAllFilters}
            className="shrink-0"
          >
            Clear all
          </Button>
        )}
      </div>

      {/* Filters Row */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Status Filter */}
        <Select value={filterStatus} onValueChange={onFilterStatusChange}>
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Status</SelectItem>
            <SelectItem value={TASK_STATUS.TODO}>Todo</SelectItem>
            <SelectItem value={TASK_STATUS.IN_PROGRESS}>In Progress</SelectItem>
            <SelectItem value={TASK_STATUS.DONE}>Done</SelectItem>
          </SelectContent>
        </Select>

        {/* Priority Filter */}
        <Select value={filterPriority} onValueChange={onFilterPriorityChange}>
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Priority</SelectItem>
            <SelectItem value={TASK_PRIORITY.HIGH}>High</SelectItem>
            <SelectItem value={TASK_PRIORITY.MEDIUM}>Medium</SelectItem>
            <SelectItem value={TASK_PRIORITY.LOW}>Low</SelectItem>
          </SelectContent>
        </Select>

        {/* Sort By */}
        <Select value={sortBy} onValueChange={onSortByChange}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="createdAt">Created</SelectItem>
            <SelectItem value="dueDate">Due Date</SelectItem>
            <SelectItem value="priority">Priority</SelectItem>
          </SelectContent>
        </Select>

        {/* Sort Order Toggle */}
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            onSortOrderChange(sortOrder === "asc" ? "desc" : "asc")
          }
          title={sortOrder === "asc" ? "Oldest first" : "Newest first"}
        >
          <ArrowUpDown
            className={`h-4 w-4 transition-transform ${sortOrder === "asc" ? "rotate-180" : ""}`}
          />
        </Button>

        {/* Result Count */}
        <span className="ml-auto text-xs text-gray-500">
          Showing {filteredCount} of {totalTasks}
        </span>
      </div>
    </div>
  )
}