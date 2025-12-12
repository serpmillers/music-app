// to manage tasks directly and distributing the info with Home.tsx and TaskList.tsx
import React, {createContext, useContext, useState, type ReactNode} from "react";

export type Task = {
  id: string;
  name: string;
  description: string;
  priority: "low" | "medium" | "high";
  completed: boolean;
};

type TasksContextType = {
  tasks: Task[];
  setTasks: (t: Task[]) => void;
  addTask: (t: Task) => void;
  deleteTask: (id: string) => void;
  toggleTaskCompletion: (id: string) => void;
  selectedTaskId: string | null;
  setSelectedTaskId: (id: string | null) => void;
};

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export const TasksProvider = ({children}: {children: ReactNode}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  const addTask = (t: Task) => setTasks((s) => [...s, t]);
  const deleteTask = (id: string) => setTasks((s) => s.filter((x) => x.id !== id));
  const toggleTaskCompletion = (id: string) =>
    setTasks((s) => s.map((t) => (t.id === id ? {...t, completed: !t.completed} : t)));

  return (
    <TasksContext.Provider
      value={{
        tasks,
        setTasks,
        addTask,
        deleteTask,
        toggleTaskCompletion,
        selectedTaskId,
        setSelectedTaskId,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => {
  const ctx = useContext(TasksContext);
  if (!ctx) throw new Error("useTasks must be used within TasksProvider");
  return ctx;
};
