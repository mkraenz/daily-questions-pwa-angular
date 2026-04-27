import { DailyResponse } from './domain.types';

function dateOffset(daysAgo: number): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().slice(0, 10);
}

export const mockAnswers: DailyResponse[] = [
  {
    date: dateOffset(1),
    answers: [
      { questionId: 'a5e36d31', value: 7 },
      { questionId: '063c6ce1', value: 6 },
      { questionId: 'aa73eb84', value: 8 },
      { questionId: 'e881e50e', value: 7 },
      { questionId: 'ec57f75e', value: 5 },
      { questionId: '0f3223d5', value: 9 },
      { questionId: 'b875a18e', value: 'Had a great pair programming session with a colleague.' },
    ],
  },
  {
    date: dateOffset(2),
    answers: [
      { questionId: 'a5e36d31', value: 5 },
      { questionId: '063c6ce1', value: 4 },
      { questionId: 'aa73eb84', value: 6 },
      { questionId: 'e881e50e', value: 5 },
      { questionId: 'ec57f75e', value: 7 },
      { questionId: '0f3223d5', value: 6 },
      { questionId: 'b875a18e', value: 'Finished reading a chapter of a book I had been putting off.' },
    ],
  },
  {
    date: dateOffset(3),
    answers: [
      { questionId: 'a5e36d31', value: 8 },
      { questionId: '063c6ce1', value: 7 },
      { questionId: 'aa73eb84', value: 9 },
      { questionId: 'e881e50e', value: 8 },
      { questionId: 'ec57f75e', value: 6 },
      { questionId: '0f3223d5', value: 8 },
      { questionId: 'b875a18e', value: 'Went for a long walk and cleared my head.' },
    ],
  },
  {
    date: dateOffset(4),
    answers: [
      { questionId: 'a5e36d31', value: 4 },
      { questionId: '063c6ce1', value: 3 },
      { questionId: 'aa73eb84', value: 5 },
      { questionId: 'e881e50e', value: 4 },
      { questionId: 'ec57f75e', value: 4 },
      { questionId: '0f3223d5', value: 5 },
      { questionId: 'b875a18e', value: 'Cooked a new recipe for dinner — turned out well.' },
    ],
  },
  {
    date: dateOffset(5),
    answers: [
      { questionId: 'a5e36d31', value: 9 },
      { questionId: '063c6ce1', value: 8 },
      { questionId: 'aa73eb84', value: 7 },
      { questionId: 'e881e50e', value: 9 },
      { questionId: 'ec57f75e', value: 8 },
      { questionId: '0f3223d5', value: 9 },
      { questionId: 'b875a18e', value: 'Shipped a feature I had been working on for two weeks.' },
    ],
  },
];
