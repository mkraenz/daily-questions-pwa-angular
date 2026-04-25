import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Question } from '../../services/domain.types';
import { QuestionViewComponent } from './question-view';

describe('QuestionViewComponent', () => {
  const mockQuestion: Question = {
    id: 'test-1',
    title: 'Test Question',
    questionLong: 'Is this a test question?',
    type: 'points',
    active: true,
    ordering: 0,
  };

  afterEach(() => {
    vi.useRealTimers();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionViewComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(QuestionViewComponent);
    fixture.componentRef.setInput('question', mockQuestion);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should clear the answer field after submitting', () => {
    const fixture = TestBed.createComponent(QuestionViewComponent);
    const testComponent = fixture.componentInstance;
    fixture.componentRef.setInput('question', mockQuestion);
    fixture.detectChanges();
    testComponent.value.set('5');
    let answeredValue: string | number | undefined;
    testComponent.answered.subscribe((value) => {
      answeredValue = value;
    });

    testComponent.submit();

    expect(answeredValue).toBe(5);
    expect(testComponent.value()).toBe('');
  });

  it('when hitting Enter, it pushes the Next button', () => {
    const fixture = TestBed.createComponent(QuestionViewComponent);
    const testComponent = fixture.componentInstance;
    fixture.componentRef.setInput('question', mockQuestion);
    fixture.detectChanges();
    testComponent.value.set('7');
    let answeredValue: string | number | undefined;
    testComponent.answered.subscribe((value) => {
      answeredValue = value;
    });
    const input = fixture.nativeElement.querySelector('input[type="number"]');

    input?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

    expect(answeredValue).toBe(7);
    expect(testComponent.value()).toBe('');
  });

  it('should autofocus the answer field when opening the page', () => {
    vi.useFakeTimers();
    const fixture = TestBed.createComponent(QuestionViewComponent);
    fixture.componentRef.setInput('question', mockQuestion);
    fixture.detectChanges();

    vi.runAllTimers();

    const input = fixture.nativeElement.querySelector('input[type="number"]');
    expect(document.activeElement).toBe(input);
  });

  it('after answering, the next question input has focus', () => {
    vi.useFakeTimers();
    const fixture = TestBed.createComponent(QuestionViewComponent);
    const testComponent = fixture.componentInstance;
    fixture.componentRef.setInput('question', mockQuestion);
    fixture.detectChanges();
    vi.runAllTimers();
    testComponent.value.set('5');

    testComponent.submit();
    fixture.componentRef.setInput('question', {
      ...mockQuestion,
      id: 'test-2',
      title: 'Second Question',
    });
    fixture.detectChanges();
    vi.runAllTimers();

    const input = fixture.nativeElement.querySelector('input[type="number"]');
    expect(document.activeElement).toBe(input);
  });

  it('when hitting Enter with invalid answer, it does NOT submit', () => {
    const fixture = TestBed.createComponent(QuestionViewComponent);
    const testComponent = fixture.componentInstance;
    fixture.componentRef.setInput('question', mockQuestion);
    fixture.detectChanges();
    testComponent.value.set('15');
    let emitCount = 0;
    testComponent.answered.subscribe(() => {
      emitCount++;
    });
    const input = fixture.nativeElement.querySelector('input[type="number"]');

    input?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

    expect(emitCount).toBe(0);
    expect(testComponent.value()).toBe('15');
  });
});
