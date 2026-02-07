import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { getProductByAsin } from '@/data/products';
import { useReviews } from '@/hooks/useReviews';
import { StarRating } from '@/components/review/StarRating';
import { ReviewForm } from '@/components/review/ReviewForm';
import { ReviewList } from '@/components/review/ReviewList';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { Product } from '@/types/product';
import { 
  ShoppingCart, 
  ArrowRight, 
  Package, 
  Shield, 
  Truck,
  Star,
  AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';

interface ProductPageProps {
  onAddToCart: (product: Product) => void;
}

export const ProductPage = ({ onAddToCart }: ProductPageProps) => {
  const { asin } = useParams<{ asin: string }>();
  const product = asin ? getProductByAsin(asin) : undefined;
  const { reviews, averageRating, reviewCount, addReview, deleteReview } = useReviews(product?.id || 0);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <AlertCircle className="w-16 h-16 mx-auto text-gray-400 mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          المنتج غير موجود
        </h1>
        <p className="text-gray-600 mb-6">
          عذراً، لم نتمكن من العثور على المنتج المطلوب
        </p>
        <Link to="/">
          <Button>
            <ArrowRight className="w-4 h-4 mr-2" />
            العودة للرئيسية
          </Button>
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart(product);
    }
    toast.success(`تم إضافة ${quantity} من ${product.name.slice(0, 30)}... للسلة`);
  };

  const handleSubmitReview = (rating: number, comment: string, author: string) => {
    addReview(rating, comment, author);
  };

  // Use a placeholder image if the product image is not available
  const imageUrl = product.image && product.image.startsWith('http') 
    ? product.image 
    : 'https://via.placeholder.com/600x600?text=No+Image';

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-blue-600">الرئيسية</Link>
          <ArrowRight className="w-4 h-4" />
          <span className="text-gray-900">{product.name.slice(0, 50)}...</span>
        </nav>

        {/* Product Details */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            {/* Image */}
            <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
              <img
                src={imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/600x600?text=No+Image';
                }}
              />
            </div>

            {/* Info */}
            <div className="flex flex-col">
              <Badge className="w-fit mb-4" variant="secondary">
                SKU: {product.sku}
              </Badge>
              
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-4">
                <StarRating rating={Math.round(averageRating)} size="md" />
                <span className="text-gray-600">
                  {averageRating > 0 ? averageRating.toFixed(1) : 'لا تقييمات'} ({reviewCount})
                </span>
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed">
                {product.description}
              </p>

              <div className="text-3xl font-bold text-blue-600 mb-6">
                {product.price.toFixed(2)} ج.م
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-gray-600">الكمية:</span>
                <div className="flex items-center border rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </Button>
                </div>
                <span className="text-sm text-gray-500">
                  متاح: {product.quantity} قطعة
                </span>
              </div>

              {/* Add to Cart */}
              <Button
                size="lg"
                className="w-full bg-blue-600 hover:bg-blue-700 mb-4"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                أضف للسلة
              </Button>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 mt-auto pt-6 border-t">
                <div className="flex flex-col items-center text-center">
                  <Truck className="w-6 h-6 text-blue-600 mb-2" />
                  <span className="text-sm text-gray-600">شحن سريع</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Shield className="w-6 h-6 text-green-600 mb-2" />
                  <span className="text-sm text-gray-600">جودة مضمونة</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Package className="w-6 h-6 text-purple-600 mb-2" />
                  <span className="text-sm text-gray-600">تغليف آمن</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="reviews" className="bg-white rounded-2xl shadow-sm">
          <TabsList className="w-full justify-start border-b rounded-none p-0 h-auto">
            <TabsTrigger 
              value="reviews" 
              className="rounded-none px-6 py-4 data-[state=active]:border-b-2 data-[state=active]:border-blue-600"
            >
              <Star className="w-4 h-4 mr-2" />
              التقييمات ({reviewCount})
            </TabsTrigger>
            <TabsTrigger 
              value="details"
              className="rounded-none px-6 py-4 data-[state=active]:border-b-2 data-[state=active]:border-blue-600"
            >
              <Package className="w-4 h-4 mr-2" />
              تفاصيل المنتج
            </TabsTrigger>
          </TabsList>

          <TabsContent value="reviews" className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Review Form */}
              <div>
                <ReviewForm onSubmit={handleSubmitReview} />
              </div>

              {/* Review List */}
              <div>
                <ReviewList reviews={reviews} onDelete={deleteReview} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="details" className="p-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">معلومات المنتج</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <span className="text-gray-500">SKU:</span>
                  <span className="mr-2 font-medium">{product.sku}</span>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <span className="text-gray-500">ASIN:</span>
                  <span className="mr-2 font-medium">{product.asin}</span>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <span className="text-gray-500">الكمية المتاحة:</span>
                  <span className="mr-2 font-medium">{product.quantity}</span>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <span className="text-gray-500">السعر:</span>
                  <span className="mr-2 font-medium">{product.price.toFixed(2)} ج.م</span>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="font-semibold mb-2">الوصف</h4>
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
