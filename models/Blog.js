const mongoose = require("mongoose");
const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  
  comments: [
    {
      text: String,
      createdAt: { type: Date, default: Date.now },
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      
    }
  ],
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model("Blog", blogSchema);
