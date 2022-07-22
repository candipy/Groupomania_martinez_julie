const db = require("../models");

const fs = require("fs");
const auth = require("../middelware/auth");

exports.likesPost = (req, res) => {
  db.Like.findOne({
    where: { PostId: req.params.id, UserId: req.body.UserId },
  })

    .then((like) => {
      if (like == null) {
        db.Like.create({
          PostId: req.body.PostId,
          UserId: req.body.UserId,
        })
          .then(() => res.status(200).json({ Message: { post_like: "Publication likée !" } }))
          .catch((err) => res.status(500).json(`${err}`));
      } else {
        like
          .destroy()
          .then(() => res.status(200).json({ Message: { post_like: "Publication plus likée !" } }))
          .catch((err) => res.status(500).json(`${err}`));
      }
    })
    .catch((err) => res.status(500).json({ message: `${err}` }));
};

exports.deletePost = (req, res, next) => {
  db.Post.findOne({ where: { id: req.params.id } })

    .then((post) => {
      if (!post || post == null) {
        alert("1");
        res.status(404).json({ Message: { error_post: "Publication non trouvée !" } });
      }
      if (post.UserId !== req.auth.userId && req.auth.userAdmin == false) {
        res.status(401).json({ Message: { error_auth: "Requete non authorisée par cet utilisateur !" } });
      } else if (post.image !== null) {
        const filename = post.image.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          db.Post.destroy({ where: { id: req.params.id } })
            .then(() => res.status(200).json({ Message: "Nous vous confirmons la suppression de votre post!" }))
            .catch((error) => res.status(500).json({ Message: { error_serveur: "Une erreur inconnue s'est produite, veuillez reessayer plus tard ou contactez votre administrateur" } }));
        });
      } else {
        db.Post.destroy({ where: { id: req.params.id } })
          .then(() => res.status(200).json({ Message: "Nous vous confirmons la suppression de votre post!" }))
          .catch((error) => res.status(500).json({ Message: { error_serveur: "Une erreur inconnue s'est produite, veuillez reessayer plus tard ou contactez votre administrateur" } }));
      }
    })
    .catch((error) => res.status(500).json({ Message: { error_serveur: "Une erreur inconnue s'est produite, veuillez reessayer plus tard ou contactez votre administrateur" } }));
};

