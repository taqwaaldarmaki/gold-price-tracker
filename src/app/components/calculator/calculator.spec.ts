import { TestBed } from '@angular/core/testing';
import { Calculator } from './calculator';
import { GoldDataService } from '../../services/gold-data.service';

describe('Calculator', () => {
  async function setup() {
    await TestBed.configureTestingModule({ imports: [Calculator] }).compileComponents();
    const fixture = TestBed.createComponent(Calculator);
    await fixture.whenStable();
    return fixture;
  }

  it('shows the empty state before calculating', async () => {
    const fixture = await setup();
    expect(fixture.componentInstance.result()).toBeNull();
    expect((fixture.nativeElement as HTMLElement).textContent).toContain('اضغط');
  });

  it('calculates weight x today price of the selected karat', async () => {
    const fixture = await setup();
    const calculator = fixture.componentInstance;

    calculator.onKaratChange('21K');
    calculator.onWeightChange(10);
    calculator.calculateGoldValue();

    const expected = 10 * TestBed.inject(GoldDataService).getTodayPrice('21K');
    expect(calculator.result()?.total).toBeCloseTo(expected, 5);
  });

  it('rejects empty or non-positive weights', async () => {
    const fixture = await setup();
    const calculator = fixture.componentInstance;

    calculator.onWeightChange(null);
    calculator.calculateGoldValue();
    expect(calculator.result()).toBeNull();
    expect(calculator.errorKey()).toBe('weightError');

    calculator.onWeightChange(-5);
    calculator.calculateGoldValue();
    expect(calculator.result()).toBeNull();
  });

  it('clears the old result when an input changes', async () => {
    const fixture = await setup();
    const calculator = fixture.componentInstance;

    calculator.onWeightChange(5);
    calculator.calculateGoldValue();
    expect(calculator.result()).not.toBeNull();

    calculator.onWeightChange(6);
    expect(calculator.result()).toBeNull();
  });
});
