const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/user");
const password = require("../middelware/password");
const email = require("../middelware/email");
const auth = require("../middelware/auth");

router.post("/signup", email, password, userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/users", auth, userCtrl.getAllUsers);
router.get("/user/:id", auth, userCtrl.getOneUser);
router.patch("/user/:id", auth, userCtrl.modifyUser);
router.delete("/user/:id", auth, userCtrl.deleteUser);

module.exports = router;
