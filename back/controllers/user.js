// const User = require("../models/user");
const bcrypt = require("bcrypt"); // package de chiffrement
const jwt = require("jsonwebtoken");

const Models = require("../models");

exports.signup = (req, res, next) => {
  console.log("req.body :>> ", req.body);
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      Models.User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash,
      })
        .then((user) => res.status(201).json({ user }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  Models.User.findOne({ where: { email: req.body.email } })

    .then((User) => {
      console.log("User :>> ", User);
      if (!User) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, User.password) // compare le mdp entré par l'utilisateur avec le mdp de la bdd
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            userId: User.id,
            token: jwt.sign({ userId: User.id }, process.env.TOKEN_SECRET, { expiresIn: "1h" }), // Penser à faire plus tard, une supp du token si pas activité
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
