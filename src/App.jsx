import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import Navbar from './components/Nabvar.jsx'
import Home from './pages/Home.jsx'
import Products from './components/Products.jsx'
import Footer from './components/Footer.jsx'
import Catalog from './pages/Catalog.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import WishList from './pages/WishList.jsx';
import ShoppingCart from './pages/ShoppingCart.jsx';

function App() {
  return (
    <>
    <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} /> 
          <Route path="/home" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/cart" element={<ShoppingCart />} />
        </Routes>
      <Footer />
    </Router>
    </>
  )
}

export default App