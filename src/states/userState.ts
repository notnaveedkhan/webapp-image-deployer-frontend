import { createSlice } from "@reduxjs/toolkit";

interface UserState {
    userId: number | null,
    name: string,
    email: string,
    role: "user" | "admin" | null
}

const initialState: UserState = {
    userId: null,
    name: "",
    email: "",
    role: null
}

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {

    }
})



export default userSlice;