import React, { useState, useEffect } from 'react'
import { Task } from '../../types'
import { useTasks } from '../../hooks/useTasks'

interface Props {
  isOpen: boolean
  onClose: () => void
  initial?: Task
}

const TaskModal: React.FC<Props> = ({ isOpen, onClose, initial }) => {
  const isEdit = Boolean(initial)
  const { createTask, updateTask } = useTasks()
  const [title, setTitle] = useState(initial?.title || '')
  const [description, setDescription] = useState(initial?.description || '')
  const [status, setStatus] = useState(initial?.status || 'todo')
  const [priority, setPriority] = useState(initial?.priority || 'medium')
  const [dueDate, setDueDate] = useState(initial?.dueDate?.slice(0, 10) || '')
  const [category, setCategory] = useState(initial?.category || '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (initial) {
      setTitle(initial.title)
      setDescription(initial.description || '')
      setStatus(initial.status)
      setPriority(initial.priority)
      setDueDate(initial.dueDate?.slice(0, 10) || '')
      setCategory(initial.category || '')
    }
  }, [initial])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const payload = { title, description, status, priority, dueDate: dueDate || undefined, category }
    try {
      if (isEdit && initial) {
        await updateTask(initial.id, payload)
      } else {
        await createTask(payload)
      }
      onClose()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <form
        className="bg-white dark:bg-gray-800 p-6 rounded shadow w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl mb-4">{isEdit ? 'Edit Task' : 'New Task'}</h2>
        {error && <div className="mb-2 text-red-600">{error}</div>}
        <label className="block mb-2">
          Title
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            disabled={loading}
            className="w-full mt-1 p-2 border rounded dark:bg-gray-700"
            required
          />
        </label>
        <label className="block mb-2">
          Description
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            disabled={loading}
            className="w-full mt-1 p-2 border rounded dark:bg-gray-700"
          />
        </label>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <label>
            Status
            <select
              value={status}
              onChange={e => setStatus(e.target.value as any)}
              disabled={loading}
              className="w-full mt-1 p-2 border rounded dark:bg-gray-700"
            >
              <option value="todo">To Do</option>
              <option value="in_progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </label>
          <label>
            Priority
            <select
              value={priority}
              onChange={e => setPriority(e.target.value as any)}
              disabled={loading}
              className="w-full mt-1 p-2 border rounded dark:bg-gray-700"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </label>
        </div>
        <label className="block mb-4">
          Due Date
          <input
            type="date"
            value={dueDate}
            onChange={e => setDueDate(e.target.value)}
            disabled={loading}
            className="w-full mt-1 p-2 border rounded dark:bg-gray-700"
          />
        </label>
        <label className="block mb-4">
          Category
          <input
            value={category}
            onChange={e => setCategory(e.target.value)}
            disabled={loading}
            className="w-full mt-1 p-2 border rounded dark:bg-gray-700"
          />
        </label>
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 rounded text-white ${
              loading ? 'bg-gray-400' : 'bg-primary'
            }`}
          >
            {loading ? 'Saving…' : isEdit ? 'Save' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default TaskModal
