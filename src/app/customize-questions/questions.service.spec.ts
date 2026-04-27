import { TestBed } from '@angular/core/testing';
import { IDBFactory, IDBKeyRange } from 'fake-indexeddb';
import { beforeEach, expect, it } from 'vitest';
import { APP_DB, AppDb } from '../shared/db/app-db';
import { Question } from '../shared/db/domain.types';
import { QuestionsService } from './questions.service';

function createTestDb(): AppDb {
  return new AppDb({ indexedDB: new IDBFactory(), IDBKeyRange });
}

const makeQuestion = (overrides: Partial<Question> & { id: string }): Question => ({
  title: 'Test Question',
  questionLong: 'A test question?',
  type: 'points',
  active: 1,
  ordering: 0,
  ...overrides,
});

let service: QuestionsService;
let db: AppDb;

beforeEach(async () => {
  db = createTestDb();
  await db.open();
  await db.questions.clear();
  await TestBed.configureTestingModule({
    providers: [{ provide: APP_DB, useValue: db }],
  }).compileComponents();
  service = TestBed.inject(QuestionsService);
});

it('should return an empty list when there are no questions', async () => {
  const result = await service.getAll();

  expect(result).toEqual([]);
});

it('should return a list of questions when there are questions in the database', async () => {
  await db.questions.bulkAdd([makeQuestion({ id: 'q1' }), makeQuestion({ id: 'q2' })]);

  const result = await service.getAll();

  expect(result).toHaveLength(2);
});

it('should return questions sorted by ordering', async () => {
  await db.questions.bulkAdd([
    makeQuestion({ id: 'q1', ordering: 20 }),
    makeQuestion({ id: 'q2', ordering: 5 }),
    makeQuestion({ id: 'q3', ordering: 10 }),
  ]);

  const result = await service.getAll();

  expect(result.map((q) => q.id)).toEqual(['q2', 'q3', 'q1']);
});

it('should only return active questions', async () => {
  await db.questions.bulkAdd([
    makeQuestion({ id: 'q1', active: 1 }),
    makeQuestion({ id: 'q2', active: 0 }),
    makeQuestion({ id: 'q3', active: 1 }),
  ]);

  const result = await service.getAllActive();

  expect(result.map((q) => q.id)).toEqual(['q1', 'q3']);
});
