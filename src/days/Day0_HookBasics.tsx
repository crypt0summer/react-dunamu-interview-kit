// src/days/Day0.tsx
import React from "react";

const codeUseState = `import * as React from 'react';
import { useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}
`;

const codeUseEffect = `import * as React from 'react';
import { useState, useEffect } from "react";

export default function App() {
  const [text, setText] = useState("");

  useEffect(() => {
    console.log("text 변경됨:", text);
  }, [text]);

  // 좀더 실사용 케이스와 가까운 예제
  useEffect(() => {
    fetch("/api/users");
  }, []); // 의존성 배열이 빈 배열 → 마운트 때 딱 한 번만 실행.

  return (
    <input
      value={text}
      onChange={(e) => setText(e.target.value)}
      placeholder="입력해봐"
    />
  );
}
`;

const codeUseRef = `import * as React from 'react';
import { useRef, useState } from "react";

export default function App() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const countRef = useRef(0);

  const focus = () => {
    if (!inputRef.current) return;
    inputRef.current.focus();
  };

  const increase = () => {
    countRef.current += 1;
    console.log("ref 값:", countRef.current);
  };

  return (
    <div>
      <input ref={inputRef} />
      <button onClick={focus}>포커스</button>
      <button onClick={increase}>ref 증가</button>
    </div>
  );
}
`;

const codeUseContext = `import React, { createContext, useContext } from "react";

const ThemeContext = createContext<"light" | "dark">("light");

function Child() {
  const theme = useContext(ThemeContext);
  return <div>현재 테마: {theme}</div>;
}
`;

const codeUseMemo = `import * as React from 'react';
import { useMemo, useState } from "react";

function slowFn(num: number) {
  console.log("무거운 계산 실행...");
  for (let i = 0; i < 500000000; i++) {}
  return num * 2;
}

export default function App() {
  const [number, setNumber] = useState(1);
  const doubled = useMemo(() => slowFn(number), [number]);

  return (
    <div>
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(Number(e.target.value))}
      />
      <p>결과: {doubled}</p>
    </div>
  );
}
`;

const codeUseCallbackSimple = `import * as React from 'react';
import { useCallback, useState } from "react";

export default function App() {
  const [value, setValue] = useState("");

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  return (
    <input value={value} onChange={handleChange} placeholder="타이핑해봐" />
  );
}
`;

const codeUseCallbackParentChild = `import React, { useCallback, useState } from "react";

function Parent() {
  const [count, setCount] = useState(0);

  // ✅ 함수가 매 렌더링마다 새로 안 만들고 유지됨
  const onClick = useCallback(() => {
    console.log("clicked");
  }, []);

  return (
    <>
      <button onClick={() => setCount((c) => c + 1)}>부모 리렌더: {count}</button>
      <Child onClick={onClick} />
    </>
  );
}

const Child = React.memo(function Child({ onClick }: { onClick: () => void }) {
  console.log("자식 렌더링…");
  return <button onClick={onClick}>자식 버튼</button>;
});
`;

const codeUseTransition = `import * as React from 'react';
import { useState, useTransition } from "react";

export default function App() {
  const [text, setText] = useState("");
  const [list, setList] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setText(value);

    startTransition(() => {
      const arr = Array.from({ length: 3000 }, () => value);
      setList(arr);
    });
  };

  return (
    <div>
      <input value={text} onChange={handleChange} />
      {isPending && <p>로딩중...</p>}
      <ul>
        {list.map((v, i) => (
          <li key={i}>{v}</li>
        ))}
      </ul>
    </div>
  );
}
`;

const codeUseId = `import React, { useId } from "react";

export default function App() {
  const id = useId(); // SSR/CSR 모두에서 안정적인 고유 ID 생성

  return (
    <div>
      <label htmlFor={id}>이름</label>
      <input id={id} />
    </div>
  );
}
`;

const codeUseLayoutEffect = `import * as React from 'react';
import { useState, useLayoutEffect, useRef } from "react";

export default function App() {
  const boxRef = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState(0);

  useLayoutEffect(() => {
    const updateSize = () => {
      if (boxRef.current) {
        setSize(boxRef.current.getBoundingClientRect().width);
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div>
      <div
        ref={boxRef}
        style={{ background: "lightblue", width: "50%" }}
      >
        박스
      </div>
      <p>박스 가로 크기: {size}px</p>
    </div>
  );
}
`;

