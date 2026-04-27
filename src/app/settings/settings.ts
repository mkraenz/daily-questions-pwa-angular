import { Component, inject } from '@angular/core';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-settings',
  template: '<p class="p-8 text-gray-500">{{ t().stubs.settings }}</p>',
})
export class Settings {
  protected readonly t = inject(LanguageService).t;
}
