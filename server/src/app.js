const express = require("express");
const cors = require("cors");

const volunteerRoutes = require("./routes/volunteerRoutes");
const authRoutes = require("./routes/authRoutes");
const ideaRoutes = require("./routes/ideaRoutes");
const userRoutes = require("./routes/userRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const commentRoutes = require("./routes/commentRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const departmentRoutes = require("./routes/departmentRoutes");
const adminRoutes = require("./routes/adminRoutes");

const errorHandler = require("./middleware/errorMiddleware");

const app = express();

/* =========================
   Global Middleware
========================= */
app.use(cors());
app.use(express.json());

/* =========================
   Routes
========================= */
app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

app.use("/api/ideas", ideaRoutes);

app.use("/api/ideas", commentRoutes);

app.use("/api/volunteers", volunteerRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/categories", categoryRoutes);

app.use("/api/departments", departmentRoutes);

app.use("/api/admin", adminRoutes);

/* =========================
   Health Check
========================= */
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Kaizen Platform API Running",
  });
});

/* =========================
   Error Handler
========================= */
app.use(errorHandler);

module.exports = app;