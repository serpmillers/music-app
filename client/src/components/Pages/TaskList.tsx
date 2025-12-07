import React, { useEffect, useMemo, useState } from "react";

type ID = string;

type Project = {
  id: ID;
  name: string;
  createdAt: number;
};

type Task = {
  id: ID;
  title: string;
  notes?: string;
  projectId: ID | null;
  completed: boolean;
  priority: "low" | "medium" | "high";
  due?: string;
  createdAt: number;
  updatedAt?: number;
};

const STORAGE_KEY = "musicapp.tasks.v1";
const makeId = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
const defaultProjectId = "inbox";

const defaultData = () => ({
  projects: [
    { id: defaultProjectId, name: "Inbox", createdAt: Date.now() },
    { id: makeId(), name: "Work", createdAt: Date.now() },
    { id: makeId(), name: "Personal", createdAt: Date.now() },
  ] as Project[],
  tasks: [
    {
      id: makeId(),
      title: "Design the new playlist layout",
      notes: "Sketch grid + list concepts. Use darker vignette.",
      projectId: defaultProjectId,
      completed: false,
      priority: "medium",
      due: undefined,
      createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
    } as Task,
    {
      id: makeId(),
      title: "Write README for music-app",
      notes: "Describe dev setup and features.",
      projectId: defaultProjectId,
      completed: false,
      priority: "low",
      due: undefined,
      createdAt: Date.now() - 1000 * 60 * 60 * 6,
    } as Task,
  ] as Task[],
});

const loadFromStorage = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultData();
    return JSON.parse(raw);
  } catch (e) {
    console.error("Could not read tasks from storage", e);
    return defaultData();
  }
};

const saveToStorage = (data: any) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("Could not save tasks to storage", e);
  }
};

