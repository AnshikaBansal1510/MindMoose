import React, { useState, useEffect } from 'react'
import {
  Target,
  CheckCircle,
  Flame,
  TrendingUp,
  Plus,
  X,
} from "lucide-react";
import toast from 'react-hot-toast';
import { getLatestHabits, getUserHabits, toggleHabit, createHabit, deleteHabit } from '../../config/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { isToday } from "date-fns";

const Habit = () => {

  const queryClient = useQueryClient();

  const {data: habits = [], isLoading: habitLoading, error: habitError} = useQuery({  

    queryKey: ["habit"],
    queryFn: getUserHabits,
    onError: (error) => {
      toast.error("Failed to load habits!")
    }
  });

  const {data: latestHabits = [], isLoading: latestHabitLoading, latestHabitError} = useQuery({  

    queryKey: ["latestHabit"],
    queryFn: getLatestHabits,
    onError: (error) => {
      toast.error("Something went wrong!")
    }
  });

  const { mutate: createMutation, isPending: createHabitLoading, error: createHabitError } = useMutation({
    mutationFn: createHabit,
    onSuccess: () => {
      toast.success("Habit created successfully");
      setShowAddHabit(false);
      setName("");
      queryClient.invalidateQueries({ queryKey: ["habit"] });
      queryClient.invalidateQueries({ queryKey: ["latestHabit"] });
    },
  });

  const {
    mutate: toggleHabitMutation,
    isPending: toggleHabitLoading,
  } = useMutation({
    mutationFn: toggleHabit,
    onSuccess: () => {
      toast.success("Habit updated");
      queryClient.invalidateQueries({ queryKey: ["habit"] });
    },
  });

  const {
    mutate: deleteHabitMutation,
    isPending: deleteHabitLoading,
  } = useMutation({
    mutationFn: deleteHabit,
    onSuccess: () => {
      toast.success("Habit deleted");
      queryClient.invalidateQueries({ queryKey: ["habit"] });
    },
  });

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this habit?');

    if (!confirmed) return;

    deleteHabitMutation(id);
  };

  const completedToday = habits.filter((h) => h.completions.some((date) => isToday(date))).length;
  const totalHabits = habits.length;
  const completionRate = totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0;

  // UI states
   const [showAddHabit, setShowAddHabit] = useState(false);
   const [name, setName] = useState("");

    if (habitLoading) {
      return (
        <div
          className= "text-gray-600 text-center py-20"
        >
          Loading habits...
        </div>
      );
    }


    return (
      <div className="space-y-8">
        {/* Header */}
        <div className="rounded-3xl p-6 bg-gradient-to-r from-[#ADD8E6] to-[#d8f9ff] border border-[#b22d64]/20 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Target className="w-7 h-7 text-[#b22d64]" />
              <div>
                <h2 className="text-2xl font-bold text-[#4a1c2f]">
                  Your Habits
                </h2>
                <p className="text-sm text-[#6b4b57]">
                  Gentle progress, one step at a time 🌱
                </p>
              </div>
            </div>
    
            <div className="text-right">
              <p className="text-3xl font-bold text-[#b22d64]">
                {completedToday}/{totalHabits}
              </p>
              <p className="text-xs text-[#6b4b57]">
                completed today
              </p>
            </div>
          </div>
        </div>
    
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Completion */}
          <div className="rounded-2xl p-5 bg-white border border-rose-200 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#4ebd96]/15 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-[#4ebd96]" />
              </div>
              <div>
                <p className="font-medium text-[#4a1c2f]">Completion</p>
                <p className="text-xs text-[#6b4b57]">Today</p>
              </div>
            </div>
    
            <p className="text-3xl font-bold text-[#4a1c2f]">
              {completionRate}%
            </p>
    
            <div className="h-2 mt-3 bg-rose-100 rounded-full">
              <div
                className="h-2 rounded-full bg-[#4ebd96] transition-all"
                style={{ width: `${completionRate}%` }}
              />
            </div>
          </div>
    
          {/* Streak */}
          <div className="rounded-2xl p-5 bg-white border border-rose-200 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
                <Flame className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <p className="font-medium text-[#4a1c2f]">Longest Streak</p>
                <p className="text-xs text-[#6b4b57]">Your best</p>
              </div>
            </div>
    
            <p className="text-3xl font-bold text-[#4a1c2f]">
              {habits.length ? Math.max(...habits.map(h => h.streak)) : 0}
              <span className="text-sm text-orange-500 ml-1">days</span>
            </p>
          </div>
    
          {/* Total */}
          <div className="rounded-2xl p-5 bg-white border border-rose-200 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-sky-500" />
              </div>
              <div>
                <p className="font-medium text-[#4a1c2f]">Total Habits</p>
                <p className="text-xs text-[#6b4b57]">Tracking</p>
              </div>
            </div>
    
            <p className="text-3xl font-bold text-[#4a1c2f]">
              {totalHabits}
            </p>
          </div>
        </div>
    
        {/* Add Habit */}
        <div className="flex justify-end">
          <button
            onClick={() => setShowAddHabit(true)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#b22d64]/10 text-[#b22d64] font-semibold border border-[#b22d64]/30 hover:bg-[#b22d64]/20 transition"
          >
            <Plus className="w-5 h-5" />
            Add New Habit
          </button>
        </div>

        {showAddHabit && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-rose-200 relative">
              
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  createMutation(name);
                }}
                className="space-y-4"
              >

                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-[#b22d64]">
                    Add New Habit
                  </h3>

                  <button
                    type="button"
                    onClick={() => setShowAddHabit(false)}
                    className="p-2 rounded-full hover:bg-rose-100 transition"
                  >
                    <X size={18} className="text-[#b22d64]" />
                  </button>
                </div>

                {/* Habit Name */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-600">
                    Habit Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Drink 8 glasses of water"
                    className="w-full rounded-xl border border-rose-200 bg-rose-50/40 p-3 outline-none focus:ring-2 focus:ring-[#b22d64] focus:border-[#b22d64] transition"
                    required
                  />
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddHabit(false)}
                    disabled={createHabitLoading}
                    className="flex-1 rounded-full border border-rose-300 py-2.5 text-gray-600 hover:bg-rose-50 transition"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={!name.trim() || createHabitLoading}
                    className="flex-1 rounded-full bg-[#b22d64] py-2.5 text-white font-medium hover:bg-rose-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {createHabitLoading ? "Adding..." : "Add Habit"}
                  </button>
                </div>

              </form>
            </div>
          </div>
        )}
    
        {/* Habits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {habits.map(habit => {
            const doneToday = habit.completions.some(date => isToday(date));
    
            return (
              <div
                key={habit._id}
                className={`rounded-2xl p-6 border shadow-sm transition ${
                  doneToday
                    ? "bg-[#f0fdf4] border-[#4ebd96]"
                    : "bg-white border-rose-200"
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-3">
                    <div>
                      <h3 className="font-semibold text-[#4a1c2f]">
                        {habit.name}
                      </h3>
                      <p className="text-xs text-[#6b4b57] flex items-center gap-1">
                        <Flame className="w-3 h-3 text-orange-500" />
                        {habit.streak} day streak
                      </p>
                    </div>
                  </div>
    
                  <div className='flex items-end gap-3'>
                    <button
                      onClick={() => toggleHabitMutation(habit._id)}
                      className={`w-8 h-8 rounded-full border flex items-center justify-center ${
                        doneToday
                          ? "bg-[#4ebd96] border-[#4ebd96]"
                          : "border-gray-300"
                      }`}
                    >
                      {doneToday && (
                        <CheckCircle className="w-4 h-4 text-white" />
                      )}
                    </button>
                    <button
                      onClick={() => handleDelete(habit._id)}
                      title="Delete habit"
                      className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-red-400 text-red-500 hover:bg-red-100 transition-colors dark:hover:bg-red-900"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                </div>
    
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-[#6b4b57]">
                    <span>Progress</span>
                    <span>{habit.streak}/30 days</span>
                  </div>
    
                  <div className="h-2 bg-rose-100 rounded-full">
                    <div
                      className="h-2 bg-[#4ebd96] rounded-full transition"
                      style={{
                        width: `${Math.min((habit.streak / 30) * 100, 100)}%`,
                      }}
                    />
                    <div className="text-xs text-center text-gray-500">
                      {habit.streak < 30
                        ? `${30 - habit.streak} days to 30-day milestone`
                        : "Milestone achieved! 🎉"}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
}

export default Habit