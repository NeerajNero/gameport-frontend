import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    user: [],
    status: "idle",
    error: null
}
// user Section
export const userRegistration = createAsyncThunk('registration', async({user}) => {
    const response = await axios.post('http://localhost:3000/api/register', user)
    console.log(response.data)
    return response.data
})
export const userLogin = createAsyncThunk('login', async({user}) => {
    const response = await axios.post('http://localhost:3000/api/login', user, {withCredentials: true})
    console.log(response.data)
    return response.data
})
export const getUser = createAsyncThunk('getUser', async() => {
    const response = await axios.get('http://localhost:3000/api/getUser', {withCredentials: true})
    console.log(response.data)
    return response.data
})
const userSlice = createSlice({
    name: "USER",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(userRegistration.pending, (state) => {
            state.status = "loading"
        })
        .addCase(userRegistration.fulfilled, (state) => {
            state.status = "success"
            state.error = null;
        })
        .addCase(userRegistration.rejected, (state, action) => {
            state.status = "failed",
            state.error = action.error.message
        })
        builder
        .addCase(userLogin.pending, (state) => {
            state.status = "loading"
        })
        .addCase(userLogin.fulfilled, (state,action) => {
            state.status = "success"
            state.user = action.payload
            state.error = null;
        })
        .addCase(userLogin.rejected, (state, action) => {
            state.status = "failed",
            state.error = action.error.message
        })
        builder
        .addCase(getUser.pending, (state) => {
            state.status = "loading"
        })
        .addCase(getUser.fulfilled, (state,action) => {
            state.status = "success"
            state.user = action.payload
            state.error = null;
        })
        .addCase(getUser.rejected, (state, action) => {
            state.status = "failed",
            state.error = action.error.message
        })
    }
})
export default userSlice.reducer