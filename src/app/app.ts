import { NgClass } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LanguageToggle } from './shared/i18n/language-toggle';
import { LanguageService } from './shared/i18n/language.service';
import { ThemeToggle } from './shared/theme/theme-toggle';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, NgClass, ThemeToggle, LanguageToggle],
  templateUrl: './app.html',
})
export class App {
  drawerOpen = signal(false);
  protected readonly t = inject(LanguageService).t;

  protected readonly navItems = computed(() => [
    { label: this.t().nav.dailies, path: '/dailies' },
    { label: this.t().nav.history, path: '/history' },
    { label: this.t().nav.customizeQuestions, path: '/customize' },
    { label: this.t().nav.settings, path: '/settings' },
    { label: this.t().nav.about, path: '/about' },
  ]);

  toggleDrawer() {
    this.drawerOpen.update((v) => !v);
  }

  closeDrawer() {
    this.drawerOpen.set(false);
  }
}
