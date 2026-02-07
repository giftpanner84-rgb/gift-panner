import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { CartItem } from '@/types/product';
import { ShoppingCart, Plus, Minus, Trash2, X } from 'lucide-react';

interface CartDrawerProps {
  items: CartItem[];
  total: number;
  itemCount: number;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemove: (productId: number) => void;
  onClear: () => void;
}

export const CartDrawer = ({
  items,
  total,
  itemCount,
  onUpdateQuantity,
  onRemove,
  onClear
}: CartDrawerProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="relative">
          <ShoppingCart className="w-5 h-5 ml-2" />
          السلة
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      
      <SheetContent side="left" className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            <span>سلة التسوق ({itemCount})</span>
            {items.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClear}
                className="text-red-500"
              >
                <Trash2 className="w-4 h-4 ml-1" />
                إفراغ
              </Button>
            )}
          </SheetTitle>
        </SheetHeader>
        
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh] text-gray-500">
            <ShoppingCart className="w-16 h-16 mb-4 text-gray-300" />
            <p className="text-lg">السلة فارغة</p>
            <p className="text-sm">أضف بعض المنتجات للبدء</p>
          </div>
        ) : (
          <>
            <ScrollArea className="h-[calc(100vh-200px)] mt-4">
              <div className="space-y-4 pr-4">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-4 bg-gray-50 p-3 rounded-lg"
                  >
                    <img
                      src={item.product.image || 'https://via.placeholder.com/80'}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-md"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/80';
                      }}
                    />
                    
                    <div className="flex-1">
                      <h4 className="font-medium text-sm line-clamp-2">
                        {item.product.name}
                      </h4>
                      <p className="text-blue-600 font-semibold mt-1">
                        {item.product.price.toFixed(2)} ج.م
                      </p>
                      
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        
                        <span className="w-8 text-center font-medium">
                          {item.quantity}
                        </span>
                        
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-red-500 mr-auto"
                          onClick={() => onRemove(item.product.id)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">الإجمالي:</span>
                <span className="text-xl font-bold text-blue-600">
                  {total.toFixed(2)} ج.م
                </span>
              </div>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                إتمام الطلب
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};
