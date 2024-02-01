import { MessageTypes } from "@/Types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface initialStateType {
    messages: MessageTypes[] | null;
}

const initialState: initialStateType = {
    messages: null
}

const lastMessagesSlice = createSlice({
    name: "lastMessagesSlice",
    initialState,
    reducers: {
        setLastMessagesSlice: (state, action: PayloadAction<MessageTypes[] | null>) => {
            state.messages = action.payload;
        }
    }
});

export const { setLastMessagesSlice } = lastMessagesSlice.actions;
export default lastMessagesSlice.reducer;