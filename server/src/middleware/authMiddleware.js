const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized. No token provided",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const user = await User.findById(decoded.userId).select(
      "-passwordHash"
    );

    // User doesn't exist anymore
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User no longer exists.",
      });
    }

    // User has been marked inactive
    if (!user.isActive) {
      const admin = await User.findOne({
        role: "Admin",
        isActive: true,
      }).select("email");

      return res.status(403).json({
        success: false,
        inactive: true,
        message:
          "Your account has been marked as inactive. Please contact the administrator.",
        adminEmail: admin ? admin.email : null,
      });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

module.exports = {
  protect,
};