export default function Day0() {
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center pt-10">
      <div className="w-full max-w-4xl px-4 py-10 space-y-8">
        {/* 헤더 */}
        <header className="space-y-2">
          <p className="text-xs font-semibold tracking-wide text-indigo-500 uppercase">
            Day 0
          </p>
          <h1 className="text-2xl font-semibold text-gray-900">
            기본 Hook & 최신 Hook 정리
          </h1>
          <p className="text-sm text-gray-500">
            useState / useEffect / useRef / useContext / useMemo / useCallback /{" "}
            useTransition / useId / useLayoutEffect 를 언제 쓰는지 정리하고,
            간단한 예제로 감각을 되살리는 페이지입니다.
          </p>
        </header>

        {/* 섹션 구분 */}
        <div className="space-y-8">
          {/* 기본 Hook */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">① 기본 Hook</h2>
            <p className="text-sm text-gray-500">
              가장 자주 쓰이는 기본 Hook 네 개를 정리했습니다. 상태, 사이드 이펙트,
              ref, context 흐름을 한 번에 잡는 용도입니다.
            </p>

            {/* useState */}
            <article className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5 space-y-3">
              <h3 className="text-base font-medium text-gray-900">useState</h3>
              <ul className="text-sm text-gray-600 list-disc pl-4 space-y-1">
                <li>컴포넌트에 상태를 추가</li>
                <li>값이 변경되면 컴포넌트가 리렌더링됨</li>
                <li>상태 업데이트는 비동기적으로 일어날 수 있음</li>
              </ul>
              <pre className="mt-3 bg-gray-900 text-gray-50 text-xs rounded-xl p-3 overflow-x-auto">
                <code>{codeUseState}</code>
              </pre>
            </article>

            {/* useEffect */}
            <article className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5 space-y-3">
              <h3 className="text-base font-medium text-gray-900">useEffect</h3>
              <p className="text-sm text-gray-600">
                렌더링/값 변경/마운트·언마운트 시점에 사이드 이펙트(외부와 상호작용하는 모든 동작)를 처리할 때 사용합니다.
                API 호출, 외부 이벤트 등록, 콘솔 출력 등 '렌더링 외부와 상호작용하는 동작'을 처리합니다.
                특히 디바운스된 값처럼, '입력이 확정된 시점'에 실행해야 하는 부수효과 처리에 자주 사용됩니다.
                React는 가상의 DOM(Virtual DOM) → 실제 DOM을 “React가 직접” 제어하는 구조입니다.
                그런데 개발자가 React 바깥에서 DOM을 직접 건드리면 React의 예상과 실제 DOM의 상태가 불일치하게 됩니다.
                그래서 다음 렌더링에서 React가 이전 상태를 기준으로 DOM을 덮어쓰고, hydration mismatch 발생하는 등의 버그가 발생합니다.
              </p>
              <pre className="mt-3 bg-gray-900 text-gray-50 text-xs rounded-xl p-3 overflow-x-auto">
                <code>{codeUseEffect}</code>
              </pre>
            </article>

            {/* useRef */}
            <article className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5 space-y-3">
              <h3 className="text-base font-medium text-gray-900">useRef</h3>
              <ul className="text-sm text-gray-600 list-disc pl-4 space-y-1">
                <li>렌더링 사이에서도 값이 유지되지만 값 변경 시 리렌더링은 안 됨</li>
                <li>DOM 요소에 직접 접근할 때 많이 사용</li>
                <li>이전 값 저장, 타이머 id 저장 등에도 활용</li>
              </ul>
              <pre className="mt-3 bg-gray-900 text-gray-50 text-xs rounded-xl p-3 overflow-x-auto">
                <code>{codeUseRef}</code>
              </pre>
            </article>

            {/* useContext */}
            <article className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5 space-y-3">
              <h3 className="text-base font-medium text-gray-900">useContext</h3>
              <ul className="text-sm text-gray-600 list-disc pl-4 space-y-1">
                <li>테마, 로그인 정보 등 공통 값을 트리 깊은 곳까지 전달할 때 사용</li>
                <li>props drilling 없이 상위 값에 바로 접근 가능</li>
              </ul>
              <pre className="mt-3 bg-gray-900 text-gray-50 text-xs rounded-xl p-3 overflow-x-auto">
                <code>{codeUseContext}</code>
              </pre>
            </article>
          </section>

          {/* 최적화 Hook */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">② 최적화 Hook</h2>
            <p className="text-sm text-gray-500">
              렌더링 비용이 크거나, 자식 컴포넌트 최적화가 필요할 때 useMemo / useCallback
              을 사용합니다.
            </p>

            {/* useMemo */}
            <article className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5 space-y-3">
              <h3 className="text-base font-medium text-gray-900">useMemo</h3>
              <ul className="text-sm text-gray-600 list-disc pl-4 space-y-1">
                <li>값 계산 결과를 캐싱</li>
                <li>무거운 연산 결과를 의존성 변경 시에만 다시 계산</li>
              </ul>
              <pre className="mt-3 bg-gray-900 text-gray-50 text-xs rounded-xl p-3 overflow-x-auto">
                <code>{codeUseMemo}</code>
              </pre>
            </article>

            {/* useCallback */}
            <article className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5 space-y-3">
              <h3 className="text-base font-medium text-gray-900">useCallback</h3>
              <ul className="text-sm text-gray-600 list-disc pl-4 space-y-1">
                <li>함수 자체를 메모이제이션해서 동일한 레퍼런스를 유지</li>
                <li>
                  자식 컴포넌트에 props로 함수를 넘길 때,{" "}
                  <code className="px-1 py-0.5 rounded bg-gray-100 text-xs">
                    React.memo
                  </code>
                  와 함께 사용하면 불필요한 렌더링을 줄일 수 있음
                </li>
              </ul>
              <pre className="mt-3 bg-gray-900 text-gray-50 text-xs rounded-xl p-3 overflow-x-auto mb-3">
                <code>{codeUseCallbackSimple}</code>
              </pre>
              <pre className="bg-gray-900 text-gray-50 text-xs rounded-xl p-3 overflow-x-auto">
                <code>{codeUseCallbackParentChild}</code>
              </pre>
            </article>
          </section>

          {/* 최신/특수 Hook */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">
              ③ 최신 & 특수 Hook
            </h2>
            <p className="text-sm text-gray-500">
              React 18 이후 추가된 동시성 관련 Hook과 레이아웃 측정용 Hook입니다.
            </p>

            {/* useTransition */}
            <article className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5 space-y-3">
              <h3 className="text-base font-medium text-gray-900">useTransition</h3>
              <ul className="text-sm text-gray-600 list-disc pl-4 space-y-1">
                <li>UI를 블록하지 않고 상태 변경을 “느슨하게” 처리</li>
                <li>입력은 빠르게, 무거운 렌더링은 뒤로 미뤄 자연스러운 UX 제공</li>
                <li>검색 필터링, 무거운 리스트 갱신에 자주 사용</li>
              </ul>
              <pre className="mt-3 bg-gray-900 text-gray-50 text-xs rounded-xl p-3 overflow-x-auto">
                <code>{codeUseTransition}</code>
              </pre>
            </article>

            {/* useId */}
            <article className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5 space-y-3">
              <h3 className="text-base font-medium text-gray-900">useId</h3>
              <ul className="text-sm text-gray-600 list-disc pl-4 space-y-1">
                <li>접근성 태그에서 사용할 고유 id 생성</li>
                <li>SSR + CSR 환경 모두에서 동일한 id를 보장</li>
                <li>React 18 이후로는 직접 문자열로 id를 짓는 것보다 권장</li>
              </ul>
              <pre className="mt-3 bg-gray-900 text-gray-50 text-xs rounded-xl p-3 overflow-x-auto">
                <code>{codeUseId}</code>
              </pre>
            </article>

            {/* useLayoutEffect */}
            <article className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5 space-y-3">
              <h3 className="text-base font-medium text-gray-900">useLayoutEffect</h3>
              <ul className="text-sm text-gray-600 list-disc pl-4 space-y-1">
                <li>DOM이 그려진 직후, 화면에 그려지기 전에 동기적으로 실행</li>
                <li>레이아웃 측정, 스크롤 위치 조정처럼 화면 깜빡임을 줄이고 싶을 때 사용</li>
                <li>일반적인 사이드 이펙트는 가급적 useEffect로 처리</li>
              </ul>
              <pre className="mt-3 bg-gray-900 text-gray-50 text-xs rounded-xl p-3 overflow-x-auto">
                <code>{codeUseLayoutEffect}</code>
              </pre>
            </article>
          </section>

          <p className="text-xs text-gray-400">
            * Day 0에서는 개념 정리에 집중하고, Day 1부터는{" "}
            <code className="px-1 py-0.5 rounded bg-gray-100">usePrevious</code>,{" "}
            <code className="px-1 py-0.5 rounded bg-gray-100">useDebounce</code> 같은
            커스텀 훅과 실전 패턴을 다룹니다.
          </p>
        </div>
      </div>
    </div>
  );
}