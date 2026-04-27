import { Component, inject, signal } from '@angular/core';
import { DailyResponsesService } from '../dailies/daily-responses.service';
import { Answer } from '../shared/db/domain.types';
import { LanguageService } from '../shared/i18n/language.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.html',
})
export class History {
  protected readonly t = inject(LanguageService).t;
  private readonly dailyResponsesService = inject(DailyResponsesService);

  protected readonly responses = signal<{ date: string; answers: Answer[] }[]>([]);

  constructor() {
    this.dailyResponsesService.getAll().then((r) => this.responses.set(r));
  }

  protected formatAnswers(answers: Answer[]): string {
    return answers.map((a) => a.value).join(' ');
  }
}
