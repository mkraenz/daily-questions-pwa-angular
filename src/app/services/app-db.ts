import Dexie, { type EntityTable } from 'dexie';
import { defaultQuestions } from '../questions/questions.data';

export interface Answer {
  questionId: string;
  value: string | number;
}

export interface DailyResponse {
  date: string;
  answers: Answer[];
}
export interface Question {
  title: string;
  id: string; // first 8 chars of a uuid v4
  questionLong: string;
  type: 'points' | 'fulltext';
  active: boolean;
}

const db = new Dexie('dq-app-db') as Dexie & {
  questions: EntityTable<Question, 'id'>;
  answers: EntityTable<DailyResponse, 'date'>;
};

db.version(1).stores({
  questions: 'id',
  answers: 'date',
});

db.on('populate', async () => {
  await db.questions.bulkAdd(defaultQuestions);
});

export { db };
