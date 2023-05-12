import { createSlice } from "@reduxjs/toolkit";

interface Topics {
    topics: {
        id: number,
        name: string,
        createdAt: string
    }[]
}
const initialState: Topics = {
    topics: []
}

const topicSlice = createSlice({
    name: "topics",
    initialState: initialState,
    reducers: {
        loadTopics: (state, actions) => {
            state.topics = actions.payload.topics;
        }
    }
})


export const { loadTopics } = topicSlice.actions;
export default topicSlice;