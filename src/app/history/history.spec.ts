import { TestBed } from '@angular/core/testing';
import { beforeEach, expect, it } from 'vitest';
import { DailyResponsesService } from '../dailies/daily-responses.service';
import { flushMicrotasks } from '../testing/utils';
import { History } from './history';

const mockService = (
  responses: { date: string; answers: { questionId: string; value: string | number }[] }[],
) => ({
  getAll: () => Promise.resolve(responses),
});

beforeEach(async () => {
  await TestBed.configureTestingModule({
    imports: [History],
    providers: [{ provide: DailyResponsesService, useValue: mockService([]) }],
  }).compileComponents();
});

it('should display the date and answers for each daily response', async () => {
  TestBed.overrideProvider(DailyResponsesService, {
    useValue: mockService([
      {
        date: '2026-04-27',
        answers: [
          { questionId: 'a1', value: 1 },
          { questionId: 'b2', value: 'hello' },
        ],
      },
    ]),
  });
  const fixture = TestBed.createComponent(History);
  fixture.detectChanges();

  await flushMicrotasks();
  fixture.detectChanges();

  const el: HTMLElement = fixture.nativeElement;
  expect(el.querySelector('p.font-bold')?.textContent?.trim()).toBe('2026-04-27');
  expect(el.textContent).toContain('1 hello');
});

it('should handle multiple daily responses correctly', async () => {
  TestBed.overrideProvider(DailyResponsesService, {
    useValue: mockService([
      { date: '2026-04-27', answers: [{ questionId: 'a1', value: 5 }] },
      { date: '2026-04-26', answers: [{ questionId: 'a1', value: 3 }] },
    ]),
  });
  const fixture = TestBed.createComponent(History);
  fixture.detectChanges();

  await flushMicrotasks();
  fixture.detectChanges();

  const el: HTMLElement = fixture.nativeElement;
  const dates = el.querySelectorAll('p.font-bold');
  expect(dates).toHaveLength(2);
  expect(dates[0].textContent?.trim()).toBe('2026-04-27');
  expect(dates[1].textContent?.trim()).toBe('2026-04-26');
});

it('should display a message when there are no daily responses', async () => {
  const fixture = TestBed.createComponent(History);
  fixture.detectChanges();

  await flushMicrotasks();
  fixture.detectChanges();

  const el: HTMLElement = fixture.nativeElement;
  expect(el.querySelector('p.text-gray-500')).toBeTruthy();
  expect(el.querySelector('ul')).toBeNull();
});
