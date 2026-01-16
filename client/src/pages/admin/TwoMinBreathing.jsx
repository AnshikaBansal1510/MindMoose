import React, { useState, useEffect } from "react";
import { X, Wind, Pause, Play } from "lucide-react";

const phases = [
  { name: "Breathe In", duration: 4000 },
  { name: "Hold", duration: 4000 },
  { name: "Breathe Out", duration: 6000 },
];

export const TwoMinBreathing = ({ onClose }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [phaseTime, setPhaseTime] = useState(phases[0].duration);

  const speak = (text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.volume = 0.8;
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    let interval;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setPhaseTime((prev) => {
          if (prev <= 1000) {
            const nextPhase = (phaseIndex + 1) % phases.length;
            setPhaseIndex(nextPhase);
            speak(phases[nextPhase].name);
            return phases[nextPhase].duration;
          }
          return prev - 1000;
        });
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, phaseIndex]);

  const startExercise = () => {
    if (!hasStarted) {
      setHasStarted(true);
      setTimeLeft(120);
      setPhaseIndex(0);
      setPhaseTime(phases[0].duration);
      speak("Let's begin. Breathe in slowly.");
    }
    setIsRunning(true);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center
                    bg-sky-900/30 backdrop-blur-sm p-4">

      <div className="relative w-full max-w-md rounded-3xl p-6 sm:p-8
                      bg-gradient-to-br from-sky-50 to-blue-100
                      border border-sky-200 shadow-2xl text-center">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-sky-500 hover:text-red-400 transition"
        >
          <X size={22} />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-full bg-sky-200/60 flex items-center justify-center">
            <Wind size={28} className="text-sky-600" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-sky-900">
          2-Minute Breathing
        </h2>
        <p className="text-sm text-sky-700 mb-6">
          Follow the rhythm. Let your body soften.
        </p>

        {/* Timer */}
        <div className="text-3xl font-bold text-sky-800 mb-2">
          {formatTime(timeLeft)}
        </div>

        {/* Phase */}
        <div className="text-md font-medium text-sky-600 mb-6">
          {phases[phaseIndex].name} • {Math.ceil(phaseTime / 1000)}s
        </div>

        {/* Breathing Circle */}
        <div className="flex justify-center mb-6">
          <div
            className={`w-36 h-36 rounded-full border-4 border-sky-400/60
                        transition-all duration-1000 ease-in-out
              ${
                phases[phaseIndex].name === "Breathe In"
                  ? "scale-110"
                  : phases[phaseIndex].name === "Hold"
                  ? "scale-105"
                  : "scale-95"
              }`}
          />
        </div>

        {/* Controls */}
        {!hasStarted ? (
          <button
            onClick={startExercise}
            className="mx-auto flex items-center gap-2
                       px-6 py-3 rounded-xl
                       bg-sky-500 text-white
                       hover:bg-sky-600 transition"
          >
            <Play size={18} /> Start
          </button>
        ) : (
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="mx-auto flex items-center gap-2
                       px-6 py-3 rounded-xl text-white
                       bg-sky-700 hover:bg-sky-800 transition"
          >
            {isRunning ? <Pause size={18} /> : <Play size={18} />}
            {isRunning ? "Pause" : "Resume"}
          </button>
        )}
      </div>
    </div>
  );
};
