import React, {useState} from 'react'
import { Sparkles } from "lucide-react";

const StressPreview = () => {

  const [stressLevel, setStressLevel] = useState(3);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-4 space-y-2">

      {/* Stress Level */}
      <div>
        <label className="text-sm font-medium text-gray-700">
          Stress Level (1–5)
        </label>
        <div className="flex gap-3 mt-1">
          {[1, 2, 3, 4, 5].map((level) => (
            <button
              key={level}
              onClick={() => setStressLevel(level)}
              className={`w-6 h-6 rounded-full border text-sm font-semibold transition
                ${
                  stressLevel === level
                    ? "bg-blue-500 text-white border-blue-500"
                    : "border-gray-300 text-gray-600 hover:border-gray-400"
                }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* Symptoms */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700">
            Symptoms
          </label>
          <textarea
            placeholder="e.g. anxiety..."
            className="mt-1 w-full h-8 rounded-xl border border-gray-300 p-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows={2}
          />
        </div>

        {/* Causes */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Possible Causes
          </label>
          <textarea
            placeholder="e.g. health..."
            className="mt-1 w-full h-8 rounded-xl border border-gray-300 p-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows={2}
          />
        </div>
      </div>

      {/* Generate Button */}
      <button
        className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-500 text-white py-1.5 text-sm font-medium hover:bg-blue-600 transition"
      >
        <Sparkles size={16} />
        Get AI Coping Strategies
      </button>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 space-y-2 shadow-lg">
          <h4 className="text-sm font-semibold text-blue-700">
            AI-Suggested Coping Strategies
          </h4>
          <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
            <li>Try a 5-minute guided breathing exercise</li>
            <li>Reduce screen time and hydrate well</li>
            <li>Break tasks into smaller, manageable steps</li>
            <li>Get at least 7–8 hours of rest tonight</li>
          </ul>
        </div>
    </div>
  )
}

export default StressPreview