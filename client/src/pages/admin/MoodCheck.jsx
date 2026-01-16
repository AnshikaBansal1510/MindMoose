import React from 'react'
import { Smile } from 'lucide-react'
import { useState } from 'react';
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { addNewMoodData, getMoodData } from '../../config/api';
import toast from 'react-hot-toast';

const MoodCheck = () => {

  const manualMoods = ['Happiness', 'Neutral', 'Sadness', 'Angry', 'Excited', 'Surprised', 'Scared', 'Disgusted'];

  const [showMoods, setShowMoods] = useState([]);
  const [mood, setMood] = useState("");

  const queryClient = useQueryClient();

  const {data: moodData = [], isLoading: moodLoading, error: moodError} = useQuery({  

    queryKey: ["mood"],
    queryFn: getMoodData,
    onError: (error) => {
      toast.error("Failed to load mood logs!")
    }
  });

  const { mutate: createMutation, isPending: createMoodLoading, error: createMoodError } = useMutation({
    mutationFn: addNewMoodData,
    onSuccess: () => {
      toast.success("Mood saved successfully");
      setShowMoods(false);
      setMood("");
      queryClient.invalidateQueries({ queryKey: ["mood"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Something went wrong!")
    }
  });

  return (
    <div className="rounded-2xl shadow-lg p-6 w-full max-w-xl mx-auto space-y-6
                    bg-yellow-50 text-[#b22d64] border border-pink-200">
  
      {/* Header */}
      <h2 className="text-xl font-bold flex items-center gap-2">
        <Smile className="w-5 h-5 text-pink-500" />
        Mood Check
      </h2>
  
      {/* Select Mood Button */}
      {!showMoods && (
        <button
          onClick={() => setShowMoods(true)}
          className="w-full py-3 rounded-xl font-semibold transition
                     bg-[#b22d64] text-white hover:bg-[#9e2557]"
        >
          Select Your Mood 💗
        </button>
      )}
  
      {/* Mood Options */}
      {showMoods && (
        <div className="space-y-4">
          <p className="text-sm text-pink-700">
            How are you feeling today?
          </p>
  
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {manualMoods.map((moodItem) => (
              <button
                key={moodItem}
                onClick={() => setMood(moodItem)}
                className={`p-3 rounded-xl text-sm font-medium transition border
                  ${
                    mood === moodItem
                      ? 'bg-pink-200 border-[#b22d64] text-[#b22d64]'
                      : 'bg-white border-pink-200 text-pink-700 hover:bg-pink-100'
                  }`}
              >
                {moodItem}
              </button>
            ))}
          </div>

          <button
            onClick={() => createMutation(mood)}
            className="mt-4 px-6 py-2 rounded-xl font-medium
                      bg-[#AA336A] text-white
                      hover:bg-[#682743] transition"
          >
            Save Mood
          </button>
        </div>
      )}

      <div className="mt-8 rounded-2xl p-6 bg-white border border-pink-200 shadow-sm space-y-4">

      <h3 className="text-lg font-semibold text-[#b22d64] flex items-center gap-2">
        📝 Your Mood Log
      </h3>

      {moodData.length === 0 ? (
        <p className="text-sm text-pink-400">
          No moods logged yet. Start by selecting how you feel 💗
        </p>
      ) : (
        <ul className="space-y-3">
          {moodData.map((entry) => (
            <li
              key={entry._id}
              className="flex justify-between items-center p-3 rounded-xl
                        bg-pink-50 border border-pink-100"
            >
              <span className="font-medium text-pink-700">
                {entry.mood}
              </span>

              <span className="text-xs text-pink-400">
                {new Date(entry.createdAt).toLocaleDateString()}
              </span>
            </li>
          ))}
        </ul>
      )}
      </div>
    </div>
  );
  
}

export default MoodCheck