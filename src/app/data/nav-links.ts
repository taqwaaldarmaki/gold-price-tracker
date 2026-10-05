import { TranslationKey } from './translations';

export interface NavLink {
  /** id of the page section to scroll to */
  sectionId: string;
  labelKey: TranslationKey;
}

export const NAV_LINKS: readonly NavLink[] = [
  { sectionId: 'prices', labelKey: 'navPrices' },
  { sectionId: 'calculator', labelKey: 'navCalculator' },
  { sectionId: 'trend', labelKey: 'navTrend' },
  { sectionId: 'history', labelKey: 'navHistory' },
];
