import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Task } from '../types'

interface UseTasks {
  tasks: Task[]
  loading: boolean
  error: string | null
  fetchTasks: () => Promise<void>
  createTask: (data: Omit<Task, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => Promise<void>
  updateTask: (id: number, data: Partial<Task>) => Promise<void>
  deleteTask: (id: number) => Promise<void>
}

export function useTasks(): UseTasks {
  const { token } = useContext(AuthContext)
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const headers = {
    'Content-Type': 'application/json',
    Authorization: token ? `Bearer ${token}` : '',
  }

  async function fetchTasks() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/tasks', { headers })
      if (!res.ok) throw new Error('Failed to fetch tasks')
      setTasks(await res.json())
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function createTask(data: Omit<Task, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) {
    setError(null)
    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Failed to create task')
      const newTask: Task = await res.json()
      setTasks(prev => [newTask, ...prev])
    } catch (err: any) {
      setError(err.message)
    }
  }

  async function updateTask(id: number, data: Partial<Task>) {
    setError(null)
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Failed to update task')
      const updated: Task = await res.json()
      setTasks(prev => prev.map(t => (t.id === id ? updated : t)))
    } catch (err: any) {
      setError(err.message)
    }
  }

  async function deleteTask(id: number) {
    setError(null)
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
        headers,
      })
      if (!res.ok) throw new Error('Failed to delete task')
      setTasks(prev => prev.filter(t => t.id !== id))
    } catch (err: any) {
      setError(err.message)
    }
  }

  useEffect(() => {
    if (token) fetchTasks()
    else {
      setTasks([])
      setLoading(false)
    }
  }, [token])

  return { tasks, loading, error, fetchTasks, createTask, updateTask, deleteTask }
}
