import { UserType } from "@/Types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface initialStateType {
    value: UserType | null
}

const initialState: initialStateType = {
    value: null
}

const receiverSlice = createSlice({
    name: "receiver",
    initialState,
    reducers: {
        setReceiver: (state, action: PayloadAction<UserType | null>) => {
            state.value = action.payload;
        }
    }
});

export const { setReceiver } = receiverSlice.actions;

export default receiverSlice.reducer;