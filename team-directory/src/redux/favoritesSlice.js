import { createSlice } from '@reduxjs/toolkit'

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: { items: [] },
  reducers: {
    toggleFavorite: (state, action) => {
      const user = action.payload
      const exists = state.items.some((u) => u.id === user.id)
      if (exists) {
        state.items = state.items.filter((u) => u.id !== user.id)
      } else {
        state.items.push(user)
      }
    },
  },
})

export const { toggleFavorite } = favoritesSlice.actions
export default favoritesSlice.reducer