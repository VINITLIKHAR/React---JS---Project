import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import toast from 'react-hot-toast'
import { toggleFavorite } from '../redux/favoritesSlice'


const UserCard = ({ user }) => {
    const dispatch = useDispatch()
    const isFav = useSelector((state) =>
        state.favorites.items.some((u) => u.id === user.id)
    )

    const handleFavorite = () => {
        dispatch(toggleFavorite(user))
        toast.success(isFav ? 'Removed from favorites' : 'Added to favorites')
    }

    return (
        <div className="flex items-center justify-between rounded-xl bg-white p-4 shadow">
            <div>
                <Link to={`/user/${user.id}`} className="font-semibold text-indigo-600">
                    {user.name}
                </Link>
                <p className="text-sm text-gray-500">{user.email}</p>
            </div>
            <button onClick={handleFavorite} className="text-2xl text-red-500">
                {isFav ? <FaHeart /> : <FaRegHeart />}
            </button>
        </div>
    )
}

export default UserCard