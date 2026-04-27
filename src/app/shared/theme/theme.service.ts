import { Injectable, effect, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly STORAGE_KEY = 'theme';

  readonly isDark = signal<boolean>(this.readInitial());

  constructor() {
    effect(() => {
      const dark = this.isDark();
      document.documentElement.classList.toggle('dark', dark);
      localStorage.setItem(this.STORAGE_KEY, dark ? 'dark' : 'light');
    });
  }

  toggle() {
    this.isDark.update((v) => !v);
  }

  private readInitial(): boolean {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (saved !== null) return saved === 'dark';
    return typeof window.matchMedia === 'function'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
      : false;
  }
}
