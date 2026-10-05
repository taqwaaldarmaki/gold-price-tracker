import { Component, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { LanguageService } from '../../services/language.service';
import { Icon } from '../icon/icon';

@Component({
  selector: 'app-footer',
  imports: [Icon],
  templateUrl: './footer.html',
})
export class Footer {
  private readonly document = inject(DOCUMENT);

  readonly i18n = inject(LanguageService);

  scrollToTop(): void {
    this.document.defaultView?.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
