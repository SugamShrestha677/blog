// src/controllers/commentController.js
const Comment = require('../models/commentModel');
const Post = require('../models/postModel');

exports.addComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    const comment = await Comment.create({ post: postId, user: req.user.id, content });
    res.status(201).json(comment);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.updateComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });
    if (comment.user.toString() !== req.user.id) return res.status(403).json({ message: 'Forbidden' });
    comment.content = req.body.content || comment.content;
    await comment.save();
    res.json(comment);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });
    // allow comment owner or post owner to delete
    const post = await Post.findById(comment.post);
    if (comment.user.toString() !== req.user.id && post.author.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    await comment.remove();
    res.json({ message: 'Comment deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
