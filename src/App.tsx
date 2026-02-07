import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HomePage } from '@/pages/HomePage';
import { ProductPage } from '@/pages/ProductPage';
import { AboutPage } from '@/pages/AboutPage';
import { ContactPage } from '@/pages/ContactPage';
import { CustomerInfoPage, getCustomerInfo } from '@/pages/CustomerInfoPage';
import { useCart } from '@/hooks/useCart';
import type { Product } from '@/types/product';

// Protected Route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const customer = getCustomerInfo();
  if (!customer) {
    return <Navigate to="/welcome" replace />;
  }
  return <>{children}</>;
};

function App() {
  const {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount
  } = useCart();

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  return (
    <Router>
      <Routes>
        {/* Customer Info Page - First page */}
        <Route path="/welcome" element={<CustomerInfoPage />} />
        
        {/* Protected Routes */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <div className="min-h-screen flex flex-col">
                <Header
                  cartItems={cartItems}
                  cartTotal={getCartTotal()}
                  cartCount={getCartCount()}
                  onUpdateQuantity={updateQuantity}
                  onRemoveFromCart={removeFromCart}
                  onClearCart={clearCart}
                />
                
                <main className="flex-1">
                  <Routes>
                    <Route 
                      path="/" 
                      element={<HomePage onAddToCart={handleAddToCart} />} 
                    />
                    <Route 
                      path="/product/:asin" 
                      element={<ProductPage onAddToCart={handleAddToCart} />} 
                    />
                    <Route 
                      path="/about" 
                      element={<AboutPage />} 
                    />
                    <Route 
                      path="/contact" 
                      element={<ContactPage />} 
                    />
                  </Routes>
                </main>
                
                <Footer />
                <Toaster position="top-center" richColors />
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
