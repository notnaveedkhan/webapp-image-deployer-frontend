import { createSlice } from "@reduxjs/toolkit";
import { remove } from "react-cookies";

interface State {
    isRegistered: boolean;
    token: string;
    expiresAt: string;
}

const initialState: State = {
    isRegistered: false,
    token: "",
    expiresAt: "",
}


const verifyEmailSlice = createSlice({
    name: "verifyEmail",
    initialState,
    reducers: {

        setVerifyEmail: (state, action) => {
            state.isRegistered = action.payload.isRegistered;
            state.token = action.payload.token;
            state.expiresAt = action.payload.expiresAt;
        },

        removeVerifyEmail: (state) => {
            state.isRegistered = false;
            state.token = "";
            state.expiresAt = "";
        }
    }
});


export const { setVerifyEmail, removeVerifyEmail } = verifyEmailSlice.actions;

export default verifyEmailSlice;