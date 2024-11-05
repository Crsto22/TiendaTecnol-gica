//hooks/useWishlist.js
import { useEffect, useState } from 'react';
import { atom, useAtom } from 'jotai';
import products from '../data/products';

const WISHLIST_STORAGE_KEY = 'wishlist_ids';

// Inicializamos el átomo con los datos del localStorage
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

  const addToWishlist = (product) => {
    if (!product?.id) {
      console.error('Producto inválido:', product);
      return;
    }
    
    setWishlistIds(prev => {
      if (!prev.includes(product.id)) {
        setModalOpen(true);
        setCurrentProduct(product);
        return [...prev, product.id];
      }
      return prev;
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlistIds(prev => {
      console.log('Removiendo producto:', productId);
      return prev.filter(id => id !== productId);
    });
  };

  const isInWishlist = (productId) => wishlistIds.includes(productId);

  const closeModal = () => {
    setModalOpen(false);
    setCurrentProduct(null);
  };

  return {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    modalOpen,
    closeModal,
    currentProduct,
  };
};

export default useWishlist;