import { useState, useEffect } from 'react';

/**
 * 입력값을 지정된 시간(ms) 동안 안정화시키는 debounce 훅
 * @param value 디바운스할 값
 * @param delay 지연 시간(ms)
 * @returns 지연된 값
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
