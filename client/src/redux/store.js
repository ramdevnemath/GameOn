import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./slices/userSlice"
import adminReducer from "./slices/adminSlice"
import vendorReducer from "./slices/vendorSlice"

const  store = configureStore({
    reducer: {
        user: userReducer,
        admin: adminReducer,
        vendor: vendorReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
    devTools: true
})

export default store