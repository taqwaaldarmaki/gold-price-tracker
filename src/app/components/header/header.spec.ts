import { TestBed } from '@angular/core/testing';
import { Header } from './header';

describe('Header', () => {
  async function setup() {
    await TestBed.configureTestingModule({ imports: [Header] }).compileComponents();
    const fixture = TestBed.createComponent(Header);
    await fixture.whenStable();
    return fixture;
  }

  it('renders a link for every section', async () => {
    const fixture = await setup();
    const links = (fixture.nativeElement as HTMLElement).querySelectorAll('nav a');
    expect(links.length).toBe(4);
  });

  it('toggles the mobile menu', async () => {
    const fixture = await setup();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('#mobile-menu')).toBeNull();

    fixture.componentInstance.toggleMenu();
    await fixture.whenStable();
    expect(element.querySelector('#mobile-menu')).toBeTruthy();
  });

  it('highlights the selected section link and closes the mobile menu', async () => {
    const fixture = await setup();
    const header = fixture.componentInstance;
    const element = fixture.nativeElement as HTMLElement;

    header.toggleMenu();
    header.selectSection('trend');
    await fixture.whenStable();

    expect(header.isMenuOpen()).toBe(false);
    const active = element.querySelector('nav a[aria-current="location"]');
    expect(active?.getAttribute('href')).toBe('#trend');
  });
});
