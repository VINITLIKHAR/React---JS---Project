import { useSelector } from 'react-redux'
import UserCard from '../components/UserCard'

const Favorites = () => {
  const favorites = useSelector((state) => state.favorites.items)

  return (
    <div className="mx-auto max-w-xl space-y-3">
      <h1 className="text-3xl font-bold text-indigo-600">Favorites</h1>
      {favorites.length === 0 && <p>No favorites yet.</p>}
      {favorites.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  )
}

export default Favorites