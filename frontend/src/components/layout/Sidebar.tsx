import React, { useContext } from 'react'
import { ThemeContext } from '../../context/ThemeContext'

const Sidebar: React.FC = () => {
  const { toggleTheme, isDark } = useContext(ThemeContext)

  return (
    <aside className="w-64 h-screen bg-white dark:bg-gray-800 border-r dark:border-gray-700">
      <div className="p-4 text-2xl font-bold">Kaam</div>
      <nav className="p-4 space-y-2">
        <a href="/" className="block">All Tasks</a>
        <a href="/today" className="block">Today</a>
        <a href="/status/todo" className="block">To Do</a>
        <a href="/status/in_progress" className="block">In Progress</a>
        <a href="/status/done" className="block">Completed</a>
      </nav>
      <button
        onClick={toggleTheme}
        className="m-4 p-2 bg-gray-200 dark:bg-gray-600 rounded"
      >
        {isDark ? 'Light Mode' : 'Dark Mode'}
      </button>
    </aside>
  )
}

export default Sidebar
