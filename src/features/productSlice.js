import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    products: [],
    status: "idle",
    error: null
}
// products secction
export const getProducts = createAsyncThunk('products', async() => {
    const response = await axios.get('http://localhost:3000/fetch/products')
    return response.data
})
const productSlice = createSlice({
    name: 'PRODUCTS',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getProducts.pending, (state) => {
            state.status = "loading"
        })
        .addCase(getProducts.fulfilled, (state,action) => {
            state.status = "success"
            state.products = action.payload
            state.error = null;
        })
        .addCase(getProducts.rejected, (state, action) => {
            state.status = "failed",
            state.error = action.error.message
        })
    }
})

export default productSlice.reducer