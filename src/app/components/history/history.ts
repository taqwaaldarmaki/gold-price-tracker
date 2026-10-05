import { Component, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { GoldDataService } from '../../services/gold-data.service';
import { LanguageService } from '../../services/language.service';
import { SectionTitle } from '../section-title/section-title';
import { Skeleton } from '../skeleton/skeleton';

@Component({
  selector: 'app-history',
  imports: [DecimalPipe, SectionTitle, Skeleton],
  templateUrl: './history.html',
})
export class History {
  private readonly goldData = inject(GoldDataService);

  readonly i18n = inject(LanguageService);
  readonly karats = this.goldData.karats;
  readonly rows = this.goldData.history;
  readonly isLoading = this.goldData.isLoading;

  /** Placeholder rows shown while loading. */
  readonly skeletonRows = Array.from({ length: 8 }, (_, index) => index);
  /** day + date + one column per karat */
  readonly skeletonColumns = Array.from({ length: this.karats.length + 2 }, (_, index) => index);
}
