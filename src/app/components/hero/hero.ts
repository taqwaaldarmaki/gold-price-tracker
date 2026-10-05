import { Component, inject } from '@angular/core';
import { GoldDataService } from '../../services/gold-data.service';
import { LanguageService } from '../../services/language.service';
import { Icon } from '../icon/icon';

@Component({
  selector: 'app-hero',
  imports: [Icon],
  templateUrl: './hero.html',
})
export class Hero {
  readonly i18n = inject(LanguageService);
  readonly lastUpdated = inject(GoldDataService).lastUpdated;
}
