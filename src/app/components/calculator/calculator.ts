import { Component, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Karat } from '../../data/gold-data';
import { TranslationKey } from '../../data/translations';
import { GoldDataService } from '../../services/gold-data.service';
import { LanguageService } from '../../services/language.service';
import { Icon } from '../icon/icon';
import { SectionTitle } from '../section-title/section-title';

interface CalculationResult {
  karat: Karat;
  weight: number;
  pricePerGram: number;
  total: number;
}

@Component({
  selector: 'app-calculator',
  imports: [FormsModule, DecimalPipe, Icon, SectionTitle],
  templateUrl: './calculator.html',
})
export class Calculator {
  private readonly goldData = inject(GoldDataService);

  readonly i18n = inject(LanguageService);
  readonly karats = this.goldData.karats;

  readonly selectedKarat = signal<Karat>('24K');
  readonly weight = signal<number | null>(null);
  readonly result = signal<CalculationResult | null>(null);
  readonly errorKey = signal<TranslationKey | null>(null);

  onKaratChange(karat: Karat): void {
    this.selectedKarat.set(karat);
    this.resetResult();
  }

  onWeightChange(weight: number | null): void {
    this.weight.set(weight);
    this.resetResult();
  }

  calculateGoldValue(): void {
    const weight = this.weight();

    if (weight === null || !Number.isFinite(weight) || weight <= 0) {
      this.result.set(null);
      this.errorKey.set('weightError');
      return;
    }

    const karat = this.selectedKarat();
    const pricePerGram = this.goldData.getTodayPrice(karat);

    this.errorKey.set(null);
    this.result.set({ karat, weight, pricePerGram, total: weight * pricePerGram });
  }

  /** Inputs changed: the old result no longer matches them. */
  private resetResult(): void {
    this.result.set(null);
    this.errorKey.set(null);
  }
}
