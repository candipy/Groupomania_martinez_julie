const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/user");
const password = require("../middelware/password");
const email = require("../middelware/email");
const auth = require("../middelware/auth");

router.post("/signup", email, password, userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/users", auth, userCtrl.getAllUsers);
router.get("/:id", auth, userCtrl.getOneUser);
router.put("/:id", auth, userCtrl.modifyUser);

module.exports = router;
