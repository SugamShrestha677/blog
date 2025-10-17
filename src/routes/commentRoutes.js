// src/routes/commentRoutes.js
const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/commentController');
const auth = require('../middleware/auth');

router.post('/:postId', auth, commentCtrl.addComment);
router.put('/:id', auth, commentCtrl.updateComment);
router.delete('/:id', auth, commentCtrl.deleteComment);

module.exports = router;
