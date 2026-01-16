import express from 'express';
import { createStressAssessment, getUserStressAssessments, getStressData, deleteAssessment } from '../controllers/stress.controller.js';
import { protect } from '../middlewares/auth.middleware.js'; 

const stressRouter = express.Router();

stressRouter.post('/', protect, createStressAssessment);

stressRouter.get('/', protect, getUserStressAssessments);

stressRouter.get('/user', protect, getStressData);

stressRouter.delete('/delete/:id', protect, deleteAssessment);

export default stressRouter;