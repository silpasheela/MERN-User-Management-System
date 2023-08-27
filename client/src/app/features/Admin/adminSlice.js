import axios from "axios";
import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
axios.defaults.withCredentials = true;


const initialState = {
    loading: false,
    success: false,
    users: [],
    error: ''
}

//FETCH USER DATA ON ADMIN DASHBOARD

export const getUsers = createAsyncThunk('admin/getUsers',async()=> {
    return await axios.get('http://localhost:4000/admin/dashboard', {withCredentials: true})
    .then(response => response.data)
})


//DELETE USER DATA FROM ADMIN DASHBOARD

export const deleteUsers = createAsyncThunk('admin/deleteUsers',async(id)=> {
    return await axios.delete(`http://localhost:4000/admin/user/${id}`, {withCredentials: true})
    .then(response => response.data)
})


//EDIT USER DATA FROM ADMIN DASHBOARD

export const editUsers = createAsyncThunk('admin/editUsers', async({user,editId})=> {
    console.log("USER", user,editId);
    return await axios.put(`http://localhost:4000/admin/user/${editId}`, {user}, {withCredentials:true})  //IF {USER} IS NOT USED, SERVER WILL NOT GET THE INFO TO BE UPDATED
    .then(response => response.data)
})


//EDIT USER DATA FROM ADMIN DASHBOARD

export const searchUsers = createAsyncThunk('admin/searchUsers', async(text) => {
    console.log(text);
    return await axios.post('http://localhost:4000/admin/user/search', {searchData:text}, {withCredentials:true})
    .then(response => response.data)
})

const admin = createSlice({
    name: 'user',
    initialState,
    extraReducers: builder => {
        builder.addCase(getUsers.pending, state => {
            state.loading = true
        })

        builder.addCase(getUsers.fulfilled, (state,action) => {
            state.loading = false;
            state.success = true;
            state.users = action.payload.users;
        })

        builder.addCase(getUsers.rejected, (state,action) => {
            state.loading = false;
            state.error = action.error.message
        })

        builder.addCase(deleteUsers.pending, state => {
            state.loading = true;
            state.success = false;
        })

        builder.addCase(deleteUsers.fulfilled, (state) => {
            state.loading = false;
            state.success = true;
        })

        builder.addCase(deleteUsers.rejected, (state,action) => {
            state.loading = false;
            state.success = false;
            state.error = action.error.message;
        })

        builder.addCase(editUsers.pending, state => {
            state.loading = true;
            state.success = false;
        })

        builder.addCase(editUsers.fulfilled, state => {
            state.loading = false;
            state.success = true;
        })

        builder.addCase(editUsers.rejected, (state,action) => {
            state.loading = false;
            state.success = false;
            state.error = action.error.message;
        })

        builder.addCase(searchUsers.pending, state => {
            state.loading = true;
            state.success = false
        })

        builder.addCase(searchUsers.fulfilled, (state,action) => {
            state.loading = false;
            state.success = true;
            state.users = action.payload.users;
        })

        builder.addCase(searchUsers.rejected, (state,action)  => {
            state.loading = false;
            state.success = false;
            state.error = action.error.message;
        })
    }
})









export default admin.reducer;