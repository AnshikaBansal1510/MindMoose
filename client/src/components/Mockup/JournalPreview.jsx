import { BookOpen, Lock, Feather, Heart } from "lucide-react";

export default function JournalPreview() {
  return (
    <div className="rounded-xl border border-border/40 bg-yellow-100/45 p-4 space-y-3 max-w-2xl mx-auto shadow-lg">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-muted-foreground" />
          <p className="text-xs font-semibold text-foreground">
            Daily Journal
          </p>
        </div>

        <div className="flex items-center gap-1">
          <Lock className="h-3 w-3" />
          <span className="text-[11px]">Private</span>
        </div>
      </div>

      {/* Writing Area */}
      <div className="rounded-lg border border-border/40 bg-white/60 p-1.5 space-y-3">
        <div className="h-1 w-2/3 rounded bg-black/20" />
        <div className="h-1 w-full rounded bg-black/30" />
        <div className="h-1 w-5/6 rounded bg-black/20" />
        <div className="h-1 w-4/5 rounded bg-black/30" />
      </div>

      {/* Mood Hint */}
      <div className="flex items-center gap-2 rounded-lg px-2">
        <Heart className="h-4 w-4" />
        <p className="text-[11px]">
          How are you feeling today?
        </p>
      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2">
          <Feather className="h-3 w-3" />
          <span className="text-[11px]">
            Write freely, no judgments
          </span>
        </div>

        <div className="rounded-full border border-border/40 bg-pink-300/40 px-2">
          <span className="text-[11px]">
            Save Entry
          </span>
        </div>
      </div>

    </div>
  );
}
