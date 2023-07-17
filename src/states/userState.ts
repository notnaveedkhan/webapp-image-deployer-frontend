import { createSlice } from "@reduxjs/toolkit";


export interface Role {
    id: number,
    name: string,
    description: string,
    createdAt: string,
    modifiedAt: string
}

interface UserState {
    id: number | null;
    name: string;
    email: string;
    roles: Role[]
}

const initialState: UserState = {
    id: null,
    name: "",
    email: "",
    roles: []
}

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        setUser(state, action) {
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.roles = action.payload.roles;
        },

        removeUser(state) {
            state.id = null;
            state.name = "";
            state.email = "";
            state.roles = [];
        }
    },
})



export const { setUser, removeUser } = userSlice.actions;

export default userSlice;