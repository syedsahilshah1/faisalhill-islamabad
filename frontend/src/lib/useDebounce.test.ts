/**
 * Tests for the debounce helpers.
 *
 * These use fake timers, so every assertion is deterministic: the point of the
 * hook is *when* work does not happen, which real timers cannot show reliably.
 */

import { act, renderHook } from '@testing-library/react';
import { useDebouncedCallback, useDebouncedValue } from './useDebounce';

describe('useDebouncedValue', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('returns the initial value immediately', () => {
    const { result } = renderHook(() => useDebouncedValue('first', 200));

    expect(result.current).toBe('first');
  });

  it('withholds a new value until the delay elapses', () => {
    const { result, rerender } = renderHook(({ v }) => useDebouncedValue(v, 200), {
      initialProps: { v: 'a' },
    });

    rerender({ v: 'ab' });

    expect(result.current).toBe('a');

    act(() => {
      jest.advanceTimersByTime(199);
    });
    expect(result.current).toBe('a');

    act(() => {
      jest.advanceTimersByTime(1);
    });
    expect(result.current).toBe('ab');
  });

  it('commits only the final value of a rapid burst', () => {
    // The whole point of a trailing edge: ten keystrokes must produce one
    // recomputation, not ten.
    const { result, rerender } = renderHook(({ v }) => useDebouncedValue(v, 200), {
      initialProps: { v: '' },
    });

    for (const v of ['f', 'fa', 'fai', 'fais', 'faisa', 'faisal', 'faisal ', 'faisal h', 'faisal hi', 'faisal hills']) {
      rerender({ v });
      act(() => {
        jest.advanceTimersByTime(20);
      });
    }

    expect(result.current).toBe('');

    act(() => {
      jest.advanceTimersByTime(200);
    });

    expect(result.current).toBe('faisal hills');
  });

  it('passes through synchronously when the delay is zero', () => {
    const { result, rerender } = renderHook(({ v }) => useDebouncedValue(v, 0), {
      initialProps: { v: 'a' },
    });

    rerender({ v: 'b' });

    expect(result.current).toBe('b');
  });

  it('cancels a pending update on unmount', () => {
    const { rerender, unmount } = renderHook(({ v }) => useDebouncedValue(v, 200), {
      initialProps: { v: 'a' },
    });

    rerender({ v: 'ab' });
    unmount();

    // A leaked timer would warn or fire after teardown.
    expect(() => jest.advanceTimersByTime(500)).not.toThrow();
  });
});

describe('useDebouncedCallback', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('does not invoke the callback synchronously', () => {
    const spy = jest.fn();
    const { result } = renderHook(() => useDebouncedCallback(spy, 300));

    act(() => {
      result.current('x');
    });

    expect(spy).not.toHaveBeenCalled();
  });

  it('invokes once with the most recent arguments', () => {
    const spy = jest.fn();
    const { result } = renderHook(() => useDebouncedCallback(spy, 300));

    act(() => {
      result.current('first');
      result.current('second');
      result.current('third');
      jest.advanceTimersByTime(300);
    });

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('third');
  });

  it('keeps a stable identity across renders', () => {
    // An inline arrow is passed at every call site. If the returned function
    // changed identity each render, a consumer putting it in a dependency array
    // would re-run its effect on every render and never settle.
    const { result, rerender } = renderHook(() => useDebouncedCallback(() => {}, 300));

    const first = result.current;
    rerender();
    rerender();

    expect(result.current).toBe(first);
  });

  it('calls the latest callback body without restarting the timer', () => {
    const calls: string[] = [];
    const { result, rerender } = renderHook(({ tag }) => useDebouncedCallback(() => calls.push(tag), 300), {
      initialProps: { tag: 'old' },
    });

    act(() => {
      result.current();
    });

    rerender({ tag: 'new' });

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(calls).toEqual(['new']);
  });

  it('cancels a pending call on unmount', () => {
    const spy = jest.fn();
    const { result, unmount } = renderHook(() => useDebouncedCallback(spy, 300));

    act(() => {
      result.current('pending');
    });

    unmount();

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(spy).not.toHaveBeenCalled();
  });
});
