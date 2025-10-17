// src/models/postModel.js
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title:   { type: String, required: true },
  content: { type: String, required: true },
  author:  { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  // either keep numeric count or track via Like model — here we omit a likes array to use LikeModel
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
