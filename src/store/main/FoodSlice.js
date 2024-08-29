import { createSlice } from "@reduxjs/toolkit";
import {
    getFoodList,
    deleteFoodList,
    getFoodLog,
    deleteFoodLog,
    editFoodList,
} from "./FoodThunk";

const initialState = {
    foodList: [],
    foodLog: [],
    loading: false,
    error: null,
};
const FoodSlice = createSlice({
    name: "foodslice",
    initialState,

    extraReducers: (builder) => {
        builder
            .addCase(getFoodList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getFoodList.fulfilled, (state, action) => {
                state.loading = false;
                state.foodList = action.payload;
            })
            .addCase(getFoodList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deleteFoodList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteFoodList.fulfilled, (state, action) => {
                state.loading = false;
                state.foodList = state.foodList.filter(
                    (food) => food.id !== action.payload
                );
            })
            .addCase(deleteFoodList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // dailyFood Slice cases
            .addCase(getFoodLog.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getFoodLog.fulfilled, (state, action) => {
                state.loading = false;
                state.foodLog = action.payload;
            })
            .addCase(getFoodLog.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deleteFoodLog.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteFoodLog.fulfilled, (state, action) => {
                state.loading = false;
                state.foodLog = state.foodLog.filter(
                    (food) => food.id !== action.payload
                );
            })
            .addCase(deleteFoodLog.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // update food slice
            .addCase(editFoodList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editFoodList.fulfilled, (state, action) => {
                state.loading = false;
                state.foodList = state.foodList.map((food) => {
                    if (food.id === action.payload.id) {
                        return { ...food, ...action.payload };
                    }
                    return food;
                });
            })
            .addCase(editFoodList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});
export default FoodSlice.reducer;
