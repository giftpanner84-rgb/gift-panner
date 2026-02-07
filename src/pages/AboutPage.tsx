import { Sparkles, Target, Heart, Award, Phone, Mail, MapPin } from 'lucide-react';

export const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            من نحن
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Gift Panner - وجهتك الأولى لأجمل ملصقات الحائط والاستيكرات
          </p>
        </div>

        {/* Story */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">قصتنا</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            بدأت Gift Panner رحلتها في عام 2021 بهدف بسيط: تحويل الجدران العادية إلى تحف فنية 
            ملهمة. نؤمن بأن كل جدار يحكي قصة، وكل ملصق يضيف لمسة من الجمال والإبداع إلى 
            المساحات التي نعيش فيها.
          </p>
          <p className="text-gray-600 leading-relaxed">
            منذ ذلك الحين، نمونا لنصبح واحدة من أكبر منصات بيع ملصقات الحائط في مصر، 
            مع أكثر من 3500 منتج متنوع يناسب جميع الأذواق والمناسبات.
          </p>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-sm p-6 text-center">
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Target className="w-7 h-7 text-blue-600" />
            </div>
            <h3 className="font-bold text-lg mb-2">جودة عالية</h3>
            <p className="text-gray-600">
              نستخدم أفضل مواد الفينيل المقاوم للماء والخدوش لضمان منتجات تدوم لسنوات
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 text-center">
            <div className="w-14 h-14 bg-pink-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Heart className="w-7 h-7 text-pink-600" />
            </div>
            <h3 className="font-bold text-lg mb-2">تصاميم فريدة</h3>
            <p className="text-gray-600">
              نقدم تشكيلة واسعة من التصاميم المبتكرة التي تناسب جميع الأذواق والمناسبات
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 text-center">
            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Award className="w-7 h-7 text-green-600" />
            </div>
            <h3 className="font-bold text-lg mb-2">خدمة ممتازة</h3>
            <p className="text-gray-600">
              فريق دعم العملاء لدينا جاهز دائماً لمساعدتك في اختيار المنتج المناسب
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-sm p-8 mt-8 text-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">3500+</div>
              <div className="text-blue-100">منتج متنوع</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">10000+</div>
              <div className="text-blue-100">عميل سعيد</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">27</div>
              <div className="text-blue-100">محافظة نغطيها</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">4+</div>
              <div className="text-blue-100">سنوات خبرة</div>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            معلومات التواصل
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4 justify-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Phone className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">الهاتف / واتساب</p>
                <p className="font-medium text-gray-900" dir="ltr">01017751682</p>
              </div>
            </div>

            <div className="flex items-center gap-4 justify-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">البريد الإلكتروني</p>
                <p className="font-medium text-gray-900" dir="ltr">giftpanner84@gmail.com</p>
              </div>
            </div>

            <div className="flex items-center gap-4 justify-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">العنوان</p>
                <p className="font-medium text-gray-900">3 شارع الرصافة، محرم بيه، الإسكندرية</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
