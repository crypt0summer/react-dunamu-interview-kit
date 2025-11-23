// src/App.tsx
import { useState, ComponentType } from "react";
import Day0 from "./days/Day0_HookBasics";
import Day1 from "./days/Day1_CustomHooks";
import Day2 from "./days/Day2_Async";

type DayKey = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

const dayComponents: Record<DayKey, ComponentType | null> = {
  0: Day0,
  1: Day1,
  2: Day2,
  3: null,
  4: null,
  5: null,
  6: null,
  7: null,
};

export default function App() {
  const [selectedDay, setSelectedDay] = useState<DayKey>(1);

  const SelectedComponent = dayComponents[selectedDay];

  return (
    <div className="app-root">
      {/* 탭 메뉴 */}
      <div className="app-header">
        <h1 className="app-title">7일 완성 리액트 마스터 프로젝트</h1>
        <div className="app-tabs">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day as DayKey)}
              className={
                "app-tab-button" +
                (selectedDay === day ? " app-tab-button--active" : "")
              }
            >
              Day {day}
            </button>
          ))}
        </div>
      </div>

      <div>
        {SelectedComponent ? (
          <SelectedComponent />
        ) : (
          <div className="app-placeholder">
            <p>아직 구현 안 됨</p>
            <p>Day {selectedDay} 공사중! </p>
          </div>
        )}
      </div>
    </div>
  );
}
