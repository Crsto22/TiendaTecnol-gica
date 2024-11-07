import { useEffect, useState } from 'react';
import { atom, useAtom } from 'jotai';
import products from '../data/products';

const WISHLIST_STORAGE_KEY = 'wishlist_ids';

const wishlistAtom = atom(
  typeof window !== 'undefined' 
    ? JSON.parse(localStorage.getItem(WISHLIST_STORAGE_KEY) || '[]')
    : []
);

const useWishlist = () => {
  const [wishlistIds, setWishlistIds] = useAtom(wishlistAtom);
  const [isInitialized, setIsInitialized] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [alerts, setAlerts] = useState([]);

  // Efecto para cargar datos iniciales
  useEffect(() => {
    try {
      const savedIds = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (savedIds) {
        const parsedIds = JSON.parse(savedIds);
        setWishlistIds(parsedIds);
      }
    } catch (error) {
      console.error('Error al cargar de localStorage:', error);
    }
    setIsInitialized(true);
  }, []);

  // Efecto para guardar en localStorage
  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistIds));
        console.log('Wishlist guardada:', wishlistIds);
      } catch (error) {
        console.error('Error al guardar en localStorage:', error);
      }
    }
  }, [wishlistIds, isInitialized]);

  

  // Obtener productos completos basados en los IDs guardados
  const wishlistItems = wishlistIds.map(id => 
    products.find(product => product.id === id)
  ).filter(Boolean);


  

  const isInWishlist = (productId) => wishlistIds.includes(productId);

  const closeModal = () => {
    setModalOpen(false);
    setCurrentProduct(null);
  };



  
  const showAlert = (message, type) => {
    const newAlert = {
      id: Date.now(), // Usamos timestamp como ID único
      message,
      type
    };
    
    setAlerts(prev => [...prev, newAlert]);
    
    // Eliminar la alerta después de 3 segundos
    setTimeout(() => {
      setAlerts(prev => prev.filter(alert => alert.id !== newAlert.id));
    }, 2500);
  };

  const addToWishlist = (product) => {
    if (!product?.id) {
      console.error('Producto inválido:', product);
      return;
    }
    
    setWishlistIds(prev => {
      if (!prev.includes(product.id)) {
        setModalOpen(true);
        setCurrentProduct(product);
        showAlert('¡Producto añadido a tu lista de deseos!', 'success');
        return [...prev, product.id];
      }
      return prev;
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlistIds(prev => {
      showAlert('Producto eliminado de tu lista de deseos', 'error');
      return prev.filter(id => id !== productId);
    });
  };

  // ... resto de tus funciones ...

  return {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    modalOpen,
    closeModal,
    currentProduct,
    alerts
  };
};

export default useWishlist;