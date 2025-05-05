// src/components/task/TaskList.tsx
import React from 'react'
import { Task } from '../../types'
import { useTasks } from '../../hooks/useTasks'
import TaskCard from './TaskCard'

interface TaskListProps {
  onEdit: (task: Task) => void
}

const TaskList: React.FC<TaskListProps> = ({ onEdit }) => {
  const { tasks, loading, error, deleteTask, updateTask } = useTasks()

  if (loading) {
    return <p>Loading tasks…</p>
  }

  if (error) {
    return <p className="text-red-600">{error}</p>
  }

  if (tasks.length === 0) {
    return <p>No tasks yet.</p>
  }

  return (
    <div className="space-y-4">
      {tasks.map(task => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={() => onEdit(task)}
          onDelete={deleteTask}
          onToggleComplete={() =>
            updateTask(task.id, {
              status: task.status === 'done' ? 'todo' : 'done',
            })
          }
        />
      ))}
    </div>
  )
}

export default TaskList
