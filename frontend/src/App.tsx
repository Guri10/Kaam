import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './components/layout/MainLayout'
import HealthPage from './pages/HealthPage'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HealthPage />} />
          {/* future routes:
            <Route path="today" element={<TodayPage />} />
            <Route path="status/:status" element={<StatusPage />} />
            <Route path="tags" element={<TagsPage />} />
          */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
