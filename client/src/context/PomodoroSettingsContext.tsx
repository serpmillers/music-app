import React, {createContext, useContext, useState} from "react";

interface PomodoroSettings {
  pomodoro: number;
  shortBreak: number;
  longBreak: number;
  cyclesBeforeLongBreak: number;
  playSound: boolean;
  setSettings: (s: Partial<PomodoroSettings>) => void;
}

const PomodoroSettingsContext = createContext<PomodoroSettings | null>(null);

export const PomodoroSettingsProvider = ({children}: {children:any}) => {
  const [settings, setSettingsState] = useState({
    pomodoro: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60,
    cyclesBeforeLongBreak: 4,
    playSound: true,
  });

  const setSettings = (update: Partial<typeof settings>) => {
    setSettingsState(prev => ({...prev, ...update}));
  };

  return (
    <PomodoroSettingsContext.Provider value={{...settings, setSettings}}>
      {children}
    </PomodoroSettingsContext.Provider>
  );
};

export const usePomodoroSettings = () => useContext(PomodoroSettingsContext)!;
