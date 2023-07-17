import { createSlice } from "@reduxjs/toolkit";


export interface LoginState {
    login: boolean;
    token: string;
    expiresAt: string;
}

const initialState: LoginState = {
    login: false,
    token: "",
    expiresAt: "",
}

const loginSlice = createSlice({
    name: "login",
    initialState: initialState,
    reducers: {
        addLoginInfo: (state, action) => {
            state.login = action.payload.login;
            state.token = action.payload.token;
            state.expiresAt = action.payload.expiresAt;
        },
        removeLoginInfo: (state) => {
            state.login = false;
            state.token = "";
            state.expiresAt = "";
        }
    },
});


export const { addLoginInfo, removeLoginInfo } = loginSlice.actions;
export default loginSlice;