import { createSlice } from "@reduxjs/toolkit";
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    totalPrice: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity || 1;
      } else {
        state.cart.push({
          ...action.payload,
          quantity: action.payload.quantity || 1,
        });
        alert(`${action.payload.title} added to Cart`);
      }
    },
    removeFromCart: (state, action) => {
      const { id, decrement } = action.payload;
      const existingItem = state.cart.find((item) => item.id === id);

      if (!existingItem) return;

      if (decrement && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      } else {
        state.cart = state.cart.filter((item) => item.id !== id);
        alert(`${existingItem.title} removed from Cart`);
      }
    },

    clearCart: (state) => {
      state.cart = [];
    },
    calculateTotalPrice: (state) => {
      state.totalPrice = state.cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
  },
});

export const { addToCart, removeFromCart, clearCart, calculateTotalPrice } =
  cartSlice.actions;
export default cartSlice.reducer;
