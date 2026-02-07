import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Phone, MapPin, Home, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

const CUSTOMER_KEY = 'gift_panner_customer';

interface CustomerInfo {
  name: string;
  phone: string;
  address: string;
  altPhone: string;
}

export const CustomerInfoPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CustomerInfo>({
    name: '',
    phone: '',
    address: '',
    altPhone: ''
  });

  // Check if customer info already exists
  useEffect(() => {
    const stored = localStorage.getItem(CUSTOMER_KEY);
    if (stored) {
      navigate('/');
    }
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      toast.error('يرجى إدخال الاسم');
      return;
    }
    if (!formData.phone.trim()) {
      toast.error('يرجى إدخال رقم التليفون');
      return;
    }
    if (!formData.address.trim()) {
      toast.error('يرجى إدخال العنوان');
      return;
    }

    // Save to localStorage
    localStorage.setItem(CUSTOMER_KEY, JSON.stringify(formData));
    toast.success('تم حفظ البيانات بنجاح!');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg shadow-xl">
        <CardHeader className="text-center pb-2">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            أهلاً بك في Gift Panner
          </CardTitle>
          <p className="text-gray-500 mt-2">
            من فضلك أدخل بياناتك لإتمام طلبك
          </p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                الاسم بالكامل *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="أدخل اسمك الكامل"
                className="mt-1"
              />
            </div>

            {/* Phone */}
            <div>
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                رقم التليفون *
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="مثال: 01012345678"
                className="mt-1"
              />
            </div>

            {/* Alternative Phone */}
            <div>
              <Label htmlFor="altPhone" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                رقم تليفون بديل (اختياري)
              </Label>
              <Input
                id="altPhone"
                type="tel"
                value={formData.altPhone}
                onChange={(e) => setFormData({ ...formData, altPhone: e.target.value })}
                placeholder="مثال: 01112345678"
                className="mt-1"
              />
            </div>

            {/* Address */}
            <div>
              <Label htmlFor="address" className="flex items-center gap-2">
                <Home className="w-4 h-4" />
                العنوان بالتفصيل *
              </Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="المدينة، المنطقة، الشارع، رقم المبنى"
                className="mt-1"
              />
            </div>

            {/* Store Info */}
            <div className="bg-blue-50 p-4 rounded-lg mt-4">
              <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                معلومات التواصل
              </h4>
              <div className="text-sm text-blue-800 space-y-1">
                <p><strong>الهاتف:</strong> 01017751682</p>
                <p><strong>البريد:</strong> giftpanner84@gmail.com</p>
                <p><strong>العنوان:</strong> 3 شارع الرصافة، محرم بيه، الإسكندرية</p>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-lg"
            >
              حفظ البيانات والمتابعة
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export const getCustomerInfo = (): CustomerInfo | null => {
  const stored = localStorage.getItem(CUSTOMER_KEY);
  return stored ? JSON.parse(stored) : null;
};

export const clearCustomerInfo = () => {
  localStorage.removeItem(CUSTOMER_KEY);
};
