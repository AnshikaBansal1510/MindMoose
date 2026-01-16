import mongoose from 'mongoose';
import MoodLog from '../models/mood.models.js';
import axios from 'axios';

// Add new mood log for a user
export const addNewMoodData = async (req, res) => {
  try {
    const { mood } = req.body;

    if (!mood) {
      return res.status(400).json({ success: false, message: "Mood data is required" });
    }

    if (!req.userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    // 🔹 Check if mood already logged today
    const existingMood = await MoodLog.findOne({
      user: req.userId,
      createdAt: {
        $gte: startOfDay,
        $lte: endOfDay
      }
    });

    if (existingMood) {
      return res.status(409).json({
        success: false,
        message: "Mood for today already logged"
      });
    }

    await MoodLog.create({
      user: req.userId,
      mood,
    });

    res.status(201).json({ success: true, message: "Mood saved" });
  } catch (error) {
    console.error("Error adding mood data:", error);
    res.status(500).json({
      success: false,
      message: 'Failed to save mood data',
    });
  }
};

// Get all mood logs of a user
export const getMoodData = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const moodData = await MoodLog.find({ user: userId })
    .sort({ createdAt: -1 })
    .limit(7);

    res.status(200).json({
      success: true,
      moodData,
    });
  } catch (error) {
    console.error("Error fetching user mood data:", error);
    res.status(500).json({
      success: false,
      message: 'Failed to load user mood data',
    });
  }
};

