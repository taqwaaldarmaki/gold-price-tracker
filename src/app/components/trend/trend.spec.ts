import { TestBed } from '@angular/core/testing';
import { Trend } from './trend';
import { GoldDataService } from '../../services/gold-data.service';

describe('Trend', () => {
  async function setup() {
    await TestBed.configureTestingModule({ imports: [Trend] }).compileComponents();
    const fixture = TestBed.createComponent(Trend);
    await fixture.whenStable();
    return fixture;
  }

  it('computes stats from the selected karat series', async () => {
    const fixture = await setup();
    const trend = fixture.componentInstance;
    const series = TestBed.inject(GoldDataService).getSeries('24K');

    expect(trend.currentPrice()).toBe(series[series.length - 1]);
    expect(trend.highestPrice()).toBe(Math.max(...series));
    expect(trend.lowestPrice()).toBe(Math.min(...series));
    expect(trend.change()).toBeCloseTo(trend.currentPrice() - trend.previousPrice(), 10);
  });

  it('switches karat', async () => {
    const fixture = await setup();
    const trend = fixture.componentInstance;

    trend.selectKarat('18K');
    expect(trend.selectedKarat()).toBe('18K');
    expect(trend.currentPrice()).toBe(TestBed.inject(GoldDataService).getTodayPrice('18K'));
  });

  it('draws a smooth curve through all 30 days', async () => {
    const fixture = await setup();
    const path = fixture.componentInstance.linePath();
    expect(path.startsWith('M ')).toBe(true);
    expect(path.match(/C/g)?.length).toBe(29);
  });

  it('highlights today by default and the hovered day on hover', async () => {
    const fixture = await setup();
    const trend = fixture.componentInstance;
    const series = TestBed.inject(GoldDataService).getSeries('24K');

    expect(trend.activePoint().price).toBe(series[29]);

    trend.hoverIndex.set(0);
    expect(trend.activePoint().price).toBe(series[0]);
  });
});
