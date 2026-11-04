import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FaHeart } from 'react-icons/fa'
import { useAuth } from '../contexts/AuthContext'

const Header = () => {
  const { user, logout } = useAuth()
  const count = useSelector((state) => state.favorites.items.length)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="flex items-center justify-between bg-indigo-600 p-4 text-white">
      <Link to="/" className="font-bold">Team Directory</Link>

      {user && (
        <nav className="flex items-center gap-4">
          <span>Hi, {user}</span>
          <Link to="/favorites" className="flex items-center gap-1">
            <FaHeart /> {count}
          </Link>
          <button onClick={handleLogout} className="rounded bg-white px-3 py-1 text-indigo-600">
            Logout
          </button>
        </nav>
      )}
    </header>
  )
}

export default Header