import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    cart: [],
    totalPrice: 0,
    status: "idle",
    error: null
}
export const addToCart = createAsyncThunk('addToCart', async({data}) => {
    const response = await axios.post('http://localhost:3000/cart/addToCart', data, {withCredentials: true})
    return response.data
})
export const getCart = createAsyncThunk('getCart', async() => {
    const response = await axios.get('http://localhost:3000/cart/cartItems', {withCredentials: true})
    return response.data
})
export const deleteFromCart = createAsyncThunk('deleteFromCart', async({productId}) => {
    const response = await axios.put('http://localhost:3000/cart/deleteFromCart', {productId}, {withCredentials: true})
    return response.data
})
const cartSlice = createSlice({
    name: "CART",
    initialState,
    reducers: {
        totalCartPrice: (state) => {
            state.totalPrice = state.cart.reduce((acc,curr) => {
                return acc + curr.quantity * curr.product.price 
            },0)
        }
        
    },
    extraReducers: (builder) => {
        builder
        .addCase(addToCart.pending, (state) => {
            state.status = "loading"
        })
        .addCase(addToCart.fulfilled, (state,action) => {
            state.status = "successful"
            const findProduct = state.cart.find((p) => p.product._id.toString() === action.payload.item.product._id.toString())
           if(findProduct){
                findProduct.quantity++
           }else{
            state.cart.push(action.payload.item)
           }
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
        builder
        .addCase(deleteFromCart.pending, (state) => {
            state.status = "loading"
        })
        .addCase(deleteFromCart.fulfilled, (state,action) => {
            state.status = "successful"
            state.cart = state.cart.filter((product) => product.product._id !== action.payload.item.product)
            
        })
        .addCase(deleteFromCart.rejected, (state, action) => {
            state.status = "failed",
            state.error = action.error.message
        })
    }
})
export const {totalCartPrice} = cartSlice.actions
export default cartSlice.reducer