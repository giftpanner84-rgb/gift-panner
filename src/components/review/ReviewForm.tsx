import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { StarRating } from './StarRating';
import { toast } from 'sonner';

interface ReviewFormProps {
  onSubmit: (rating: number, comment: string, author: string) => void;
}

export const ReviewForm = ({ onSubmit }: ReviewFormProps) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [author, setAuthor] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (rating === 0) {
      newErrors.rating = 'يرجى اختيار التقييم';
    }
    if (comment.trim().length < 5) {
      newErrors.comment = 'التعليق يجب أن يكون 5 أحرف على الأقل';
    }
    if (author.trim().length < 2) {
      newErrors.author = 'الاسم يجب أن يكون حرفين على الأقل';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      toast.error('يرجى تصحيح الأخطاء');
      return;
    }
    
    onSubmit(rating, comment, author);
    setRating(0);
    setComment('');
    setAuthor('');
    toast.success('تم إضافة التقييم بنجاح!');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-gray-50 p-4 rounded-lg">
      <h3 className="font-semibold text-lg">أضف تقييمك</h3>
      
      <div>
        <Label>التقييم *</Label>
        <StarRating
          rating={rating}
          size="lg"
          interactive
          onRate={setRating}
          className="mt-2"
        />
        {errors.rating && (
          <p className="text-red-500 text-sm mt-1">{errors.rating}</p>
        )}
      </div>

      <div>
        <Label htmlFor="author">الاسم *</Label>
        <Input
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="أدخل اسمك"
          className="mt-1"
        />
        {errors.author && (
          <p className="text-red-500 text-sm mt-1">{errors.author}</p>
        )}
      </div>

      <div>
        <Label htmlFor="comment">التعليق *</Label>
        <Textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="اكتب رأيك في المنتج..."
          className="mt-1"
          rows={4}
        />
        {errors.comment && (
          <p className="text-red-500 text-sm mt-1">{errors.comment}</p>
        )}
      </div>

      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
        إرسال التقييم
      </Button>
    </form>
  );
};
