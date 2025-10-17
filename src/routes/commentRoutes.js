const express = require("express");
const router = express.Router();
const commentCtrl = require("../controllers/commentController");

router.post("/", commentCtrl.createComment);
router.put("/:id", commentCtrl.updateComment);
router.delete("/:id", commentCtrl.deleteComment);

module.exports = router;
