import React, { useState, useEffect, useRef } from "react";
import { usePomodoroSettings } from "../../context/PomodoroSettingsContext";

const Pomodoro = () => {
  const {
    pomodoro,
    shortBreak,
    longBreak,
    cyclesBeforeLongBreak,
    playSound,
  } = usePomodoroSettings();

  const pomodoroTime = pomodoro;
  const shortBreakTime = shortBreak;
  const longBreakTime = longBreak;

  // stepIndex represents the current step in the sequence:
  // 0 -> pomodoro, 1 -> short, 2 -> pomodoro, ... final index -> long
  const [stepIndex, setStepIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(pomodoroTime);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<"pomodoro" | "short" | "long">("pomodoro");
  const [currentTask, setCurrentTask] = useState<any>(null); // will see if I'll use task info inside pomodoro or not

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const modeForStep = (idx: number) => {
    if (idx === cyclesBeforeLongBreak - 1) return "long";
    return idx % 2 === 0 ? "pomodoro" : "short";
  };

  const durationForMode = (m: "pomodoro" | "short" | "long") =>
    m === "pomodoro" ? pomodoroTime : m === "short" ? shortBreakTime : longBreakTime;

  // Keep mode & seconds synced to stepIndex and durations
  useEffect(() => {
    const newMode = modeForStep(stepIndex);
    setMode(newMode);
    setSecondsLeft(durationForMode(newMode));
    setIsRunning(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepIndex, pomodoroTime, shortBreakTime, longBreakTime, cyclesBeforeLongBreak]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            // When time ends, advance step but don't auto-start
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning]);

  // Listen for external pomodoro:start event
  useEffect(() => {
    const handlePomodoroStart = (event: any) => {
      const task = event.detail?.task;
      if (task) {
        setCurrentTask(task);
        // start from step 0 (pomodoro)
        setStepIndex(0);
        setIsRunning(true);
      }
    };

    window.addEventListener("pomodoro:start", handlePomodoroStart as EventListener);
    return () => {
      window.removeEventListener("pomodoro:start", handlePomodoroStart as EventListener);
    };
  }, []);

  const handleTimerEnd = () => {
    // stop running (require manual resume, will change later)
    setIsRunning(true);

    if (playSound) {
      try {
        new Audio("/bell.mp3").play(); // later.
      } catch (err) {
        console.warn("Bell play failed", err);
      }
    }

    // clear task when a pomodoro step finishes (I was expeerimenting, thought I'd let it be for now)
    if (mode === "pomodoro") {
      setCurrentTask(null);
    }

    // Advance to next step (wrap around)
    const next = (stepIndex + 1) % Math.max(1, cyclesBeforeLongBreak);
    setStepIndex(next);
    // mode & secondsLeft will be updated by the effect watching stepIndex
  };

  const resetTimer = () => {
    // reset current step's duration and pause
    setSecondsLeft(durationForMode(modeForStep(stepIndex)));
    setIsRunning(false);
  };

  // clicking a dot will now jump to that step and pause for preview
  const handleDotClick = (idx: number) => {
    setStepIndex(idx);
    setIsRunning(false);
  };

  const minutes = Math.floor(secondsLeft / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (secondsLeft % 60).toString().padStart(2, "0");

  return (
    <div className="w-full h-[270px] flex-col gap-2 flex">
      <div className="flex flex-col h-full min-h-0 component items-center justify-center p-6">
        <span className="text-lg text-white font-semibold mb-2">
          {mode === "pomodoro" && "Pomodoro"}
          {mode === "short" && "Short Break"}
          {mode === "long" && "Long Break"}
        </span>

        <div className="text-5xl font-mono mb-4 text-white">
          {minutes}:{seconds}
        </div>

        <div className="flex gap-4 mb-4">
          <button
            className="cursor-pointer rounded-2xl px-4 py-2 text-white bg-gray-900 hover:bg-gray-800 transition-all ring-2 ring-gray-700 duration-300 hover:scale-105 active:scale-95"
            onClick={() => setIsRunning((prev) => !prev)}
          >
            {secondsLeft === pomodoroTime && !isRunning && mode === "pomodoro"
              ? "Start"
              : isRunning
              ? "Pause"
              : "Resume"}
          </button>

          <button
            className="cursor-pointer rounded-2xl px-4 py-2 text-white bg-gray-900 hover:bg-gray-800 ring-2 ring-gray-700 transition-all duration-300 hover:scale-105 active:scale-95"
            onClick={resetTimer}
          >
            Reset
          </button>
        </div>

        <div className="flex gap-2 mt-2">
          {Array.from({ length: Math.max(1, cyclesBeforeLongBreak) }).map((_, idx) => {
            const isActive = idx === stepIndex;
            return (
              <button
                key={idx}
                onClick={() => handleDotClick(idx)}
                aria-label={`Step ${idx + 1}`}
                className={`w-3 h-3 rounded-full inline-block transition-transform transform ${
                  isActive ? "bg-gray-300 scale-125" : "bg-gray-500 hover:scale-110"
                }`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Pomodoro;
