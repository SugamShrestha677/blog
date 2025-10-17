const express = require("express");
const router = express.Router();
const likeCtrl = require("../controllers/likeController");

router.post("/", likeCtrl.likePost);
router.delete("/", likeCtrl.unlikePost);
router.get("/:postId", likeCtrl.countLikes);

module.exports = router;
