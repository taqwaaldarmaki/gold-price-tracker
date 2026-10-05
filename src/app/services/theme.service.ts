import { Injectable, afterNextRender, computed, inject, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';

type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';

/** Light / dark mode (dark by default). Adds the `dark` class to <html> (see styles.css). */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);

  readonly theme = signal<Theme>('dark');
  readonly isDark = computed(() => this.theme() === 'dark');

  constructor() {
    // Browser only, after hydration. index.html already applied the class
    // before the first paint, so there is no flash of the wrong theme.
    afterNextRender(() => {
      this.theme.set(this.readSavedTheme() ?? 'dark');
      this.applyToDocument();
    });
  }

  toggle(): void {
    this.theme.set(this.isDark() ? 'light' : 'dark');
    this.applyToDocument();
    this.save();
  }

  private applyToDocument(): void {
    this.document.documentElement.classList.toggle('dark', this.isDark());
  }

  private readSavedTheme(): Theme | null {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved === 'light' || saved === 'dark' ? saved : null;
    } catch {
      return null;
    }
  }

  private save(): void {
    try {
      localStorage.setItem(STORAGE_KEY, this.theme());
    } catch {
      // ignore: the preference just won't be remembered
    }
  }
}
