import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css'
import Navbar from './components/Nabvar.jsx'
import Home from './pages/Home.jsx'
import Products from './components/Products.jsx'
import Footer from './components/Footer.jsx'
import Catalog from './pages/Catalog.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import WishList from './pages/WishList.jsx';
import ShoppingCart from './pages/ShoppingCart.jsx';
import Contacts from './pages/Contacts.jsx';
import NotFound from './pages/NotFound.jsx';

function ScrollToTop() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return null;
}

// Componente para decidir cuándo mostrar Navbar y Footer
const Layout = ({ children }) => {
  const location = useLocation();
  const is404Page = location.pathname !== '/404';

  return (
    <>
      {is404Page && <Navbar />}
      {children}
      {is404Page && <Footer />}
    </>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} /> 
          <Route path="/home" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/contacts" element={<Contacts />} />
          {/* Ruta 404 - debe ir al final */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App