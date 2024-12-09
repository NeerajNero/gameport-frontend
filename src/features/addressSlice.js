import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    address: [],
    status: "idle",
    error: null
}

export const getAddress = createAsyncThunk('getAddress', async() => {
    const response = await axios.get('http://localhost:3000/address/address', {withCredentials: true});
    return response.data
})

const addressSlice = createSlice({
    name: "ADDRESS",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getAddress.pending, (state) => {
            state.status = "loading"
        })
        .addCase(getAddress.fulfilled, (state,action) => {
            state.status = "success";
            state.address = action.payload.address.addresses
        })
        .addCase(getAddress.rejected, (state,action) => {
            state.status = "failed";
            state.error = action.error.message
        })
    }
})

export default addressSlice.reducer