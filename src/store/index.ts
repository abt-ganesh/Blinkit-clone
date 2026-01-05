import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './slices/cart_slice'
import uiReducer from './slices/ui_slice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    ui: uiReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
