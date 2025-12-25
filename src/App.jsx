import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from './context/AuthContext';
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ShopPage from "./pages/ShopPage";
import SellPage from "./pages/SellPage";
import CartPage from "./pages/CartPage";
import AccountPage from "./pages/AccountPage";
import Navbar from "./components/Navbar";
import LaptopDetailPage from "./pages/LaptopDetailPage";
import CheckoutPage from "./pages/CheckoutPage";
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ProtectedRoute from './components/ProtectedRoute';

// Service Pages
import WarrantyPage from "./pages/WarrantyPage";
import SupportPage from "./pages/SupportPage";
import FAQPage from "./pages/FAQPage";

// Company Pages
import SustainabilityPage from "./pages/SustainabilityPage";
import CareersPage from "./pages/CareersPage";

// Legal Pages
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import CookiesPage from "./pages/CookiesPage";
import ShippingPage from "./pages/ShippingPage";
import ReturnsPage from "./pages/ReturnsPage";

// ScrollToTop component to reset scroll position on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// NavbarWithCart component to handle cart count
function NavbarWithCart() {
  const { cart } = useAuth();
  
  // Calculate cart items count from the cart state
  const cartItemsCount = cart?.items?.reduce((total, item) => total + item.quantity, 0) || 0;

  return <Navbar cartItemsCount={cartItemsCount} />;
}

// Main App Content
function AppContent() {
  return (
    <>
      <NavbarWithCart />
      <main>
        <Routes>
          {/* Main Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/sell" element={<SellPage />} />
          <Route 
            path="/cart" 
            element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/checkout" 
            element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/account" 
            element={
              <ProtectedRoute>
                <AccountPage />
              </ProtectedRoute>
            } 
          />
          <Route path="/laptop/:id" element={<LaptopDetailPage />} />
          
          {/* Auth Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          
          {/* Service Routes */}
          <Route path="/warranty" element={<WarrantyPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/faq" element={<FAQPage />} />
          
          {/* Company Routes */}
          <Route path="/sustainability" element={<SustainabilityPage />} />
          <Route path="/careers" element={<CareersPage />} />
          
          {/* Legal Routes */}
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/cookies" element={<CookiesPage />} />
          <Route path="/shipping" element={<ShippingPage />} />
          <Route path="/returns" element={<ReturnsPage />} />
        </Routes>
      </main>
    </>
  );
}

// App Wrapper
function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <div className="App">
          <AppContent />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;