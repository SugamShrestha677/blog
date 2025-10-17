// src/controllers/postController.js
const Post = require('../models/postModel');
const Like = require('../models/likeModel');
const Comment = require('../models/commentModel');

exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = await Post.create({ title, content, author: req.user.id });
    res.status(201).json(post);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getAllPosts = async (req, res) => {
  try {
    // Populate author and include likes count via aggregation
    const posts = await Post.find()
      .populate('author', 'username email')
      .sort({ createdAt: -1 })
      .lean();

    // attach likeCount for each post
    const postIds = posts.map(p => p._id);
    const likes = await Like.aggregate([
      { $match: { post: { $in: postIds } } },
      { $group: { _id: '$post', count: { $sum: 1 } } }
    ]);

    const likeMap = new Map(likes.map(l => [l._id.toString(), l.count]));
    const results = posts.map(p => ({ ...p, likeCount: likeMap.get(p._id.toString()) || 0 }));
    res.json(results);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'username email').lean();
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const likeCountAgg = await Like.countDocuments({ post: post._id });
    const comments = await Comment.find({ post: post._id }).populate('user', 'username').sort({ createdAt: -1 });

    res.json({ ...post, likeCount: likeCountAgg, comments });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    if (post.author.toString() !== req.user.id) return res.status(403).json({ message: 'Forbidden' });

    const { title, content } = req.body;
    if (title !== undefined) post.title = title;
    if (content !== undefined) post.content = content;
    await post.save();
    res.json(post);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    if (post.author.toString() !== req.user.id) return res.status(403).json({ message: 'Forbidden' });

    // Remove post, its comments and likes
    await Promise.all([
      Post.deleteOne({ _id: post._id }),
      require('../models/commentModel').deleteMany({ post: post._id }),
      require('../models/likeModel').deleteMany({ post: post._id })
    ]);
    res.json({ message: 'Post deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
