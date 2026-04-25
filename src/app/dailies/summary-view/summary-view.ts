import { Component, inject, input, output } from '@angular/core';
import { Question } from '../../services/domain.types';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-summary-view',
  imports: [],
  templateUrl: './summary-view.html',
  styleUrl: './summary-view.css',
})
export class SummaryViewComponent {
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
