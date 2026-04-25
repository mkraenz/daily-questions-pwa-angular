import { Injectable } from '@angular/core';
import { DailyResponse, db } from './app-db';

@Injectable({ providedIn: 'root' })
export class DailyResponsesService {
  private readonly db = db;

  getAll(): Promise<DailyResponse[]> {
    return this.db.answers.orderBy('date').reverse().toArray();
  }

  async getByDate(date: string): Promise<DailyResponse | null> {
    return (await this.db.answers.get({ date })) ?? null;
  }

  async saveResponse(response: DailyResponse): Promise<void> {
    await this.db.answers.put(response);
  }

  todayDate(): string {
    return new Date().toISOString().slice(0, 10);
  }
}
