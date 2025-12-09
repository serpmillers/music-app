import React, { useState } from "react";

type Task = {
  id: string;
  name: string;
  description: string;
  priority: "low" | "medium" | "high";
  completed: boolean;
};

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [tempTask, setTempTask] = useState<Task | null>(null);
  const [expandedPriorities, setExpandedPriorities] = useState({
    high: true,
    medium: true,
    low: true,
  });
  const [expandedCompleted, setExpandedCompleted] = useState(false);

  const startNewTask = () => {
    setTempTask({
      id: `temp-${Date.now()}`,
      name: "",
      description: "",
      priority: "medium",
      completed: false,
    });
  };

  const saveTask = () => {
    if (!tempTask || !tempTask.name.trim()) return;
    const newTask: Task = {
      ...tempTask,
      id: tempTask.id.startsWith('temp-') ? `${Date.now()}` : tempTask.id,
    };
    setTasks([...tasks, newTask]);
    setTempTask(null);
    setSelectedTask(null);
  };

  const cancelTask = () => {
    setTempTask(null);
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
    if (selectedTask?.id === id) {
      setSelectedTask(null);
    }
  };

  const toggleTaskCompletion = (id: string) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  // Separate completed and active tasks
  const activeTasks = tasks.filter((t) => !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);

  // Get tasks grouped by priority (only active tasks)
  const highPriorityTasks = activeTasks.filter((t) => t.priority === "high");
  const mediumPriorityTasks = activeTasks.filter((t) => t.priority === "medium");
  const lowPriorityTasks = activeTasks.filter((t) => t.priority === "low");

  const PrioritySection = ({
    title,
    tasks: sectionTasks,
    priority,
  }: {
    title: string;
    tasks: Task[];
    priority: "high" | "medium" | "low";
  }) => {
    if (sectionTasks.length === 0) return null;

    return (
      <div className="flex flex-col gap-3">
        <button
          onClick={() =>
            setExpandedPriorities((prev) => ({
              ...prev,
              [priority]: !prev[priority],
            }))
          }
          className="flex items-center gap-2 text-sm font-bold text-gray-300 uppercase tracking-wider hover:text-white transition-colors duration-200"
        >
          <span>{expandedPriorities[priority] ? "▼" : "▶"}</span>
          <span>{title}</span>
          <span className="text-xs font-normal">({sectionTasks.length})</span>
        </button>

        {expandedPriorities[priority] && (
          <div className="flex flex-col gap-2">
            {sectionTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800/50 transition-all duration-200 group"
              >
                {/* Checkbox Toggle */}
                <button
                  onClick={() => toggleTaskCompletion(task.id)}
                  className="w-6 h-6 rounded-lg border-2 border-blue-500 flex items-center justify-center flex-shrink-0 hover:bg-blue-500/20 transition-all duration-200 active:scale-90"
                  title="Toggle completion"
                >
                  {task.completed && <span className="text-blue-400">✓</span>}
                </button>

                {/* Task Info */}
                <button
                  onClick={() => setSelectedTask(task)}
                  className="flex-1 min-w-0 overflow-hidden text-left"
                >
                  <div className="flex items-baseline gap-2">
                    <p className="text-gray-200 font-medium whitespace-nowrap">{task.name}</p>
                    {task.description && (
                      <p className="text-gray-500 text-sm truncate flex-1">
                        {task.description}
                      </p>
                    )}
                  </div>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex h-full min-h-0 p-4 gap-4">
      {/* Main Tasks List Container */}
      <div className="flex-1 rounded-2xl p-6 min-h-0 overflow-y-auto">
        <div className="flex flex-col gap-6">
          {/* Priority High Section */}
          <PrioritySection
            title="Priority: High"
            tasks={highPriorityTasks}
            priority="high"
          />

          {/* Priority Medium Section */}
          <PrioritySection
            title="Priority: Medium"
            tasks={mediumPriorityTasks}
            priority="medium"
          />

          {/* Priority Low Section */}
          <PrioritySection
            title="Priority: Low"
            tasks={lowPriorityTasks}
            priority="low"
          />

          {/* Empty State or Add Task Button */}
          {tasks.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">No tasks yet</div>
              <button
                onClick={startNewTask}
                className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition mx-auto cursor-pointer"
              >
                <span className="text-lg">+</span>
                <span>Add a task</span>
              </button>
            </div>
          ) : (
            <button
              onClick={startNewTask}
              className="mt-4 flex items-center gap-2 px-4 py-3 text-blue-400 hover:text-blue-300 hover:bg-gray-800/30 rounded-lg transition cursor-pointer"
            >
              <span className="text-lg">+</span>
              <span>Add a task</span>
            </button>
          )}

          {/* Completed Tasks Section */}
          {completedTasks.length > 0 && (
            <div className="flex flex-col gap-3 mt-6 pt-6 border-t border-gray-700">
              <button
                onClick={() => setExpandedCompleted(!expandedCompleted)}
                className="flex items-center gap-2 text-sm font-bold text-gray-300 uppercase tracking-wider hover:text-white transition"
              >
                <span>{expandedCompleted ? "▼" : "▶"}</span>
                <span>Done</span>
                <span className="text-xs font-normal">({completedTasks.length})</span>
              </button>

              {expandedCompleted && (
                <div className="flex flex-col gap-2">
                  {completedTasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800/50 transition group"
                    >
                      {/* Checkbox Toggle */}
                      <button
                        onClick={() => toggleTaskCompletion(task.id)}
                        className="w-6 h-6 rounded-lg bg-blue-600 border-2 border-blue-500 flex items-center justify-center flex-shrink-0 hover:bg-blue-700 transition"
                        title="Toggle completion"
                      >
                        <span className="text-white">✓</span>
                      </button>

                      {/* Task Info */}
                      <button
                        onClick={() => setSelectedTask(task)}
                        className="flex-1 min-w-0 overflow-hidden text-left cursor-pointer"
                      >
                        <div className="flex items-baseline gap-2">
                          <p className="text-gray-400 font-medium whitespace-nowrap line-through">{task.name}</p>
                          {task.description && (
                            <p className="text-gray-600 text-sm truncate flex-1 line-through">
                              {task.description}
                            </p>
                          )}
                        </div>
                      </button>

                      {/* Priority Badge */}
                      <div
                        className={`px-2 py-1 rounded text-xs font-semibold flex-shrink-0 ${
                          task.priority === "high"
                            ? "bg-red-500/20 text-red-300"
                            : task.priority === "medium"
                              ? "bg-yellow-500/20 text-yellow-300"
                              : "bg-green-500/20 text-green-300"
                        }`}
                      >
                        {task.priority}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Side Panel - Add Task */}
      {tempTask && (
        <div className="w-96 component rounded-2xl p-6 flex flex-col gap-6 min-h-0">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">New Task</h2>
            <button
              onClick={cancelTask}
              className="text-gray-400 hover:text-white transition text-xl"
              title="Close"
            >
              ×
            </button>
          </div>

          {/* Task Name Input */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
              Task Title
            </label>
            <input
              type="text"
              value={tempTask.name}
              onChange={(e) =>
                setTempTask({ ...tempTask, name: e.target.value })
              }
              placeholder="Enter task title..."
              className="bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition"
              autoFocus
            />
          </div>

          {/* Description Input */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
              Description
            </label>
            <textarea
              value={tempTask.description}
              onChange={(e) =>
                setTempTask({ ...tempTask, description: e.target.value })
              }
              placeholder="Enter task description..."
              rows={4}
              className="bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition resize-none"
            />
          </div>

          {/* Priority Selector */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
              Priority
            </label>
            <select
              value={tempTask.priority}
              onChange={(e) =>
                setTempTask({
                  ...tempTask,
                  priority: e.target.value as "low" | "medium" | "high",
                })
              }
              className="bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 mt-auto">
            <button
              onClick={saveTask}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2"
            >
              <span>✓</span>
              <span>Save</span>
            </button>
            <button
              onClick={cancelTask}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2"
            >
              <span>×</span>
              <span>Cancel</span>
            </button>
          </div>
        </div>
      )}

      {/* Side Panel - Task Details */}
      {selectedTask && !tempTask && (
        <div className="w-96 component rounded-2xl p-6 flex flex-col gap-6 min-h-0 overflow-y-auto">
          {/* Header with Close Button */}
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">{selectedTask.name}</h2>
            <button
              onClick={() => setSelectedTask(null)}
              className="text-gray-400 hover:text-white transition text-xl"
              title="Close"
            >
              ×
            </button>
          </div>

          {/* Priority Badge */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
              Priority:
            </span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                selectedTask.priority === "high"
                  ? "bg-red-500/20 text-red-300"
                  : selectedTask.priority === "medium"
                    ? "bg-yellow-500/20 text-yellow-300"
                    : "bg-green-500/20 text-green-300"
              }`}
            >
              {selectedTask.priority}
            </span>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
              Description
            </label>
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-gray-200 min-h-24 whitespace-pre-wrap break-words">
              {selectedTask.description || <span className="text-gray-500 italic">No description</span>}
            </div>
          </div>

          {/* Task Info */}
          <div className="flex flex-col gap-2 text-xs text-gray-400">
            <div>
              <span className="font-semibold">Task ID:</span> {selectedTask.id}
            </div>
            <div>
              <span className="font-semibold">Created:</span> {new Date(parseInt(selectedTask.id)).toLocaleDateString()}
            </div>
            <div>
              <span className="font-semibold">Status:</span> {selectedTask.completed ? "Completed" : "Active"}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 mt-auto">
            <button
              onClick={() => deleteTask(selectedTask.id)}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2"
            >
              <span>🗑</span>
              <span>Delete</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;