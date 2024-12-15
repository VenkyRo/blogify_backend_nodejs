const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const authRoutes = require("./routes/auth");
const blogRoutes = require("./routes/blog");
const comment = require('./routes/comment')


dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/comments",comment);


app.get("/",(req,res)=>{
  res.send("<h1>Welcomt ot blogify backend</h1>")
})

app.use(express.json()); // For parsing JSON
app.use(express.urlencoded({ extended: true })); // For parsing form data


// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
