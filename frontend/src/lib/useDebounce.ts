'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

/**
 * A value that trails `value` by `delay` milliseconds.
 *
 * Search and filter inputs update state on every keystroke. Anything derived
 * from that state — a filtered list, a sorted array, an expensive render — is
 * therefore recomputed once per character rather than once per pause. On a large
 * plot inventory or a long blog archive that is the difference between a
 * responsive filter and a visibly stuttering one.
 *
 * The input stays controlled and responsive because the caller renders
 * `value`; only the derived work is delayed.
 *
 * @param value  the value to trail, typically a controlled input's state
 * @param delay  quiet period in milliseconds; defaults to 250ms
 */
export function useDebouncedValue<T>(value: T, delay = 250): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    if (delay <= 0) {
      setDebounced(value);
      return;
    }

    const timer = setTimeout(() => setDebounced(value), delay);

    // Clearing on cleanup is what makes this a trailing edge rather than a
    // queue: rapid keystrokes keep replacing the pending timer, so only the
    // final value commits.
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

/**
 * A callback that runs at most once per `delay` milliseconds, on the trailing
 * edge, with the most recent arguments.
 *
 * Use this for work that leaves the browser — a search request, an autosave —
 * where each intermediate call is wasted work. For pure client-side filtering,
 * prefer `useDebouncedValue`; it avoids allocating a new callback per render.
 */
export function useDebouncedCallback<Args extends unknown[]>(
  callback: (...args: Args) => void,
  delay = 300
): (...args: Args) => void {
  // Kept in a ref so an inline arrow passed at the call site does not reset the
  // timer on every render, which would starve the callback entirely.
  const latest = useRef(callback);

  useEffect(() => {
    latest.current = callback;
  }, [callback]);

  const pending = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (pending.current !== null) {
        clearTimeout(pending.current);
      }
    };
  }, []);

  return useMemo(() => {
    return (...args: Args) => {
      if (pending.current !== null) {
        clearTimeout(pending.current);
      }

      pending.current = setTimeout(() => {
        pending.current = null;
        latest.current(...args);
      }, delay);
    };
  }, [delay]);
}
