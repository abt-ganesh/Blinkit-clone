import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Product } from '@/interfaces/product'

export type CartItem = Product & { qty: number }

type CartState = {
  items: CartItem[]
  status: 'idle' | 'loading' | 'error'
}

const initialState: CartState = {
  items: [],
  status: 'idle',
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    hydrateCart(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload
      state.status = 'idle'
    },

    clearCart(state) {
      state.items = []
    },

    addToCart(state, action: PayloadAction<Product>) {
      const item = state.items.find(i => i.id === action.payload.id)
      if (item) item.qty += 1
      else state.items.push({ ...action.payload, qty: 1 })
    },

    decrement(state, action: PayloadAction<number>) {
      const item = state.items.find(i => i.id === action.payload)
      if (!item) return

      if (item.qty === 1) {
        state.items = state.items.filter(i => i.id !== action.payload)
      } else {
        item.qty -= 1
      }
    },
  },
})

export const {
  hydrateCart,
  clearCart,
  addToCart,
  decrement,
} = cartSlice.actions

export default cartSlice.reducer
