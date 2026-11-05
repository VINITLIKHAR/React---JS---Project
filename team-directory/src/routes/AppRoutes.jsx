import { Routes, Route, Navigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Home from '../pages/Home'
import Login from '../pages/Login'
import UserDetail from '../pages/UserDetail'
import Favorites from '../pages/Favorites'
import { useAuth } from '../contexts/AuthContext'

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth()
  return user ? children : <Navigate to="/login" />
}

const AppRoutes = () => {
  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <Header />
      <main className="flex-1 p-6">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/user/:id" element={<ProtectedRoute><UserDetail /></ProtectedRoute>} />
          <Route path="/favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
          <Route path="*" element={<h1 className="text-2xl font-bold">404 - Page Not Found</h1>} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default AppRoutes