// hooks/usePrevious.ts
import { useEffect, useRef } from "react";

export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>(undefined);

  // value가 바뀔 때마다 "이전 값"으로 현재 값을 저장해
  useEffect(() => {
    ref.current = value;  // 지금 들어온 값이 다음엔 "이전 값"이 됨
  }, [value]);

  // 지금 ref에 들어있는 게 진짜 이전 값!
  return ref.current;
}