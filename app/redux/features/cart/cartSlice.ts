import { CartItem, ProductResponse } from '@/app/components/models/IProduct';
import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { LocalStorageKeys } from '@/app/components/constants/LocalStorageKeys';
import { RootState } from '../../store';

export interface CartState {
  cartItems: CartItem[];
}

// Check if localStorage is available
const isLocalStorageAvailable = typeof localStorage !== 'undefined';

// Try to load cart items from local storage or use an empty array
const storedCartItems = isLocalStorageAvailable
  ? localStorage.getItem(LocalStorageKeys.CartItems)
  : null;

// Parse the stored cart items or use an empty array if no items were stored previously in local storage
const initialCartItems: CartItem[] = storedCartItems
  ? JSON.parse(storedCartItems)
  : [];

// Define the initial state using the cartState interface
const initialState: CartState = { cartItems: initialCartItems };

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<ProductResponse>) => {

      // check to see if the item added already exist in the cart
      const selectedItem = state.cartItems.find(
        (cartItem) => cartItem.product.id === action.payload.id
      );
      // if selected item already exist...
      if (selectedItem) {
        // increment the item quantity
        selectedItem.qty++;
      } else {
        state.cartItems.push({
          product: action.payload,
          qty: 1,
        });
      }

      // Save cart items to local storage after each modification
      localStorage.setItem(
        LocalStorageKeys.CartItems,
        JSON.stringify(state.cartItems)
      );
    },

    decrement: (state, action: PayloadAction<ProductResponse>) => {
      const selectedItem = state.cartItems.find(
        (el) => el.product.id === action.payload.id
      );

      // If the item exist in the cart...
      if (selectedItem) {
        // decrement the item quantity
        selectedItem.qty--;

        // If the item quantity is 0...
        if (selectedItem.qty === 0) {
          // Remove the item from the cart
          state.cartItems = state.cartItems.filter(
            (el) => el.product.id !== action.payload.id
          );
        }
      }
      // Save cart items to local storage after each modification
      localStorage.setItem(
        LocalStorageKeys.CartItems,
        JSON.stringify(state.cartItems)
      );
    },

    removeProduct: (state, action: PayloadAction<ProductResponse>) => {
      state.cartItems = state.cartItems.filter(
        (el) => el.product.id !== action.payload.id
      );
      // Save cart items to local storage after each modification
      localStorage.setItem(
        LocalStorageKeys.CartItems,
        JSON.stringify(state.cartItems)
      );
    },
    removeProducts: (state) => {
      // Clear all items from the cart
      state.cartItems = [];

      // Save cart items to local storage after clearing the cart
      localStorage.setItem(LocalStorageKeys.CartItems, JSON.stringify([]));
    },
  },
});

//state
const cartItems = (state: RootState) => state.cart.cartItems;

// Selector which returns the total number of items in the cart
export const totalCartItemSelector = createSelector([cartItems], (cartItems) =>
  cartItems.reduce((total: number, curr: CartItem) => (total += curr.qty), 0)
);

// Selector which returns the total price of all items in the cart
export const totalPriceSelector = createSelector([cartItems], (cartItems) =>
  cartItems.reduce(
    (total: number, curr: CartItem) => (total += curr.qty * curr.product.amount),
    0
  )
);

// Selector that takes a product id as an arguement and returns the qty of the cart item with this specific product in our cart
export const productQtyInCartSelector = createSelector(
  [cartItems, (cartItems, productId: string) => productId],
  (cartItems, productId) =>
    cartItems.find((el) => el.product.id === productId)?.qty
);

// Action creators are generated for each case reducer function
export const { increment, decrement, removeProduct, removeProducts } =
  cartSlice.actions;

export default cartSlice.reducer;
