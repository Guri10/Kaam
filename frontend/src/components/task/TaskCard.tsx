import React from 'react'
import { Task } from '../../types'

interface Props {
  task: Task
  onEdit: (task: Task) => void
  onDelete: (id: number) => void
  onToggleComplete: (task: Task) => void
}

const TaskCard: React.FC<Props> = ({ task, onEdit, onDelete, onToggleComplete }) => {
  const due = task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '—'
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow flex justify-between items-center">
      <div>
        <h3 className="font-semibold">{task.title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{task.description}</p>
        <div className="flex space-x-2 text-xs mt-2">
          <span className="px-1 bg-gray-200 dark:bg-gray-700 rounded">{task.status}</span>
          <span className="px-1 bg-gray-200 dark:bg-gray-700 rounded">{task.priority}</span>
          <span className="px-1 bg-gray-200 dark:bg-gray-700 rounded">{due}</span>
        </div>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => onToggleComplete(task)}
          className="text-green-500"
        >
          ✓
        </button>
        <button onClick={() => onEdit(task)} className="text-blue-500">
          ✎
        </button>
        <button onClick={() => onDelete(task.id)} className="text-red-500">
          🗑
        </button>
      </div>
    </div>
  )
}

export default TaskCard
