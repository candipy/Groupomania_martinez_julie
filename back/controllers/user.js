// const User = require("../models/user");
const bcrypt = require("bcrypt"); // package de chiffrement
const jwt = require("jsonwebtoken");

const db = require("../models");

exports.signup = (req, res, next) => {
  // console.log("req.body :>> ", req.body);
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      db.User.create({
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
  db.User.findOne({ where: { email: req.body.email } })

    .then((user) => {
      console.log("User :>> ", user);
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password) // compare le mdp entré par l'utilisateur avec le mdp de la bdd
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            userId: user.id,
            token: jwt.sign({ userId: user.id }, process.env.TOKEN_SECRET, { expiresIn: "1h" }), // Penser à faire plus tard, une supp du token si pas activité
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.modifyUser = (req, res, next) => {
  db.User.findOne({ where: { id: req.params.id } })
    .then((user) => {
      if (!user) {
        res.status(404).json({ Message: "Utilisateur non trouvé" });
      }

      if (user.id !== req.auth.userId) {
        res.status(403).json({ Message: "Requete non authorisée par cet utilisateur" });
      } else {
        bcrypt // si req.body.password => hash, sinon que les autres
          .hash(req.body.password, 10)
          .then((hash) => {
            const passwordHash = hash;
            console.log("passwordHash :>> ", passwordHash);
            const userObject = {
              // id: req.body.id,
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              email: req.body.email,
              password: passwordHash,
              url_avatar: req.body.url_avatar,
              description: req.body.description,
              // ,
              // admin: req.body.admin,
              // createdAt: req.body.createdAt,
              // updateAt: req.body.updateAt,
            };
            user
              .update(userObject, { where: { id: req.params.id } }, console.log("userObject :>> ", userObject))
              .then((userUpdate) => res.status(200).json({ userUpdate: userUpdate }))
              .catch((error) => res.status(404).json({ error }));
          })
          .catch((error) => res.status(500).json({ error }));
      }
    })
    .catch((error) => res.status(409).json({ error }));
};

exports.getOneUser = (req, res, next) => {
  db.User.findOne({ where: { id: req.params.id } })
    .then((user) => res.status(200).json(user))
    .catch((error) => res.status(404).json({ error }));
};

exports.getAllUsers = (req, res, next) => {
  db.User.findAll()
    .then((users) => res.status(200).json(users))
    .catch((error) => error.status(500).json({ error }));
};
