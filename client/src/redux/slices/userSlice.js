import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCredentials:  (state, action) => {
            localStorage.setItem("user", JSON.stringify(action.payload))
            return action.payload
        },
        dropCredentials: (state) => {
            localStorage.removeItem('user')
            return null
        }
    }
})

export const { setCredentials, dropCredentials } = userSlice.actions
export default userSlice.reducer