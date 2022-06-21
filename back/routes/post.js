const express = require("express");

const router = express.Router();

const auth = require("../middelware/auth");

const multer = require("../middelware/multer-config");

const postCtrl = require("../controllers/post");
// Routes :

router.patch("/:id", auth, multer, postCtrl.modifyPost);
router.post("/newpost", auth, multer, postCtrl.createPost);
router.get("/:id", auth, postCtrl.getOnePost);
router.get("/", auth, postCtrl.getAllPost);

module.exports = router;
