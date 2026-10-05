import { Component, computed, inject } from '@angular/core';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-language-toggle',
  templateUrl: './language-toggle.html',
})
export class LanguageToggle {
  readonly i18n = inject(LanguageService);

  /** The button offers the *other* language, so it is written in that language. */
  readonly targetLang = computed(() => (this.i18n.lang() === 'ar' ? 'en' : 'ar'));
}
