import { configureStore } from '@reduxjs/toolkit'
import bidsReducer from "./bids/bidsSlice";

export const store = configureStore({
  reducer: {
    bids: bidsReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {bids: BidsState}
export type AppDispatch = typeof store.dispatch