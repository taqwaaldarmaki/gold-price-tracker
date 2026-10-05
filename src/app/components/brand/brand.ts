import { Component, inject } from '@angular/core';
import { LanguageService } from '../../services/language.service';

/** Logo + site name. */
@Component({
  selector: 'app-brand',
  templateUrl: './brand.html',
})
export class Brand {
  readonly i18n = inject(LanguageService);
}
