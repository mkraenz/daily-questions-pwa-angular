import { InjectionToken, isDevMode } from '@angular/core';
import Dexie, { type DexieOptions, type EntityTable } from 'dexie';
import { defaultQuestions } from './default-questions.data';
import { mockAnswers } from './mock-answers.data';
import { DailyResponse, Question } from './domain.types';

export class AppDb extends Dexie {
  questions!: EntityTable<Question, 'id'>;
  answers!: EntityTable<DailyResponse, 'date'>;

  constructor(options?: DexieOptions) {
    super('dq-app-db', options);
    this.version(1).stores({
      questions: 'id, active, ordering',
      answers: 'date',
    });
    this.on('populate', async () => {
      await this.questions.bulkAdd(defaultQuestions);
      if (isDevMode()) {
        await this.answers.bulkAdd(mockAnswers);
      }
    });
  }
}

export const APP_DB = new InjectionToken<AppDb>('AppDb', {
  providedIn: 'root',
  factory: () => new AppDb(),
});
