import { Injectable, afterNextRender, computed, inject, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { Lang, TRANSLATIONS, TranslationKey } from '../data/translations';

const STORAGE_KEY = 'lang';

/** Arabic (RTL) / English (LTR) switching and text lookup. */
@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly document = inject(DOCUMENT);
  private readonly title = inject(Title);

  readonly lang = signal<Lang>('ar');
  readonly dir = computed(() => (this.lang() === 'ar' ? 'rtl' : 'ltr'));

  private readonly locale = computed(() => (this.lang() === 'ar' ? 'ar-u-nu-latn' : 'en-US'));
  private readonly dateFormatter = computed(
    () => new Intl.DateTimeFormat(this.locale(), { day: 'numeric', month: 'long' }),
  );
  private readonly fullDateFormatter = computed(
    () => new Intl.DateTimeFormat(this.locale(), { day: 'numeric', month: 'long', year: 'numeric' }),
  );

  constructor() {
    // Read the saved language only in the browser, after hydration,
    // so the first render matches the server-rendered HTML.
    afterNextRender(() => {
      const saved = this.readSavedLang();
      if (saved) {
        this.lang.set(saved);
      }
      this.applyToDocument();
    });
  }

  /** Translates a key. Placeholders like {name} are replaced from `params`. */
  readonly t = (key: TranslationKey, params: Record<string, string | number> = {}): string => {
    let text: string = TRANSLATIONS[this.lang()][key];
    for (const [name, value] of Object.entries(params)) {
      text = text.replaceAll(`{${name}}`, String(value));
    }
    return text;
  };

  toggle(): void {
    this.lang.set(this.lang() === 'ar' ? 'en' : 'ar');
    this.applyToDocument();
    this.save();
  }

  /** "Today", "Yesterday", "5 days ago"... */
  dayLabel(daysAgo: number): string {
    if (daysAgo === 0) return this.t('today');
    if (daysAgo === 1) return this.t('yesterday');
    if (daysAgo === 2) return this.t('twoDaysAgo');
    return this.t(daysAgo <= 10 ? 'daysAgoFew' : 'daysAgoMany', { n: daysAgo });
  }

  formatDate(date: Date): string {
    return this.dateFormatter().format(date);
  }

  /** Date with the year, e.g. "4 أكتوبر 2026". */
  formatFullDate(date: Date): string {
    return this.fullDateFormatter().format(date);
  }

  private applyToDocument(): void {
    const root = this.document.documentElement;
    root.lang = this.lang();
    root.dir = this.dir();
    this.title.setTitle(this.t('pageTitle'));
  }

  private readSavedLang(): Lang | null {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved === 'ar' || saved === 'en' ? saved : null;
    } catch {
      return null; // storage not available (e.g. private mode)
    }
  }

  private save(): void {
    try {
      localStorage.setItem(STORAGE_KEY, this.lang());
    } catch {
      // ignore: the preference just won't be remembered
    }
  }
}
