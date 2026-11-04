import axiosInstance from '../api/axiosInstance'

export const getUser = async (params) => {
    const  res = await axiosInstance.get('users')
    return res.data 
}

export const getUser = async () => {
    const res = await axiosInstance.get('/users/${id}')
    return res.data
}