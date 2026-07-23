const bcrypt = require("bcryptjs");

const User = require("../models/User");
const extractNameFromEmail = require("../utils/extractNameFromEmail");
const generateToken = require("../utils/generateToken");

const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      });
    }

    // Validate OSB email
    if (!email.endsWith("@osb.co.uk")) {
      return res.status(400).json({
        success: false,
        message: "Only OSB email addresses are allowed"
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      email: email.toLowerCase()
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists"
      });
    }

    // Extract name from email
    const name = extractNameFromEmail(email);

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Generate employee ID
    const employeeId = `EMP${Date.now()}`;

    // Create user
    const user = await User.create({
      employeeId,
      name,
      email: email.toLowerCase(),
      passwordHash,
      role: "Employee",
      isActive: true
    });

    // Generate JWT
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        employeeId: user.employeeId,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      });
    }

    // Find user
    const user = await User.findOne({
      email: email.toLowerCase()
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    // Compare password
    const isPasswordMatch = await bcrypt.compare(
      password,
      user.passwordHash
    );

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    // Block inactive users
if (!user.isActive) {
  return res.status(403).json({
    success: false,
    inactive: true,
    message:
      "Your account has been marked as inactive. Please contact the administrator.",
    adminEmail: process.env.ADMIN_EMAIL
  });
}

    // Generate JWT
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        employeeId: user.employeeId,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getMe = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  register,
  login,
  getMe
};