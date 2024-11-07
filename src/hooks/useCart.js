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
  const [showStockLimitAlert, setShowStockLimitAlert] = useState(false);

  // Effect to load initial data
  useEffect(() => {
    try {
      const savedItems = localStorage.getItem(CART_STORAGE_KEY);
      if (savedItems) {
        const parsedItems = JSON.parse(savedItems);
        setCartItems(parsedItems);
      }
    } catch (error) {
      alert('Error loading from localStorage:', error);
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
        alert('Error saving to localStorage:', error);
      }
    }
  }, [cartItems, isInitialized]);

  // Function to add items to cart with quantity
  const handleAddToCart = (product, quantity = 1) => {
    let stockLimitReached = false;
  
    setCartItems((prevCartItems) => {
      const existingItem = prevCartItems.find((item) => item.id === product.id);
  
      if (existingItem) {
        // Verificar si la cantidad solicitada excede el stock disponible
        const newQuantity = existingItem.quantity + quantity;
        if (newQuantity > product.stock) {
          stockLimitReached = true;
          return prevCartItems; // No cambia el carrito si se excede el stock
        }
        
        // Actualizar la cantidad si está dentro del stock disponible
        return prevCartItems.map((item) =>
          item.id === product.id ? { ...item, quantity: newQuantity } : item
        );
      } else {
        // Validar la cantidad solicitada antes de añadir al carrito
        if (quantity > product.stock) {
          stockLimitReached = true;
          return prevCartItems; // No cambia el carrito si se excede el stock
        }
        // Añadir el producto al carrito con la cantidad especificada si el stock lo permite
        return [...prevCartItems, { ...product, quantity }];
      }
    });
  
    // Actualizar showStockLimitAlert basado en si el stock se excedió
    if (stockLimitReached) {
      setShowStockLimitAlert(true);
      setTimeout(() => setShowStockLimitAlert(false), 3000);
    }
  
    return stockLimitReached;
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

  const handleAddToCart1 = (product, quantity = 1) => {
    let stockLimitReached = false;
  
    setCartItems((prevCartItems) => {
      const existingItem = prevCartItems.find((item) => item.id === product.id);
  
      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        if (newQuantity > product.stock) {
          stockLimitReached = true;
          setShowStockLimitAlert(true);
          setTimeout(() => setShowStockLimitAlert(false), 3000);
          return prevCartItems;
        }
        return prevCartItems.map((item) =>
          item.id === product.id ? { ...item, quantity: newQuantity } : item
        );
      } else if (quantity > product.stock) {
        stockLimitReached = true;
        setShowStockLimitAlert(true);
        setTimeout(() => setShowStockLimitAlert(false), 3000);
        return prevCartItems;
      }
      return [...prevCartItems, { ...product, quantity }];
    });
  
    return stockLimitReached;
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
    showStockLimitAlert,
    handleAddToCart1,
  };
};

export default useCart;
