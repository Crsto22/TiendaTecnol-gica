import React, { useCallback, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, Eye, Heart, ArrowRightFromLine, CheckCircle, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Autoplay from 'embla-carousel-autoplay';
import ClassNames from 'embla-carousel-class-names';
import products from '../data/products';
import { Link } from 'react-router-dom';
import useWishlist from '../hooks/useWishlist';
import WishlistAlert from './WishlistAlert';

const Products = () => {

  const { wishlistItems, addToWishlist, removeFromWishlist, isInWishlist, alerts } = useWishlist();

  const [emblaRef, emblaApi1] = useEmblaCarousel(
    { 
      align: 'start',
      slidesToScroll: 1,
      containScroll: 'trimSnaps',
      loop: false
    },
    [
      Autoplay({ delay: 4000, stopOnInteraction: true, stopOnLastSnap: true }),
      ClassNames()
    ]
  );

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [canScrollPrev1, setCanScrollPrev1] = useState(false);
  const [canScrollNext2, setCanScrollNext1] = useState(true);

  const scrollPrev1 = useCallback(() => {
    if (emblaApi1) emblaApi1.scrollPrev();
  }, [emblaApi1]);

  const scrollNext1 = useCallback(() => {
    if (emblaApi1) emblaApi1.scrollNext();
  }, [emblaApi1]);

  const onSelect = useCallback(() => {
    if (!emblaApi1) return;
    setCurrentSlide(emblaApi1.selectedScrollSnap());
    setCanScrollPrev1(emblaApi1.canScrollPrev());
    setCanScrollNext1(emblaApi1.canScrollNext());
  }, [emblaApi1]);

  React.useEffect(() => {
    if (!emblaApi1) return;
    
    onSelect();
    emblaApi1.on('select', onSelect);
    emblaApi1.on('reInit', onSelect);

    return () => {
      emblaApi1.off('select', onSelect);
      emblaApi1.off('reInit', onSelect);
    };
  }, [emblaApi1, onSelect]);

  const formatPrice = (price) => `S/ ${price.toFixed(2)}`;


  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gradient-to-br from-gray-50 to-gray-100 p-8"
    >
         {/* Usamos el componente WishlistAlert */}
         <WishlistAlert alerts={alerts} />
      <AnimatePresence>
  {selectedProduct && (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-40" 
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
              <Link to={`/products/${selectedProduct.id}`}> 
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-red-700 text-white py-3 px-3 rounded-xl hover:bg-black transition-colors flex items-center justify-center gap-2"
                >
                  <ArrowRightFromLine className="w-5 h-5" />
                  Ver detalles
                </motion.button>
              </Link>
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (isInWishlist(selectedProduct.id)) {
                    removeFromWishlist(selectedProduct.id);
                  } else {
                    addToWishlist(selectedProduct);
                  }
                }}
                className={`p-3 border rounded-xl transition-colors ${
                  isInWishlist(selectedProduct.id) 
                    ? 'bg-red-500 text-white' 
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <Heart className={`w-5 h-5 ${
                  isInWishlist(selectedProduct.id) ? 'fill-current' : ''
                }`} />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence> 

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex justify-between items-center mb-8"
        >
          <h2 className="sm:text-3xl text-lg font-bold  ">Productos <span className="text-red-600">Destacados</span></h2>
          <div className="flex gap-2">
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={scrollPrev1}
              disabled={!canScrollPrev1}
              className={`border border-gray-200 rounded-full p-3 transition-colors ${
                canScrollPrev1 
                  ? 'hover:bg-red-600 hover:text-white cursor-pointer' 
                  : 'opacity-50 cursor-not-allowed'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={scrollNext1}
              disabled={!canScrollNext2}
              className={`border border-gray-200 rounded-full p-3 transition-colors ${
                canScrollNext2 
                  ? 'hover:bg-red-600 hover:text-white cursor-pointer' 
                  : 'opacity-50 cursor-not-allowed'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>

        {/* Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-4">
            {products.map((product, index) => (
              <motion.div 
                key={product.id} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex-[0_0_50%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-4"
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
              >
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative group">
                    <motion.img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full sm:h-64 h-24 object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.5 }}
                    />
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                      className="absolute inset-0 bg-black/40 flex items-center justify-center"
                    >
                      <motion.button 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        onClick={() => setSelectedProduct(product)}
                        className="bg-white text-black px-6 py-3 rounded-full font-medium flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Eye className="w-5 h-5" />
                       <span className='sm:block hidden'>Ver producto</span> 
                      </motion.button>
                    </motion.div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold sm:text-lg text-sm mb-2">{product.name}</h4>
                    <p className="text-red-600 font-semibold">{formatPrice(product.price)}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center gap-2 mt-6">
          {products.map((_, index) => (
            <motion.div 
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-red-600' : 'bg-gray-300'
              }`}
              whileHover={{ scale: 1.2 }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default Products;