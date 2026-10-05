import { TestBed } from '@angular/core/testing';
import { PriceCard } from './price-card';

describe('PriceCard', () => {
  it('renders the karat and the formatted price', async () => {
    await TestBed.configureTestingModule({ imports: [PriceCard] }).compileComponents();
    const fixture = TestBed.createComponent(PriceCard);
    fixture.componentRef.setInput('karat', '21K');
    fixture.componentRef.setInput('price', 34.825);
    await fixture.whenStable();

    const text = (fixture.nativeElement as HTMLElement).textContent;
    expect(text).toContain('21K');
    expect(text).toContain('34.825');
  });
});
