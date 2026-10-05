import { Component, DestroyRef, afterNextRender, inject, signal } from '@angular/core';
import { NAV_LINKS } from '../../data/nav-links';
import { LanguageService } from '../../services/language.service';
import { Brand } from '../brand/brand';
import { LanguageToggle } from '../language-toggle/language-toggle';
import { ThemeToggle } from '../theme-toggle/theme-toggle';

@Component({
  selector: 'app-header',
  imports: [Brand, LanguageToggle, ThemeToggle],
  templateUrl: './header.html',
})
export class Header {
  private readonly destroyRef = inject(DestroyRef);

  readonly i18n = inject(LanguageService);
  readonly navLinks = NAV_LINKS;
  readonly isMenuOpen = signal(false);

  /** id of the section currently on screen (highlighted in the navigation). */
  readonly activeSection = signal<string | null>(null);

  constructor() {
    afterNextRender(() => this.watchSections());
  }

  toggleMenu(): void {
    this.isMenuOpen.update((isOpen) => !isOpen);
  }

  /** Called when a navigation link is clicked. */
  selectSection(sectionId: string): void {
    this.activeSection.set(sectionId);
    this.isMenuOpen.set(false);
  }

  /** Scroll spy: highlights the link of the section in the middle of the screen. */
  private watchSections(): void {
    if (typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        // handle the sections that left first, then the one that entered
        for (const entry of entries.filter((item) => !item.isIntersecting)) {
          if (this.activeSection() === entry.target.id) this.activeSection.set(null);
        }
        for (const entry of entries.filter((item) => item.isIntersecting)) {
          this.activeSection.set(entry.target.id);
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );

    for (const link of this.navLinks) {
      const section = document.getElementById(link.sectionId);
      if (section) observer.observe(section);
    }

    this.destroyRef.onDestroy(() => observer.disconnect());
  }
}
