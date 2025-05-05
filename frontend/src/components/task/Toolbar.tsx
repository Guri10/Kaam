import React from 'react'

export type StatusFilter = 'all' | 'todo' | 'in_progress' | 'done'
export type PriorityFilter = 'all' | 'low' | 'medium' | 'high'
export type SortField = 'dueDate' | 'createdAt'
export type SortOrder = 'asc' | 'desc'

interface Props {
  statusFilter: StatusFilter
  onStatusChange: (value: StatusFilter) => void
  priorityFilter: PriorityFilter
  onPriorityChange: (value: PriorityFilter) => void
  categoryFilter: string
  onCategoryChange: (value: string) => void
  categories: string[]
  searchQuery: string
  onSearchChange: (value: string) => void
  sortField: SortField
  onSortFieldChange: (value: SortField) => void
  sortOrder: SortOrder
  onSortOrderChange: (value: SortOrder) => void
}

const Toolbar: React.FC<Props> = ({
  statusFilter,
  onStatusChange,
  priorityFilter,
  onPriorityChange,
  categoryFilter,
  onCategoryChange,
  categories,
  searchQuery,
  onSearchChange,
  sortField,
  onSortFieldChange,
  sortOrder,
  onSortOrderChange,
}) => (
  <div className="flex flex-wrap items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded">
    {/* Status */}
    <select
      value={statusFilter}
      onChange={e => onStatusChange(e.target.value as StatusFilter)}
      className="p-2 border rounded dark:bg-gray-700"
    >
      <option value="all">All Statuses</option>
      <option value="todo">To Do</option>
      <option value="in_progress">In Progress</option>
      <option value="done">Done</option>
    </select>

    {/* Priority */}
    <select
      value={priorityFilter}
      onChange={e => onPriorityChange(e.target.value as PriorityFilter)}
      className="p-2 border rounded dark:bg-gray-700"
    >
      <option value="all">All Priorities</option>
      <option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
    </select>

    {/* Category */}
    <select
      value={categoryFilter}
      onChange={e => onCategoryChange(e.target.value)}
      className="p-2 border rounded dark:bg-gray-700"
    >
      <option value="">All Categories</option>
      {categories.map(cat => (
        <option key={cat} value={cat}>
          {cat}
        </option>
      ))}
    </select>

    {/* Search */}
    <input
      type="text"
      value={searchQuery}
      onChange={e => onSearchChange(e.target.value)}
      placeholder="Search title…"
      className="flex-1 min-w-[150px] p-2 border rounded dark:bg-gray-700"
    />

    {/* Sort field */}
    <select
      value={sortField}
      onChange={e => onSortFieldChange(e.target.value as SortField)}
      className="p-2 border rounded dark:bg-gray-700"
    >
      <option value="dueDate">Due Date</option>
      <option value="createdAt">Created At</option>
    </select>

    {/* Sort order */}
    <select
      value={sortOrder}
      onChange={e => onSortOrderChange(e.target.value as SortOrder)}
      className="p-2 border rounded dark:bg-gray-700"
    >
      <option value="asc">Asc</option>
      <option value="desc">Desc</option>
    </select>
  </div>
)

export default Toolbar
