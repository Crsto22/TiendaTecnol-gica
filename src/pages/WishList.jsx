// components/WishList.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingCart, ChevronDown, Tag, Box } from 'lucide-react';
import useWishlist from '../hooks/useWishlist';
import { motion, AnimatePresence } from 'framer-motion';
import useCart from '../hooks/useCart';

const WishList = ({ onAddToCart }) => {
  const { 
    wishlistItems = [], 
    showFeatures = {}, 
    toggleFeatures, 
    removeFromWishlist 
  } = useWishlist();
  

 

  const handleRemoveFromWishlist = (productId) => {
    removeFromWishlist(productId);
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };


  const { handleAddToCart, isInCart, showStockLimitAlert,stockLimitReached } = useCart();

  const [notifications, setNotifications] = useState([]);
  
  const handleAddToCartAndNotify = (product) => {

    const stockLimitReached = handleAddToCart(product);
    const newNotification = {
      type: stockLimitReached ? 'stock-limit' : 'added',
      id: Date.now(),
    };
  
    setNotifications((prevNotifications) => [...prevNotifications, newNotification]);
  
    const timeoutId = setTimeout(() => {
      setNotifications((prevNotifications) =>
        prevNotifications.filter((n) => n.id !== newNotification.id)
      );
    }, 2500);
  
    return () => clearTimeout(timeoutId);
  };
  
  return (
    <div className="min-h-screen bg-base-200 p-4 mt-28">
      {/* Header Section */}
      <motion.div 
        className="max-w-4xl mx-auto mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between bg-base-100 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-red-600" fill="currentColor" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Lista de Deseos</h1>
              <p className="text-base-content/70">
                {wishlistItems.length} {wishlistItems.length === 1 ? 'producto guardado' : 'productos guardados'}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
      <AnimatePresence>
      {notifications.map((notification) => (
        <motion.div
          key={notification.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className={`bg-${
            notification.type === 'stock-limit' ? 'red-500 ' : 'green-600 '
          }  px-6 py-4 rounded-xl shadow-xl fixed top-32 right-4  flex items-center space-x-3`}
        >
          <div
            className={`p-3 rounded-full ${
              notification.type === 'stock-limit'
                ? 'bg-red-600 0'
                : 'bg-green-700 '
            }`}
          >
            {notification.type === 'stock-limit' ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
          <div>
            <h3 className="text-lg text-white font-semibold">
              {notification.type === 'stock-limit'
                ? 'No se pueden agregar más productos'
                : 'Articulo agregado'}
            </h3>
            <p className="text-sm text-white">
              {notification.type === 'stock-limit'
                ? 'La cantidad solicitada excede el stock disponible.'
                : 'El artículo ha sido agregado a su carrito.'}
            </p>
          </div>
        </motion.div>
      ))}
    </AnimatePresence>
      {/* Products List */}
      <div className="max-w-4xl mx-auto space-y-4">
        <AnimatePresence>
          {wishlistItems.map((product, index) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ delay: index * 0.1 }}
              className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="card-body p-0">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 p-6">
                  {/* Product Image */}
                  <div className="md:col-span-1">
                    <Link to={`/products/${product.id}`} className="block">
                      <div className="aspect-square rounded-xl bg-base-200 p-4 flex items-center justify-center overflow-hidden group">
                        <img 
                          src={product.imageUrl} 
                          alt={product.name}
                          className="w-full h-full object-contain transition-transform group-hover:scale-105"
                        />
                      </div>
                    </Link>
                  </div>

                  {/* Product Information */}
                  <div className="md:col-span-4 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <Link to={`/products/${product.id}`} className="hover:text-red-500 transition-colors">
                          <h2 className="text-xl font-bold">{product.name}</h2>
                        </Link>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="badge badge-error text-white">{product.brand}</div>
                          <div className="badge badge-ghost">{product.category}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">S/ {product.price.toFixed(2)}</div>
                        <div className="text-sm text-base-content/70">Stock: {product.stock} unidades</div>
                      </div>
                    </div>

                    <p className="text-base-content/80">{product.description}</p>

                    {/* Features Section */}
                    {product.features && product.features.length > 0 && (
                      <div className="space-y-2">                          
                        {showFeatures[product.id] && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-base-200 rounded-xl p-4"
                          >
                            <ul className="space-y-2">
                              {product.features.map((feature, index) => (
                                <motion.li 
                                  key={index}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.1 }}
                                  className="flex items-center gap-2"
                                >
                                  <Tag className="w-4 h-4 text-primary" />
                                  {feature}
                                </motion.li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex justify-between items-center pt-4 border-t border-base-200">
                      <button 
                        className="btn btn-ghost hover:bg-red-100 text-red-600 btn-sm gap-2"
                        onClick={() => handleRemoveFromWishlist(product.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                        Eliminar de la lista
                      </button>
                      <button 
                        className="btn bg-red-600 text-white hover:bg-red-700 btn-sm gap-2"
                        onClick={() => {
                          handleAddToCartAndNotify(product);  
                          handleRemoveFromWishlist(product.id);         }}
                      >

                        <ShoppingCart className="w-4 h-4" />
                        Añadir al carrito
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Empty State */}
          {wishlistItems.length === 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card bg-base-100 shadow-lg p-12 text-center"
            >
              <div className="flex flex-col items-center gap-4">
                <Box className="w-16 h-16 text-base-content/20" />
                <h3 className="text-xl font-bold">Tu lista de deseos está vacía</h3>
                <p className="text-base-content/70">
                  Agrega productos a tu lista para guardarlos y comprarlos más tarde
                </p>
                <Link 
                  to="/Catalog" 
                  className="btn btn-error text-white hover:bg-red-700"
                >
                  Explorar productos
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default WishList;
