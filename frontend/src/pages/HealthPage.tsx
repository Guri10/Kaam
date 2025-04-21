import React, { useEffect, useState } from 'react'

interface HealthResponse {
  status: string
}

const HealthPage: React.FC = () => {
  const [status, setStatus] = useState<string>('loading')

  useEffect(() => {
    fetch('/api/health')
      .then(res => res.json())
      .then((data: HealthResponse) => setStatus(data.status))
      .catch(() => setStatus('error'))
  }, [])

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Backend Health</h2>
      <p>Status: {status}</p>
    </div>
  )
}

export default HealthPage
