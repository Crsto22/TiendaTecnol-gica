import React from "react";
import {
  Trash2,
  ShoppingCart as CartIcon,
  Plus,
  Minus,
  ArrowLeft,
  ShoppingBasket,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import useCart from "../hooks/useCart";

const ShoppingCart = () => {
  const {
    cartItems,
    handleAddToCart,
    removeFromCart,
    updateQuantity,
    getTotalPrice,
    getTotalItems,
  } = useCart();

  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();

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
              <CartIcon className="w-6 h-6 text-red-600" fill="currentColor" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Carrito de Compras</h1>
              <p className="text-base-content/70">Hay {totalItems} artículos</p>
              <p className="text-base-content/70">
                Total: S/. {totalPrice.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Table Header */}
      <motion.div
        className="max-w-4xl mx-auto mb-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.1, delay: 0.2 }}
      >
        <div className="grid grid-cols-12 bg-base-100 shadow-xl p-4 rounded-lg text-gray-700 font-semibold">
          <div className="col-span-5">Producto</div>
          <div className="col-span-2 text-center">Precio</div>
          <div className="col-span-2 text-center">Cantidad</div>
          <div className="col-span-2 text-center">Total</div>
          <div className="col-span-1 text-center">Acción</div>
        </div>
      </motion.div>

      <div className="max-w-4xl mx-auto space-y-4">
        <AnimatePresence>
          {cartItems.length > 0 ? (
            <motion.div
              key="product-list"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-12 items-center bg-base-100 shadow-xl p-4 rounded-lg"
                >
                  {/* Producto */}
                  <div className="col-span-5 flex items-center">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-20 h-20 object-cover mr-4 rounded-lg"
                    />
                    <div>
                      <h3 className="text-lg font-medium">{item.name}</h3>
                      <p className="badge bg-red-600 text-white">{item.brand}</p>
                    </div>
                  </div>

                  {/* Precio */}
                  <div className="col-span-2 text-center font-medium">
                    S/. {item.price.toFixed(2)}
                  </div>

                  {/* Cantidad */}
                  <div className="col-span-2 flex items-center justify-center space-x-2">
                    <button
                      className="btn btn-circle btn-sm bg-red-600 text-white hover:bg-black"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity === 1}
                    >
                      <Minus size={16} />
                    </button>
                    <span className="font-medium text-gray-700">
                      {item.quantity}
                    </span>
                    <button
                      className="btn btn-circle btn-sm bg-red-600 text-white hover:bg-black"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      disabled={item.quantity >= item.stock}
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  {/* Total */}
                  <div className="col-span-2 text-center font-medium text-green-600">
                    S/. {(item.price * item.quantity).toFixed(2)}
                  </div>

                  {/* Acción */}
                  <div className="col-span-1 flex justify-center">
                    <button
                      className="btn btn-ghost btn-square text-red-500 hover:bg-red-500 hover:text-white"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                  
                </motion.div>
              ))}
              <div className="flex justify-center mt-8">
                <Link to="/contacts " className="btn bg-red-600 text-white hover:bg-red-700" > 
          Proceder al Checkout (S/. {totalPrice.toFixed(2)})
        </Link>
      </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty-cart"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="card bg-base-100 shadow-lg p-12 text-center"
            >
              <div className="flex flex-col items-center gap-4">
                <ShoppingBasket className="w-16 h-16 text-base-content/20" />
                <h3 className="text-xl font-bold">Su carrito está vacío</h3>
                <p className="text-base-content/70">
                  Agrega productos a tu carrito para comprarlos
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

export default ShoppingCart;