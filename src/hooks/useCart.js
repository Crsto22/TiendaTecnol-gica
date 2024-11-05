import { atom, useAtom } from 'jotai';
import { useState, useEffect } from 'react';

const CART_STORAGE_KEY = 'cart_items';

// Initialize the atom with data from localStorage
const cartAtom = atom(
  typeof window !== 'undefined'
    ? JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || '[]')
    : []
);

const useCart = () => {
  const [cartItems, setCartItems] = useAtom(cartAtom);
  const [isInitialized, setIsInitialized] = useState(false);

  // Effect to load initial data
  useEffect(() => {
    try {
      const savedItems = localStorage.getItem(CART_STORAGE_KEY);
      if (savedItems) {
        const parsedItems = JSON.parse(savedItems);
        setCartItems(parsedItems);
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error);
    }
    setIsInitialized(true);
  }, []);

  // Effect to save to localStorage
  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
        console.log('Cart saved:', cartItems);
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }
    }
  }, [cartItems, isInitialized]);

  // Function to add items to cart with quantity
  const handleAddToCart = (product, quantity = 1) => {
    setCartItems((prevCartItems) => {
      const existingItem = prevCartItems.find((item) => item.id === product.id);
      
      if (existingItem) {
        // Check if adding the quantity exceeds the stock
        const newQuantity = existingItem.quantity + quantity;
        if (newQuantity > product.stock) {
          console.warn('Cannot add more items than available in stock');
          return prevCartItems;
        }
        
        // If the product is already in the cart, update the quantity
        return prevCartItems.map((item) =>
          item.id === product.id ? { ...item, quantity: newQuantity } : item
        );
      } else {
        // Validate quantity against stock before adding
        if (quantity > product.stock) {
          console.warn('Cannot add more items than available in stock');
          return prevCartItems;
        }
        // If the product is not in the cart, add it with the specified quantity
        return [...prevCartItems, { ...product, quantity }];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  // Update quantity of an item in cart
  const updateQuantity = (productId, quantity) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === productId) {
          // Ensure the new quantity doesn't exceed stock
          const product = item;
          const newQuantity = Math.min(Math.max(1, quantity), product.stock);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  // Check if a product is in the cart
  const isInCart = (productId) => cartItems.some((item) => item.id === productId);

  // Get quantity of a specific item in cart
  const getItemQuantity = (productId) => {
    const item = cartItems.find((item) => item.id === productId);
    return item ? item.quantity : 0;
  };

  // Get total number of items in cart
  const getTotalItems = () => 
    cartItems.reduce((total, item) => total + item.quantity, 0);

  // Get total price of all items in cart
  const getTotalPrice = () => 
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  // Clear all items from cart
  const clearCart = () => {
    setCartItems([]);
  };

  return {
    cartItems,
    handleAddToCart,
    removeFromCart,
    updateQuantity,
    isInCart,
    getItemQuantity,
    getTotalItems,
    getTotalPrice,
    clearCart,
  };
};

export default useCart;