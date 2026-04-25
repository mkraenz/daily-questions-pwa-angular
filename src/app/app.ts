import { Component, computed, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { LanguageService } from './services/language.service';
import { ThemeToggleComponent } from './shared/theme-toggle';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, NgClass, ThemeToggleComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  drawerOpen = signal(false);
  protected readonly language = inject(LanguageService);
  protected readonly t = this.language.t;

  protected readonly navItems = computed(() => [
    { label: this.t().nav.dailies, path: '/dailies' },
    { label: this.t().nav.history, path: '/history' },
    { label: this.t().nav.customizeQuestions, path: '/customize' },
    { label: this.t().nav.settings, path: '/settings' },
    { label: this.t().nav.about, path: '/about' },
  ]);

  toggleDrawer() {
    this.drawerOpen.update(v => !v);
  }

  closeDrawer() {
    this.drawerOpen.set(false);
  }
}
