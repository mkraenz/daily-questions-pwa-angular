import Dexie, { type DexieOptions, type EntityTable } from 'dexie';
import { InjectionToken } from '@angular/core';
import { DailyResponse, Question } from './domain.types';
import { defaultQuestions } from './questions.data';

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
    });
  }
}

export const APP_DB = new InjectionToken<AppDb>('AppDb', {
  providedIn: 'root',
  factory: () => new AppDb(),
});
