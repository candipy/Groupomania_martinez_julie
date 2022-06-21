const express = require("express");
const dotenv = require("dotenv");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const path = require("path");
// const sequelize = require("./models/index");

const app = express();

dotenv.config();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many request from this IP",
});

app.use((req, res, next) => {
  // Ajout de headers sur la res
  res.setHeader("Access-Control-Allow-Origin", "*"); // accès à API depuis n'import quelle origine
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  next();
});
app.use(express.json());
// UserRoutes
const userRoutes = require("./routes/user");
app.use("/api/auth", userRoutes);

// PostRoutes
const postRoutes = require("./routes/post");
app.use("/api/posts", postRoutes);

app.use("/images", express.static(path.join(__dirname, "images")));
app.use(limiter);
app.use(helmet());

module.exports = app;
