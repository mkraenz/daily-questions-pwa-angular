import { Injectable } from '@angular/core';

export interface AnswerRecord {
  questionId: string;
  value: string | number;
}

export interface DailyResponse {
  date: string;
  answers: AnswerRecord[];
}

@Injectable({ providedIn: 'root' })
export class DailyResponsesService {
  private readonly STORAGE_KEY = 'daily-responses';

  getAll(): DailyResponse[] {
    const raw = localStorage.getItem(this.STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as DailyResponse[];
    return parsed.sort((a, b) => b.date.localeCompare(a.date));
  }

  getByDate(date: string): DailyResponse | null {
    return this.getAll().find(r => r.date === date) ?? null;
  }

  saveResponse(response: DailyResponse): void {
    const all = this.getAll().filter(r => r.date !== response.date);
    all.push(response);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(all));
  }

  todayDate(): string {
    return new Date().toISOString().slice(0, 10);
  }
}
