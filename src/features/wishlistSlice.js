import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
    wishlist: [],
    status: "idle",
    error: null
}
export const addToWishlist = createAsyncThunk('addToWishlist', async({product}) => {
    const response = await axios.post('http://localhost:3000/wishlist/addToWishlist', {product}, {withCredentials: true})
    return response.data
})
export const getWishlist = createAsyncThunk('getWishlist', async() => {
    const response = await axios.get('http://localhost:3000/wishlist/getWishlist', {withCredentials: true})
    return response.data
})
const wishlistSlice = createSlice({
    name: "WISHLIST",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(addToWishlist.pending, (state) => {
            state.status = "loading"
        })
        .addCase(addToWishlist.fulfilled, (state, action) => {
            state.status = "success";
            
        })
        .addCase(addToWishlist.rejected, (state,action) => {
            state.status = "failed"
            state.error = action.error.message
        })
        builder
        .addCase(getWishlist.pending, (state) => {
            state.status = "loading"
        })
        .addCase(getWishlist.fulfilled, (state, action) => {
            state.status = "success";
            if(action.payload.items){
                state.wishlist = action.payload.items
            }else{
                state.wishlist = [];
            }
        })
        .addCase(getWishlist.rejected, (state,action) => {
            state.status = "failed"
            state.error = action.error.message
        })
    }
})
export default wishlistSlice.reducer