import { useState } from "react";
import { usePrevious } from "../hooks/usePrevious";
import { useDebounce } from "../hooks/useDebounce";

export default function Day1() {
  const [text, setText] = useState("");
  const previous = usePrevious(text);
  const debounced = useDebounce(text, 500);

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center pt-10">
      <div className="w-full max-w-3xl px-4 py-10 space-y-8">
        
        {/* 헤더 */}
        <header className="space-y-2">
          <p className="text-xs font-semibold tracking-wide text-indigo-500 uppercase">
            Day 1
          </p>
          <h1 className="text-2xl font-semibold text-gray-900">
            커스텀 훅 워밍업
          </h1>
          <p className="text-sm text-gray-500">
            <code className="px-1.5 py-0.5 rounded-md bg-gray-100 text-xs">
              usePrevious
            </code>{" "}
            와{" "}
            <code className="px-1.5 py-0.5 rounded-md bg-gray-100 text-xs">
              useDebounce
            </code>{" "}
            로 상태 변화 감각 익히기
          </p>
        </header>

        {/* 카드 2개 */}
        <div className="grid gap-6 md:grid-cols-2">
          
          {/* usePrevious 카드 */}
          <section className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 space-y-4">
            <h2 className="text-lg font-medium text-gray-900">
              1. usePrevious 실습
            </h2>
            <p className="text-sm text-gray-500">
              현재 값과 이전 값 변화를 즉시 비교해볼 수 있어요.
            </p>

            <div className="space-y-3">
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="여기에 입력해보세요"
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm
                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />

              <div className="space-y-1 text-sm">
                <p className="flex items-center justify-between">
                  <span className="text-gray-500">현재 값</span>
                  <span className="font-medium text-gray-900">
                    {text || "(빈칸)"}
                  </span>
                </p>
                <p className="flex items-center justify-between">
                  <span className="text-gray-500">이전 값</span>
                  <span className="font-medium text-gray-900">
                    {previous || "(아직 없음)"}
                  </span>
                </p>
              </div>
            </div>
          </section>

          {/* useDebounce 카드 */}
          <section className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 space-y-4">
            <h2 className="text-lg font-medium text-gray-900">
              2. useDebounce 실습 (500ms)
            </h2>
            <p className="text-sm text-gray-500">
              입력이 멈춘 후 500ms 뒤에 값이 반영돼요.
            </p>

            <div className="space-y-2 text-sm">
              <p className="flex items-center justify-between">
                <span className="text-gray-500">즉시 값</span>
                <span className="font-medium text-gray-900">
                  {text || "(빈칸)"}
                </span>
              </p>

              <p className="flex items-center justify-between">
                <span className="text-gray-500">디바운스 값</span>
                <span className="font-semibold text-rose-500">
                  {debounced || "(기다리는 중...)"}
                </span>
              </p>
            </div>

            <p className="text-xs text-gray-400">
              * 짧은 지연 시간 테스트에 딱 좋아요.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
