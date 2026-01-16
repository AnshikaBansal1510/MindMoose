import axiosInstance from "../config/axios.js";

export const signup = async (formData) => {
  const response = await axiosInstance.post("/auth/signup", formData);
  return response.data;
};

export const getAuthUser = async () => {
  const res = await axiosInstance.get("/user/");
  return res.data;
};

export const login = async (formData) => {
  const response = await axiosInstance.post("/auth/login", formData);
  return response.data;
};

export const logout = async () => {
  try {
    const response = await axiosInstance.post("/auth/logout");
    return response.data;
  } catch (error) {
    console.log("Error in getAuthUser:", error);
    return null;
  }
};

export const getUserHabits = async () => {
  const res = await axiosInstance.get("/habits/");
  if (!res.data.success) {
    throw new Error("Failed to fetch habits");
  }

  return res.data.habits;
};

export const getLatestHabits = async () => {
  const res = await axiosInstance.get("/habits/latest");
  if (!res.data.success) {
    throw new Error("Failed to fetch latest habits");
  }

  return res.data.habits;
};

export const createHabit = async (name) => {
  const response = await axiosInstance.post("/habits/", { 
    name: name,
  });

  if (!response.data.success) {
    throw new Error("Failed to create habit");
  }

  return response.data.habit;
};

export const toggleHabit = async (id) => {
  const response = await axiosInstance.patch(`/habits/${id}/toggle`);
  return response.data;
};

export const deleteHabit = async (id) => {
  const response = await axiosInstance.delete(`/habits/${id}`);
  
  if(!response.data.success){
    throw new Error(res.data.message || "Failed to delete habit");
  }

  return id;
};

export const createJournal = async (content) => {
  const response = await axiosInstance.post("/journal/", { 
    content: content,
  });

  if (!response.data.success) {
    throw new Error("Failed to create journal");
  }

  return response.data;
};

export const getJournals = async () => {
  const res = await axiosInstance.get("/journal/");

  if (!res.data.success) {
    throw new Error("Failed to fetch journals");
  }

  return res.data.journals;
};

export const deleteJournal = async (id) => {
  const response = await axiosInstance.delete(`/journal/${id}`);
  
  if(!response.data.success){
    throw new Error(res.data.message || "Failed to delete habit");
  }

  return id;
};

export const getMoodData = async () => {
  const res = await axiosInstance.get("/mood/user");

  if (!res.data.success) {
    throw new Error("Failed to fetch moods");
  }

  return res.data.moodData;
};

export const addNewMoodData = async (mood) => {
  const response = await axiosInstance.post("/mood/", { 
    mood: mood,
  });

  if (!response.data.success) {
    throw new Error("Failed to save mood");
  }

  return response.data;
};

export const addBlog = async ({ title, content, tags, author, image }) => {

  const formData = new FormData();

  formData.append("title", title);
  formData.append("content", content);
  formData.append("tags", tags);
  formData.append("author", author);
  formData.append("image", image); 

  const { data } = await axiosInstance.post("/blog/", formData);

  return data;
};

export const getAllBlogs = async () => {
  const res = await axiosInstance.get("/blog/");
  if (!res.data.success) {
    throw new Error("Failed to fetch blogs");
  }

  return res.data.blogs;
};

export const getBlogById = async (id) => {
  const res = await axiosInstance.get(`/blog/${id}`);
  if (!res.data.success) {
    throw new Error("Failed to fetch this blog");
  }

  return res.data.blog;
};

export const generateContent = async (prompt) => {
  const response = await axiosInstance.post("/blog/generate", { 
    prompt: prompt,
  });

  if (!response.data.success) {
    throw new Error("Failed to create content");
  }

  return response.data;
};

export const journalPrompt = async (journals) => {
  const response = await axiosInstance.post("/ai/journal-prompt", { 
    journals: journals,
  });

  if (!response.data.success) {
    throw new Error("Failed to create prompt");
  }

  return response.data;
};

export const suggestCopingApi = async ({stressLevel, stressFactors, symptoms}) => {
  const response = await axiosInstance.post("/ai/suggest-coping", { 
    stress_level: stressLevel,
    stress_factors: stressFactors,
    symptoms: symptoms
  });

  if (!response.data.success) {
    throw new Error("Failed to create strategies");
  }

  return response.data;
};

export const createStressAssessment = async ({stressLevel, stressFactors, symptoms, copingStrategies, notes}) => {
  const response = await axiosInstance.post("/stress/", { 
    stressLevel,
    stressFactors,
    symptoms,
    copingStrategies,
    notes
  });

  if (!response.data.success) {
    throw new Error("Failed to save stress assessment");
  }

  return response.data.data;
};

export const getStressHistory = async () => {
  
  const res = await axiosInstance.get('/stress/');

  if (!res.data.success) {
    throw new Error("Failed to fetch journals");
  }

  return res.data.data;
};

export const deleteHistory = async (id) => {
  const response = await axiosInstance.delete(`/stress/delete/${id}`);
  
  if(!response.data.success){
    throw new Error(res.data.message || "Failed to delete stress assessment");
  }

  return id;
};

export const generateSelfCarePlan = async ({habits}) => {
  const response = await axiosInstance.post("/ai/self-care-plan", { 
    habits: habits,
  });

  if (!response.data.success) {
    throw new Error("Failed to create Self-Care plan");
  }

  return response.data;
};

