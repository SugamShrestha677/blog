const express = require("express");
const db = require("./src/configs/db");
const config = require("./src/configs/config");

// Import routes
const userRoutes = require("./src/routes/userRoutes");
const postRoutes = require("./src/routes/postRoutes");
const commentRoutes = require("./src/routes/commentRoutes");
const likeRoutes = require("./src/routes/likeRoutes");

const app = express();

// Parse JSON requests
app.use(express.json());

// Default route
app.get("/", (req, res) => {
  res.send("Blog API is running");
});

// Mount routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);

// Connect to MongoDB and start server
db.connect().then(() => {
  app.listen(config.PORT || 5000, () => {
    console.log(`Server is running on port ${config.PORT || 5000}`);
  });
});
