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
  /** WORKAROUND: IndexedDB/dexie does not support indexing booleans.
   * Hence, we use 1=true and 0=false. */
  active: 0 | 1;
  ordering: number;
}
