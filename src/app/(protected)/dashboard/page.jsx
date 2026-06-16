"use client"

import { useFilteredTasks } from "@/hooks/useFilteredTasks"
import { TaskList } from "@/components/tasks/TaskList"
import { CreateTaskDialog } from "@/components/tasks/CreateTaskDialog"
import { TaskFilters } from "@/components/tasks/TaskFilters"
import { PageLoader } from "@/components/shared/LoadingSpinner"
import { ErrorState } from "@/components/shared/ErrorState"

export default function DashboardPage() {
  const {
    tasks,
    allTasks,
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
  } = useFilteredTasks()

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            My Tasks
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
            {tasks.length !== allTasks.length && ` of ${allTasks.length}`}
          </p>
        </div>
        <CreateTaskDialog />
      </div>

      {/* Filters - only show when tasks exist */}
      {!isLoading && !isError && allTasks.length > 0 && (
        <div className="mb-6">
          <TaskFilters
            search={search}
            onSearchChange={setSearch}
            sortBy={sortBy}
            onSortByChange={setSortBy}
            sortOrder={sortOrder}
            onSortOrderChange={setSortOrder}
            filterStatus={filterStatus}
            onFilterStatusChange={setFilterStatus}
            filterPriority={filterPriority}
            onFilterPriorityChange={setFilterPriority}
            totalTasks={allTasks.length}
            filteredCount={tasks.length}
          />
        </div>
      )}

      {/* Content */}
      {isLoading ? (
        <PageLoader />
      ) : isError ? (
        <ErrorState
          title="Failed to load tasks"
          message={error?.message || "There was an error loading your tasks."}
          onRetry={() => refetch()}
        />
      ) : (
        <TaskList tasks={tasks} />
      )}
    </div>
  )
}