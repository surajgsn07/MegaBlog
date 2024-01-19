import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";  // Import the authReducer

const store = configureStore({
    reducer: {
        auth: authReducer,
    }
});

export default store;
