import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShoppingCart, Minus, Plus, Heart, Check, Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import products from '../data/products';
import { Package, SearchX, RefreshCw, ArrowLeft, Home } from 'lucide-react';
import useWishlist from '../hooks/useWishlist';
import useCart from '../hooks/useCart';
import WishlistAlert from '../components/WishlistAlert';

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((prod) => prod.id === parseInt(id));
  
  const [quantity, setQuantity] = useState(1);
  const [showAddedNotification, setShowAddedNotification] = useState(false);
  
  const handleRefresh = () => {
    window.location.reload();
  };

  const handleBack = () => {
    window.history.back();
  };

  const handleHome = () => {
    window.location.href = '/';
  };

  if (!product) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-base-200 p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl">
        <div className="card-body p-0">
          {/* Banner superior decorativo */}
          <div className="w-full h-32 bg-red-600 rounded-t-2xl flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="w-full h-full grid grid-cols-6 gap-2">
                {[...Array(24)].map((_, i) => (
                  <div key={i} className="aspect-square bg-red-100 rounded-full animate-pulse" style={{
                    animationDelay: `${i * 0.1}s`
                  }}></div>
                ))}
              </div>
            </div>
            <div className="relative z-10 flex flex-col items-center">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-base-100 flex items-center justify-center shadow-lg">
                  <Package className="w-10 h-10 text-black" />
                </div>
                <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-red-500 flex items-center justify-center shadow-lg ">
                  <SearchX className="w-6 h-6 text-base-100" />
                </div>
              </div>
            </div>
          </div>

          {/* Contenido */}
          <div className="p-6 text-center space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-base-content">¡Producto no encontrado!</h2>
              <p className="text-base-content/70 text-lg">
                Lo sentimos, el producto que buscas parece estar perdido en el espacio 🚀
              </p>
            </div>

            {/* Línea decorativa */}
            <div className="flex items-center gap-2">
              <div className="flex-1 h-px bg-base-300"></div>
              <div className="badge badge-error badge-outline">404</div>
              <div className="flex-1 h-px bg-base-300"></div>
            </div>

            {/* Botones */}
            <div className="space-y-3">
              
              
              <div className="grid grid-cols-2 gap-3">
                <button 
                  className="btn btn-outline btn-ghost gap-2 hover:scale-105 transform transition-transform duration-200"
                  onClick={handleBack}
                >
                  <ArrowLeft className="w-5 h-5" />
                  Volver
                </button>
                <button 
                  className="btn bg-red-600 text-white gap-2 hover:scale-105  hover:bg-red-700  transform transition-transform duration-200"
                  onClick={handleHome}
                >
                  <Home className="w-5 h-5" />
                  Inicio
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }

  const handleIncrement = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const { handleAddToCart } = useCart();
  

  const { wishlistItems, addToWishlist, removeFromWishlist, isInWishlist, alerts } = useWishlist(); // Desestructuramos las funciones y el estado del hook
  const isWishlisted = isInWishlist(product.id); // Determina si el producto está en la lista de deseos

  const [notifications, setNotifications] = useState([]);
  
  const {  handleAddToCart1 } = useCart();

  const handleAddToCartAndNotify = (product) => {
    const stockLimitReached = handleAddToCart1(product, quantity);
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
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-white mt-28"
    >
      {/* DaisyUI Modal */}
      <input type="checkbox" id="image-modal" className="modal-toggle" />
      <div className="modal">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="modal-box relative max-w-3xl bg-white p-0 rounded-lg"
        >
          <label 
            htmlFor="image-modal" 
            className="btn btn-sm btn-circle absolute right-4 top-4 z-10"
          >
            ✕
          </label>
          <motion.img
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-auto rounded-t-lg"
          />
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-4 bg-base-200"
          >
            <h3 className="font-semibold text-lg">{product.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{product.brand}</p>
          </motion.div>
        </motion.div>
        <label className="modal-backdrop" htmlFor="image-modal">Close</label>
      </div>
      <WishlistAlert alerts={alerts} />
      {/* Notification */}
      <AnimatePresence>
      {notifications.map((notification) => (
        <motion.div
          key={notification.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className={`bg-${
            notification.type === 'stock-limit' ? 'red-500 z-50' : 'green-500 z-50'
          }  px-6 py-4 rounded-xl shadow-xl fixed top-32 right-4  flex items-center space-x-3`}
        >
          <div
            className={`p-3 rounded-full ${
              notification.type === 'stock-limit'
                ? 'bg-red-600 '
                : 'bg-green-600 '
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
      
      <div className="max-w-7xl mx-auto px-4 py-8 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Section */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="sticky top-8">
              <div className="relative group">
                <motion.img
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full object-cover rounded-lg"
                />
                <label 
                  htmlFor="image-modal"
                  className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/10 transition-colors cursor-pointer"
                >
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className="bg-white/90 p-3 rounded-full"
                  >
                    <Search size={20} className="text-gray-700" />
                  </motion.div>
                </label>
              </div>
            </div>
          </motion.div>

          {/* Product Info Section */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-sm text-gray-500 mb-2"
              >
                {product.brand}
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-4xl font-bold text-gray-900 mb-4"
              >
                {product.name}
              </motion.h1>
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="badge bg-red-600 text-white"
              >
                {product.category}
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-gray-600 space-y-4"
            >
              <p className="leading-relaxed">
                {product.description}
              </p>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="flex items-center gap-2"
                  >
                    <Check size={16} className="text-green-500" />
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-3xl font-bold text-gray-900"
            >
              ${product.price}
              <motion.span 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 }}
                className="badge bg-red-100 ml-2"
              >
                Stock: {product.stock}
              </motion.span>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-4">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="join border border-gray-300 rounded-lg"
                >
                  <button 
                    className="join-item btn btn-ghost"
                    onClick={handleDecrement}
                    disabled={quantity <= 1}
                  >
                    <Minus size={20} />
                  </button>
                  <span className="join-item w-16 flex items-center justify-center font-medium">
                    {quantity}
                  </span>
                  <button 
                    className="join-item btn btn-ghost"
                    onClick={handleIncrement}
                    disabled={quantity >= product.stock}
                  >
                    <Plus size={20} />
                  </button>
                </motion.div>

 <motion.button 
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="btn btn-circle btn-outline"
      onClick={() => {
        if (isWishlisted) {
          removeFromWishlist(product.id); // Remueve de la lista de deseos si ya está
        } else {
          addToWishlist(product); // Agrega a la lista de deseos si no está
        }
      }}
    >
      <Heart 
        size={20} 
        className={isWishlisted ? 'fill-red-500 text-red-500' : ''}
      />
    </motion.button>
              </div>

              <motion.button 
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  onClick={() => {
    handleAddToCartAndNotify(product);
      
  }}
  className="btn bg-red-600 text-white hover:bg-black w-full"
>
  <ShoppingCart size={20} />
  Agregar al carrito
</motion.button>

              <div className="grid grid-cols-2 gap-4 py-6 border-t border-gray-200">
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="card bg-base-100 shadow-sm"
                >
                  <div className="card-body p-4">
                    <h3 className="card-title text-sm">Envío gratis</h3>
                    <p className="text-sm text-gray-500">En pedidos superiores a $99</p>
                  </div>
                </motion.div>
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="card bg-base-100 shadow-sm"
                >
                  <div className="card-body p-4">
                    <h3 className="card-title text-sm">Garantía</h3>
                    <p className="text-sm text-gray-500">3 años de garantía del fabricante</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
    
  );
};

export default ProductDetail;