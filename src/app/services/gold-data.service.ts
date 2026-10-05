import { Injectable, afterNextRender, signal } from '@angular/core';
import {
  KARATS,
  KARAT_PURITY,
  Karat,
  LATEST_PRICE_DATE,
  LOADING_DELAY_MS,
  SAMPLE_24K_PRICES,
} from '../data/gold-data';

export interface GoldPrice {
  karat: Karat;
  price: number;
}

export interface HistoryRow {
  /** 0 = today, 1 = yesterday, ... */
  daysAgo: number;
  date: Date;
  prices: Record<Karat, number>;
}

const DAY_IN_MS = 24 * 60 * 60 * 1000;

/** Provides all (static) gold data so every component reads the same numbers. */
@Injectable({ providedIn: 'root' })
export class GoldDataService {
  readonly karats = KARATS;

  /** Prices per karat, oldest -> newest. */
  private readonly seriesByKarat = this.buildSeries();

  /** Today's price for each karat (the last day of the series). */
  readonly todayPrices: GoldPrice[] = KARATS.map((karat) => ({
    karat,
    price: this.getTodayPrice(karat),
  }));

  /** Last 30 days, newest first (used by the history table). */
  readonly history: HistoryRow[] = this.buildHistory();

  readonly lastUpdated = LATEST_PRICE_DATE;

  /** True until the (simulated) data has "loaded". Drives the loading skeletons. */
  readonly isLoading = signal(true);

  constructor() {
    afterNextRender(() => {
      setTimeout(() => this.isLoading.set(false), LOADING_DELAY_MS);
    });
  }

  /** 30-day prices of a karat, oldest -> newest. */
  getSeries(karat: Karat): readonly number[] {
    return this.seriesByKarat[karat];
  }

  getTodayPrice(karat: Karat): number {
    const series = this.seriesByKarat[karat];
    return series[series.length - 1];
  }

  private buildSeries(): Record<Karat, number[]> {
    const toKaratPrices = (karat: Karat) =>
      SAMPLE_24K_PRICES.map((price) => Math.round(price * KARAT_PURITY[karat] * 1000) / 1000);

    return {
      '18K': toKaratPrices('18K'),
      '21K': toKaratPrices('21K'),
      '22K': toKaratPrices('22K'),
      '24K': toKaratPrices('24K'),
    };
  }

  private buildHistory(): HistoryRow[] {
    const lastIndex = SAMPLE_24K_PRICES.length - 1;

    return SAMPLE_24K_PRICES.map((_, daysAgo) => {
      const seriesIndex = lastIndex - daysAgo;

      return {
        daysAgo,
        date: new Date(LATEST_PRICE_DATE.getTime() - daysAgo * DAY_IN_MS),
        prices: {
          '18K': this.seriesByKarat['18K'][seriesIndex],
          '21K': this.seriesByKarat['21K'][seriesIndex],
          '22K': this.seriesByKarat['22K'][seriesIndex],
          '24K': this.seriesByKarat['24K'][seriesIndex],
        },
      };
    });
  }
}
