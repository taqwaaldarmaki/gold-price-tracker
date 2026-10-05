import { TestBed } from '@angular/core/testing';
import { LanguageService } from './language.service';

describe('LanguageService', () => {
  afterEach(() => {
    localStorage.clear();
    document.documentElement.lang = 'ar';
    document.documentElement.dir = 'rtl';
  });

  it('starts in Arabic (RTL)', () => {
    const service = TestBed.inject(LanguageService);
    expect(service.lang()).toBe('ar');
    expect(service.dir()).toBe('rtl');
  });

  it('switches to English (LTR) and updates <html>', () => {
    const service = TestBed.inject(LanguageService);
    service.toggle();

    expect(service.lang()).toBe('en');
    expect(document.documentElement.dir).toBe('ltr');
    expect(document.documentElement.lang).toBe('en');
    expect(localStorage.getItem('lang')).toBe('en');
    expect(service.t('today')).toBe('Today');
  });

  it('replaces {placeholders} in translations', () => {
    const service = TestBed.inject(LanguageService);
    expect(service.t('karatLabel', { karat: '24K' })).toBe('عيار 24K');
    service.toggle();
    expect(service.t('karatLabel', { karat: '24K' })).toBe('24K karat');
  });

  it('builds relative day labels', () => {
    const service = TestBed.inject(LanguageService);
    service.toggle();
    expect(service.dayLabel(0)).toBe('Today');
    expect(service.dayLabel(1)).toBe('Yesterday');
    expect(service.dayLabel(5)).toBe('5 days ago');
  });
});
