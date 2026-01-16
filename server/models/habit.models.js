import mongoose from 'mongoose';

const HabitSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  streak: {
    type: Number,
    default: 0,
  },
  completions: {
    // Array of dates when the habit was completed (only one entry per day)
    type: [Date],
    default: [],
  },
}, { timestamps: true });

export default mongoose.model('Habit', HabitSchema);