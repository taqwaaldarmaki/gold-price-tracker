import { Component } from '@angular/core';

/**
 * Animated placeholder block shown while data is loading.
 * Size it from outside: <app-skeleton class="h-4 w-24" />
 */
@Component({
  selector: 'app-skeleton',
  template: '',
  host: {
    class: 'block animate-pulse rounded-xl bg-ink/10 motion-reduce:animate-none',
    'aria-hidden': 'true',
  },
})
export class Skeleton {}
