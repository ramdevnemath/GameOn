import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem('admin') ? JSON.parse(localStorage.getItem('admin')) : null;

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setCredentials:  (state, action) => {
            localStorage.setItem("admin", JSON.stringify(action.payload))
            return action.payload
        },
        dropCredentials: (state) => {
            localStorage.removeItem('admin')
            return null
        }
    }
})

export const { setCredentials, dropCredentials } = adminSlice.actions
export default adminSlice.reducer