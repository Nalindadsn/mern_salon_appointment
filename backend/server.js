const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoute");
const adminRoutes = require("./routes/adminRoute");
const serviceRoutes = require("./routes/serviceRoute");
const contactRoutes = require("./routes/contactRoute");
const connectDb = require("./config/connectDb");
const path = require("path");
const cors = require("cors");
const uploadImage = require("./uploadImage");
// Load environment variables
dotenv.config();
connectDb();

// Create express app
const app = express();

// Enable CORS
app.use(cors());
// app.use(express.json());
// Middleware
app.use(express.json({
  limit: '50mb'
}));

// Routes
app.post("/api/uploadImage", (req, res) => {
  uploadImage(req.body.image)
    .then((url) => res.send(url))
    .catch((err) => res.status(500).send(err));
});

app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/service", serviceRoutes);
app.use("/api/contact", contactRoutes);
if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, '/frontend/dist')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}
// Serve static files
const staticFilesPath = path.join(__dirname, "client", "build");
app.use(express.static(staticFilesPath));

// Route for any other requests
app.get("*", function (req, res) {
  res.sendFile(path.join(staticFilesPath, "index.html"));
});

// Port configuration
const PORT = process.env.PORT || 4000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.magenta);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
