import { Component, inject } from '@angular/core';
import { GoldDataService } from '../../services/gold-data.service';
import { LanguageService } from '../../services/language.service';
import { PriceCard } from '../price-card/price-card';
import { SectionTitle } from '../section-title/section-title';

@Component({
  selector: 'app-prices',
  imports: [PriceCard, SectionTitle],
  templateUrl: './prices.html',
})
export class Prices {
  private readonly goldData = inject(GoldDataService);

  readonly i18n = inject(LanguageService);
  readonly goldPrices = this.goldData.todayPrices;
  readonly isLoading = this.goldData.isLoading;
}
