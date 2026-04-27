import { Component, inject } from '@angular/core';
import { LanguageService } from '../shared/i18n/language.service';

@Component({
  selector: 'app-about',
  template: '<p class="p-8 text-gray-500">{{ t().stubs.about }}</p>',
})
export class About {
  protected readonly t = inject(LanguageService).t;
}
