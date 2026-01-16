import React from 'react'
import { Sparkles, CalendarCheck } from "lucide-react";

const PlannerPreview = () => {

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-md p-4 space-y-2">
        {/* Header */}
        <div>
          <h2 className="text-sm font-semibold text-gray-800">
            Self-Care Planner
          </h2>
          <p className="text-xs text-gray-500">
            Let AI design a self-care routine for you
          </p>
        </div>

        {/* Habits Input */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Your Daily Habits
          </label>
          <textarea
            placeholder="e.g. late sleeping, long screen time.."
            className="mt-1 w-full h-10 rounded-xl border border-gray-300 p-1.8 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            rows={3}
          />
        </div>

        {/* Generate Button */}
        <button
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-green-500 text-white py-1.5 text-sm font-medium hover:bg-green-600 transition"
        >
          <Sparkles size={16} />
          Generate My Self-Care Plan
        </button>
      </div>

      
      <div className="bg-green-50 border border-green-200 shadow-lg rounded-xl p-4 space-y-1.7">
        <div className="flex items-center gap-2 text-green-700">
          <CalendarCheck size={16} />
          <h4 className="text-sm font-semibold mb-1">
            Your AI-Generated Self-Care Plan
          </h4>
        </div>

        <ul className="text-sm text-gray-700 space-y-1.5">
          <li>🌅 Wake up and sleep at a fixed time daily</li>
          <li>🥗 Eat at least 3 balanced meals</li>
          <li>🚶‍♀️ 20 minutes of light physical activity</li>
          <li>📵 Reduce screen time 1 hour before bed</li>
        </ul>
      </div>
    </div>
  )
}

export default PlannerPreview