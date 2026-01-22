import { useState, useEffect } from "react";
import React from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  MessageSquare,
  Heart,
  BrainCircuit,
  ArrowRight,
  Leaf,
  Clock3, BookOpen
} from "lucide-react";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import { TwoMinBreathing } from "./TwoMinBreathing.jsx";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { generateSelfCarePlan } from "../../config/api.js";
import useAuthUser from "../../hooks/useAuthUser.js";

const Dashboard = () => {

  const { authUser } = useAuthUser();

  const [currentTime, setCurrentTime] = useState(new Date());
  const [showMagic, setShowMagic] = useState(false);
  const [habits, setHabits] = useState("");
  const [plan, setPlan] = useState("")

  const parsedHabits = habits
    .split(",")
    .map((h) => h.trim())
    .filter(Boolean); 

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const { mutate: generatePlanMutation, isPending: loading, error: planError } = useMutation({
    mutationFn: generateSelfCarePlan,
    onSuccess: (data) => {
      if(data.success) {
        toast.success("Self-Care plan created successfully");
        setHabits("");
        setPlan(data.plan);
      } 
      else {
        toast.error(data.message);
      }
    },
  
    onError: (error) => {
      toast.error(
        error.response?.data?.message || error.message
      );
    },
  });

  return (
    <div className="min-h-screen bg-background p-8">

      <img
          src={assets.flower_icon}
          className="absolute top-25 left-1/3 w-12 h-12 rotate-12 opacity-30 pointer-events-none"
          alt="flower"
        />
        <img
          src={assets.flower_icon}
          className="absolute top-40 right-16 w-16 h-16 -rotate-6 opacity-25 pointer-events-none"
          alt="flower"
        />
        <img
          src={assets.flower_icon}
          className="absolute top-72 left-1/3 w-10 h-10 rotate-45 opacity-20 pointer-events-none"
          alt="flower"
        />
        <img
          src={assets.flower_icon}
          className="absolute bottom-20 right-1/5 w-14 h-14 -rotate-30 opacity-30 pointer-events-none"
          alt="flower"
        />
        <img
          src={assets.flower_icon}
          className="absolute top-35 right-1/3 w-12 h-12 rotate-25 opacity-20 pointer-events-none"
          alt="flower"
        />
      <div className="pt-20 pb-8 space-y-">
        <div className="flex flex-col gap-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-2"
          >
          <h1 className="text-3xl font-bold">Welcome back 👋 {authUser.name}</h1>
          <p className="text-muted-foreground text-sm">
            {
              currentTime.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })
            }
          </p>
          </motion.div>
        </div>

        <div className="flex flex-wrap py-6 gap-4 justify-start">
  
          {/* AI Therapist */}
          <button 
          onClick={() => navigate("/dashboard/ai-therapist")}
          className="w-fit inline-flex items-center justify-center  rounded-xl border border-[#b22d64]/30 bg-[#b22d64]/20 px-4 py-3 text-[#4a1c2f] font-medium hover:bg-[#b22d64]/10 transition">
            <Sparkles className="w-4 h-4 mr-1 text-[#b22d64] " />
             Try AI Therapist
          </button>

          {/* 2 Minute Magic */}
          <button 
          onClick={() => setShowMagic(true)}
          className="w-fit inline-flex items-center justify-center rounded-xl border border-[#b22d64]/30 bg-[#87CEFA]/20 px-4 py-3 text-[#4a1c2f] font-medium hover:bg-[#87CEFA]/10 transition">
            <Clock3 className="w-4 h-4 mr-1 text-[#b22d64] " />
             2 Minute Magic
          </button>

          {showMagic && (
            <TwoMinBreathing onClose={() => setShowMagic(false)} />
          )}

          {/* Read Blogs */}
          <button 
          onClick={() => navigate("/blogs")}
          className="w-fit inline-flex items-center justify-center rounded-xl border border-[#b22d64]/30 bg-[#f3c677]/20 px-4 py-3 text-[#4a1c2f] font-medium hover:bg-[#f3c677]/10 transition">
            <BookOpen className="w-4 h-4 mr-1 text-[#b22d64] " />
             Read Blogs
          </button>

        </div>


        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 py-6">

          {/* ================= QUICK ACTIONS ================= */}
          <div className="bg-gradient-to-r from-[#d3d5c8] to-[#ebeddf] border border-[#b22d64]/30 rounded-2xl p-6 space-y-6 shadow-[0_4px_20px_rgba(178,45,100,0.15)]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#b22d64]/10 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#b22d64]" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#4a1c2f]">
                  Quick Actions
                </h3>
                <p className="text-sm text-[#6b4b57]">
                  Start your wellness journey
                </p>
              </div>
            </div>

            {/* START THERAPY */}
            <button 
            onClick={() => navigate('/dashboard/ai-therapist')}
            className="w-full flex items-center justify-between bg-[#b22d64] text-white rounded-xl px-5 py-4 hover:opacity-90 transition">
              <div className="flex items-center gap-3">
                <MessageSquare className="w-5 h-5" />
                <div className="text-left">
                  <p className="font-semibold">Start Therapy</p>
                  <p className="text-xs opacity-80">Begin a new session</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5" />
            </button>

            {/* TRACK + CHECK IN */}
            <div className="grid grid-cols-2 gap-4">
              <div 
                onClick={() => navigate("/dashboard/mood")}
                className="border border-[#b22d64]/20 rounded-xl p-4 text-center">
                  <div className="w-10 h-10 mx-auto rounded-full bg-[#b22d64]/10 flex items-center justify-center mb-2">
                  <Heart className="w-5 h-5 text-[#b22d64]" />
                </div>
                <p className="font-medium text-[#4a1c2f]">Track Mood</p>
                <p className="text-xs text-[#6b4b57] mt-1">
                  How are you feeling?
                </p>
              </div>

              <div 
              onClick={() => navigate("/dashboard/habit")}
              className="border border-[#b22d64]/20 rounded-xl p-4 text-center">
                <div className="w-10 h-10 mx-auto rounded-full bg-[#b22d64]/10 flex items-center justify-center mb-2">
                  <BrainCircuit className="w-5 h-5 text-[#b22d64]" />
                </div>
                <p className="font-medium text-[#4a1c2f]">Check-in</p>
                <p className="text-xs text-[#6b4b57] mt-1">
                  Quick wellness check
                </p>
              </div>
            </div>
          </div>

          {/* ================= SELF CARE ================= */}
          <div className="bg-gradient-to-r from-[#d3d5c8] to-[#ebeddf] border border-[#b22d64]/30 rounded-2xl p-6 space-y-1 shadow-[0_4px_20px_rgba(178,45,100,0.15)]">

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#b22d64]/10 flex items-center justify-center">
                <Leaf className="w-5 h-5 text-[#b22d64]" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#4a1c2f]">
                  AI Self-Care Planner
                </h3>
                <p className="text-sm text-[#6b4b57]">
                Personalized wellness guidance
                </p>
              </div>
            </div>

            <label className="block mb-2 mt-2 font-medium text-gray-700">
                Recent Habits (comma separated)
            </label>
            {/* Habits Input */}
            <input
              type="text"
              value={habits}
              onChange={(e) => setHabits(e.target.value)}
              placeholder="e.g. late sleeping, long screen time, overthinking"
              className="w-full rounded-lg px-3 py-2 text-sm border border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white mb-3"
            />

            {/* Action Button */}
            <button
              onClick={() => generatePlanMutation(parsedHabits)}
              disabled={loading || parsedHabits.length === 0}
              className="w-full bg-emerald-600 text-white text-sm font-medium py-2 rounded-lg hover:bg-emerald-700 transition disabled:opacity-50"
            >
              {loading ? "Generating plan..." : "Generate Plan"}
            </button>

            {/* Plan Output */}
            {plan && (
              <div className="mt-4 bg-white/70 border border-emerald-200 rounded-lg p-3 text-sm text-gray-700 whitespace-pre-line">  
              {typeof plan === "string" ? plan : JSON.stringify(plan, null, 2)}
              </div>
            )}
          </div>

          {/* ================= INSIGHTS ================= */}
          <div className="bg-gradient-to-r from-[#d3d5c8] to-[#ebeddf] border border-[#b22d64]/30 rounded-2xl p-6 space-y-4 shadow-[0_4px_20px_rgba(178,45,100,0.15)]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#b22d64]/10 flex items-center justify-center">
                <BrainCircuit className="w-5 h-5 text-[#b22d64]" />
              </div>  
              <div>
                <h3 className="text-lg font-semibold text-[#4a1c2f]">
                  Insights
                </h3>
                <p className="text-sm text-[#6b4b57]">
                  Smart insights tailored to your mental wellness
                </p>
              </div>
            </div>

            <div className="bg-[#b22d64]/10 rounded-xl p-4">
              <p className="font-medium text-[#4a1c2f]">
                Activity Reminder
              </p>
              <p className="text-sm text-[#6b4b57] mt-1">
                You might benefit from setting smaller, more achievable daily goals.
              </p>
            </div>

            <div className="bg-[#b22d64]/10 rounded-xl p-4">
              <p className="font-medium text-[#4a1c2f]">
                Mindfulness Opportunity
              </p> 
              <p className="text-sm text-[#6b4b57] mt-1">
                Try incorporating more mindfulness activities into your routine.
              </p>
            </div>
          </div>

        </div>

        <div className="relative bg-gradient-to-br from-[#fdd6e0] via-[#f8b0c1] to-[#eb7a9e] border border-[#b22d64]/40 rounded-3xl p-6 overflow-hidden shadow-lg">

          {/* Quote Content */}
          <div className="relative z-10 flex flex-col items-center text-center space-y-2">
            <p className="text-[#4a1c2f] font-bold text-xl md:text-2xl leading-relaxed">
            "Small daily steps towards self-care can create the biggest transformations. <br /> Start today, and your future self will thank you."
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard