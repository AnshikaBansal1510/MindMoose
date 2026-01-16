import React, { useState } from "react";
import {
  Sparkles,
  Save,
  CheckCircle,
  Activity
} from "lucide-react";
import { toast } from "react-hot-toast";
import { createStressAssessment, suggestCopingApi } from "../../config/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function StressForm() {

  const queryClient = useQueryClient();

  const [stressLevel, setStressLevel] = useState(null);
  const [stressFactors, setStressFactors] = useState([]);
  const [symptoms, setSymptoms] = useState([]);
  const [copingStrategies, setCopingStrategies] = useState([]);
  const [notes, setNotes] = useState("");
  // const [loading, setLoading] = useState(false);
  // const [thinking, setThinking] = useState(false);

  const stressLevels = [
    {title:"Feeling calm 🌿", level: "0/4"},
    {title:"A little tense 😌", level: "1/4"},        
    {title:"Overwhelmed 😟", level: "2/4"},
    {title:"Highly stressed 😣", level: "3/4"},
    {title:"Burned out 🔥", level: "4/4"},
  ];

  const factors = [
    "Work",
    "Studies",
    "Family",
    "Health",
    "Finances",
    "Social pressure",
    "Overthinking",
    "Uncertainty",
  ];

  const symptom = [
    'Headache', 'Muscle tension', 'Fatigue', 'Sleep problems', 'Anxiety',
    'Irritability', 'Difficulty concentrating', 'Appetite changes', 'Restlessness'
  ];

  // if the item already exists : remove it
  // if does not exist : add it
  const toggle = (item, setter) =>
    setter((prev) =>
      prev.includes(item)
        ? prev.filter((i) => i !== item)
        : [...prev, item]
    );

   const { mutate: copingMutation, isPending: thinking, error: copingError } = useMutation({
    mutationFn: suggestCopingApi,
    onSuccess: (data) => {
      console.log(data);
      if(data.success) {
        toast.success("Strategies created successfully");
        setCopingStrategies(data.coping_strategies);
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

  const { mutate: createMutation, isPending} = useMutation({
    mutationFn: createStressAssessment,
    onSuccess: () => {
      toast.success("Stress assessment created successfully");
      setStressLevel(null);
      setStressFactors([]);
      setSymptoms([]);
      setCopingStrategies([]);
      setNotes("");
      queryClient.invalidateQueries({ queryKey: ["history"] });
    },
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-3xl bg-gradient-to-r from-[#4ca1af] to-[#c4e0e5] p-6 text-white">
        <div className="flex items-center gap-3">
          <Activity className="w-9 h-9" />
          <div>
            <h2 className="text-2xl font-bold">MindMoose Stress Check-In</h2>
            <p className="text-emerald-100">
              Pause. Reflect. Manage your stress with AI suggestions.
            </p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* LEFT – Stress Input */}
        <div className="rounded-2xl p-6 border shadow bg-white">
          <h3 className="text-xl font-semibold mb-4">
            How heavy does today feel?
          </h3>

          <div className="space-y-2 mb-6">
            {stressLevels.map((label, i) => (
              <button
                key={i}
                onClick={() => setStressLevel(i)}
                className={`w-full p-3 rounded-xl border text-left transition ${
                  stressLevel === i
                    ? "border-blue-400 bg-[#ADD8E6]/45"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-medium">{label.title}</span>
                  <span className="text-sm text-gray-600">{label.level}</span>
                </div>
              </button>
            ))}
          </div>

          <h4 className="font-medium mb-2">What’s contributing?</h4>
          <div className="flex flex-wrap gap-2 mb-6">
            {factors.map((f) => (
              <button
                key={f}
                onClick={() => toggle(f, setStressFactors)}
                className={`px-3 py-1 rounded-full border text-sm transition ${
                  stressFactors.includes(f)
                    ? "bg-[#4ca1af] text-white border-blue-400"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <h4 className="font-medium mb-2">What are your symptoms?</h4>
          <div className="flex flex-wrap gap-2 mb-6">
            {symptom.map((f) => (
              <button
                key={f}
                onClick={() => toggle(f, setSymptoms)}
                className={`px-3 py-1 rounded-full border text-sm transition ${
                  symptoms.includes(f)
                    ? "bg-[#4ca1af] text-white border-blue-400"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT – Coping Suggestions */}
        <div className="rounded-2xl p-6 border shadow bg-white">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">
              Gentle Coping Strategies
            </h3>
            <button
              onClick={() => copingMutation({stressLevel, stressFactors, symptoms})}
              disabled={thinking}
              className="flex items-center gap-2 bg-[rgb(205,164,17)] text-white px-4 py-2 rounded-lg hover:bg-[rgb(216,194,112)]"
            >
              <Sparkles className="w-4 h-4" />
              {thinking ? "Thinking..." : "Suggest"}
            </button>
          </div>

          <textarea
            rows={4}
            placeholder="Anything you'd like to let out? (optional)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />

          {copingStrategies.length === 0 ? (
            <p className="text-sm text-gray-500">
              Click "Suggest" to get coping strategies based on your stress data.
            </p>
          ) : (
            <div className="space-y-2 mb-4">
              {copingStrategies.map((c) => (
                <div
                  key={c}
                  className="flex items-center gap-2 p-2 rounded-lg border border-emerald-200 bg-emerald-50"
                >
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>{c}</span>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={() => createMutation({stressLevel, stressFactors, symptoms, copingStrategies, notes})}
            disabled={isPending || stressLevel === null}
            className="mt-4 w-full py-3 bg-gradient-to-r from-[#4ca1af] to-[#c4e0e5] text-white rounded-xl flex justify-center items-center gap-2 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {isPending ? "Saving..." : "Save Check-In"}
          </button>
        </div>
      </div>
    </div>
  );
}
