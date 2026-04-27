import { TestBed } from '@angular/core/testing';
import { IDBFactory, IDBKeyRange } from 'fake-indexeddb';
import { beforeEach, expect, it } from 'vitest';
import { APP_DB, AppDb } from '../shared/db/app-db';
import { DailyResponse } from '../shared/db/domain.types';
import { DailyResponsesService } from './daily-responses.service';

function createTestDb(): AppDb {
  return new AppDb({ indexedDB: new IDBFactory(), IDBKeyRange });
}

const makeResponse = (date: string): DailyResponse => ({
  date,
  answers: [{ questionId: 'q1', value: 5 }],
});

let service: DailyResponsesService;
let db: AppDb;

beforeEach(async () => {
  db = createTestDb();
  await db.open();
  await db.answers.clear();
  await TestBed.configureTestingModule({
    providers: [{ provide: APP_DB, useValue: db }],
  }).compileComponents();
  service = TestBed.inject(DailyResponsesService);
});

it('should return responses in newest-first order', async () => {
  await db.answers.bulkAdd([
    makeResponse('2026-04-25'),
    makeResponse('2026-04-27'),
    makeResponse('2026-04-26'),
  ]);

  const result = await service.getAll();

  expect(result.map((r) => r.date)).toEqual(['2026-04-27', '2026-04-26', '2026-04-25']);
});
