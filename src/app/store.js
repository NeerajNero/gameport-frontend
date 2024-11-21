import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../features/userSlice'
import productReducer from '../features/productSlice'
import cartReducer from '../features/cartSlice'

export const store = configureStore({
    reducer : {
        user: userReducer,
        products: productReducer,
        cart: cartReducer
    }
})