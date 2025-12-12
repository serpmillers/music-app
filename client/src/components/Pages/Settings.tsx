import React, { useState } from "react";
import { usePomodoroSettings } from "../../context/PomodoroSettingsContext";

type AppearanceMode = "system" | "dark" | "light" | "custom";

interface CustomTheme {
  wallpaper: string | null;
  accentColor: string;
}

type SettingNumberProps = {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  step?: number;
};

const SettingNumber: React.FC<SettingNumberProps> = ({label, value, onChange, min=1, step=1}) => (
  <div className="flex flex-col">
    <label className="text-gray-300 text-sm mb-1">{label}</label>
    <input
      type="number"
      value={value}
      min={min}
      step={step}
      className="bg-gray-800 text-white p-2 rounded-lg"
      onChange={(e) => {
        const v = Number(e.target.value);
        if (!Number.isNaN(v)) onChange(v);
      }}
    />
  </div>
);

const Settings: React.FC = () => {
  const [appearanceMode, setAppearanceMode] = useState<AppearanceMode>("system");
  const [customTheme, setCustomTheme] = useState<CustomTheme>({
    wallpaper: null,
    accentColor: "#3b82f6",
  });

  // Pomodoro settings from context
  const {
    pomodoro,
    shortBreak,
    longBreak,
    cyclesBeforeLongBreak,
    playSound,
    setSettings,
  } = usePomodoroSettings();

  const handleWallpaperUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        setCustomTheme((prev) => ({ ...prev, wallpaper: base64 }));
      };
      reader.readAsDataURL(file);
    }
  };

  const detectAccentColor = () => {
    // Placeholder for accent color detection algorithm
    const suggestedColors = ["#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b"];
    const randomColor = suggestedColors[Math.floor(Math.random() * suggestedColors.length)];
    setCustomTheme((prev) => ({ ...prev, accentColor: randomColor }));
  };

  return (
    <div className="flex h-full min-h-0 p-4">
      {/* Main Settings Container */}
      <div className="flex-1 rounded-2xl p-8 min-h-0 overflow-y-auto">
        {/* Header */}
        <h1 className="text-3xl font-bold text-white mb-8">Settings</h1>

        {/* Appearance Section */}
        <div className="flex flex-col gap-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Appearance</h2>
            <div className="flex flex-col gap-4">
              <button
                onClick={() => setAppearanceMode("system")}
                className={`flex items-center gap-4 px-6 py-4 rounded-lg border-2 transition-all duration-300 ${
                  appearanceMode === "system"
                    ? "border-blue-500 bg-blue-500/10"
                    : "border-gray-700 bg-gray-800/50 hover:border-gray-600"
                }`}
              >
                <div
                  className="w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                  style={{
                    borderColor: appearanceMode === "system" ? "#3b82f6" : "#9ca3af",
                  }}
                >
                  {appearanceMode === "system" && (
                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                  )}
                </div>
                <div className="text-left">
                  <p className="text-white font-semibold">System Default</p>
                  <p className="text-gray-400 text-sm">Follow your device settings</p>
                </div>
              </button>

              <button
                onClick={() => setAppearanceMode("dark")}
                className={`flex items-center gap-4 px-6 py-4 rounded-lg border-2 transition-all duration-300 ${
                  appearanceMode === "dark"
                    ? "border-blue-500 bg-blue-500/10"
                    : "border-gray-700 bg-gray-800/50 hover:border-gray-600"
                }`}
              >
                <div
                  className="w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                  style={{
                    borderColor: appearanceMode === "dark" ? "#3b82f6" : "#9ca3af",
                  }}
                >
                  {appearanceMode === "dark" && (
                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                  )}
                </div>
                <div className="text-left">
                  <p className="text-white font-semibold">Dark Mode</p>
                  <p className="text-gray-400 text-sm">Easy on the eyes</p>
                </div>
              </button>

              <button
                onClick={() => setAppearanceMode("light")}
                className={`flex items-center gap-4 px-6 py-4 rounded-lg border-2 transition-all duration-300 ${
                  appearanceMode === "light"
                    ? "border-blue-500 bg-blue-500/10"
                    : "border-gray-700 bg-gray-800/50 hover:border-gray-600"
                }`}
              >
                <div
                  className="w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                  style={{
                    borderColor: appearanceMode === "light" ? "#3b82f6" : "#9ca3af",
                  }}
                >
                  {appearanceMode === "light" && (
                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                  )}
                </div>
                <div className="text-left">
                  <p className="text-white font-semibold">Light Mode</p>
                  <p className="text-gray-400 text-sm">Bright and clean</p>
                </div>
              </button>

              <button
                onClick={() => setAppearanceMode("custom")}
                className={`flex items-center gap-4 px-6 py-4 rounded-lg border-2 transition-all duration-300 ${
                  appearanceMode === "custom"
                    ? "border-blue-500 bg-blue-500/10"
                    : "border-gray-700 bg-gray-800/50 hover:border-gray-600"
                }`}
              >
                <div
                  className="w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                  style={{
                    borderColor: appearanceMode === "custom" ? "#3b82f6" : "#9ca3af",
                  }}
                >
                  {appearanceMode === "custom" && (
                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                  )}
                </div>
                <div className="text-left">
                  <p className="text-white font-semibold">Custom</p>
                  <p className="text-gray-400 text-sm">Upload wallpaper & set accent color</p>
                </div>
              </button>

              {appearanceMode === "custom" && (
                <div className="mt-6 ml-10 flex flex-col gap-6 pt-6 border-t border-gray-700">
                  <div className="flex flex-col gap-3">
                    <label className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
                      Wallpaper
                    </label>
                    <div className="flex gap-4">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleWallpaperUpload}
                        className="hidden"
                        id="wallpaper-input"
                      />
                      <label
                        htmlFor="wallpaper-input"
                        className="flex-1 flex items-center justify-center px-6 py-4 border-2 border-dashed border-gray-600 rounded-lg hover:border-blue-500 transition cursor-pointer text-gray-400 hover:text-blue-400"
                      >
                        <span>
                          {customTheme.wallpaper ? "Change Wallpaper" : "Upload Wallpaper"}
                        </span>
                      </label>
                    </div>

                    {customTheme.wallpaper && (
                      <div className="w-full h-32 rounded-lg overflow-hidden border border-gray-700">
                        <img
                          src={customTheme.wallpaper}
                          alt="Wallpaper preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-3">
                    <label className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
                      Accent Color
                    </label>
                    <div className="flex gap-4">
                      <div className="flex items-center gap-3">
                        <input
                          type="color"
                          value={customTheme.accentColor}
                          onChange={(e) =>
                            setCustomTheme((prev) => ({
                              ...prev,
                              accentColor: e.target.value,
                            }))
                          }
                          className="w-12 h-12 rounded-lg cursor-pointer"
                        />
                        <span className="text-gray-300 font-mono text-sm">
                          {customTheme.accentColor}
                        </span>
                      </div>
                    </div>
                  </div>

                  {customTheme.wallpaper && (
                    <button
                      onClick={detectAccentColor}
                      className="w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition"
                    >
                      Auto-Detect Accent Color
                    </button>
                  )}

                  <div className="mt-4 p-4 rounded-lg border border-gray-700">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                      Preview
                    </p>
                    <div
                      className="w-full h-20 rounded-lg"
                      style={{
                        backgroundColor: customTheme.accentColor + "20",
                        borderColor: customTheme.accentColor,
                        borderWidth: "2px",
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Pomodoro Section */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">Pomodoro</h2>

          <div className="flex flex-col gap-4">
            <SettingNumber
              label="Pomodoro Duration (minutes)"
              value={Math.round(pomodoro / 60)}
              onChange={(v) => setSettings({pomodoro: v * 60})}
              min={1}
            />

            <SettingNumber
              label="Short Break (minutes)"
              value={Math.round(shortBreak / 60)}
              onChange={(v) => setSettings({shortBreak: v * 60})}
              min={1}
            />

            <SettingNumber
              label="Long Break (minutes)"
              value={Math.round(longBreak / 60)}
              onChange={(v) => setSettings({longBreak: v * 60})}
              min={1}
            />

            <SettingNumber
              label="Cycles Before Long Break"
              value={cyclesBeforeLongBreak}
              onChange={(v) => setSettings({cyclesBeforeLongBreak: Math.max(1, Math.floor(v))})}
              min={1}
            />

            <label className="flex items-center gap-3 text-white mt-4">
              <input
                type="checkbox"
                checked={!!playSound}
                onChange={(e) => setSettings({playSound: e.target.checked})}
              />
              Play Bell Sound on Phase Change
            </label>

            <button
              className="mt-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
              onClick={() => {
                try {
                  new Audio("/bell.mp3").play();
                } catch (err) {
                  // graceful fallback
                  console.warn("Bell test failed", err);
                }
              }}
            >
              Test Bell Sound
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
