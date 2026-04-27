import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { liveQuery } from 'dexie';
import { from } from 'rxjs';
import { DailyResponsesService } from '../services/daily-responses.service';
import { Question } from '../services/domain.types';
import { LanguageService } from '../services/language.service';
import { QuestionsService } from '../services/questions.service';
import { QuestionView } from './question-view/question-view';
import { SummaryView } from './summary-view/summary-view';
import { Toast } from './toast/toast';

@Component({
  selector: 'app-dailies',
  imports: [QuestionView, SummaryView, Toast],
  templateUrl: './dailies.html',
})
export class Dailies {
  protected readonly t = inject(LanguageService).t;
  private dailyResponsesService = inject(DailyResponsesService);
  private questionsService = inject(QuestionsService);

  questions = toSignal(from(liveQuery(() => this.questionsService.getAllActive())), {
    initialValue: [] as Question[],
  });
  questionsLoading = computed(() => this.questions().length === 0);
  answers = signal<Map<string, string | number>>(new Map());
  currentIndex = signal(0);
  view = signal<'question' | 'summary'>('question');
  editingQuestionId = signal<string | null>(null);
  showToast = signal(false);

  currentQuestion = computed(() => this.questions()[this.currentIndex()]);

  onAnswer(value: string | number) {
    this.answers.update((m) => new Map(m).set(this.currentQuestion().id, value));

    if (this.editingQuestionId() !== null) {
      this.editingQuestionId.set(null);
      this.view.set('summary');
    } else if (this.currentIndex() < this.questions().length - 1) {
      this.currentIndex.update((i) => i + 1);
    } else {
      this.view.set('summary');
    }
  }

  onEdit(questionId: string) {
    this.editingQuestionId.set(questionId);
    const idx = this.questions().findIndex((q) => q.id === questionId);
    this.currentIndex.set(idx);
    this.view.set('question');
  }

  onConfirm() {
    const answers = [...this.answers().entries()].map(([questionId, value]) => ({
      questionId,
      value,
    }));

    this.dailyResponsesService.saveResponse({
      date: this.dailyResponsesService.todayDate(),
      answers,
    });

    this.showToast.set(true);
    setTimeout(() => this.showToast.set(false), 3000);
  }
}
