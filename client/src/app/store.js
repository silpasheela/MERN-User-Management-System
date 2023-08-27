import { configureStore } from "@reduxjs/toolkit";
import authReducer from './features/Auth/authSlice'
import adminReducer from './features/Admin/adminSlice'


const store = configureStore({
    reducer: {
        auth: authReducer,
        admin: adminReducer
    }
})


export default store