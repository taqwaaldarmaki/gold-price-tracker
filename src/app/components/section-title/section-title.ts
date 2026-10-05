import { Component, input } from '@angular/core';

/** Centered section heading with an optional subtitle. */
@Component({
  selector: 'app-section-title',
  templateUrl: './section-title.html',
})
export class SectionTitle {
  readonly title = input.required<string>();
  readonly subtitle = input('');
}
