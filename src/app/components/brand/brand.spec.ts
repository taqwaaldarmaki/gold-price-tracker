import { TestBed } from '@angular/core/testing';
import { Brand } from './brand';

describe('Brand', () => {
  it('renders the logo image and site name', async () => {
    await TestBed.configureTestingModule({ imports: [Brand] }).compileComponents();
    const fixture = TestBed.createComponent(Brand);
    await fixture.whenStable();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('img')).toBeTruthy();
    expect(element.textContent).toContain('الذهب العُماني');
  });
});
