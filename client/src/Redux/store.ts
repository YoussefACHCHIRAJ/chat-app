import { configureStore } from "@reduxjs/toolkit";
import receiverReducer from "./Receiver/receiverSlice";
import authUserSlice from "./AuthUser/authUserSlice";
import lastMessagesSlice from "./lastMessages/lastMessagesSlice";

export const store = configureStore({
  reducer: {
    receiver: receiverReducer,
    authUser: authUserSlice,
    lastMessages: lastMessagesSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
