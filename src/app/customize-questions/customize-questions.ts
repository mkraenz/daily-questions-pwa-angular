import { Component, inject } from '@angular/core';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-customize-questions',
  template: '<p class="p-8 text-gray-500">{{ t().stubs.customize }}</p>',
})
export class CustomizeQuestionsComponent {
  protected readonly t = inject(LanguageService).t;
}
