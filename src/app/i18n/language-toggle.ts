import { Component, inject } from '@angular/core';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-language-toggle',
  template: `<button
    (click)="language.cycle()"
    class="text-xl p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg leading-none"
    [attr.aria-label]="language.current()"
  >
    {{ language.flag() }}
  </button>`,
})
export class LanguageToggle {
  protected readonly language = inject(LanguageService);
}
