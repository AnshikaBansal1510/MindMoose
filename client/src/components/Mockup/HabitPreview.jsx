import { Flame, CheckCircle2, Calendar } from "lucide-react";

export default function HabitPreview() {
  return (
    <div className="rounded-xl border border-border/40 bg-[#ebeddf] p-5 space-y-2 shadow-lg">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Flame className="h-4 w-4 text-muted-foreground" />
          <p className="text-xs font-semibold text-foreground">
            Wellness Streaks
          </p>
        </div>

        <span className="text-[11px] text-muted-foreground">
          7 day streak 🔥
        </span>
      </div>

      {/* Main Streak Slider */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-[11px] text-muted-foreground">
          <span>Mon</span>
          <span>Sun</span>
        </div>

        <div className="relative h-2 rounded-full bg-muted/40 overflow-hidden">
          {/* Active streak */}
          <div className="h-full w-4/5 rounded-full bg-foreground/60 transition-all" />
        </div>
      </div>

      {/* Daily Activity */}
      <div className="flex items-center justify-between">
        {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-1"
          >
            <div className="h-6 w-6 rounded-full bg-red-300/30 flex items-center justify-center">
              <CheckCircle2 className="h-3 w-3" />
            </div>
            <span className="text-[10px]">
              {day}
            </span>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-30 pt-1">
        <div className="rounded-lg border border-border/40 bg-orange-200/45 p-3">
          <p className="text-xs font-semibold">
            12
          </p>
          <p className="text-[11px] text-muted-foreground">
            Total Habits
          </p>
        </div>

        <div className="rounded-lg border border-border/40 bg-orange-200/45 p-3">
          <p className="text-xs font-semibold">
            28
          </p>
          <p className="text-[11px]">
            Check-ins
          </p>
        </div>
      </div>

    </div>
  );
}
