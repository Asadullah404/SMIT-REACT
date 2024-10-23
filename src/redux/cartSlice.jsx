import { createSlice } from '@reduxjs/toolkit';

// Load the cart from localStorage or initialize with an empty array
const initialState = JSON.parse(localStorage.getItem('cart')) ?? [];

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            state.push(action.payload);
            localStorage.setItem('cart', JSON.stringify(state)); // Update localStorage
        },
        deleteFromCart(state, action) {
            const updatedCart = state.filter(item => item.id !== action.payload.id);
            localStorage.setItem('cart', JSON.stringify(updatedCart)); // Update localStorage
            return updatedCart;
        },
        incrementQuantity(state, action) {
            const item = state.find(item => item.id === action.payload);
            if (item) {
                item.quantity++;
                localStorage.setItem('cart', JSON.stringify(state)); // Update localStorage
            }
        },
        decrementQuantity(state, action) {
            const item = state.find(item => item.id === action.payload);
            if (item && item.quantity > 1) {
                item.quantity--;
                localStorage.setItem('cart', JSON.stringify(state)); // Update localStorage
            }
        },
        clearCart() {
            localStorage.removeItem('cart'); // Clear localStorage
            return []; // Reset cart state to an empty array
        },
    },
});

// Export actions for use in components
export const { 
    addToCart, 
    deleteFromCart, 
    incrementQuantity, 
    decrementQuantity, 
    clearCart 
} = cartSlice.actions;

export default cartSlice.reducer;
