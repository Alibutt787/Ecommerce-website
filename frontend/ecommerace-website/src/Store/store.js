import { configureStore } from '@reduxjs/toolkit'
import productReducer from './Product/ProductSlice'
import UserReducer from './User/UserSlice'

export const store = configureStore({
  reducer: {
    product:productReducer,
    user:UserReducer
  },
})