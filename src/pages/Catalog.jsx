import React, { useState } from 'react';
import { 
  Cpu, 
  ShoppingCart, 
  Heart, 
  Search,
  Package,
  ChevronUp,
  ChevronDown,
  Filter,
  X,
  Store,
  Tag,
  Percent,
  Menu
} from 'lucide-react';

import products from '../data/products';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import useWishlist from '../hooks/useWishlist';
import useCart from '../hooks/useCart';

const ProductCatalog = ( ) => {

  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const uniqueBrands = [...new Set(products.map(p => p.brand))];
  const uniqueCategories = [...new Set(products.map(p => p.category))];

  const { handleAddToCart, isInCart } = useCart();

  
  const { 
    addToWishlist, 
    removeFromWishlist, 
    isInWishlist 
  } = useWishlist();

  const handleWishlistToggle = (e, product) => {
    e.preventDefault(); // Prevent navigation from Link
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };
  
  const toggleFilter = (type, value) => {
    if (type === 'brand') {
      setSelectedBrands(prev => 
        prev.includes(value) 
          ? prev.filter(b => b !== value)
          : [...prev, value]
      );
    } else if (type === 'category') {
      setSelectedCategories(prev => 
        prev.includes(value) 
          ? prev.filter(c => c !== value)
          : [...prev, value]
      );
    }
  };

  const toggleFavorite = (productId) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const filteredAndSortedProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.brand.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      return matchesSearch && matchesBrand && matchesCategory && matchesPrice;
    })
    .sort((a, b) => sortOrder === 'asc' ? a.price - b.price : b.price - a.price);

    
   

  const Sidebar = () => (
    <div className="bg-base-100 p-6 rounded-lg shadow-lg space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <Tag className='text-red-600' size={20} />
          Categorías
        </h3>
        {uniqueCategories.map(category => (
          <label key={category} className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className=" checkbox checkbox-error "
              checked={selectedCategories.includes(category)}
              onChange={() => toggleFilter('category', category)}
            />
            <span>{category}</span>
          </label>
        ))}
      </div>

      <div className="divider"></div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <Store className='text-red-600' size={20} />
          Marcas
        </h3>
        {uniqueBrands.map(brand => (
          <label key={brand} className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className=" checkbox checkbox-error"
              checked={selectedBrands.includes(brand)}
              onChange={() => toggleFilter('brand', brand)}
            />
            <span>{brand}</span>
          </label>
        ))}
      </div>

      <div className="divider"></div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <Percent className='text-red-600' size={20} />
          Rango de Precio
        </h3>
        <input
          type="range"
          min="0"
          max="5000"
          value={priceRange[1]}
          className="range range-error"
          onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
        />
        <div className="flex justify-between text-sm">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="mt-28 bg-base-200 p-6">
      {/* Header */}
      

      {/* Mobile Filters Button */}
      <button 
        className="md:hidden btn btn-primary w-full mb-4 gap-2"
        onClick={() => setShowMobileFilters(!showMobileFilters)}
      >
        <Filter size={20} />
        Filtros
      </button>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar - Desktop */}
        <div className="hidden md:block w-64 flex-shrink-0">
          <Sidebar />
        </div>

        {/* Mobile Filters Modal */}
        {showMobileFilters && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 md:hidden">
            <div className="bg-base-100 h-full w-80 p-6 overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold">Filtros</h3>
                <button 
                  className="btn btn-ghost btn-circle"
                  onClick={() => setShowMobileFilters(false)}
                >
                  <X size={20} />
                </button>
              </div>
              <Sidebar />
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1">
          {/* Search and Sort Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar productos..."
                className="input input-bordered w-full pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button 
              className="btn bg-red-600 text-white hover:bg-black gap-2 w-full sm:w-auto"
              onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
            >
              Precio {sortOrder === 'asc' ? <ChevronUp /> : <ChevronDown />}
            </button>
          </div>
       {/* Products Grid */}
       <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
      {filteredAndSortedProducts.map(product => (
        <Link to={`/products/${product.id}`} key={product.id}>
          <motion.div 
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.1 }}
            whileHover={{ scale: 1.01 }}
          >
            <figure className="px-6 pt-6 cursor-pointer">
              <img 
                src={product.imageUrl} 
                alt={product.name}
                className="rounded-xl h-48 w-full object-cover"
              />
            </figure>
            <div className="card-body">
              <div className="flex justify-between items-start">
                <div>
                  <h2 
                    className="card-title text-lg cursor-pointer hover:text-red-600 transition-colors duration-200"
                  >
                    {product.name}
                  </h2>
                  <div className="flex gap-2 mt-1">
                    <div className="badge bg-red-600 text-white">{product.brand}</div>
                    <div className="badge bg-black text-white">{product.category}</div>
                  </div>
                </div>
                <button 
                  className={`btn btn-circle btn-sm ${
                    isInWishlist(product.id) 
                      ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                      : 'btn-ghost'
                  }`}
                  onClick={(e) => handleWishlistToggle(e, product)}
                >
                  <Heart 
                    className={isInWishlist(product.id) ? 'fill-current' : ''} 
                    size={20} 
                  />
                </button>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Package size={20} />
                <span className={`text-sm ${product.stock < 6 ? 'text-error' : 'text-success'}`}>
                  {product.stock} unidades disponibles
                </span>
              </div>
              <div className="card-actions justify-between items-center mt-4">
                <span className="text-2xl font-bold">S/{product.price}</span>
                <button 
                  className="btn bg-red-600 text-white hover:bg-red-700 gap-2"
                  onClick={(e) => {
                    e.preventDefault();
                    handleAddToCart(product);
                  }}
                >
                  <ShoppingCart size={20} />
                  Agregar
                </button>
              </div>
            </div>
          </motion.div>
        </Link>
      ))}
    </div>

          {/* Empty State */}
          {filteredAndSortedProducts.length === 0 && (
            <div className="text-center py-10">
              <div className="bg-base-100 p-8 rounded-lg shadow-lg inline-block">
                <Search size={48} className="mx-auto mb-4 text-gray-400" />
                <p className="text-2xl font-bold text-gray-400 mb-2">
                  No se encontraron productos
                </p>
                <p className="text-gray-500">
                  Intenta ajustar los filtros o el término de búsqueda
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCatalog;