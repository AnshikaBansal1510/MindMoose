import express from 'express';
const moodRouter = express.Router();
import { protect } from '../middlewares/auth.middleware.js';
import { addNewMoodData, getMoodData } from '../controllers/mood.controller.js';

moodRouter.use(protect);

moodRouter.post('/', addNewMoodData);

moodRouter.get('/user', protect, getMoodData);

export default moodRouter;