import type { Review } from '@/types/product';
import { StarRating } from './StarRating';
import { Button } from '@/components/ui/button';
import { Trash2, User } from 'lucide-react';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';

interface ReviewListProps {
  reviews: Review[];
  onDelete?: (reviewId: string) => void;
}

export const ReviewList = ({ reviews, onDelete }: ReviewListProps) => {
  if (reviews.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>لا توجد تقييمات لهذا المنتج بعد</p>
        <p className="text-sm mt-1">كن أول من يقيم هذا المنتج!</p>
      </div>
    );
  }

  // Sort reviews by date (newest first)
  const sortedReviews = [...reviews].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">
        التقييمات ({reviews.length})
      </h3>
      
      {sortedReviews.map((review) => (
        <div
          key={review.id}
          className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-gray-500" />
              </div>
              <div>
                <p className="font-medium text-gray-900">{review.author}</p>
                <p className="text-sm text-gray-500">
                  {format(new Date(review.date), 'dd MMMM yyyy', { locale: ar })}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <StarRating rating={review.rating} size="sm" />
              {onDelete && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(review.id)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
          
          <p className="mt-3 text-gray-700 leading-relaxed">
            {review.comment}
          </p>
        </div>
      ))}
    </div>
  );
};
