
import { useEffect, useState } from 'react'
import { getUsers } from '../services/homeService'
import UserCard from '../components/UserCard'

const Home = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch(() => setError('Could not load users'))
      .finally(() => setLoading(false))
  }, [])

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) return <p>Loading...</p> 
  if (error) return <p className="text-red-500">{error}</p>

  return (
    <div className="mx-auto max-w-xl space-y-3">
      <h1 className="text-3xl font-bold text-indigo-600">People</h1>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name..."
        className="w-full rounded border p-2"
      />
      {filtered.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  )
}

export default Home