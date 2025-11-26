# 📘 React Dunamu Interview Kit

Frontend Engineering Live Coding & Technical Interview Preparation

본 저장소는 **두나무 Frontend Engineer 포지션 대비**를 위해  
실제 면접에서 반복적으로 등장하는 패턴과 코딩 태스크를 중심으로  
7일간 집중적으로 실습한 내용을 정리한 프로젝트입니다.

React 코어 패턴, 커스텀 훅 설계, 비동기 처리, 타입 정의,  
성능 최적화, 그리고 Web3(Ethers.js) 연동까지  
짧은 기간 안에 실무형 역량을 재정비하는 것을 목표로 했습니다.

---

## 📅 Day-by-Day Overview

| Day | Topic | Key Focus Areas | Demo |
|-----|--------|-----------------|------|
| **0** | Environment & Hook Fundamentals | Vite 세팅, ESLint/Prettier, 기본 Hook(useState/useEffect/useRef) 정리 | [Day0](./src/days/Day0_HookBasics.tsx) |
| **1** | React Core Rebuild | 검색 입력 처리, 필터링, 즉시 값/디바운스 값 비교 | [Day1](./src/days/Day1_CustomHooks.tsx) |
| **2** | Async Flow & State Management | API fetch, 로딩/에러 분리, useReducer 기반 액션 관리 | [Day2](./src/days/Day2_Async.tsx) |
| **3** | Custom Hooks Deep Dive | useDebounce / useThrottle / useLocalStorage 직접 구현 | [Day3](./src/days/Day3_CustomHooks.tsx) |
| **4** | TypeScript for React | API Response 모델링, Pick/Omit/Partial 등 유틸 타입 활용 | [Day4](./src/days/Day4_TypeScript.tsx) |
| **5** | Rendering Optimization | React.memo, useCallback, useMemo, 컴포넌트 구조화 전략 | [Day5](./src/days/Day5_Performance.tsx) |
| **6** | Web3 Integration | MetaMask 연결, Provider/Signer, balance 조회, signMessage | |
| **7** | 40-Minute Mock Interview | 검색 + pagination + skeleton UI + 커스텀 훅 + Web3 통합 문제 | |

각 Day는 독립된 실습과 함께  
실전 면접에서 설명하기 좋은 설계 의도와 개선 포인트를 포함합니다.

---

## 🎯 Purpose & Intent

본 프로젝트는 다음을 목표로 합니다:

- **라이브 코딩 대응력 강화**  
  단순 구현이 아니라 "왜 이렇게 설계했는가"까지 설명 가능한 구조 지향

- **실무·면접에 반복 등장하는 React 패턴 정리**  
  debouncing, memoization, 상태 분리, 비동기 제어 등 핵심 위주 학습

- **현실적인 러닝 루틴 (하루 30–60분)**  
  회사 업무와 병행 가능한 학습량으로 구성

- **Web3 기반 FE 역량 정리**  
  MetaMask 연동 및 계정/서명 처리 등  
  두나무 FE 포지션에서 유리한 Web3 실전 흐름 포함

---

## 🛠 Tech Stack

- React 18 + TypeScript
- Vite
- TailwindCSS
- Ethers.js
- ESLint / Prettier
- Custom Hooks Architecture

---

## 📁 Project Structure

```text
src/
├─ App.tsx
├─ main.tsx
├─ days/
│  ├─ Day0_HookBasics.tsx
│  ├─ Day1_Core.tsx
│  ├─ Day2_Async.tsx
│  ├─ Day3_CustomHooks.tsx
│  ├─ Day4_TypeScript.tsx
│  ├─ Day5_Performance.tsx
│  ├─ Day6_Web3.tsx
│  └─ Day7_MockInterview.tsx
└─ hooks/
   ├─ useDebounce.ts
   ├─ useThrottle.ts
   ├─ usePrevious.ts
   ├─ useLocalStorage.ts
   └─ useAsync.ts
```

실제 파일명/구조는 구현 과정에서 일부 변경될 수 있습니다.

---

## 📝 Notes

- 커스텀 훅, 비동기 처리, 렌더링 최적화 등 면접에서 깊게 질문하는 영역을 중심으로 구성했습니다.
- README 및 Day별 문서·코드 예시는 지속적으로 업데이트됩니다.

---

## 🙌 Final Words

짧은 기간 동안 React 전반의 감각을 재정비하고 두나무 FE 포지션 대비 역량을 폭넓게 점검하기 위해 제작한 프로젝트입니다.

본 저장소가 실무형 역량과 인터뷰 대응력을 보여주는 자료가 되기를 바랍니다. 더 나은 사용자 경험을 함께 만들어가고 싶습니다.
