import { Link } from 'react-router-dom';
import type { Product } from '@/types/product';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Star } from 'lucide-react';
import { getProductRating } from '@/hooks/useReviews';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const { average, count } = getProductRating(product.id);
  
  // Use a placeholder image if the product image is not available
  const imageUrl = product.image && product.image.startsWith('http') 
    ? product.image 
    : 'https://via.placeholder.com/300x300?text=No+Image';

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-200">
      <Link to={`/product/${product.asin}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <img
            src={imageUrl}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x300?text=No+Image';
            }}
          />
          {product.quantity < 10 && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
              كمية محدودة
            </div>
          )}
        </div>
      </Link>
      
      <CardContent className="p-4">
        <Link to={`/product/${product.asin}`} className="block">
          <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2 hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        
        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-4 h-4 ${
                  star <= Math.round(average)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'fill-gray-200 text-gray-200'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500">
            {count > 0 ? `(${count})` : '(لا تقييمات)'}
          </span>
        </div>
        
        <div className="flex items-center justify-between mt-3">
          <div className="text-lg font-bold text-gray-900">
            {product.price.toFixed(2)} ج.م
          </div>
          <Button
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              onAddToCart(product);
            }}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <ShoppingCart className="w-4 h-4 ml-1" />
            أضف
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
