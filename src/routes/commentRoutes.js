const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

// Add comment
router.post('/:postId', commentController.addComment);

// Update comment
router.put('/:id', commentController.updateComment);

// Delete comment
router.delete('/:id', commentController.deleteComment);

module.exports = router;
