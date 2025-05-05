import React, { useState, useMemo } from 'react'
import { useTasks } from '../hooks/useTasks'
import { Task } from '../types'
import TaskCard from '../components/task/TaskCard'
import TaskModal from '../components/task/TaskModal'
import Toolbar, {
  StatusFilter,
  PriorityFilter,
  SortField,
  SortOrder,
} from '../components/task/Toolbar'

const TaskPage: React.FC = () => {
  const { tasks, loading, error, deleteTask, updateTask } = useTasks()

  // modal state
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined)

  // filter & sort state
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>('all')
  const [categoryFilter, setCategoryFilter] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [sortField, setSortField] = useState<SortField>('dueDate')
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc')

  // extract unique categories from tasks
  const categories = useMemo(
    () => Array.from(new Set(tasks.map(t => t.category).filter(Boolean))) as string[],
    [tasks]
  )

  // apply filtering, search, sorting
  const displayed = useMemo(() => {
    return tasks
      .filter(t => statusFilter === 'all' || t.status === statusFilter)
      .filter(t => priorityFilter === 'all' || t.priority === priorityFilter)
      .filter(t => !categoryFilter || t.category === categoryFilter)
      .filter(t =>
        t.title.toLowerCase().includes(searchQuery.trim().toLowerCase())
      )
      .sort((a, b) => {
        const aVal = new Date(a[sortField] || 0).getTime()
        const bVal = new Date(b[sortField] || 0).getTime()
        return sortOrder === 'asc' ? aVal - bVal : bVal - aVal
      })
  }, [
    tasks,
    statusFilter,
    priorityFilter,
    categoryFilter,
    searchQuery,
    sortField,
    sortOrder,
  ])

  const openNew = () => {
    setEditingTask(undefined)
    setIsModalOpen(true)
  }

  const openEdit = (task: Task) => {
    setEditingTask(task)
    setIsModalOpen(true)
  }

  return (
    <div className="space-y-4">
      <Toolbar
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        priorityFilter={priorityFilter}
        onPriorityChange={setPriorityFilter}
        categoryFilter={categoryFilter}
        onCategoryChange={setCategoryFilter}
        categories={categories}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortField={sortField}
        onSortFieldChange={setSortField}
        sortOrder={sortOrder}
        onSortOrderChange={setSortOrder}
      />

      <div className="flex justify-end px-4">
        <button
          onClick={openNew}
          className="px-4 py-2 bg-primary text-white rounded"
        >
          + New Task
        </button>
      </div>

      {loading && <p className="px-4">Loading tasks…</p>}
      {error && <p className="px-4 text-red-600">{error}</p>}
      {!loading && displayed.length === 0 && (
        <p className="px-4">No tasks match those criteria.</p>
      )}

      <div className="space-y-4 px-4">
        {displayed.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={() => openEdit(task)}
            onDelete={deleteTask}
            onToggleComplete={() =>
              updateTask(task.id, {
                status: task.status === 'done' ? 'todo' : 'done',
              })
            }
          />
        ))}
      </div>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initial={editingTask}
      />
    </div>
  )
}

export default TaskPage
