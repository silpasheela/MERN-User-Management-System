import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    authState: localStorage.getItem('user') ? localStorage.getItem('user'):null
}

const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuth: (state) => {
            state.authState = JSON.parse(localStorage.getItem('user'))
        },
        removeAuth: (state) => {
            state.authState = localStorage.removeItem('user');
        }
    }
})

export default authSlice.reducer;
export const {setAuth,removeAuth} = authSlice.actions;



