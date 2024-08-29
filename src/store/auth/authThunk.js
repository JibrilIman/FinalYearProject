import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth, db } from "../../config/firebase";
import {
    addDoc,
    collection,
    getDocs,
    query,
    where,
    doc,
    onSnapshot,
    updateDoc,
} from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { fetchFreshUserDetails } from "./authSlice";

export const RegisterUser =
    (Name, Email, Password, setloading, onSuccess) => async (dispatch) => {
        try {
            setloading(true);
            if (!Name || !Email || !Password) {
                console.log("name email and password are not given");
                return;
            }
            const user = await createUserWithEmailAndPassword(
                auth,
                Email,
                Password
            )
                .then((userCredential) => {
                    return userCredential.user;
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorMessage);
                    // ..
                });
            if (user) {
                let result = await addDoc(collection(db, "users"), {
                    name: Name,
                    email: Email,
                    uid: user.uid,
                    calories: 2000,
                    sugar: 30,
                });
                if (result.id) {
                    toast.success("Successfully Registered...");
                }
            }
            setloading(false);
            window.location.href = "/login";
            onSuccess();
            console.log(user, "user");
        } catch (error) {
            console.log(error.message);
        }
    };

export const SignInUser = createAsyncThunk(
    "auth/signin",
    async (user, { rejectWithValue, dispatch }) => {
        try {
            console.log(user);
            const querySnapshot = await getDocs(
                query(collection(db, "users"), where("uid", "==", user.uid))
            );
            const id = querySnapshot.docs[0].id;
            const data = querySnapshot.docs[0].data();
            console.log({ id, data });
            return { id, ...data };
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.message || "Error signing in");
        }
    }
);
export const SignOutUser = () => async (dispatch) => {
    try {
        const result = localStorage.clear();
        console.log(result);
        window.location.href = "/login";
    } catch (error) {
        console.log(error.message);
    }
};

// Update User Details
export const updateUserDetail = createAsyncThunk(
    "auth/updateUserDetail",
    async (data, { fulfillWithValue, rejectWithValue }) => {
        console.log("data: ", data);
        const { id, sugar, calories } = data;
        try {
            if (sugar !== undefined) {
                await updateDoc(doc(db, "users", id), { sugar });
            } else if (calories !== undefined) {
                await updateDoc(doc(db, "users", id), { calories });
            }
            return fulfillWithValue(sugar !== undefined ? sugar : calories);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Fresh User Details
export const refreshUserDetail = createAsyncThunk(
    "auth/refreshUserDetail",
    async (id, thunkAPI) => {
        try {
            const docRef = doc(db, "users", id);
            onSnapshot(docRef, (doc) => {
                if (doc.exists()) {
                    const userData = {
                        id: doc.id,
                        ...doc.data(),
                    };
                    thunkAPI.dispatch(fetchFreshUserDetails(userData));
                }
            });
        } catch (error) {
            throw error(error.message);
        }
    }
);
