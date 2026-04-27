import { Injectable, computed, signal } from '@angular/core';
import { de } from './data/de';
import { en } from './data/en';
import { ja } from './data/ja';
import { Translations } from './data/types';

export type Language = 'en' | 'de' | 'ja';

const LANGUAGES: Language[] = ['en', 'de', 'ja'];
const FLAGS: Record<Language, string> = { en: '🇬🇧', de: '🇩🇪', ja: '🇯🇵' };
const TRANSLATIONS: Record<Language, Translations> = { en, de, ja };

@Injectable({ providedIn: 'root' })
export class LanguageService {
  readonly current = signal<Language>('en');
  readonly t = computed(() => TRANSLATIONS[this.current()]);
  readonly flag = computed(() => FLAGS[this.current()]);

  cycle() {
    this.current.update((lang) => {
      const idx = LANGUAGES.indexOf(lang);
      return LANGUAGES[(idx + 1) % LANGUAGES.length];
    });
  }
}
