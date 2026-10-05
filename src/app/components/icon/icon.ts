import { Component, input } from '@angular/core';

export type IconName =
  | 'sparkle'
  | 'calculator'
  | 'arrow-up'
  | 'arrow-up-right'
  | 'arrow-down-right'
  | 'chevron-down';

/** Small SVG icon set (no emojis). Size it with classes: <app-icon name="sparkle" class="size-5" /> */
@Component({
  selector: 'app-icon',
  templateUrl: './icon.html',
  host: { class: 'inline-block shrink-0', 'aria-hidden': 'true' },
})
export class Icon {
  readonly name = input.required<IconName>();
}
