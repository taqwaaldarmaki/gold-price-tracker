import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { GoldDataService } from './services/gold-data.service';

describe('App', () => {
  async function setup(isLoading = false) {
    await TestBed.configureTestingModule({ imports: [App] }).compileComponents();
    TestBed.inject(GoldDataService).isLoading.set(isLoading);
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    return fixture.nativeElement as HTMLElement;
  }

  it('renders every section of the page', async () => {
    const page = await setup();
    for (const id of ['prices', 'calculator', 'trend', 'history']) {
      expect(page.querySelector(`#${id}`)).toBeTruthy();
    }
  });

  it('renders one price card per karat', async () => {
    const page = await setup();
    expect(page.querySelectorAll('app-price-card').length).toBe(4);
  });

  it('renders 30 rows in the history table', async () => {
    const page = await setup();
    expect(page.querySelectorAll('#history tbody tr').length).toBe(30);
  });

  it('shows loading skeletons while data is loading', async () => {
    const page = await setup(true);
    expect(page.querySelectorAll('app-skeleton').length).toBeGreaterThan(0);
    expect(page.querySelectorAll('#history tbody tr').length).toBe(8);
  });
});
