import { useState, useEffect, useCallback } from 'react';
import type { Review } from '@/types/product';

const STORAGE_KEY = 'gift_panner_reviews';

export const useReviews = (productId: number) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [averageRating, setAverageRating] = useState(0);

  // Load reviews from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const allReviews: Review[] = JSON.parse(stored);
      const productReviews = allReviews.filter(r => r.productId === productId);
      setReviews(productReviews);
      
      // Calculate average
      if (productReviews.length > 0) {
        const avg = productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length;
        setAverageRating(Math.round(avg * 10) / 10);
      }
    }
  }, [productId]);

  const addReview = useCallback((rating: number, comment: string, author: string) => {
    const newReview: Review = {
      id: Date.now().toString(),
      productId,
      rating,
      comment,
      author,
      date: new Date().toISOString()
    };

    const stored = localStorage.getItem(STORAGE_KEY);
    const allReviews: Review[] = stored ? JSON.parse(stored) : [];
    
    const updatedReviews = [...allReviews, newReview];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedReviews));
    
    const productReviews = updatedReviews.filter(r => r.productId === productId);
    setReviews(productReviews);
    
    if (productReviews.length > 0) {
      const avg = productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length;
      setAverageRating(Math.round(avg * 10) / 10);
    }

    return newReview;
  }, [productId]);

  const deleteReview = useCallback((reviewId: string) => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return;
    
    const allReviews: Review[] = JSON.parse(stored);
    const updatedReviews = allReviews.filter(r => r.id !== reviewId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedReviews));
    
    const productReviews = updatedReviews.filter(r => r.productId === productId);
    setReviews(productReviews);
    
    if (productReviews.length > 0) {
      const avg = productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length;
      setAverageRating(Math.round(avg * 10) / 10);
    } else {
      setAverageRating(0);
    }
  }, [productId]);

  return {
    reviews,
    averageRating,
    reviewCount: reviews.length,
    addReview,
    deleteReview
  };
};

export const getAllReviews = (): Review[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const getProductRating = (productId: number): { average: number; count: number } => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return { average: 0, count: 0 };
  
  const allReviews: Review[] = JSON.parse(stored);
  const productReviews = allReviews.filter(r => r.productId === productId);
  
  if (productReviews.length === 0) return { average: 0, count: 0 };
  
  const average = productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length;
  return { average: Math.round(average * 10) / 10, count: productReviews.length };
};
