
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../types/product";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add a product or increase its quantity if already in the cart.
    addToCart: (state, action: PayloadAction<Product>) => {
      const product = action.payload;

      // Do not add products that are out of stock.
      if (product.availability === "Out of Stock") {
        return;
      }

      const existingItem = state.items.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          product,
          quantity: 1,
        });
      }
    },

    // Increase the quantity of a cart item.
    increaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find(
        (item) => item.product.id === action.payload
      );

      if (item) {
        item.quantity += 1;
      }
    },

    // Decrease the quantity; remove the item when it reaches zero.
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find(
        (item) => item.product.id === action.payload
      );

      if (item) {
        item.quantity -= 1;
      }

      state.items = state.items.filter(
        (item) => item.quantity > 0
      );
    },

    // Remove a product completely from the cart.
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.product.id !== action.payload
      );
    },

    // Empty the entire cart.
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;