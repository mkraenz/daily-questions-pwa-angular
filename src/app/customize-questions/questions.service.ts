import { Injectable, inject } from '@angular/core';
import { APP_DB } from '../shared/db/app-db';
import { Question } from '../shared/db/domain.types';

@Injectable({ providedIn: 'root' })
export class QuestionsService {
  private readonly db = inject(APP_DB);

  getAll(): Promise<Question[]> {
    return this.db.questions.orderBy('ordering').toArray();
  }

  getAllActive(): Promise<Question[]> {
    return this.db.questions
      .orderBy('ordering')
      .filter((x) => x.active)
      .toArray();
  }
}
