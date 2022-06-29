const db = require("../models");

const fs = require("fs");
const auth = require("../middelware/auth");

exports.deletePost = (req, res, next) => {
  db.Post.findOne({ where: { id: req.params.id } })
    .then((post) => {
      if (!post || post == null) {
        res.status(404).json({ Message: { error_post: "Publication non trouvée !" } });
      }
      if (post.userId !== req.auth.userId) {
        res.status(401).json({ Message: { error_auth: "Requete non authorisée par cet utilisateur !" } });
      } else {
        const filename = post.urlImage.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          db.Post.destroy({ where: { id: req.params.id } })
            .then(() => res.status(200).json({ Message: { post_delete: "Nous vous confirmons la suppression de votre post!" } }))
            .catch((error) => res.status(500).json({ Message: { error_serveur: "Une erreur inconnue s'est produite, veuillez reessayer plus tard ou contactez votre administrateur" } }));
        });
      }
    })
    .catch((error) => res.status(500).json({ Message: { error_serveur: " Une erreur inconnue s'est produite, veuillez reessayer plus tard ou contactez votre administrateur" } }));
};

exports.modifyPost = (req, res, next) => {
  db.Post.findOne({ where: { id: req.params.id } })

    .then((post) => {
      const postObject = JSON.parse(req.body.post);
      console.log("postObject :>> ", postObject);
      if (!post) {
        return res.status(404).json({ Message: { error_post: "Publication non trouvée !" } });
      }
      if (postObject.userId !== req.auth.userId) {
        res.status(401).json({ Message: { error_auth: "Requete non authorisée par cet utilisateur !" } });
      } else if (req.file) {
        const filename = post.urlImage.split("/images/")[1];

        fs.unlink(`images/${filename}`, () => {
          const postUpdate = {
            ...JSON.parse(req.body.post),
            userId: req.auth.userId,
            urlImage: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
          };
          if (postUpdate.likes || postUpdate.dislikes || postUpdate.usersLiked || postUpdate.usersDisliked) {
            res.status(401).json({ Message: { error_likes: "Interdiction de modifier ces champs par ici" } });
          } else {
            post
              .update(postUpdate, { where: { id: req.params.id } })
              .then((postUpdate) => res.status(200).json({ postUpdate: postUpdate }))
              .catch((errorPostUpdate) => res.status(500).json({ Message: { error_serveur: "Une erreur inconnue s'est produite, veuillez reessayer plus tard ou contactez votre administrateur" } }));
          }
        });
      } else if (!req.file) {
        const postUpdate = { ...req.body };
        console.log("postUpdate :>> ", postUpdate);
        if (postUpdate.likes || postUpdate.dislikes || postUpdate.usersLiked || postUpdate.usersDisliked) {
          res.status(401).json({ Message: { error_likes: "Interdiction de modifier ces champs par ici" } });
        } else {
          post
            .update(postUpdate, { where: { id: req.params.id } })
            .then((postUpdate) => res.status(200).json({ postUpdate: postUpdate }))
            .catch((errorPostUpdate) => res.status(500).json({ Message: { error_serveur: "Une erreur inconnue s'est produite, veuillez reessayer plus tard ou contactez votre administrateur" } }));
        }
      }
    })
    .catch((error) => res.status(500).json({ Message: { error_serveur: "qshifhsiq Une erreur inconnue s'est produite, veuillez reessayer plus tard ou contactez votre administrateur" } }));
};

exports.createPost = (req, res, next) => {
  if (JSON.parse(req.body.userId) !== req.auth.userId) {
    res.status(401).json({ Message: { error_auth: "Requete non authorisée par cet utilisateur !" } });
  }
  if (req.file) {
    // else
    console.log("req.file :>> ", req.file);
    const post = {
      title: req.body.title,
      message: req.body.message,
      userId: req.auth.userId,
      urlImage: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
    };

    db.Post.create(post)
      .then((postCreate) => res.status(201).json({ postCreate }))
      .catch((errorPostCreate) => res.status(500).json({ Message: { error_serveur: " Une erreur inconnue s'est produite, veuillez reessayer plus tard ou contactez votre administrateur" } }));
  } else if (!req.file) {
    const post = {
      title: req.body.title,
      message: req.body.message,
      userId: req.auth.userId,
    };
    db.Post.create(post)
      .then((postCreate) => res.status(201).json({ postCreate }))
      .catch((errorPostCreate) => res.status(500).json({ Message: { error_serveur: "Une erreur inconnue s'est produite, veuillez reessayer plus tard ou contactez votre administrateur" } }));
  }
};

exports.getPostsByUser = (req, res, next) => {
  db.Post.findAll({
    where: { userId: req.params.id },
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: db.User,
        attributes: ["firstName"],
      },
      {
        model: db.User,
        attributes: ["lastName"],
      },
    ],
  })
    .then((postsByUsers) => res.status(200).json(postsByUsers))
    .catch((error) => res.status(500).json({ error }));
};

exports.getAllPost = (req, res, next) => {
  db.Post.findAll({
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: db.User,
        attributes: ["firstName"],
      },
      {
        model: db.User,
        attributes: ["lastName"],
      },
    ],
  })
    .then((posts) => res.status(200).json(posts))
    .catch((error) => res.status(500).json({ error }));
};

exports.getOnePost = (req, res, next) => {
  db.Post.findOne({
    where: { id: req.params.id },
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: db.User,
        attributes: ["firstName"],
      },
      {
        model: db.User,
        attributes: ["lastName"],
      },
    ],
  })
    .then((post) => res.status(200).json(post))
    .catch((error) => res.status(404).json({ error }));
};
