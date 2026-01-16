import StressAssessment from '../models/stress.models.js';

// Save a new stress assessment
export const createStressAssessment = async (req, res) => {
  try {
    const {
      stressLevel,
      stressFactors,
      symptoms,
      copingStrategies,
      notes,
    } = req.body;

    if (stressLevel === undefined) {
      return res.status(400).json({ success: false, message: 'Stress level is required.' });
    }

    const newAssessment = new StressAssessment({
      user: req.userId,
      stressLevel,
      stressFactors,
      symptoms,
      copingStrategies,
      notes,
    });

    await newAssessment.save();

    res.status(201).json({ success: true, message: 'Stress assessment saved successfully', data: newAssessment });
  } catch (error) {
    console.error('Error saving stress assessment:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get all stress assessments for the authenticated user
export const getUserStressAssessments = async (req, res) => {
  try {
    const assessments = await StressAssessment.find({ user: req.userId }).sort({ date: -1 });
    res.json({ success: true, data: assessments });
  } catch (error) {
    console.error('Error fetching stress assessments:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

//Get stressLevel
export const getStressData = async (req,res) => {
  try {
    const userId = req.userId;

    const stressData = await StressAssessment.find({ user: userId });

    res.status(200).json({
      success: true,
      stressData, 
    });
  } catch (error) {
    console.error("Error fetching user stress data:", error);
    res.status(500).json({
      success: false,
      message: 'Failed to load user stress data',
    });
  }
}

//Delete specific stressAssesement
export const deleteAssessment = async (req,res) => {
  try {
    const {id} = req.params;
    const assessment = await StressAssessment.findById(id);

    if(!assessment){
      return res.status(404).json({success: false, message : "Assessment Not found"});
    }
    const deletedAssessment = await StressAssessment.findByIdAndDelete(id);

    res.status(200).json({success: true, message: "Deleted Successfully"});
  } catch (error) {
     res.status(500).json({
      success: false,
      message: 'Failed to delete',
    });
  }
}