import { createSlice } from "@reduxjs/toolkit";
import { SignInUser } from "./authThunk";
import { toast } from "react-toastify";

const initialState = {
    user: null,
    refreshUser: null,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        fetchFreshUserDetails: (state, action) => {
            state.refreshUser = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
        // User Details
            .addCase(SignInUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(SignInUser.fulfilled, (state, action) => {
                console.log("Sign in Successfully...", action.payload);
                toast.success("Sign in Successfully...");
                state.loading = false;
                state.user = action.payload;
                window.location.href = "/index";
            })
            .addCase(SignInUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { fetchFreshUserDetails } = authSlice.actions;
export default authSlice.reducer;
