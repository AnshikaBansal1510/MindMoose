import { useEffect, useState } from "react";
import {
  BookHeart,
  PenLine,
  MessageCircleHeart,
  Smile,
  Flame,
  Activity,
  HandHeart
} from "lucide-react";
import MoodPreview from "./Mockup/MoodPreview";
import BlogPreview from "./Mockup/BlogPreview";
import JournalPreview from "./Mockup/JournalPreview";
import TherapistPreview from "./Mockup/TherapistPreview";
import HabitPreview from "./Mockup/HabitPreview";
import PlannerPreview from "./Mockup/PlannerPreview";
import StressPreview from "./Mockup/StressPreview";

export default function MindMooseMockup() {
  const [activeFeature, setActiveFeature] = useState("journal");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const features = [
    {
      id: "mood",
      title: "Mood Tracker",
      icon: Smile,
      description:
        "Track your emotions daily and understand your mental patterns.",
      aesthetic: <MoodPreview />
    },
    {
      id: "stress",
      title: "Stress Check-in",
      icon: Activity,
      description:
        "Receive personalized AI-powered stress coping strategies based on your stress level, symptoms etc.",
      aesthetic: <StressPreview />
    },
    {
      id: "self-care",
      title: "Self Care Planner",
      icon: HandHeart,
      description:
        "Analyzes your daily habits to create a personalized routine for better mental and emotional well-being.",
      aesthetic: <PlannerPreview />
    },
    {
      id: "blogs",
      title: "Community Blogs",
      icon: BookHeart,
      description:
        "Read and share stories that help you feel understood and less alone.",
      aesthetic: <BlogPreview />
    },
    {
      id: "journal",
      title: "Daily Journaling",
      icon: PenLine,
      description:
        "A calm, private space to reflect your thoughts and emotions.",
      aesthetic: <JournalPreview />,
    },
    {
      id: "ai",
      title: "AI Therapist",
      icon: MessageCircleHeart,
      description:
        "Chat with an AI companion trained to respond with empathy and care.",
      aesthetic:<TherapistPreview />,
    },
    {
      id: "habits",
      title: "Wellness Streaks",
      icon: Flame,
      description:
        "Build small habits and stay consistent without pressure.",
      aesthetic: <HabitPreview />
    }  
  ];

  // Auto-cycle
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveFeature((current) => {
          const index = features.findIndex((f) => f.id === current);
          return features[(index + 1) % features.length].id;
        });
        setTimeout(() => setIsTransitioning(false), 80);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const current = features.find((f) => f.id === activeFeature);

  return (
    <section id="features" className="relative overflow-hidden py-8 mb-25">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="relative mb-12">
          <div className="rounded-xl border border-border/40 bg-white/50 shadow-xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border/40 bg-white/45 px-6 py-5">
              <div className="flex gap-2">
                <span className="h-3 w-3 rounded-full bg-red-500" />
                <span className="h-3 w-3 rounded-full bg-yellow-500" />
                <span className="h-3 w-3 rounded-full bg-green-500" />
              </div>
              <p className="text-s text-muted-foreground font-medium">
                MindMoose.app
              </p>
            </div>

            {/* Body */}
            <div className="grid min-h-[420px] grid-cols-5 bg-background">
              {/* Sidebar */}
              <aside className="col-span-2 border-r border-border/40 p-4 space-y-2">
                {features.map((feature) => {
                  const Icon = feature.icon;
                  const active = activeFeature === feature.id;

                  return (
                    <button
                      key={feature.id}
                      onClick={() => setActiveFeature(feature.id)}
                      className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition-all
                        ${
                          active
                            ? "bg-[#b22d64] text-white shadow-sm"
                            : "hover:bg-muted/50 text-muted-foreground"
                        }`}
                    >
                      <Icon className="h-5 w-5" />
                      <div>
                        <p className="text-sm font-medium">{feature.title}</p>
                        {/* <p className="text-xs opacity-70">
                          {feature.description}
                        </p> */}
                      </div>
                    </button>
                  );
                })}
              </aside>

              {/* Content */}
              <main className="col-span-3 p-6 border-l border-border/40">
                <div
                  className={`transition-all duration-300 ease-in-out
                    ${
                      isTransitioning
                        ? "translate-x-4 opacity-0"
                        : "translate-x-0 opacity-100"
                    }`}
                >
                  <div className="border-gray-400 mb-6 border-b pb-4">
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {current.title}
                    </h3>

                    <p className="text-sm text-gray-500 mb-6">
                      {current.description}
                    </p>
                  </div>

                  <div className="rounded-lg bg-muted/30 p-4 space-y-3">
                    
                    {current.aesthetic}
                  </div>
                </div>
              </main>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
