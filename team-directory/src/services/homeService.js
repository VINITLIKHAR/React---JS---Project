import axiosInstance from '../api/axiosInstance'

export const getUsers = async () => {
  const res = await axiosInstance.get('/users')
  return res.data
}

export const getUserById = async (id) => {
  const res = await axiosInstance.get(`/users/${id}`)
  return res.data
}