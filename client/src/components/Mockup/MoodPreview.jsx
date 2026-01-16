import { useEffect, useState } from "react";

const moods = [
  { id: 1, label: "Very Happy", emoji: "😄" },
  { id: 2, label: "Happy", emoji: "😊" },
  { id: 3, label: "Neutral", emoji: "😐" },
  { id: 4, label: "Sad", emoji: "😔" },
  { id: 5, label: "Stressed", emoji: "😣" },
];

export default function MoodPreview() {
  const [activeMood, setActiveMood] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMood((prev) => (prev + 1) % moods.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rounded-xl bg-pink-200/45 p-6 shadow-lg border">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-foreground text-sm font-semibold">
          Mood Tracker
        </h3>
        <p className="text-muted-foreground text-xs">
          How are you feeling today?
        </p>
      </div>

      {/* Emoji Row */}
      <div className="flex items-center justify-between">
        {moods.map((mood, index) => {
          const isActive = index === activeMood;

          return (
            <div
              key={mood.id}
              className={`flex flex-col items-center transition-all duration-300 ease-in-out ${
                isActive
                  ? "scale-125 opacity-100"
                  : "scale-95 opacity-40"
              }`}
            >
              <span className="text-3xl">{mood.emoji}</span>
              <span
                className={`mt-2 text-xs transition-opacity ${
                  isActive
                    ? "text-foreground opacity-100"
                    : "text-muted-foreground opacity-0"
                }`}
              >
                {mood.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
