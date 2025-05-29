import { configureStore } from '@reduxjs/toolkit'
import productsReducer  from './slice/productSlice'
import cartReducer from './slice/cart'
import favouriteReducer from './slice/favourite'

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    favourite: favouriteReducer,
  },
})
export default store;