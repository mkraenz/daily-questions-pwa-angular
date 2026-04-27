/**
 * Flushes all pending microtasks (resolved promises) before continuing.
 *
 * Angular components that load data via a Promise (e.g. a service call in the
 * constructor) schedule their signal updates as microtasks. These have not yet
 * run when the first `detectChanges()` is called, so the DOM reflects the
 * initial empty state. Awaiting this function drains the microtask queue,
 * allowing those `.then()` callbacks to complete before the next
 * `detectChanges()` re-renders the updated state.
 */
export async function flushMicrotasks(): Promise<void> {
  await Promise.resolve();
}
