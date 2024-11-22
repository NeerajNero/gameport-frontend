import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    cart: [],
    status: "idle",
    error: null
}
export const addToCart = createAsyncThunk('addToCart', async({data}) => {
    const response = await axios.post('http://localhost:3000/cart/addToCart', data, {withCredentials: true})
    return response.data
})
export const getCart = createAsyncThunk('getCart', async() => {
    const response = await axios.get('http://localhost:3000/cart/cartItems', {withCredentials: true})
    console.log(response.data)
    return response.data
})
const cartSlice = createSlice({
    name: "CART",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(addToCart.pending, (state) => {
            state.status = "loading"
        })
        .addCase(addToCart.fulfilled, (state,action) => {
            state.status = "successful",
            state.cart = action.payload.cart
        })
        .addCase(addToCart.rejected, (state, action) => {
            state.status = "failed",
            state.error = action.error.message
        })
        builder
        .addCase(getCart.pending, (state) => {
            state.status = "loading"
        })
        .addCase(getCart.fulfilled, (state,action) => {
            state.status = "successful",
            state.cart = action.payload.cartItems
        })
        .addCase(getCart.rejected, (state, action) => {
            state.status = "failed",
            state.error = action.error.message
        })
    }
})

export default cartSlice.reducer