const TaskList = () => {
  const [data, setData] = useState(() => loadFromStorage());
  const [selectedProject, setSelectedProject] = useState<ID | "all">(defaultProjectId);
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"active" | "completed">("active");
  const [selectedTaskId, setSelectedTaskId] = useState<ID | null>(null);
  const [newProjectName, setNewProjectName] = useState("");
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [expandedProjects, setExpandedProjects] = useState(true);
  const [expandedTasks, setExpandedTasks] = useState(true);

  useEffect(() => {
    saveToStorage(data);
  }, [data]);

  const projects: Project[] = data.projects;
  const tasks: Task[] = data.tasks;

  const visibleTasks = useMemo(() => {
    let list = tasks.slice();

    if (selectedProject !== "all") {
      list = list.filter((t) => t.projectId === selectedProject);
    }

    const isCompleted = activeTab === "completed";
    list = list.filter((t) => t.completed === isCompleted);

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          (t.notes || "").toLowerCase().includes(q)
      );
    }

    list.sort((a, b) => b.createdAt - a.createdAt);
    return list;
  }, [tasks, selectedProject, query, activeTab]);

  const selectedTask = tasks.find((t) => t.id === selectedTaskId) || null;

  const addProject = (name: string) => {
    if (!name.trim()) return;
    const p: Project = { id: makeId(), name: name.trim(), createdAt: Date.now() };
    setData((prev) => ({ ...prev, projects: [p, ...prev.projects] }));
    setNewProjectName("");
    setSelectedProject(p.id);
  };

  const renameProject = (id: ID, name: string) => {
    if (!name.trim()) return;
    setData((prev: any) => ({
      ...prev,
      projects: prev.projects.map((p: Project) => (p.id === id ? { ...p, name } : p)),
    }));
  };

  const removeProject = (id: ID) => {
    if (id === defaultProjectId) return alert("Cannot delete Inbox.");
    if (!confirm("Delete project and move tasks to Inbox?")) return;
    setData((prev: any) => {
      const projects = prev.projects.filter((p: Project) => p.id !== id);
      const tasks = prev.tasks.map((t: Task) => (t.projectId === id ? { ...t, projectId: defaultProjectId } : t));
      return { ...prev, projects, tasks };
    });
    setSelectedProject(defaultProjectId);
  };

  const addTask = (title: string, projectId: ID = (selectedProject === "all" ? defaultProjectId : selectedProject) as ID) => {
    if (!title.trim()) return;
    const t: Task = {
      id: makeId(),
      title: title.trim(),
      notes: "",
      projectId,
      completed: false,
      priority: "medium",
      createdAt: Date.now(),
    };
    setData((prev: any) => ({ ...prev, tasks: [t, ...prev.tasks] }));
    setNewTaskTitle("");
  };

  const updateTask = (id: ID, patch: Partial<Task>) => {
    setData((prev: any) => ({
      ...prev,
      tasks: prev.tasks.map((t: Task) => (t.id === id ? { ...t, ...patch, updatedAt: Date.now() } : t)),
    }));
  };

  const deleteTask = (id: ID) => {
    if (!confirm("Delete this task?")) return;
    setData((prev: any) => ({ ...prev, tasks: prev.tasks.filter((t: Task) => t.id !== id) }));
    if (selectedTaskId === id) setSelectedTaskId(null);
  };

  const toggleComplete = (id: ID) => {
    const t = tasks.find((x) => x.id === id);
    if (!t) return;
    updateTask(id, { completed: !t.completed });
  };

  const startPomodoroForTask = (task: Task) => {
    try {
      window.dispatchEvent(new CustomEvent("pomodoro:start", { detail: { task } }));
    } catch (e) {
      console.warn("Could not dispatch pomodoro:start event", e);
    }
    localStorage.setItem("musicapp.currentPomodoroTask", JSON.stringify(task));
  };

  const projectName = (id: ID | null) => projects.find((p) => p.id === id)?.name || "Inbox";
  const projectCount = (id: ID | null) => tasks.filter((t) => t.projectId === id && !t.completed).length;

  return (
    <div className="flex h-full min-h-0 gap-4 p-4">
      {/* Sidebar */}
      <div className="w-56 component rounded-2xl p-4 flex flex-col gap-4 min-h-0 overflow-y-auto">
        {/* Projects Container */}
        <div className="flex flex-col gap-2">
          <button
            onClick={() => setExpandedProjects(!expandedProjects)}
            className="flex items-center justify-between text-sm font-bold text-white uppercase tracking-wider hover:text-gray-300 transition"
          >
            <span>📁 Projects</span>
            <span className="text-xs">{expandedProjects ? "▼" : "▶"}</span>
          </button>

          {expandedProjects && (
            <div className="flex flex-col gap-2 ml-2">
              {/* All Tasks option */}
              <button
                onClick={() => setSelectedProject("all")}
                className={`text-left px-2 py-1 rounded text-sm transition-colors ${
                  selectedProject === "all"
                    ? "bg-blue-600 text-white font-semibold"
                    : "text-gray-300 hover:bg-gray-800/50"
                }`}
              >
                All Tasks
              </button>

              {/* Project list */}
              {projects.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedProject(p.id)}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    const name = prompt("Rename project", p.name);
                    if (name && name.trim()) renameProject(p.id, name.trim());
                  }}
                  className={`text-left px-2 py-1 rounded text-sm transition-colors group flex items-center justify-between ${
                    selectedProject === p.id
                      ? "bg-blue-600 text-white font-semibold"
                      : "text-gray-300 hover:bg-gray-800/50"
                  }`}
                  title="Right-click to rename"
                >
                  <span className="flex-1 truncate">{p.name}</span>
                  {p.id !== defaultProjectId && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeProject(p.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 text-xs ml-1"
                    >
                      ×
                    </button>
                  )}
                </button>
              ))}

              {/* Add project form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  addProject(newProjectName);
                }}
                className="flex gap-1 mt-2"
              >
                <input
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  placeholder="New project"
                  className="flex-1 bg-gray-800/50 border border-gray-700 rounded px-2 py-1 text-xs text-white focus:outline-none focus:border-blue-500"
                />
                <button className="px-2 py-1 bg-blue-600 rounded text-xs font-semibold hover:bg-blue-700">
                  +
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Tasks Container */}
        <div className="border-t border-gray-700/50 pt-4 flex flex-col gap-2">
          <button
            onClick={() => setExpandedTasks(!expandedTasks)}
            className="flex items-center justify-between text-sm font-bold text-white uppercase tracking-wider hover:text-gray-300 transition"
          >
            <span>✓ Tasks</span>
            <span className="text-xs">{expandedTasks ? "▼" : "▶"}</span>
          </button>

          {expandedTasks && (
            <div className="flex flex-col gap-2 ml-2">
              {/* Show independent tasks (tasks not in any project or in Inbox) */}
              {tasks
                .filter((t) => !t.completed && (t.projectId === defaultProjectId || t.projectId === null))
                .slice(0, 5)
                .map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTaskId(t.id)}
                    className="text-left px-2 py-1 rounded text-xs text-gray-300 hover:bg-gray-800/50 truncate transition-colors"
                    title={t.title}
                  >
                    {t.title}
                  </button>
                ))}

              {tasks.filter((t) => !t.completed && (t.projectId === defaultProjectId || t.projectId === null)).length === 0 && (
                <div className="text-xs text-gray-500 italic">No tasks</div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 component rounded-2xl p-6 flex flex-col gap-4 min-h-0">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">
              {selectedProject === "all" ? "All Tasks" : projectName(selectedProject)}
            </h1>
            <p className="text-sm text-gray-400">
              {visibleTasks.length} {activeTab === "active" ? "active" : "completed"}{" "}
              {visibleTasks.length === 1 ? "task" : "tasks"}
            </p>
          </div>

          {/* Add Task Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addTask(newTaskTitle);
            }}
            className="flex gap-2"
          >
            <input
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Add task..."
              className="bg-gray-800/50 border border-gray-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
            />
            <button className="px-4 py-2 bg-blue-600 rounded text-sm font-semibold hover:bg-blue-700">
              Add
            </button>
          </form>
        </div>

        {/* Tabs & Search */}
        <div className="flex items-center justify-between gap-4 border-b border-gray-700/50 pb-4">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab("active")}
              className={`text-sm font-semibold pb-2 transition-colors ${
                activeTab === "active"
                  ? "text-blue-500 border-b-2 border-blue-500"
                  : "text-gray-400 hover:text-gray-300"
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setActiveTab("completed")}
              className={`text-sm font-semibold pb-2 transition-colors ${
                activeTab === "completed"
                  ? "text-blue-500 border-b-2 border-blue-500"
                  : "text-gray-400 hover:text-gray-300"
              }`}
            >
              Completed
            </button>
          </div>

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tasks..."
            className="bg-gray-800/50 border border-gray-700 rounded px-3 py-1 text-sm text-white focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Tasks Table */}
        <div className="overflow-y-auto flex-1 min-h-0">
          {visibleTasks.length === 0 && (
            <div className="text-center text-gray-400 py-8">
              No {activeTab === "active" ? "active" : "completed"} tasks
            </div>
          )}

          <div className="space-y-2">
            {visibleTasks.map((t: Task) => (
              <div
                key={t.id}
                onClick={() => setSelectedTaskId(t.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors ${
                  selectedTaskId === t.id
                    ? "bg-blue-600/20 border border-blue-500/50"
                    : "hover:bg-gray-800/50"
                } ${t.completed ? "opacity-60" : ""}`}
              >
                <input
                  type="checkbox"
                  checked={t.completed}
                  onChange={(e) => {
                    e.stopPropagation();
                    toggleComplete(t.id);
                  }}
                  className="w-5 h-5 rounded cursor-pointer"
                />

                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-white truncate">{t.title}</div>
                  {t.due && (
                    <div className="text-xs text-gray-400">
                      Due {new Date(t.due).toLocaleDateString()}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  <span
                    className={`text-xs px-2 py-1 rounded font-semibold ${
                      t.priority === "high"
                        ? "bg-red-600/30 text-red-300"
                        : t.priority === "medium"
                        ? "bg-yellow-600/30 text-yellow-300"
                        : "bg-gray-700/30 text-gray-300"
                    }`}
                  >
                    {t.priority.charAt(0).toUpperCase() + t.priority.slice(1)}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      startPomodoroForTask(t);
                    }}
                    className="px-2 py-1 text-xs bg-blue-600 rounded hover:bg-blue-700 text-white font-semibold"
                  >
                    Start
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Details Panel */}
      {selectedTask && (
        <div className="w-96 component rounded-2xl p-6 flex flex-col gap-4 min-h-0">
          <div>
            <h2 className="text-lg font-bold text-white">{selectedTask.title}</h2>
            <p className="text-xs text-gray-400">
              {projectName(selectedTask.projectId)} •{" "}
              {new Date(selectedTask.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div className="border-t border-gray-700/50 pt-4">
            <label className="text-xs font-semibold text-gray-300 block mb-2">
              Notes
            </label>
            <textarea
              value={selectedTask.notes || ""}
              onChange={(e) =>
                updateTask(selectedTask.id, { notes: e.target.value })
              }
              className="w-full bg-gray-800/50 border border-gray-700 rounded p-2 text-sm text-white focus:outline-none focus:border-blue-500 resize-none"
              rows={5}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <label className="flex flex-col text-xs gap-1">
              <span className="font-semibold text-gray-300">Due Date</span>
              <input
                type="date"
                value={selectedTask.due || ""}
                onChange={(e) =>
                  updateTask(selectedTask.id, {
                    due: e.target.value || undefined,
                  })
                }
                className="bg-gray-800/50 border border-gray-700 rounded px-2 py-1 text-white text-sm focus:outline-none focus:border-blue-500"
              />
            </label>

            <label className="flex flex-col text-xs gap-1">
              <span className="font-semibold text-gray-300">Priority</span>
              <select
                value={selectedTask.priority}
                onChange={(e) =>
                  updateTask(selectedTask.id, {
                    priority: e.target.value as any,
                  })
                }
                className="bg-gray-800/50 border border-gray-700 rounded px-2 py-1 text-white text-sm focus:outline-none focus:border-blue-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </label>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              onClick={() => startPomodoroForTask(selectedTask)}
              className="flex-1 px-3 py-2 bg-blue-600 rounded text-sm font-semibold hover:bg-blue-700"
            >
              Start Pomodoro
            </button>
            <button
              onClick={() =>
                deleteTask(selectedTask.id)
              }
              className="flex-1 px-3 py-2 bg-red-600/30 text-red-300 rounded text-sm font-semibold hover:bg-red-600/50"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;