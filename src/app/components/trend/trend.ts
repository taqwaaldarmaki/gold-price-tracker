import { Component, computed, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Karat } from '../../data/gold-data';
import { TranslationKey } from '../../data/translations';
import { GoldDataService } from '../../services/gold-data.service';
import { LanguageService } from '../../services/language.service';
import { Point, smoothPath } from '../../utils/smooth-path';
import { Icon, IconName } from '../icon/icon';
import { SectionTitle } from '../section-title/section-title';
import { Skeleton } from '../skeleton/skeleton';

/** The SVG is drawn in a 800 x 300 box and scaled to the container. */
const CHART_WIDTH = 800;
const CHART_HEIGHT = 300;
const Y_TICK_COUNT = 4;
const X_LABEL_COUNT = 5;

interface SummaryCard {
  labelKey: TranslationKey;
  value: number;
  icon: IconName;
  iconClass: string;
}

@Component({
  selector: 'app-trend',
  imports: [DecimalPipe, Icon, SectionTitle, Skeleton],
  templateUrl: './trend.html',
})
export class Trend {
  private readonly goldData = inject(GoldDataService);

  readonly i18n = inject(LanguageService);
  readonly karats = this.goldData.karats;
  readonly isLoading = this.goldData.isLoading;
  readonly chartWidth = CHART_WIDTH;
  readonly chartHeight = CHART_HEIGHT;

  readonly selectedKarat = signal<Karat>('24K');
  /** Index of the day under the pointer (null when the pointer is not on the chart). */
  readonly hoverIndex = signal<number | null>(null);

  /** 30-day prices of the selected karat, oldest -> newest. */
  private readonly prices = computed(() => this.goldData.getSeries(this.selectedKarat()));
  /** Dates matching `prices`, oldest -> newest. */
  private readonly dates = [...this.goldData.history].reverse().map((row) => row.date);

  readonly currentPrice = computed(() => this.prices().at(-1) ?? 0);
  readonly previousPrice = computed(() => this.prices().at(-2) ?? this.currentPrice());
  readonly highestPrice = computed(() => Math.max(...this.prices()));
  readonly lowestPrice = computed(() => Math.min(...this.prices()));
  readonly change = computed(() => this.currentPrice() - this.previousPrice());
  readonly changePercent = computed(() => (this.change() / this.previousPrice()) * 100);

  readonly summaryCards = computed<SummaryCard[]>(() => [
    { labelKey: 'currentPrice', value: this.currentPrice(), icon: 'sparkle', iconClass: 'text-muted' },
    { labelKey: 'highestPrice', value: this.highestPrice(), icon: 'arrow-up-right', iconClass: 'text-up' },
    { labelKey: 'lowestPrice', value: this.lowestPrice(), icon: 'arrow-down-right', iconClass: 'text-down' },
  ]);

  /** Price range shown by the chart (a little wider than the data so the line never touches the edges). */
  private readonly domain = computed(() => {
    const min = this.lowestPrice();
    const max = this.highestPrice();
    const padding = (max - min) * 0.18 || 1;
    return { min: min - padding, max: max + padding };
  });

  private readonly points = computed<Point[]>(() =>
    this.prices().map((price, index) => ({ x: this.getX(index), y: this.getY(price) })),
  );

  readonly linePath = computed(() => smoothPath(this.points()));
  readonly areaPath = computed(() => `${this.linePath()} L ${CHART_WIDTH} ${CHART_HEIGHT} L 0 ${CHART_HEIGHT} Z`);

  /** Horizontal grid lines with their price labels, top to bottom. */
  readonly yTicks = computed(() => {
    const { min, max } = this.domain();
    return Array.from({ length: Y_TICK_COUNT }, (_, index) => {
      const ratio = index / (Y_TICK_COUNT - 1);
      return { value: max - ratio * (max - min), percent: ratio * 100, y: ratio * CHART_HEIGHT };
    });
  });

  /** Dates under the chart (first ... last). */
  readonly xLabels = computed(() => {
    const lastIndex = this.prices().length - 1;
    return Array.from({ length: X_LABEL_COUNT }, (_, index) =>
      this.dates[Math.round((index * lastIndex) / (X_LABEL_COUNT - 1))],
    );
  });

  /** The highlighted point: the hovered day, or today when nothing is hovered. */
  readonly activePoint = computed(() => {
    const index = this.hoverIndex() ?? this.prices().length - 1;
    const price = this.prices()[index];
    return {
      price,
      date: this.dates[index],
      leftPercent: (this.getX(index) / CHART_WIDTH) * 100,
      topPercent: (this.getY(price) / CHART_HEIGHT) * 100,
    };
  });

  /** Keeps the tooltip inside the chart. */
  readonly tooltipLeftPercent = computed(() => Math.min(86, Math.max(14, this.activePoint().leftPercent)));

  selectKarat(karat: Karat): void {
    this.selectedKarat.set(karat);
    this.hoverIndex.set(null);
  }

  onChartPointerMove(event: PointerEvent): void {
    const chart = event.currentTarget as HTMLElement;
    const { left, width } = chart.getBoundingClientRect();
    if (width === 0) return;

    const ratio = Math.min(1, Math.max(0, (event.clientX - left) / width));
    this.hoverIndex.set(Math.round(ratio * (this.prices().length - 1)));
  }

  onChartPointerLeave(): void {
    this.hoverIndex.set(null);
  }

  private getX(index: number): number {
    return (index / (this.prices().length - 1)) * CHART_WIDTH;
  }

  private getY(price: number): number {
    const { min, max } = this.domain();
    return CHART_HEIGHT - ((price - min) / (max - min)) * CHART_HEIGHT;
  }
}
