import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import habitRoutes from "./routes/habit.routes.js";
import userRoutes from "./routes/user.routes.js";
import moodRoutes from "./routes/mood.routes.js";
import journalRoutes from "./routes/journal.routes.js";
import blogRoutes from "./routes/blog.routes.js";
import aiRoutes from "./routes/ai.routes.js";
import stressRoutes from "./routes/stress.routes.js";


import connectDB from "./config/db.config.js";
//await connectDB();


const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors({
  // localhost:5173
  origin:["https://mind-moose.vercel.app/","*"],
  credentials: true,    // allow frontend to send cookies
}));

app.use(express.json());    // to use req.body etc
app.use(cookieParser());

app.get('/', (req, res) => res.send("API is Working"));

app.use("/api/auth", authRoutes);
app.use('/api/habits', habitRoutes);
app.use('/api/user', userRoutes);
app.use('/api/mood', moodRoutes);
app.use('/api/journal', journalRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/stress', stressRoutes);


app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
  connectDB();
});