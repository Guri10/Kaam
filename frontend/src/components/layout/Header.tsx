// src/components/layout/Header.tsx
import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

const Header: React.FC = () => {
  const { user, logout } = useContext(AuthContext)

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-800 border-b dark:border-gray-700">
      <div>
        <h1 className="text-xl font-semibold">All Tasks</h1>
        {user && (
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {user.name} ({user.email})
          </p>
        )}
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={logout}
          className="px-3 py-1 bg-red-500 text-white rounded"
        >
          Logout
        </button>
        <button className="px-4 py-2 bg-primary text-white rounded">
          + New Task
        </button>
      </div>
    </header>
  )
}

export default Header
