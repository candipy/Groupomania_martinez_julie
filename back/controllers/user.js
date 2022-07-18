// const User = require("../models/user");
const bcrypt = require("bcrypt"); // package de chiffrement
const jwt = require("jsonwebtoken");

const db = require("../models");

exports.signup = (req, res, next) => {
  console.log("req.body :>> ", req.body);

  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      db.User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash,
        // admin: req.body.admin,
      })
        .then((userCreate) => res.status(201).json({ userCreate }))
        .catch((errorUserCreate) => {
          res.status(500).json({ errorUserCreate });
        });
    })
    .catch((errorUserCreate) => res.status(500).json({ Message: { error_serveur: " Une erreur inconnue s'est produite, veuillez reessayer plus tard ou contactez votre administrateur" } }));
};

exports.login = (req, res, next) => {
  db.User.findOne({ where: { email: req.body.email } })

    .then((userLog) => {
      if (!userLog) {
        return res.status(404).json({ Message: { error_user: "Utilisateur non trouvé !" } });
      }
      bcrypt
        .compare(req.body.password, userLog.password) // compare le mdp entré par l'utilisateur avec le mdp de la bdd
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ Message: { error_password: "Mot de passe incorrect !" } });
          }
          res.status(200).json({
            userId: userLog.id,
            token: jwt.sign({ userId: userLog.id, admin: userLog.admin }, process.env.TOKEN_SECRET, { expiresIn: "1h" }), // Penser à faire plus tard, une supp du token si pas activité
          });
        })
        .catch((errorUserLogin) => res.status(500).json({ Message: { error_serveur: " Une erreur inconnue s'est produite, veuillez reessayer plus tard ou contactez votre administrateur" } }));
    })
    .catch((errorUserLogin) => res.status(500).json({ Message: { error_serveur: " Une erreur inconnue s'est produite, veuillez reessayer plus tard ou contactez votre administrateur" } }));
};

exports.modifyUser = (req, res, next) => {
  db.User.findOne({ where: { id: req.params.id } })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ Message: { error_user: "Utilisateur non trouvé !" } });
      }

      if (user.id !== req.auth.userId) {
        res.status(401).json({ Message: { error_auth: "Requete non authorisée par cet utilisateur !" } });
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
              .catch((error) => res.status(500).json({ Message: { error_serveur: "Une erreur inconnue s'est produite, veuillez reessayer plus tard ou contactez votre administrateur" } }));
          })
          .catch((error) => res.status(500).json({ Message: { error_serveur: "Une erreur inconnue s'est produite, veuillez reessayer plus tard ou contactez votre administrateur" } }));
      }
    })
    .catch((error) => res.status(500).json({ Message: { error_serveur: "Une erreur inconnue s'est produite, veuillez reessayer plus tard ou contactez votre administrateur" } }));
};

exports.getOneUser = (req, res, next) => {
  db.User.findOne({ where: { id: req.params.id } })
    .then((user) => res.status(200).json(user))
    .catch((error) => res.status(404).json({ error }));
};

exports.getAllUsers = (req, res, next) => {
  db.User
    .findAll
    // { include: "posts" }
    ()
    .then((users) => res.status(200).json(users))
    .catch((error) => res.status(500).json({ error }));
};

// Suppression d'une use = DELETE

exports.deleteUser = (req, res, next) => {
  db.User.findOne({ where: { id: req.params.id } })
    // Cherche l'objet dans la bdd
    .then((user) => {
      console.log("user :>> ", user);
      if (!user || user == null) {
        res.status(404).json({ Message: { error_user: "Utilisateur non trouvé !" } });
      }
      if (user.id !== req.auth.userId) {
        res.status(401).json({ Message: { error_auth: "Requete non authorisée par cet utilisateur !" } });
      } else {
        db.User.destroy({ where: { id: req.params.id } })
          .then(() => res.status(200).json({ Message: { user_delete: "Nous vous confirmons la suppression de votre compte!" } }))
          .catch((error) => res.status(500).json({ Message: { error_serveur: "Une erreur inconnue s'est produite, veuillez reessayer plus tard ou contactez votre administrateur" } }));
        // }
        // );
      }
    })
    .catch((error) => res.status(500).json({ Message: { error_serveur: " Une erreur inconnue s'est produite, veuillez reessayer plus tard ou contactez votre administrateur" } }));
};
