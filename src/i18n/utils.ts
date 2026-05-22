export const languages = {
  en: 'English',
  ar: 'العربية',
};

export const defaultLang = 'en';

export type Lang = keyof typeof languages;

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) return lang as Lang;
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: string): string {
    const keys = key.split('.');
    let value: any = translations[lang];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };
}

export function getRouteFromUrl(url: URL): string {
  const pathname = url.pathname;
  const parts = pathname.split('/');
  parts.splice(0, 2);
  return '/' + parts.join('/');
}

export const translations: Record<Lang, any> = {
  en: {
    nav: {
      home: 'Home',
      swimwear: 'Swimwear',
      agarwood: 'Agarwood',
      candle: 'Candle',
      about: 'About',
      contact: 'Contact',
    },
    hero: {
      title: 'fianser',
      subtitle: 'Modest Fashion & Quality Life',
      tagline: 'Swimwear · Agarwood · Candle',
      cta: 'Explore Collection',
    },
    categories: {
      title: 'Our Collection',
      subtitle: 'Carefully curated products for quality living',
      swimwear: {
        title: 'Swimwear',
        description: 'Full coverage, sun protection, modest style',
      },
      agarwood: {
        title: 'Agarwood',
        description: 'Natural fragrance, calming the mind',
      },
      candle: {
        title: 'Candle',
        description: 'Handmade scented, relaxing atmosphere',
      },
    },
    featured: {
      title: 'Featured Products',
      subtitle: 'Each piece carefully selected for quality and style',
      viewAll: 'View All Products',
    },
    about: {
      title: 'About fianser',
      description: 'fianser offers premium modest swimwear with full coverage and sun protection for the modern woman.',
      learnMore: 'Learn More',
    },
    footer: {
      description: 'Premium modest swimwear brand, dedicated to quality and style.',
      products: 'Product Series',
      info: 'About Us',
      brandStory: 'Brand Story',
      contactUs: 'Contact Us',
      faq: 'FAQ',
      privacy: 'Privacy Policy',
      shipping: 'Shipping Info',
      rights: 'All rights reserved.',
    },
    product: {
      buyNow: 'Buy Now',
      material: 'Material',
      size: 'Size',
      weight: 'Weight',
      origin: 'Origin',
    },
    contact: {
      title: 'Contact Us',
      form: 'Leave a Message',
      name: 'Name',
      email: 'Email',
      message: 'Message',
      submit: 'Submit',
      info: 'Contact Information',
      phone: 'Customer Service',
      phoneNote: 'Weekdays 9:00 - 18:00',
      social: 'Social Media',
      weibo: 'Weibo',
      wechat: 'WeChat',
      xiaohongshu: 'Xiaohongshu',
      buyChannel: 'Purchase Channel',
      tmallStore: 'Online Store',
    },
    faq: {
      title: 'Frequently Asked Questions',
      notFound: 'Didn\'t find your answer?',
      contactLink: 'Contact Us',
    },
    brand: {
      title: 'Brand Story',
      quality: 'Quality Promise',
      design: 'Design Philosophy',
      vision: 'Brand Vision',
    },
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      swimwear: 'ملابس السباحة',
      agarwood: 'العود',
      candle: 'الشموع',
      about: 'عن الشركة',
      contact: 'اتصل بنا',
    },
    hero: {
      title: 'fianser',
      subtitle: 'الموضة المحتشمة وحياة الجودة',
      tagline: 'ملابس السباحة · العود · الشموع',
      cta: 'استكشف المجموعة',
    },
    categories: {
      title: 'مجموعتنا',
      subtitle: 'منتجات مختارة بعناية لحياة الجودة',
      swimwear: {
        title: 'ملابس السباحة',
        description: 'تغطية كاملة، حماية من الشمس، نمط محتشم',
      },
      agarwood: {
        title: 'العود',
        description: 'عطر طبيعي، يهدئ العقل',
      },
      candle: {
        title: 'الشموع',
        description: 'شموع معطرة يدوية، جو مريح',
      },
    },
    featured: {
      title: 'المنتجات المميزة',
      subtitle: 'كل قطعة مختارة بعناية للجودة والأناقة',
      viewAll: 'عرض جميع المنتجات',
    },
    about: {
      title: 'عن fianser',
      description: 'تقدم fianser ملابس سباحة محتشمة فاخرة بتغطية كاملة وحماية من الشمس للمرأة العصرية.',
      learnMore: 'اعرف المزيد',
    },
    footer: {
      description: 'علامة تجارية لملابس سباحة محتشمة فاخرة، مكرسة للجودة والأناقة.',
      products: 'سلسلة المنتجات',
      info: 'عن الشركة',
      brandStory: 'قصة العلامة',
      contactUs: 'اتصل بنا',
      faq: 'الأسئلة الشائعة',
      privacy: 'سياسة الخصوصية',
      shipping: 'معلومات الشحن',
      rights: 'جميع الحقوق محفوظة.',
    },
    product: {
      buyNow: 'اشتر الآن',
      material: 'المادة',
      size: 'الحجم',
      weight: 'الوزن',
      origin: 'المنشأ',
    },
    contact: {
      title: 'اتصل بنا',
      form: 'اترك رسالة',
      name: 'الاسم',
      email: 'البريد الإلكتروني',
      message: 'الرسالة',
      submit: 'إرسال',
      info: 'معلومات الاتصال',
      phone: 'خدمة العملاء',
      phoneNote: 'أيام الأسبوع 9:00 - 18:00',
      social: 'وسائل التواصل',
      weibo: 'ويبو',
      wechat: 'وي تشات',
      xiaohongshu: 'شياو هونغ شو',
      buyChannel: 'قناة الشراء',
      tmallStore: 'المتجر الإلكتروني',
    },
    faq: {
      title: 'الأسئلة الشائعة',
      notFound: 'لم تجد إجابتك؟',
      contactLink: 'اتصل بنا',
    },
    brand: {
      title: 'قصة العلامة',
      quality: 'وعد الجودة',
      design: 'فلسفة التصميم',
      vision: 'رؤية العلامة',
    },
  },
};
