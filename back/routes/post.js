const express = require("express");

const router = express.Router();

const auth = require("../middelware/auth");

const multer = require("../middelware/multer-config");

const postCtrl = require("../controllers/post");
// Routes :

router.delete("/:id", auth, multer, postCtrl.deletePost);
router.patch("/:id", auth, multer, postCtrl.modifyPost);
router.post("/", auth, multer, postCtrl.createPost);
router.get("/user/:id", auth, postCtrl.getPostsByUser);
router.get("/:id", auth, postCtrl.getOnePost);
router.get("/", auth, postCtrl.getAllPost);

module.exports = router;
