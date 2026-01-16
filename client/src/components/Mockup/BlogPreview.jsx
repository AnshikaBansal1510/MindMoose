import { PenLine, BookHeart, Tag, Feather } from "lucide-react";

export default function BlogPreview() {
  return (
    <div className="grid grid-cols-2 gap-5 rounded-xl bg-muted/30 p-3">
      
      {/* LEFT — READ BLOGS */}
      <div className="flex flex-col justify-between rounded-lg border border-border/40 bg-blue-200/45 p-4 shadow-lg">
        
        {/* Header */}
        <div className="flex items-center gap-2">
          <BookHeart className="h-4 w-4 text-muted-foreground" />
          <p className="text-xs font-semibold text-foreground">
            Community Blogs
          </p>
        </div>

        {/* Topics */}
        <div className="mt-3 flex flex-wrap gap-2">
          {["Anxiety", "Wellness", "Self-Love", "Healing", "Personal Growth", "Productivity"].map((topic) => (
            <span
              key={topic}
              className="flex items-center gap-1 rounded-full bg-yellow-50 px-3 py-1 text-[11px] text-muted-foreground"
            >
              <Tag className="h-3 w-3" />
              {topic}
            </span>
          ))}
        </div>

        {/* Blog Cards */}
        {/* <div className="mt-4 space-y-3">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="rounded-md bg-white/60 p-3 shadow-sm"
            >
              <div className="h-0.5 w-3/4 rounded bg-muted/40 mb-2" />
              <div className="h-0.5 w-full rounded bg-muted/30" />
            </div>
          ))}
        </div> */}
      </div>

      {/* RIGHT — WRITE BLOG */}
      <div className="flex flex-col justify-between rounded-lg border border-border/40 bg-purple-200/45 p-4 shadow-lg">
        
        {/* Header */}
        <div className="flex items-center gap-2">
          <PenLine className="h-4 w-4" />
          <p className="text-xs font-semibold text-foreground">
            Write Your Story
          </p>
        </div>

        {/* Writing Area */}
        <div className="mt-4 rounded-lg bg-white/50 p-4 space-y-3">
          <div className="h-2 w-2/3 rounded bg-muted/40" />
          <div className="h-2 w-full rounded bg-muted/30" />
          <div className="h-2 w-5/6 rounded bg-muted/30" />
        </div>

        {/* CTA */}
        <div className="mt-4 flex items-center justify-center">
          <div className="flex items-center gap-2 rounded-full bg-foreground/5 px-4 py-2">
            <Feather className="h-3 w-3" />
            <span className="text-[11px]">
              Share Your Thoughts
            </span>
          </div>
        </div>
      </div>

    </div>
  );
}
