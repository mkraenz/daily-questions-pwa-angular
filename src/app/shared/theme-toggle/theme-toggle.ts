import { Component, inject } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { ThemeService } from '../../services/theme.service';
import { MoonIcon } from './moon-icon';
import { SunIcon } from './sun-icon';

@Component({
  selector: 'app-theme-toggle',
  imports: [SunIcon, MoonIcon],
  template: `
    <button
      (click)="theme.toggle()"
      class="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
      [attr.aria-label]="theme.isDark() ? t().theme.toLightMode : t().theme.toDarkMode"
    >
      @if (theme.isDark()) {
        <app-sun-icon />
      } @else {
        <app-moon-icon />
      }
    </button>
  `,
})
export class ThemeToggle {
  protected readonly theme = inject(ThemeService);
  protected readonly t = inject(LanguageService).t;
}
