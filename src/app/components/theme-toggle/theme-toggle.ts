import { Component, inject } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.html',
})
export class ThemeToggle {
  readonly theme = inject(ThemeService);
  readonly i18n = inject(LanguageService);
}
