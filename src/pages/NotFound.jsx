import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { motion } from 'framer-motion';

const NotFound = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-100 flex items-center justify-center px-4"
    >
      <div className="max-w-lg w-full">
        <motion.div
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          className="bg-white rounded-lg shadow-lg p-8 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="w-32 h-32 bg-red-100 rounded-full mx-auto flex items-center justify-center"
          >
            <Search size={48} className="text-red-600" />
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-9xl font-bold text-red-600 mt-4"
          >
            404
          </motion.h1>

          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-semibold text-gray-800 mt-4"
          >
            ¡Página no encontrada!
          </motion.h2>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-600 mt-2"
          >
            Lo sentimos, la página que estás buscando no existe o ha sido movida.
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 space-y-3"
          >
            <Link 
              to="/"
              className="flex items-center justify-center space-x-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
            >
              <Home size={20} />
              <span>Volver al inicio</span>
            </Link>

            <button 
              onClick={() => window.history.back()}
              className="flex items-center justify-center space-x-2 bg-gray-800 text-white px-6 py-3 rounded-lg w-full hover:bg-gray-900 transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Regresar a la página anterior</span>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default NotFound;