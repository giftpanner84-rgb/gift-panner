import { Link } from 'react-router-dom';
import { CartDrawer } from '@/components/cart/CartDrawer';
import type { CartItem } from '@/types/product';
import { Home, Package, Info, Phone } from 'lucide-react';

interface HeaderProps {
  cartItems: CartItem[];
  cartTotal: number;
  cartCount: number;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemoveFromCart: (productId: number) => void;
  onClearCart: () => void;
}

export const Header = ({
  cartItems,
  cartTotal,
  cartCount,
  onUpdateQuantity,
  onRemoveFromCart,
  onClearCart
}: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">G</span>
            </div>
            <span className="font-bold text-xl hidden sm:block">Gift Panner</span>
          </Link>
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Home className="w-4 h-4" />
              الرئيسية
            </Link>
            <Link
              to="/#products"
              className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Package className="w-4 h-4" />
              المنتجات
            </Link>
            <Link
              to="/about"
              className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Info className="w-4 h-4" />
              من نحن
            </Link>
            <Link
              to="/contact"
              className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Phone className="w-4 h-4" />
              تواصل معنا
            </Link>
          </nav>
          
          {/* Cart */}
          <CartDrawer
            items={cartItems}
            total={cartTotal}
            itemCount={cartCount}
            onUpdateQuantity={onUpdateQuantity}
            onRemove={onRemoveFromCart}
            onClear={onClearCart}
          />
        </div>
      </div>
    </header>
  );
};
