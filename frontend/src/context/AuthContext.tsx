// src/context/AuthContext.tsx
import React, {
    createContext,
    useState,
    useEffect,
    ReactNode,
  } from 'react'
  import { useNavigate } from 'react-router-dom'
  
  interface User { id: number; name: string; email: string }
  interface AuthContextType {
    user: User | null
    token: string | null
    login: (email: string, password: string) => Promise<void>
    register: (name: string, email: string, password: string) => Promise<void>
    logout: () => void
  }
  
  export const AuthContext = createContext<AuthContextType>({
    user: null,
    token: null,
    login: async () => {},
    register: async () => {},
    logout: () => {},
  })
  
  export const AuthProvider: React.FC<{ children: ReactNode }> = ({
    children,
  }) => {
    const [user, setUser] = useState<User | null>(null)
    const [token, setToken] = useState<string | null>(null)
    const navigate = useNavigate()
  
    //  On mount: load from localStorage
    useEffect(() => {
      const storedToken = localStorage.getItem('token')
      const storedUser = localStorage.getItem('user')
      if (storedToken && storedUser) {
        setToken(storedToken)
        setUser(JSON.parse(storedUser))
      }
    }, [])
  
    //  Whenever token/user change: persist to localStorage
    useEffect(() => {
      if (token) {
        localStorage.setItem('token', token)
      } else {
        localStorage.removeItem('token')
      }
  
      if (user) {
        localStorage.setItem('user', JSON.stringify(user))
      } else {
        localStorage.removeItem('user')
      }
    }, [token, user])
  
    const login = async (email: string, password: string) => {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.message || 'Login failed')
      }
      const { user: u, token: t } = await res.json()
      setUser(u)
      setToken(t)
      navigate('/')
    }
  
    const register = async (
      name: string,
      email: string,
      password: string
    ) => {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      })
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.message || 'Registration failed')
      }
      const { user: u, token: t } = await res.json()
      setUser(u)
      setToken(t)
      navigate('/')
    }
  
    const logout = () => {
      setUser(null)
      setToken(null)
      navigate('/login')
    }
  
    return (
      <AuthContext.Provider
        value={{ user, token, login, register, logout }}
      >
        {children}
      </AuthContext.Provider>
    )
  }
  