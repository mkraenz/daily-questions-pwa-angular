import { Component, inject, input, output } from '@angular/core';
import { Question } from '../../shared/db/domain.types';
import { LanguageService } from '../../shared/i18n/language.service';

@Component({
  selector: 'app-summary-view',
  imports: [],
  templateUrl: './summary-view.html',
})
export class SummaryView {
  protected readonly t = inject(LanguageService).t;
  questions = input.required<Question[]>();
  answers = input.required<Map<string, string | number>>();

  edit = output<string>();
  confirm = output<void>();

  onEditQuestion(questionId: string) {
    this.edit.emit(questionId);
  }

  onConfirm() {
    this.confirm.emit();
  }
}
