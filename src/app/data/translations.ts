/** All UI texts, per language. Arabic is the source of truth for the keys. */
const ar = {
  // Site
  siteName: 'الذهب العُماني',
  siteNameAlt: 'Omani Gold',
  pageTitle: 'الذهب العُماني',
  logoAlt: 'شعار الذهب العُماني',
  homeLink: 'الذهب العُماني - الصفحة الرئيسية',
  demoData: 'بيانات مرجعية',
  loading: 'جارٍ التحميل...',

  // Header
  navPrices: 'الأسعار',
  navCalculator: 'حاسبة الذهب',
  navTrend: 'اتجاه الأسعار',
  navHistory: 'سجل الأسعار',
  mainNav: 'التنقل الرئيسي',
  menu: 'القائمة',
  toggleTheme: 'تبديل الوضع الليلي',
  languageToggleLabel: 'English',
  languageToggleAria: 'Switch to English',

  // Hero
  breadcrumbHome: 'الرئيسية',
  breadcrumbPage: 'أسعار الذهب',
  heroBadge: 'أسعار الذهب في سلطنة عُمان',
  heroTitle: 'تابع أسعار الذهب في عُمان بسهولة',
  heroText:
    'تعرف على أسعار الذهب الحالية، احسب قيمة الذهب حسب الوزن والعيار، وتابع تغير الأسعار خلال آخر 30 يومًا.',
  lastUpdated: 'آخر تحديث',
  market: 'السوق',
  marketValue: 'سلطنة عُمان',

  // Common
  goldKarat: 'عيار الذهب',
  currentPrice: 'السعر الحالي',
  currency: 'ر.ع',
  priceUnit: 'ر.ع / غرام',

  // Prices
  pricesTitle: 'أسعار الذهب اليوم',
  pricesSubtitle: 'أسعار الذهب في سلطنة عُمان حسب العيار',

  // Calculator
  calculatorTitle: 'حاسبة الذهب',
  calculatorSubtitle: 'احسب القيمة التقديرية للذهب حسب العيار والوزن',
  weightLabel: 'الوزن بالجرام',
  weightPlaceholder: 'مثال: 10',
  weightError: 'الرجاء إدخال وزن صحيح أكبر من صفر',
  calculateButton: 'احسب القيمة',
  estimatedValue: 'القيمة التقديرية',
  resultSummary: 'عيار {karat} — وزن {weight} جرام',
  pricePerGram: 'سعر الغرام',
  calculatorEmpty: 'اختر العيار وأدخل الوزن ثم اضغط «احسب القيمة» لعرض القيمة التقديرية',

  // Trend
  trendTitle: 'اتجاه أسعار الذهب',
  trendSubtitle: 'متابعة تغير أسعار الذهب خلال آخر 30 يومًا',
  chooseKarat: 'اختيار العيار',
  highestPrice: 'أعلى سعر',
  lowestPrice: 'أقل سعر',
  chartTitle: 'تغير السعر خلال 30 يوم',
  karatLabel: 'عيار {karat}',
  chartAria: 'مخطط أسعار الذهب عيار {karat} خلال 30 يومًا',
  thirtyDaysAgo: 'قبل 30 يوم',
  today: 'اليوم',
  previousPrice: 'السعر السابق',
  change: 'التغير',

  // History
  historyTitle: 'سجل أسعار الذهب',
  historySubtitle: 'أسعار الذهب في سلطنة عُمان خلال آخر 30 يومًا',
  columnDay: 'اليوم',
  columnDate: 'التاريخ',
  yesterday: 'أمس',
  twoDaysAgo: 'قبل يومين',
  daysAgoFew: 'قبل {n} أيام',
  daysAgoMany: 'قبل {n} يومًا',

  // Footer
  builtBy: 'تنفيذ: تقوى الدرمكي',
  backToTop: 'العودة للأعلى',
} as const;

export type TranslationKey = keyof typeof ar;
export type Lang = 'ar' | 'en';

const en: Record<TranslationKey, string> = {
  // Site
  siteName: 'Omani Gold',
  siteNameAlt: 'الذهب العُماني',
  pageTitle: 'Omani Gold',
  logoAlt: 'Omani Gold logo',
  homeLink: 'Omani Gold - Home',
  demoData: 'Reference data',
  loading: 'Loading...',

  // Header
  navPrices: 'Prices',
  navCalculator: 'Calculator',
  navTrend: 'Price trend',
  navHistory: 'Price history',
  mainNav: 'Main navigation',
  menu: 'Menu',
  toggleTheme: 'Toggle dark mode',
  languageToggleLabel: 'العربية',
  languageToggleAria: 'التبديل إلى العربية',

  // Hero
  breadcrumbHome: 'Home',
  breadcrumbPage: 'Gold prices',
  heroBadge: 'Gold prices in Oman',
  heroTitle: 'Track gold prices in Oman with ease',
  heroText:
    "See today's gold prices, calculate the value of your gold by weight and karat, and follow price changes over the last 30 days.",
  lastUpdated: 'Last updated',
  market: 'Market',
  marketValue: 'Sultanate of Oman',

  // Common
  goldKarat: 'Gold karat',
  currentPrice: 'Current price',
  currency: 'OMR',
  priceUnit: 'OMR / gram',

  // Prices
  pricesTitle: "Today's gold prices",
  pricesSubtitle: 'Gold prices in the Sultanate of Oman by karat',

  // Calculator
  calculatorTitle: 'Gold calculator',
  calculatorSubtitle: 'Estimate the value of your gold by karat and weight',
  weightLabel: 'Weight (grams)',
  weightPlaceholder: 'e.g. 10',
  weightError: 'Please enter a valid weight greater than zero',
  calculateButton: 'Calculate',
  estimatedValue: 'Estimated value',
  resultSummary: '{karat} karat — {weight} g',
  pricePerGram: 'Price per gram',
  calculatorEmpty: 'Choose a karat, enter the weight, then press "Calculate" to see the estimated value',

  // Trend
  trendTitle: 'Gold price trend',
  trendSubtitle: 'Follow gold price changes over the last 30 days',
  chooseKarat: 'Select karat',
  highestPrice: 'Highest price',
  lowestPrice: 'Lowest price',
  chartTitle: 'Price change over 30 days',
  karatLabel: '{karat} karat',
  chartAria: 'Gold price chart for {karat} over the last 30 days',
  thirtyDaysAgo: '30 days ago',
  today: 'Today',
  previousPrice: 'Previous price',
  change: 'Change',

  // History
  historyTitle: 'Gold price history',
  historySubtitle: 'Gold prices in the Sultanate of Oman over the last 30 days',
  columnDay: 'Day',
  columnDate: 'Date',
  yesterday: 'Yesterday',
  twoDaysAgo: '2 days ago',
  daysAgoFew: '{n} days ago',
  daysAgoMany: '{n} days ago',

  // Footer
  builtBy: 'Built by Taqwa Al-Darmaki',
  backToTop: 'Back to top',
};

export const TRANSLATIONS: Record<Lang, Record<TranslationKey, string>> = { ar, en };
