import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Route for User Login
const loginUser = async (req, res) => {
  // Implementation for user login
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .json({ success: false, message: "User doesn't exist!" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = createToken(user._id);
      return res.json({ success: true, token });
    } else {
      return res.json({ success: false, message: "Invalid Cradentials" });
    }
  } catch (error) {
    return res.json({ success: false, message: error.messsage });
  }
};

// Route for User Registration
const registerUser = async (req, res) => {
  // Implementation for user registration
  try {
    // Extract user details from request body
    const { name, email, password } = req.body;
    // check if user already exists
    const exist = await userModel.findOne({ email });
    if (exist) {
      return res
        .json({ success: false, message: "User already exists" });
    }

    // Validating Email format & strength of password
    if (!validator.isEmail(email)) {
      return res
        .json({ success: false, message: "Please enter a valid Email" });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
    }

    // hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
// Route for Admin Login
const adminLogin = async (req, res) => {
  // Implementation for admin login
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid cradentials" });
    }
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export { loginUser, registerUser, adminLogin };
