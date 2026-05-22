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
      bracelet: 'Bracelet',
      agarwood: 'Agarwood',
      about: 'About',
      contact: 'Contact',
    },
    hero: {
      title: 'fianser',
      subtitle: 'Quality Life, Starts with Choice',
      tagline: 'Swimwear · Bracelet · Agarwood',
      cta: 'Explore Collection',
    },
    categories: {
      title: 'Product Collections',
      subtitle: 'Three curated categories, each embodies our pursuit of quality',
      swimwear: {
        title: 'Swimwear',
        description: 'Lightweight & quick-dry, move freely',
      },
      bracelet: {
        title: 'Bracelet',
        description: 'Crafted with care, smooth as jade',
      },
      agarwood: {
        title: 'Agarwood',
        description: 'Natural & rich, calming the mind',
      },
    },
    featured: {
      title: 'Featured Products',
      subtitle: 'Each piece carefully selected to define quality living',
      viewAll: 'View All Products',
    },
    about: {
      title: 'About fianser',
      description: 'fianser was founded from a passion for quality living. We believe the true luxury in life is not expensive price tags, but objects that touch the heart and accompany time.',
      learnMore: 'Learn More',
    },
    footer: {
      description: 'Premium lifestyle brand, dedicated to providing exquisite products including swimwear, bracelets, and agarwood.',
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
      buyNow: 'Buy at Tmall Store',
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
      tmallStore: 'Tmall Store',
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
      bracelet: 'الأساور',
      agarwood: 'العود',
      about: 'عن الشركة',
      contact: 'اتصل بنا',
    },
    hero: {
      title: 'fianser',
      subtitle: 'حياة الجودة تبدأ بالاختيار',
      tagline: 'ملابس السباحة · الأساور · العود',
      cta: 'استكشف المجموعة',
    },
    categories: {
      title: 'مجموعات المنتجات',
      subtitle: 'ثلاث فئات مختارة، كل منها تجسد سعينا للجودة',
      swimwear: {
        title: 'ملابس السباحة',
        description: 'خفيفة وسريعة الجفاف، حرية الحركة',
      },
      bracelet: {
        title: 'الأساور',
        description: 'مصنوعة بعناية، ناعمة كاليشم',
      },
      agarwood: {
        title: 'العود',
        description: 'طبيعي وغني، يهدئ العقل',
      },
    },
    featured: {
      title: 'المنتجات المميزة',
      subtitle: 'كل قطعة مختارة بعناية لتعريف الجودة',
      viewAll: 'عرض جميع المنتجات',
    },
    about: {
      title: 'عن fianser',
      description: 'تأسست fianser من شغف لحياة الجودة. نؤمن أن الفخامة الحقيقية ليست في الأسعار المرتفعة، بل في الأشياء التي تلمس القلب وتصاحب الزمن.',
      learnMore: 'اعرف المزيد',
    },
    footer: {
      description: 'علامة تجارية للحياة الفاخرة، مكرسة لتقديم منتجات راقية تشمل ملابس السباحة والأساور والعود.',
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
      buyNow: 'اشتر من متجر Tmall',
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
      tmallStore: 'متجر Tmall',
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
