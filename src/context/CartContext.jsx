import React, { createContext, useContext, useReducer, useMemo, useCallback, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const CartContext = createContext();

const initialState = [];

const ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  DECREASE_QUANTITY: 'DECREASE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  SET_CART: 'SET_CART',
};

function cartReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_ITEM: {
      const existing = state.find(item => item.name === action.payload.name);
      if (existing) {
        return state.map(item =>
          item.name === action.payload.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...state, { ...action.payload, quantity: 1 }];
    }
    case ACTIONS.DECREASE_QUANTITY: {
      const existing = state.find(item => item.name === action.payload);
      if (existing.quantity === 1) {
        return state.filter(item => item.name !== action.payload);
      }
      return state.map(item =>
        item.name === action.payload
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    }
    case ACTIONS.REMOVE_ITEM:
      return state.filter(item => item.name !== action.payload);
    case ACTIONS.CLEAR_CART:
      return [];
    case ACTIONS.SET_CART:
      return action.payload;
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [storedCart, setStoredCart] = useLocalStorage('cartItems', initialState);
  
  // Initialize reducer with stored cart
  const [cartItems, dispatch] = useReducer(cartReducer, storedCart);

  // Sync back to local storage
  useEffect(() => {
    setStoredCart(cartItems);
  }, [cartItems, setStoredCart]);

  const addToCart = useCallback((product) => dispatch({ type: ACTIONS.ADD_ITEM, payload: product }), []);
  const decreaseQuantity = useCallback((productName) => dispatch({ type: ACTIONS.DECREASE_QUANTITY, payload: productName }), []);
  const removeFromCart = useCallback((productName) => dispatch({ type: ACTIONS.REMOVE_ITEM, payload: productName }), []);
  const clearCart = useCallback(() => dispatch({ type: ACTIONS.CLEAR_CART }), []);

  // Derived state
  const totalItems = useMemo(() => cartItems.reduce((acc, item) => acc + item.quantity, 0), [cartItems]);
  const cartTotal = useMemo(() => cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0), [cartItems]);
  const tax = useMemo(() => cartTotal * 0.08, [cartTotal]);
  const deliveryFee = 5.00;
  const orderTotal = useMemo(() => cartTotal + tax + deliveryFee, [cartTotal, tax]);

  const value = useMemo(() => ({
    cartItems,
    addToCart,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    totalItems,
    cartTotal,
    tax,
    deliveryFee,
    orderTotal
  }), [cartItems, addToCart, decreaseQuantity, removeFromCart, clearCart, totalItems, cartTotal, tax, deliveryFee, orderTotal]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
