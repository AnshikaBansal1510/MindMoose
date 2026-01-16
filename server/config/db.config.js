import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI);
    
    console.log(`MongoDB Connected: ${connection.connection.host}`);
  } catch (err) {
    console.error("Error in connecting to MongoDB", err);
    process.exit(1);   // 1 means failure
  }
};

export default connectDB;