exports.modifyPost = (req, res, next) => {
  db.Post.findOne({ where: { id: req.params.id } })

    .then((post) => {
      if (!post) {
        return res.status(404).json({ Message: { error_post: "Publication non trouvée !" } });
      }
      if (post.UserId !== req.auth.userId && req.auth.userAdmin == false) {
        res.status(401).json({ Message: { error_auth: "Ce post ne vous appartient pas !" } });

        // <<<<<< Si le post initial n'a pas d'image >>>>>>
      } else if (post.image == null) {
        // Si le post initial n'a pas d'image et qu'on en ajoute pas
        if (!req.file) {
          const postUpdate = {
            title: req.body.title,
            message: req.body.message,
            UserId: req.auth.userId,
          };

          post
            .update({ ...postUpdate, id: req.params.id }, { where: { id: req.params.id } })
            .then((post) => res.status(200).json({ post: post }))
            .catch((errorPostUpdate) => res.status(500).json({ Message: { error_serveur: "Une erreur inconnue s'est produite, veuillez reessayer plus tard ou contactez votre administrateur" } }));
        } else {
          // Si le post initial n'a pas d'image et qu'on en ajoute une

          const postUpdate = {
            title: req.body.title,
            message: req.body.message,
            UserId: req.auth.userId,
            image: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
          };

          post
            .update({ ...postUpdate, id: req.params.id }, { where: { id: req.params.id } })
            .then((postUpdate) => res.status(200).json({ postUpdate: postUpdate }))
            .catch((errorPostUpdate) => res.status(500).json({ Message: { error_serveur: "Une erreur inconnue s'est produite, veuillez reessayer plus tard ou contactez votre administrateur" } }));
        }

        // <<<<<< Si le post initial à un image >>>>>>
      } else if (post.image !== null) {
        if (req.file) {
          // Si le post initial à une image et que l'utilisateur en ajoute une, on supprime l'ancienne, on remplace par la nouvelle
          const filename = post.image.split("/images/")[1];

          fs.unlink(`images/${filename}`, () => {
            const postUpdate = {
              title: req.body.title,
              message: req.body.message,
              UserId: req.auth.userId,
              image: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
            };

            post
              .update({ ...postUpdate, id: req.params.id }, { where: { id: req.params.id } })
              .then((postUpdate) => res.status(200).json({ postUpdate: postUpdate }))
              .catch((errorPostUpdate) => res.status(500).json({ Message: { error_serveur: "Une erreur inconnue s'est produite, veuillez reessayer plus tard ou contactez votre administrateur" } }));
          });
        } else {
          // Si le post initial à un image et que l'utilisateur l'a supprime
          if (req.body.image == "delete") {
            const filename = post.image.split("/images/")[1];

            fs.unlink(`images/${filename}`, () => {
              const postUpdate = {
                title: req.body.title,
                message: req.body.message,
                UserId: req.auth.userId,
                image: null,
              };
              post
                .update({ ...postUpdate, id: req.params.id }, { where: { id: req.params.id } })
                .then((postUpdate) => res.status(200).json({ postUpdate: postUpdate }))
                .catch((errorPostUpdate) => res.status(500).json({ Message: { error_serveur: "Une erreur inconnue s'est produite, veuillez reessayer plus tard ou contactez votre administrateur" } }));
            });
          } else {
            // Si le post initial à un image et que l'utilisateur n'en ajoute pas, on garde l'image initiale
            const filename = post.image.split("/images/")[1];

            const postUpdate = {
              title: req.body.title,
              message: req.body.message,
              UserId: req.auth.userId,
            };

            post
              .update({ ...postUpdate, id: req.params.id }, { where: { id: req.params.id } })
              .then((postUpdate) => res.status(200).json({ postUpdate: postUpdate }))
              .catch((errorPostUpdate) => res.status(500).json({ Message: { error_serveur: "Une erreur inconnue s'est produite, veuillez reessayer plus tard ou contactez votre administrateur" } }));
          }
        }
      }
    })
    .catch((error) => res.status(500).json({ Message: { error_serveur: "Une erreur inconnue s'est produite, veuillez reessayer plus tard ou contactez votre administrateur" } }));
};

exports.createPost = (req, res, next) => {
  if (JSON.parse(req.body.userId) !== req.auth.userId) {
    res.status(401).json({ Message: { error_auth: "Requete non authorisée par cet utilisateur !" } });
  }
  if (req.file) {
    const post = {
      title: req.body.title,
      message: req.body.message,
      UserId: req.auth.userId,
      image: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
    };

    db.Post.create(post)
      .then((postCreate) => res.status(201).json({ postCreate }))
      .catch((errorPostCreate) => res.status(500).json({ Message: { error_serveur: " Une erreur inconnue s'est produite, veuillez reessayer plus tard ou contactez votre administrateur" } }));
  } else if (!req.file) {
    const post = {
      title: req.body.title,
      message: req.body.message,
      UserId: req.auth.userId,
    };
    db.Post.create(post)
      .then((postCreate) => res.status(201).json({ postCreate }))
      .catch((errorPostCreate) => res.status(500).json({ Message: { error_serveur: "Une erreur inconnue s'est produite, veuillez reessayer plus tard ou contactez votre administrateur" } }));
  }
};

// exports.getPostsByUser = (req, res, next) => {
//   db.Post.findAll({
//     where: { userId: req.params.id },
//     order: [["createdAt", "DESC"]],
//     include: [
//       {
//         model: db.User,
//         attributes: ["firstName"],
//       },
//       {
//         model: db.User,
//         attributes: ["lastName"],
//       },
//       {
//         model: db.User,
//         attributes: ["admin"],
//       },
//     ],
//   })
//     .then((postsByUsers) => res.status(200).json(postsByUsers))
//     .catch((error) => res.status(500).json({ error }));
// };

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
      {
        model: db.User,
        attributes: ["admin"],
      },
      {
        model: db.Like,
        attributes: ["id"],
      },
      {
        model: db.Like,
        attributes: ["UserId"],
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
      {
        model: db.User,
        attributes: ["admin"],
      },
      {
        model: db.Like,
        attributes: ["id"],
      },
      {
        model: db.Like,
        attributes: ["UserId"],
      },
    ],
  })
    .then((post) => res.status(200).json(post))
    .catch((error) => res.status(404).json({ error }));
};
