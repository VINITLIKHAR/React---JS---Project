import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getUserById } from '../services/homeService'

const UserDetail = () => {
  const { id } = useParams()
  const [user, setUser] = useState(null)

  useEffect(() => {
    getUserById(id).then(setUser)
  }, [id])

  if (!user) return <p>Loading...</p>

  return (
    <div className="mx-auto max-w-xl space-y-2 rounded-xl bg-white p-6 shadow">
      <h1 className="text-2xl font-bold">{user.name}</h1>
      <p>📧 {user.email}</p>
      <p>📞 {user.phone}</p>
      <p>🏢 {user.company.name}</p>
      <p>🌐 {user.website}</p>
      <Link to="/" className="text-indigo-600 underline">← Back</Link>
    </div>
  )
}

export default UserDetail