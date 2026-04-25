import { Injectable, computed, signal } from '@angular/core';
import { en } from '../i18n/en';
import { de } from '../i18n/de';
import { ja } from '../i18n/ja';
import { Translations } from '../i18n/types';

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
