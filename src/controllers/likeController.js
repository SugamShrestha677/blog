// src/controllers/likeController.js
const Like = require('../models/likeModel');
const Post = require('../models/postModel');

exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    try {
      const like = await Like.create({ user: req.user.id, post: post._id });
      return res.status(201).json({ message: 'Liked', like });
    } catch (err) {
      // unique index violation => already liked
      if (err.code === 11000) return res.status(400).json({ message: 'Already liked' });
      throw err;
    }
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.unlikePost = async (req, res) => {
  try {
    const deleted = await Like.findOneAndDelete({ user: req.user.id, post: req.params.id });
    if (!deleted) return res.status(400).json({ message: 'Not liked yet' });
    res.json({ message: 'Unliked' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// example: count likes for a post
exports.countLikes = async (req, res) => {
  try {
    const count = await Like.countDocuments({ post: req.params.id });
    res.json({ postId: req.params.id, likeCount: count });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
