// hooks/useDebounce.ts
import { useState, useEffect } from "react";

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // delay 만큼 기다렸다가 값 업데이트
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // 만약 중간에 value가 또 바뀌면 타이머 취소하고 새로 시작!
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}