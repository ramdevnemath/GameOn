import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem('vendor') ? JSON.parse(localStorage.getItem('vendor')) : null;

const vendorSlice = createSlice({
    name: 'vendor',
    initialState,
    reducers: {
        setCredentials:  (state, action) => {
            localStorage.setItem("vendor", JSON.stringify(action.payload))
            return action.payload
        },
        dropCredentials: (state) => {
            localStorage.removeItem('vendor')
            return null
        }
    }
})

export const { setCredentials, dropCredentials } = vendorSlice.actions
export default vendorSlice.reducer