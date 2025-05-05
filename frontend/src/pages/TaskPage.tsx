// src/pages/TaskPage.tsx
import React, { useState } from 'react'
import TaskList from '../components/task/TaskList'
import TaskModal from '../components/task/TaskModal'
import { Task } from '../types'

const TaskPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined)

  const handleNewTask = () => {
    setEditingTask(undefined)
    setIsModalOpen(true)
  }

  const handleEditTask = (task: Task) => {
    setEditingTask(task)
    setIsModalOpen(true)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button
          onClick={handleNewTask}
          className="px-4 py-2 bg-primary text-white rounded"
        >
          + New Task
        </button>
      </div>

      <TaskList onEdit={handleEditTask} />

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initial={editingTask}
      />
    </div>
  )
}

export default TaskPage
