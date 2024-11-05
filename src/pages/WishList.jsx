// components/WishList.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingCart, ChevronDown, Tag, Box } from 'lucide-react';
import useWishlist from '../hooks/useWishlist';
import { motion, AnimatePresence } from 'framer-motion';

const WishList = ({ onAddToCart }) => {
  const { 
    wishlistItems = [], 
    showFeatures = {}, 
    toggleFeatures, 
    removeFromWishlist 
  } = useWishlist();
  

  const handleAddToCart = (product) => {
    onAddToCart?.(product);
  };

  const handleRemoveFromWishlist = (productId) => {
    removeFromWishlist(productId);
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
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
                        <Link to={`/products/${product.id}`} className="hover:text-primary transition-colors">
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
                        <button 
                          className="btn btn-ghost btn-sm w-full justify-between"
                          onClick={() => toggleFeatures(product.id)}
                        >
                          Ver características
                          <ChevronDown 
                            className={`w-4 h-4 transition-transform duration-200 ${showFeatures[product.id] ? 'rotate-180' : ''}`} 
                          />
                        </button>
                        
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
                        onClick={() => handleAddToCart(product)}
                        disabled={product.stock === 0}
                      >
                        <ShoppingCart className="w-4 h-4" />
                        {product.stock > 0 ? 'Añadir al carrito' : 'Sin stock'}
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
