import { Component, input, output } from '@angular/core';
import { Question } from '../../questions/questions.data';

@Component({
  selector: 'app-summary-view',
  imports: [],
  templateUrl: './summary-view.html',
  styleUrl: './summary-view.css'
})
export class SummaryViewComponent {
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
