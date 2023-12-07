import { UserType } from "@/Types"
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface initialStateType {
    value: UserType | null;
}

const initialState: initialStateType = {
    value: null,
}

const authUserSlice = createSlice({
    name: "authUserSlice",
    initialState,
    reducers: {
        setAuthUser: (state, action: PayloadAction<UserType | null>) => {
            state.value = action.payload;
        }
    }
});

export const { setAuthUser } = authUserSlice.actions;
export default authUserSlice.reducer;