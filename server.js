const express = require("express");
const { initializeDB } = require("./config/db");
const dotenv = require("dotenv");

const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/task");
const teamRoutes = require("./routes/team");
const projectRoutes = require("./routes/project");

const app = express();
dotenv.config();

// connecting DB
initializeDB();

// CORS Policy
const cors = require("cors");

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/task", taskRoutes);
app.use("/team", teamRoutes);
app.use("/project", projectRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
