import React from 'react'

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-800 border-b dark:border-gray-700">
      <h1 className="text-xl font-semibold">All Tasks</h1>
      <button className="px-4 py-2 bg-primary text-white rounded">
        + New Task
      </button>
    </header>
  )
}

export default Header
