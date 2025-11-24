import { useEffect, useState, useCallback, useRef } from 'react';

interface AsyncState<T> {
  status: "idle" | "loading" | "success" | "error";
  data: T | null;
  error: Error | null;
}  

interface AsyncResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

export function useAsync<T>(asyncFn: () => Promise<T>, deps: any[]) : AsyncResult<T>  {
    const [state, setState] = useState<AsyncState<T>>({
        status: "idle",
        data: null,
        error: null,
    });

    const asyncFnRef = useRef(asyncFn); //asyncFn 최신 버전 유지

    useEffect(() => {
        asyncFnRef.current = asyncFn;
    }, [asyncFn]);

    const execute = useCallback(() => {
        setState({ status: "loading", data: null, error: null });

        asyncFnRef.current()
        .then((data) => {
            setState({ status: "success", data, error: null });
        })
        .catch((error: unknown) => {
            setState({
            status: "error",
            data: null,
            error: error instanceof Error ? error : new Error(String(error)),
            });
        });
    }, []); // 의존성 없음 -> 항상 같은 함수
   
    useEffect(() => {
        execute();
    }, deps); // deps 바뀌면 실행

    const refetch = useCallback(() => {
        execute();
    }, [execute]);

    return {
        data: state.data,
        loading: state.status === "loading",
        error: state.error,
        refetch,
    };
}
