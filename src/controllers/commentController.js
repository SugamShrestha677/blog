const Comment = require('../models/commentModel');
const Post = require('../models/postModel');

// Add a comment to a post
exports.addComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { user, content } = req.body;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ error: "Post not found" });

    const comment = await Comment.create({
      post: postId,
      user,
      content,
    });

    res.status(201).json({ message: "Comment added successfully", comment });
  } catch (error) {
    console.error("Error adding comment", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Update comment
exports.updateComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!comment) return res.status(404).json({ error: "Comment not found" });
    res.status(200).json({ message: "Comment updated successfully", comment });
  } catch (error) {
    console.error("Error updating comment", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Delete comment
exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    if (!comment) return res.status(404).json({ error: "Comment not found" });
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment", error);
    res.status(500).json({ error: "Server error" });
  }
};
