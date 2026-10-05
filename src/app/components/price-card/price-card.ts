import { Component, inject, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { LanguageService } from '../../services/language.service';
import { Icon } from '../icon/icon';
import { Skeleton } from '../skeleton/skeleton';

/** Reusable card showing today's price for a single karat. Turns blue on hover. */
@Component({
  selector: 'app-price-card',
  imports: [DecimalPipe, Icon, Skeleton],
  templateUrl: './price-card.html',
})
export class PriceCard {
  readonly i18n = inject(LanguageService);

  readonly karat = input.required<string>();
  readonly price = input.required<number>();
  /** Show placeholders instead of the price while data is loading. */
  readonly loading = input(false);
}
