/** Supported gold karats. Single source of truth for the whole app. */
export const KARATS = ['18K', '21K', '22K', '24K'] as const;
export type Karat = (typeof KARATS)[number];

/** Gold purity of each karat (karat / 24). Used to derive prices from 24K. */
export const KARAT_PURITY: Record<Karat, number> = {
  '18K': 18 / 24,
  '21K': 21 / 24,
  '22K': 22 / 24,
  '24K': 1,
};

/** Simulated loading time (ms) so the loading skeletons are visible in the demo. */
export const LOADING_DELAY_MS = 900;

/** Date of the latest price (the "today" of the data). */
export const LATEST_PRICE_DATE = new Date(2026, 9, 4, 12, 0);

/**
 * 24K gold price per gram in Oman (OMR) for the last 30 days, oldest (5 Sep 2026) -> newest (4 Oct 2026).
 *
 * Researched on 4 October 2026:
 * - Today's price (4 Oct 2026): 24K = 51.20 OMR/g. Checked against goldrateoman.com (51.20),
 *   exchange-rates.org (51.202) and goldpricez.com (51.28). The other karats are derived from 24K
 *   by purity, which matches the published rates (22K 46.93, 21K 44.80, 18K 38.40).
 * - 30-day range published by goldrateoman.com: start 54.78, high 54.78, low 51.01, latest 51.20.
 * - Daily prices of 23 - 30 Sep 2026 follow policybazaar.com (54.0 -> 51.0 OMR/g).
 *
 * The daily values in between are an approximation shaped to match those published figures
 * (the sources do not offer a downloadable daily history). Prices are international-spot based
 * reference rates; jewellery shops add making charges and margin.
 */
export const SAMPLE_24K_PRICES: readonly number[] = [
  54.78, 54.7, 54.74, 54.55, 54.61,
  54.42, 54.48, 54.3, 54.36, 54.52,
  54.4, 54.21, 54.27, 54.12, 54.18,
  54.05, 54.11, 54.22, 54.0, 53.1,
  52.8, 53.0, 53.0, 52.68, 51.05,
  51.03, 51.08, 51.04, 51.01, 51.2,
];
