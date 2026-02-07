import { useState } from 'react';
import { ProductCard } from '@/components/product/ProductCard';
import { products, searchProducts } from '@/data/products';
import { SearchBar } from '@/components/search/SearchBar';
import type { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { ArrowDown, Sparkles, Truck, Shield, Headphones, Package } from 'lucide-react';
import { toast } from 'sonner';

interface HomePageProps {
  onAddToCart: (product: Product) => void;
}

export const HomePage = ({ onAddToCart }: HomePageProps) => {
  const [searchResults, setSearchResults] = useState<Product[] | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      const results = searchProducts(query);
      setSearchResults(results);
    } else {
      setSearchResults(null);
    }
  };

  const handleAddToCart = (product: Product) => {
    onAddToCart(product);
    toast.success(`تم إضافة ${product.name.slice(0, 30)}... للسلة`);
  };

  const displayProducts = searchResults || products;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-60 h-60 bg-white rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center">
                <Sparkles className="w-10 h-10" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Gift Panner
            </h1>
            <p className="text-xl md:text-2xl mb-2 text-white/90">
              وجهتك الأولى لأجمل ملصقات الحائط والاستيكرات
            </p>
            <p className="text-lg text-white/80 mb-8">
              نحول جدرانك إلى تحف فنية بأعلى جودة وأفضل الأسعار
            </p>
            
            {/* Search Bar */}
            <div className="mb-8">
              <SearchBar onSearch={handleSearch} />
            </div>
            
            {!searchQuery && (
              <Button
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-100 font-semibold"
                onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
              >
                تصفح المنتجات
                <ArrowDown className="w-5 h-5 mr-2" />
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Features */}
      {!searchQuery && (
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-4 bg-white p-6 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Truck className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">شحن سريع</h3>
                  <p className="text-gray-500 text-sm">توصيل لجميع المحافظات</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 bg-white p-6 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold">جودة مضمونة</h3>
                  <p className="text-gray-500 text-sm">مواد عالية الجودة</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 bg-white p-6 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Headphones className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold">دعم ممتاز</h3>
                  <p className="text-gray-500 text-sm">خدمة عملاء على مدار الساعة</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Products Section */}
      <section id="products" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            {searchQuery ? (
              <>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  نتائج البحث
                </h2>
                <p className="text-gray-600">
                  تم العثور على {displayProducts.length} منتج لـ "{searchQuery}"
                </p>
              </>
            ) : (
              <>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  منتجاتنا
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  اكتشف تشكيلتنا المميزة من الملصقات والاستيكرات بأشكال وتصاميم متنوعة
                </p>
                <div className="flex items-center justify-center gap-2 mt-4 text-gray-500">
                  <Package className="w-5 h-5" />
                  <span>{products.length} منتج متاح</span>
                </div>
              </>
            )}
          </div>
          
          {displayProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {displayProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Package className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                لا توجد منتجات مطابقة
              </h3>
              <p className="text-gray-500">
                جرب البحث بكلمات مختلفة أو رقم ASIN
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
