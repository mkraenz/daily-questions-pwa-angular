import { Component, signal, computed, inject } from '@angular/core';
import { defaultQuestions } from '../questions/questions.data';
import { DailyResponsesService } from '../services/daily-responses.service';
import { QuestionViewComponent } from './question-view/question-view';
import { SummaryViewComponent } from './summary-view/summary-view';
import { ToastComponent } from './toast/toast';

@Component({
  selector: 'app-dailies',
  imports: [QuestionViewComponent, SummaryViewComponent, ToastComponent],
  templateUrl: './dailies.html',
  styleUrl: './dailies.css'
})
export class DailiesComponent {
  private dailyResponsesService = inject(DailyResponsesService);

  activeQuestions = computed(() => defaultQuestions.filter(q => q.active));
  answers = signal<Map<string, string | number>>(new Map());
  currentIndex = signal(0);
  view = signal<'question' | 'summary'>('question');
  editingQuestionId = signal<string | null>(null);
  showToast = signal(false);

  currentQuestion = computed(() => this.activeQuestions()[this.currentIndex()]);

  onAnswer(value: string | number) {
    this.answers.update(m => new Map(m).set(this.currentQuestion().id, value));

    if (this.editingQuestionId() !== null) {
      this.editingQuestionId.set(null);
      this.view.set('summary');
    } else if (this.currentIndex() < this.activeQuestions().length - 1) {
      this.currentIndex.update(i => i + 1);
    } else {
      this.view.set('summary');
    }
  }

  onEdit(questionId: string) {
    this.editingQuestionId.set(questionId);
    const idx = this.activeQuestions().findIndex(q => q.id === questionId);
    this.currentIndex.set(idx);
    this.view.set('question');
  }

  onConfirm() {
    const answers = [...this.answers().entries()].map(([questionId, value]) => ({
      questionId,
      value
    }));

    this.dailyResponsesService.saveResponse({
      date: this.dailyResponsesService.todayDate(),
      answers
    });

    this.showToast.set(true);
    setTimeout(() => this.showToast.set(false), 3000);
  }
}
