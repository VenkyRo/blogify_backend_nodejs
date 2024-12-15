const express = require("express");
const Blog = require("../models/Blog"); // Import Blog model for associating comments
const router = express.Router();

// Add a comment to a blog
router.post("/:blogId", async (req, res) => {
  const { blogId } = req.params; // Blog ID from URL
  const { text, userId } = req.body; // Comment text and user ID from request body

  try {
    // Find the blog to add the comment to
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    // Add the comment to the blog's comment array
    const newComment = {
      text,
      user: userId, // User ID of the person adding the comment
      createdAt: Date.now()
    };

    blog.comments.push(newComment); // Push the comment into the blog's comments array

    // Save the updated blog
    await blog.save();

    res
      .status(201)
      .json({ message: "Comment added successfully", comment: newComment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all comments for a specific blog
router.get("/:blogId", async (req, res) => {
  const { blogId } = req.params; // Blog ID from URL

  try {
    // Find the blog and populate the comments with user data
    const blog = await Blog.findById(blogId)
      .populate("comments.user", "username") // Populate user data for each comment
      .exec();

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.status(200).json(blog.comments); // Return the blog's comments
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
