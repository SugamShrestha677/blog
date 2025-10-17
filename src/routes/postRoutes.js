// src/routes/postRoutes.js
const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/postController');
const auth = require('../middleware/auth');

router.post('/', auth, postCtrl.createPost);
router.get('/', postCtrl.getAllPosts);
router.get('/:id', postCtrl.getPostById);
router.put('/:id', auth, postCtrl.updatePost);
router.delete('/:id', auth, postCtrl.deletePost);

module.exports = router;
