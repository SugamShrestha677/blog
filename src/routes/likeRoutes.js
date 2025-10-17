// src/routes/likeRoutes.js
const express = require('express');
const router = express.Router();
const likeCtrl = require('../controllers/likeController');
const auth = require('../middleware/auth');

router.post('/:id/like', auth, likeCtrl.likePost);      // POST /api/posts/:id/like (we'll mount under /api/posts)
router.delete('/:id/unlike', auth, likeCtrl.unlikePost);
router.get('/:id/likes', likeCtrl.countLikes);

module.exports = router;
