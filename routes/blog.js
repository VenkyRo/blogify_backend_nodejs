const express = require("express");
const multer = require("multer");
const Blog = require("../models/Blog");
const router = express.Router();


const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

// Create Blog
router.post("/add-blog", upload.single("image"), async (req, res) => {
  const { title, content, author } = req.body;
  try {
    const newBlog = new Blog({
      title,
      content,
      author,
      image: req.file ? req.file.path.replace("uploads\\", "") : ""
    });
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Get All Blogs
router.get("/all-blogs", async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author", "username").exec();
    // Modify the image path for each blog in the response
    blogs.forEach((blog) => {
      if (blog.image) {
        blog.image = `${process.env.Api_Url}/uploads/${blog.image}`;
      }
    });
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Get Single Blog
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate("author", "username")
      .exec();
      if (blog && blog.image) {
        blog.image = `${process.env.Api_Url}/uploads/${blog.image}`;
      }
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
