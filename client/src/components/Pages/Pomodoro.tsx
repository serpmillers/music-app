import React, { useState, useEffect, useRef } from "react";

const DEFAULTS = {
  pomodoro: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
  cyclesBeforeLongBreak: 4,
};

const Pomodoro = () => {
  const [pomodoroTime] = useState(DEFAULTS.pomodoro);
  const [shortBreakTime] = useState(DEFAULTS.shortBreak);
  const [longBreakTime] = useState(DEFAULTS.longBreak);
  const [cyclesBeforeLongBreak] = useState(DEFAULTS.cyclesBeforeLongBreak);

  const [secondsLeft, setSecondsLeft] = useState(pomodoroTime);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<"pomodoro" | "short" | "long">("pomodoro");
  const [cycle, setCycle] = useState(0);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (mode === "pomodoro") setSecondsLeft(pomodoroTime);
    if (mode === "short") setSecondsLeft(shortBreakTime);
    if (mode === "long") setSecondsLeft(longBreakTime);
    setIsRunning(false);
  }, [mode, pomodoroTime, shortBreakTime, longBreakTime]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            handleTimerEnd();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line
  }, [isRunning]);

  const handleTimerEnd = () => {
    setIsRunning(false);
    if (mode === "pomodoro") {
      if (cycle + 1 === cyclesBeforeLongBreak) {
        setMode("long");
        setCycle(0);
      } else {
        setMode("short");
        setCycle((c) => c + 1);
      }
    } else {
      setMode("pomodoro");
    }
  };

  const resetTimer = () => {
    if (mode === "pomodoro") setSecondsLeft(pomodoroTime);
    if (mode === "short") setSecondsLeft(shortBreakTime);
    if (mode === "long") setSecondsLeft(longBreakTime);
    setIsRunning(false);
  };

  const minutes = Math.floor(secondsLeft / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (secondsLeft % 60).toString().padStart(2, "0");

  return (
    <div className="p-2 w-full flex-col gap-2 h-[40%] flex">
      <div className="flex flex-col h-full min-h-0 component mt-2 items-center justify-center p-6">
        <span className="text-lg text-gray-300 font-semibold mb-2">
          {mode === "pomodoro" && "Pomodoro"}
          {mode === "short" && "Short Break"}
          {mode === "long" && "Long Break"}
        </span>
        <div className="text-5xl font-mono mb-4 text-white">
          {minutes}:{seconds}
        </div>
        <div className="flex gap-4 mb-4">
          <button
            className="rounded-2xl px-4 py-2 text-white bg-gray-900 hover:bg-gray-800"
            onClick={() => setIsRunning((prev) => !prev)}
          >
            {secondsLeft === pomodoroTime && !isRunning && mode === "pomodoro"
              ? "Start"
              : isRunning
              ? "Pause"
              : "Resume"}
          </button>
          <button
            className="rounded-2xl px-4 py-2 text-white bg-gray-900 hover:bg-gray-800"
            onClick={resetTimer}
          >
            Reset
          </button>
        </div>
        {/* Dots for cycles */}
        <div className="flex gap-2 mt-2">
          {Array.from({ length: cyclesBeforeLongBreak }).map((_, idx) => (
            <span
              key={idx}
              className={`w-3 h-3 rounded-full inline-block ${
                idx < cycle ? "bg-gray-300" : "bg-gray-500"
              }`}
            ></span>
          ))}
        </div>
        <div className="mt-2 text-xs text-gray-300">
          {mode === "pomodoro" &&
            `Cycle ${cycle + 1} of ${cyclesBeforeLongBreak}`}
          {mode === "short" && "Short Break"}
          {mode === "long" && "Long Break"}
        </div>
      </div>
    </div>
  )
}

export default Pomodoro;