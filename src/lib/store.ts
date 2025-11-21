import { configureStore } from '@reduxjs/toolkit'
import  CounterSlice  from './CounterSlice'
import ordersReducer from "./ordersSlice";

export const store = configureStore({
  reducer: {

    counterRed:CounterSlice,
    ordersRed: ordersReducer,

  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch