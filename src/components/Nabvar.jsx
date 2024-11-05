import React, { useState, useEffect } from 'react';
import { 
  Home,
  BookOpen,
  Phone,
  ShoppingCart,
  Search,
  Menu,
  X,
  Heart
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import products from '../data/products';
import { Link } from 'react-router-dom';

import useWishlist from '../hooks/useWishlist';
import useCart from '../hooks/useCart';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // Format price helper function
  const formatPrice = (price) => {
    return `S/. ${price.toFixed(2)}`;
  };

  const { wishlistItems } = useWishlist();
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle search
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredProducts([]);
      return;
    }

    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5);

    setFilteredProducts(filtered);
  }, [searchQuery]);

  // Handle product selection
  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setSearchQuery('');
    setFilteredProducts([]);
  };

  const { getTotalItems } = useCart();

  return (
    <div className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      isScrolled ? 'bg-black shadow-lg' : 'bg-black/95'
    }`}>
      {/* Top bar */}
      <div className="bg-red-700 text-white text-center text-sm py-2 font-medium">
        <span>Correo electrónico: labrujastore@outlook.com</span>
      </div>

      <nav className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0 relative group">
              <img 
                src="https://labrujastore.com.pe/general/img/logo.png" 
                alt="Logo Empresa" 
                className="h-12 object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
  {/* Menu items... (kept the same) */}
  <Link to="/home" className="group relative px-4 py-2">
    <div className="flex items-center space-x-1 text-gray-300 group-hover:text-white transition-colors duration-300">
      <Home size={18} className="group-hover:text-red-500" />
      <span className="text-sm font-medium">Inicio</span>
    </div>
    <span className="absolute bottom-0 left-0 h-0.5 bg-red-600 transition-all duration-300 w-0 group-hover:w-full"></span>
  </Link>

  <Link to="/catalog" className="group relative px-4 py-2">
    <div className="flex items-center space-x-1 text-gray-300 group-hover:text-white transition-colors duration-300">
      <BookOpen size={18} className="group-hover:text-red-500" />
      <span className="text-sm font-medium">Catálogo</span>
    </div>
    <span className="absolute bottom-0 left-0 h-0.5 bg-red-600 transition-all duration-300 w-0 group-hover:w-full"></span>
  </Link>

  <Link to="/contactos" className="group relative px-4 py-2">
    <div className="flex items-center space-x-1 text-gray-300 group-hover:text-white transition-colors duration-300">
      <Phone size={18} className="group-hover:text-red-500" />
      <span className="text-sm font-medium">Contactos</span>
    </div>
    <span className="absolute bottom-0 left-0 h-0.5 bg-red-600 transition-all duration-300 w-0 group-hover:w-full"></span>
  </Link>
</div>
            {/* Search and Cart */}
            <div className="hidden md:flex items-center space-x-6">
              {/* Search Bar with Dropdown */}
              <div className="relative">
                <div className={`flex items-center transition-all duration-300 ${
                  isSearchFocused ? 'w-64' : 'w-48'
                }`}>
                  <input
                    type="text"
                    placeholder="Buscar productos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    className="w-full px-4 py-2 rounded-full bg-white/5 text-white placeholder-gray-400 
                             border border-white/10 focus:border-red-500
                             focus:outline-none focus:ring-1 focus:ring-red-500
                             transition-all duration-300"
                  />
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                </div>

                {/* Search Results Dropdown */}
                {searchQuery && filteredProducts.length > 0 && (
          <div className="absolute mt-2 w-full bg-gray-900 rounded-lg shadow-xl border border-white/10 overflow-hidden">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center space-x-3 p-3 hover:bg-white/5 transition-colors duration-200 cursor-pointer"
                onClick={() => handleProductClick(product)}
              >
                <div className="flex-shrink-0 w-12 h-12">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-md"
                    onError={(e) => {
                      e.target.src = "/api/placeholder/48/48";
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white truncate">{product.name}</p>
                  <p className="text-xs text-gray-400">{product.brand}</p>
                </div>
              </div>
            ))}
          </div>
        )}
              </div>
{/* Wishlist Button */}
<Link to="/wishlist">
      <button className="relative group">
        <div className="p-2 rounded-full hover:bg-white/5 transition-colors duration-300">
          <Heart className="h-6 w-6 text-gray-300 group-hover:text-white transition-colors duration-300" />
          {wishlistItems.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center
                            group-hover:animate-pulse">
              {wishlistItems.length}
            </span>
          )}
        </div>
      </button>
    </Link>
              {/* Cart Button */}
              <Link to="/cart">
            <button className="relative group">
              <div className="p-2 rounded-full hover:bg-white/5 transition-colors duration-300">
                <ShoppingCart className="h-6 w-6 text-gray-300 group-hover:text-white transition-colors duration-300" />
                {/* Cart item count */}
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center group-hover:animate-pulse">
                  {getTotalItems()}
                </span>
              </div>
            </button>
          </Link>
            </div>

            {/* Mobile menu button */}
            <button 
              className="md:hidden relative group p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="p-2 rounded-full hover:bg-white/5 transition-colors duration-300">
                {isMenuOpen ? (
                  <X size={24} className="text-gray-300 group-hover:text-white transition-colors duration-300" />
                ) : (
                  <Menu size={24} className="text-gray-300 group-hover:text-white transition-colors duration-300" />
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}>
          <div className="bg-gray-900/95 backdrop-blur-sm px-6 py-4 space-y-4 border-t border-white/5">
            {/* Mobile Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 rounded-full bg-white/5 text-white placeholder-gray-400 
                         border border-white/10 focus:border-red-500
                         focus:outline-none focus:ring-1 focus:ring-red-500"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              
              {/* Mobile Search Results */}
              {searchQuery && filteredProducts.length > 0 && (
                <div className="absolute mt-2 w-full bg-gray-900 rounded-lg shadow-xl border border-white/10 overflow-hidden z-50">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center space-x-3 p-3 hover:bg-white/5 transition-colors duration-200 cursor-pointer"
                      onClick={() => {
                        setSearchQuery('');
                        setFilteredProducts([]);
                      }}
                    >
                      <div className="flex-shrink-0 w-12 h-12">
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-full object-cover rounded-md"
                          onError={(e) => {
                            e.target.src = "/api/placeholder/48/48";
                          }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white truncate">{product.name}</p>
                        <p className="text-xs text-gray-400">{product.brand}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Menu Items */}
            <a href="#" className="flex items-center space-x-3 text-gray-300 hover:text-white p-3 rounded-lg hover:bg-white/5 transition-colors duration-300">
              <Home size={20} className="text-red-500" />
              <span className="font-medium">Inicio</span>
            </a>

            <a href="#" className="flex items-center space-x-3 text-gray-300 hover:text-white p-3 rounded-lg hover:bg-white/5 transition-colors duration-300">
              <BookOpen size={20} className="text-red-500" />
              <span className="font-medium">Catálogo</span>
            </a>

            <a href="#" className="flex items-center space-x-3 text-gray-300 hover:text-white p-3 rounded-lg hover:bg-white/5 transition-colors duration-300">
              <Phone size={20} className="text-red-500" />
              <span className="font-medium">Contactos</span>
            </a>

            <a href="#" className="flex items-center space-x-3 text-gray-300 hover:text-white p-3 rounded-lg hover:bg-white/5 transition-colors duration-300">
              <ShoppingCart size={20} className="text-red-500" />
              <span className="font-medium">Carrito (0)</span>
            </a>
          </div>
        </div>
      </nav>
      <AnimatePresence>
        {selectedProduct && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" 
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl p-6 max-w-2xl w-full mx-4 shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div 
                  className="relative"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <img 
                    src={selectedProduct.imageUrl} 
                    alt={selectedProduct.name}
                    className="w-full h-64 object-cover rounded-xl"
                    onError={(e) => {
                      e.target.src = "/api/placeholder/400/320";
                    }}
                  />
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="absolute top-4 right-4 bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-full font-semibold shadow-lg"
                  >
                    {formatPrice(selectedProduct.price)}
                  </motion.div>
                </motion.div>
                <motion.div 
                  className="flex flex-col justify-between"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                        {selectedProduct.brand}
                      </span>
                      {selectedProduct.stock <= 5 && (
                        <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                          ¡Últimas {selectedProduct.stock} unidades!
                        </span>
                      )}
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{selectedProduct.name}</h3>
                    <p className="text-gray-700">{selectedProduct.description}</p>
                  </div>
                  <motion.div 
                    className="flex gap-4 mt-6"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 bg-red-700 text-white py-3 rounded-xl hover:bg-black transition-colors flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      Agregar al carrito
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      <Heart className="w-5 h-5" />
                    </motion.button>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;