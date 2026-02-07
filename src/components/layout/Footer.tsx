import { Link } from 'react-router-dom';
import { Facebook, Instagram, Phone, Mail, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">G</span>
              </div>
              <span className="font-bold text-xl text-white">Gift Panner</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              وجهتك الأولى لأجمل ملصقات الحائط والاستيكرات. نحول جدرانك إلى تحف فنية 
              بأعلى جودة وأفضل الأسعار.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-blue-400 transition-colors">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link to="/#products" className="hover:text-blue-400 transition-colors">
                  المنتجات
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-blue-400 transition-colors">
                  من نحن
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-blue-400 transition-colors">
                  تواصل معنا
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">تواصل معنا</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-blue-400" />
                <span dir="ltr">01017751682</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-blue-400" />
                <span dir="ltr">giftpanner84@gmail.com</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-400" />
                <span>3 شارع الرصافة، محرم بيه، الإسكندرية</span>
              </li>
            </ul>
            
            {/* Social */}
            <div className="flex items-center gap-4 mt-4">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-500">
            © {new Date().getFullYear()} Gift Panner. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
};
