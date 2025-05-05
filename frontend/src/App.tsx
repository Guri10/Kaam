import React, { useContext } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navigate } from 'react-router-dom'

import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import MainLayout from './components/layout/MainLayout'
import HealthPage from './pages/HealthPage'
import { AuthContext } from './context/AuthContext'

const App: React.FC = () => {
  const { token } = useContext(AuthContext)
  return (
      <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={token ? <MainLayout /> : <Navigate to="/login" replace />}>
          <Route index element={<HealthPage />} />
          {/* future routes:
            <Route path="today" element={<TodayPage />} />
            <Route path="status/:status" element={<StatusPage />} />
            <Route path="tags" element={<TagsPage />} />
          */}
        </Route>
      </Routes>
  )
}

export default App
