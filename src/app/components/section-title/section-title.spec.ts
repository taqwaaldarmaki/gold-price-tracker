import { TestBed } from '@angular/core/testing';
import { SectionTitle } from './section-title';

describe('SectionTitle', () => {
  it('renders title and subtitle', async () => {
    await TestBed.configureTestingModule({ imports: [SectionTitle] }).compileComponents();
    const fixture = TestBed.createComponent(SectionTitle);
    fixture.componentRef.setInput('title', 'عنوان');
    fixture.componentRef.setInput('subtitle', 'وصف');
    await fixture.whenStable();

    const text = (fixture.nativeElement as HTMLElement).textContent;
    expect(text).toContain('عنوان');
    expect(text).toContain('وصف');
  });
});
