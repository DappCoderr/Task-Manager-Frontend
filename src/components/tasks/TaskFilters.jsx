"use client";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { STATUS_OPTIONS, PRIORITY_OPTIONS } from "@/constants/taskStatuses";

export default function TaskFilters({ filters, onChange }) {
  return (
    <div className="flex gap-4 mb-6">
      <Input
        placeholder="Search tasks..."
        value={filters.search || ""}
        onChange={(e) => onChange({ ...filters, search: e.target.value })}
        className="max-w-xs"
      />
      <Select
        value={filters.status || ""}
        onValueChange={(value) => onChange({ ...filters, status: value === "all" ? "" : value })}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="All Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          {STATUS_OPTIONS.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        value={filters.priority || ""}
        onValueChange={(value) => onChange({ ...filters, priority: value === "all" ? "" : value })}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="All Priority" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Priority</SelectItem>
          {PRIORITY_OPTIONS.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}