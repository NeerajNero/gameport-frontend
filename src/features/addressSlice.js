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
export const deleteAddress = createAsyncThunk('deleteAddress', async({addressId}) => {
    const response = await axios.put('http://localhost:3000/address/deleteAddress', {addressId}, {withCredentials: true})
    return response.data
})
export const addAddress = createAsyncThunk('addAddress', async({address}) => {
    const response = await axios.post("http://localhost:3000/address/addAddress", {address}, {withCredentials: true})
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
        builder
        .addCase(deleteAddress.pending, (state) => {
            state.status = "loading"
        })
        .addCase(deleteAddress.fulfilled, (state,action) => {
            state.status = "success";
            state.address = action.payload.addresses
        })
        .addCase(deleteAddress.rejected, (state,action) => {
            state.status = "failed";
            state.error = action.error.message
        })
        builder
        .addCase(addAddress.pending, (state) => {
            state.status = "loading"
        })
        .addCase(addAddress.fulfilled, (state,action) => {
            state.status = "success";
            state.address.push(action.payload.address)
        })
        .addCase(addAddress.rejected, (state,action) => {
            state.status = "failed";
            state.error = action.error.message
        })
    }
})

export default addressSlice.reducer