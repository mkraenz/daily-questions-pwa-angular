import { Component, inject } from '@angular/core';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-about',
  template: '<p class="p-8 text-gray-500">{{ t().stubs.about }}</p>',
})
export class AboutComponent {
  protected readonly t = inject(LanguageService).t;
}
