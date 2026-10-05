import { TestBed } from '@angular/core/testing';
import { GoldDataService } from './gold-data.service';

describe('GoldDataService', () => {
  const service = () => TestBed.inject(GoldDataService);

  it('has 30 days of history for every karat', () => {
    for (const karat of service().karats) {
      expect(service().getSeries(karat).length).toBe(30);
    }
    expect(service().history.length).toBe(30);
  });

  it('keeps today price, series and history table consistent', () => {
    for (const { karat, price } of service().todayPrices) {
      const series = service().getSeries(karat);
      expect(price).toBe(series[series.length - 1]);
      expect(service().history[0].prices[karat]).toBe(price);
    }
  });

  it('prices higher karats higher', () => {
    const [k18, k21, k22, k24] = service().todayPrices.map((p) => p.price);
    expect(k18).toBeLessThan(k21);
    expect(k21).toBeLessThan(k22);
    expect(k22).toBeLessThan(k24);
  });
});

describe('GoldDataService researched prices', () => {
  const service = () => TestBed.inject(GoldDataService);

  it("uses the researched prices of 4 Oct 2026 (OMR per gram)", () => {
    expect(service().getTodayPrice('24K')).toBeCloseTo(51.2, 3);
    expect(service().getTodayPrice('22K')).toBeCloseTo(46.933, 3);
    expect(service().getTodayPrice('21K')).toBeCloseTo(44.8, 3);
    expect(service().getTodayPrice('18K')).toBeCloseTo(38.4, 3);
  });

  it('matches the published 30-day range of the source (start/high 54.78, low 51.01)', () => {
    const series = service().getSeries('24K');
    expect(series[0]).toBe(54.78);
    expect(Math.max(...series)).toBe(54.78);
    expect(Math.min(...series)).toBe(51.01);
  });
});

describe('GoldDataService loading state', () => {
  it('starts in the loading state', () => {
    expect(TestBed.inject(GoldDataService).isLoading()).toBe(true);
  });
});
