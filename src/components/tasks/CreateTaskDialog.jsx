"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { LoadingSpinner } from "@/components/shared/LoadingSpinner"
import { useCreateTask } from "@/hooks/useCreateTask"
import { TASK_STATUS, TASK_PRIORITY } from "@/lib/constants"

export function CreateTaskDialog() {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState(TASK_PRIORITY.MEDIUM)
  const [dueDate, setDueDate] = useState("")

  const createTaskMutation = useCreateTask()

  const handleSubmit = (e) => {
    e.preventDefault()

    createTaskMutation.mutate(
      {
        title,
        description,
        priority,
        dueDate: dueDate || null,
      },
      {
        onSuccess: () => {
          setOpen(false)
          setTitle("")
          setDescription("")
          setPriority(TASK_PRIORITY.MEDIUM)
          setDueDate("")
        },
      }
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create a new task</DialogTitle>
            <DialogDescription>
              Add a task to your list. Fill in the details below.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Enter task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                disabled={createTaskMutation.isPending}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter task description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                disabled={createTaskMutation.isPending}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select
                  value={priority}
                  onValueChange={setPriority}
                  disabled={createTaskMutation.isPending}
                >
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={TASK_PRIORITY.LOW}>Low</SelectItem>
                    <SelectItem value={TASK_PRIORITY.MEDIUM}>Medium</SelectItem>
                    <SelectItem value={TASK_PRIORITY.HIGH}>High</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  disabled={createTaskMutation.isPending}
                />
              </div>
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={createTaskMutation.isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={createTaskMutation.isPending}>
              {createTaskMutation.isPending ? (
                <span className="flex items-center gap-2">
                  <LoadingSpinner size="sm" />
                  Creating...
                </span>
              ) : (
                "Create Task"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}