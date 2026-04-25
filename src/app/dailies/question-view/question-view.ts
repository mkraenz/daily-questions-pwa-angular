import { Component, computed, effect, input, output, signal } from '@angular/core';
import { Question } from '../../questions/questions.data';

@Component({
  selector: 'app-question-view',
  imports: [],
  templateUrl: './question-view.html',
  styleUrl: './question-view.css',
})
export class QuestionViewComponent {
  question = input.required<Question>();
  existingAnswer = input<string | number | null>(null);
  answered = output<string | number>();

  value = signal<string>('');

  isValid = computed(() => {
    const v = this.value();
    if (this.question().type === 'points') {
      const num = Number(v);
      return !isNaN(num) && num >= 1 && num <= 10;
    }
    return v.trim().length > 0;
  });

  constructor() {
    effect(() => {
      const existing = this.existingAnswer();
      if (existing !== null) {
        this.value.set(String(existing));
      } else {
        this.value.set('');
      }
    });
  }

  submit() {
    if (!this.isValid()) return;
    const v = this.value();
    const finalValue = this.question().type === 'points' ? Number(v) : v;
    this.answered.emit(finalValue);
    this.value.set('');
  }
}
