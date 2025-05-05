import React, { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const RegisterPage: React.FC = () => {
  const { token, register } = useContext(AuthContext)
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Auto‑redirect if already registered/logged in
  useEffect(() => {
    if (token) {
      navigate('/', { replace: true })
    }
  }, [token, navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await register(name, email, password)
      // register() will navigate to '/'
    } catch (err: any) {
      setError(err.message || 'Registration failed')
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white dark:bg-gray-800 p-6 rounded shadow"
      >
        <h2 className="text-2xl mb-4">Register</h2>

        {error && (
          <div className="mb-4 text-red-600">
            {error}
          </div>
        )}

        <label className="block mb-2">
          Name
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            disabled={loading}
            className="w-full mt-1 p-2 border rounded dark:bg-gray-700"
            required
          />
        </label>

        <label className="block mb-2">
          Email
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            disabled={loading}
            className="w-full mt-1 p-2 border rounded dark:bg-gray-700"
            required
          />
        </label>

        <label className="block mb-4">
          Password
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            disabled={loading}
            className="w-full mt-1 p-2 border rounded dark:bg-gray-700"
            required
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded text-white ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-primary-dark'
          }`}
        >
          {loading ? 'Registering…' : 'Register'}
        </button>
      </form>
    </div>
  )
}

export default RegisterPage
