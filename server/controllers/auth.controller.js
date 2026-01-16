import User from '../models/user.models.js';
import bcrypt from 'bcrypt';
import generateToken from '../utils/generateToken.js';

const signup = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // create user in database
    // generate JWT token 
    // send JWT in cookies
    // display success

    if(!email || !password || !name){
      return res.status(400).json({ message: "All fields are required" });
    }

    if(password.length < 6){

      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {

      return res.status(400).json({ message: "Invalid email format" });
    }

    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ success: false, message: 'User already exists, please use a different email' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      password: hashedPassword,
      name,
    });

    await user.save();

    const token = generateToken(user);

    res.cookie('token', token, {
      httpOnly: true,   // prevent XSS attacks
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',             // prevent CSRF attacks
      maxAge: 24 * 60 * 60 * 1000, // 1 day : in ms
    });

    res.status(201).json({ success: true, message: 'Registered successfully', user: user });
  } catch (error) {

    console.log("Error in signup controller", error);
    res
      .status(500)
      .json({ success: false, message: 'Internal Server Error', error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check user credentials
    // if valid we will generate the token 
    // send it back to client in cookies

    if (!email || !password)
      return res.status(400).json({ message: 'Email and password are required' });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ success: false, message: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ success: false, message: 'Invalid email or password' });

    const token = generateToken(user);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    //res.json({ success: true, message: 'Logged in successfully' });
    res.status(200).json({ success: true, message: 'Logged in successfully', user: user })
  } catch (error) {

    console.log("Error in login controller", error.message);
    res
      .status(500)
      .json({ success: false, message: 'Internal Server Error', error: error.message });
  }
};

const logout = (req, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
      path: '/',
    });
    
    res.status(200).json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: 'Internal Server Error', error: error.message });
  }
};

const isAuthenticated = async (req, res) => {
  try {
    res.json({ success: true, message: 'Authenticated' });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: 'Internal Server Error', error: error.message });
  }
};

export { signup, login, logout, isAuthenticated };