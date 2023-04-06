import { createSlice } from "@reduxjs/toolkit";


interface LoginState {
    login: boolean
    token: string,
    expireAt: string,
}

const initialState: LoginState = {
    login: false,
    token: "",
    expireAt: "",
}

const loginSlice = createSlice({
    name: "login",
    initialState: initialState,
    reducers: {
        addLoginInfo: (state, action) => {
            state.login = action.payload.login;
            state.token = action.payload.token;
            state.expireAt = action.payload.expireAt;
        },
        removeLoginInfo: (state) => {
            state.login = false;
            state.token = "";
            state.expireAt = "";
        }
    },
});


export const { addLoginInfo, removeLoginInfo } = loginSlice.actions;
export default loginSlice;