import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    doc,
    setDoc,
    collection,
    serverTimestamp,
    deleteDoc,
    query,
    onSnapshot,
    addDoc,
    updateDoc,
    orderBy,
    where,
    Timestamp,
} from "firebase/firestore";
import { db } from "../../config/firebase";

export const addFoodList = createAsyncThunk(
    "user/addfoodList",
    async ({ formData, uid }, { rejectWithValue, dispatch }) => {
        console.log(uid, formData, "uiddAdd");
        try {
            const propertiesCollectionRef = collection(db, "foodList");
            const documentRef = doc(propertiesCollectionRef);

            await setDoc(documentRef, {
                calories: formData.calories,
                carbs: formData.carbs,
                fats: formData.fats,
                name: formData.name,
                protein: formData.protein,
                sugar: formData.sugar,
                createdAt: serverTimestamp(),
                addedByUid: uid,
            });
            console.log(uid, "uiddAdd");

            return { ...formData, id: documentRef.id }; // Return the added food data with its ID
        } catch (error) {
            console.error(error);
            return rejectWithValue(
                error.message || "Error processing form data"
            );
        }
    }
);

export const getFoodList = createAsyncThunk(
    "food/getFoodList",
    (uid, thunkAPI) => {
        console.log(uid, "uidthunk");
        try {
            const foodQuery = query(
                collection(db, "foodList"),
                where("addedByUid", "==", uid),
                orderBy("createdAt", "desc")
            );
            onSnapshot(foodQuery, (querySnapshot) => {
                const foodList = [];
                querySnapshot?.forEach((doc) => {
                    foodList.push({ id: doc.id, ...doc.data() });
                });
                console.log(foodList, "foodlist", uid, "uiddd");
                return thunkAPI.dispatch(getFoodList.fulfilled(foodList));
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
);

export const deleteFoodList = createAsyncThunk(
    "user/deleteFoodList",
    async (foodId, { rejectWithValue }) => {
        try {
            const foodDocRef = doc(db, "foodList", foodId);
            await deleteDoc(foodDocRef);

            return foodId;
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.message || "Error deleting food");
        }
    }
);

// daily food --thunk------------------------------------

export const getFoodLog = createAsyncThunk(
    "food/getFoodLog",
    ({ filter, uid }, thunkAPI) => {
        console.log("dataof get thunk", filter, uid);
        const dateValue = new Date();
        dateValue.setHours(0, 0, 0, 0); // Set hours to 0 to represent the beginning of the day
        const startOfTodayTimestamp = Timestamp.fromDate(dateValue);
        let operator = filter === "today" ? ">=" : "<";
        try {
            const foodQuery = query(
                collection(db, "foodLog"),
                where("addedByUid", "==", uid),
                where("createdAt", operator, startOfTodayTimestamp)
            );
            onSnapshot(foodQuery, (querySnapshot) => {
                const dailyFoodlist = [];
                querySnapshot?.forEach((doc) => {
                    dailyFoodlist.push({ id: doc.id, ...doc.data() });
                });
                return thunkAPI.dispatch(getFoodLog.fulfilled(dailyFoodlist));
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
);

export const deleteFoodLog = createAsyncThunk(
    "user/deleteFoodLog ",
    async (foodId, { rejectWithValue }) => {
        try {
            const foodDocRef = doc(db, "foodLog", foodId);
            await deleteDoc(foodDocRef);

            return foodId;
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.message || "Error deleting food");
        }
    }
);

export const addFoodLog = createAsyncThunk(
    "user/addFoodLog",
    async ({ selectedFoods, uid }, { rejectWithValue }) => {
        console.log(selectedFoods, uid, "selectedFood123");
        try {
            const foodLogCollection = collection(db, "foodLog");

            const { id } = selectedFoods;

            await addDoc(foodLogCollection, {
                foodId: id,
                createdAt: serverTimestamp(),
                addedByUid: uid,
            });

            return selectedFoods;
        } catch (error) {
            console.error("Error adding selected foods:", error);
            throw error;
        }
    }
);

// UpdateFood ///////////////

export const editFoodList = createAsyncThunk(
    "user/editFoodList",
    async (data, { rejectWithValue }) => {
        const docId = data.foodId;
        const formData = data.formData;
        try {
            await updateDoc(doc(db, "foodList", docId), formData);

            return formData;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
