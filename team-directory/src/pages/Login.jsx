import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAuth } from '../contexts/AuthContext'

const Login = () => {
  const [name, setName] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim()) return toast.error('Please enter your name')
    login(name)
    toast.success('Welcome!')
    navigate('/')
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-10 max-w-sm space-y-4">
      <h1 className="text-2xl font-bold text-indigo-600">Login</h1>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name"
        className="w-full rounded border p-2"
      />
      <button className="w-full rounded bg-indigo-600 py-2 text-white hover:bg-indigo-700">
        Enter
      </button>
    </form>
  )
}

export default Login
 