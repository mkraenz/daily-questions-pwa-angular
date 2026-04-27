import { Component, inject } from '@angular/core';
import { LanguageService } from '../shared/i18n/language.service';

@Component({
  selector: 'app-history',
  template: '<p class="p-8 text-gray-500">{{ t().stubs.history }}</p>',
})
export class History {
  protected readonly t = inject(LanguageService).t;
}
