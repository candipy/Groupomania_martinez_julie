const db = require("../models");

const fs = require("fs");
const auth = require("../middelware/auth");

exports.likesPosts = (req, res) => {
  db.Post.findOne({ where: { id: req.params.id } })
    .then((post) => {
      // L'utilisateur n'a pas encore donné d'avis et il like
      if (!post.usersLiked.includes(req.body.userId) && !post.usersDisliked.includes(req.body.userId) && req.body.like === 1) {
        Sauce.updateOne(
          //Chercher l'objet dans la bdd
          { _id: req.params.id },
          // Mettre à jour la bdd
          { $inc: { likes: 1 }, $push: { usersLiked: req.body.userId } }
        )
          .then(() => res.status(201).json({ message: "Tu aimes cette sauce :) +1 !" }))
          .catch((error) => res.status(500).json({ error }));

        // L'utilisateur à déjà donné un like et l'enlève
      } else if (sauce.usersLiked.includes(req.body.userId) && req.body.like === 0) {
        Sauce.updateOne(
          { _id: req.params.id },

          { $inc: { likes: -1 }, $pull: { usersLiked: req.body.userId } }
        )
          .then(() => res.status(201).json({ message: "Tu aimais cette sauce, tu ne donnes plus ton avis sur cette sauce" }))

          .catch((error) => res.status(500).json({ error }));

        // L'utilisateur à déjà donné un like et il essaye d'en redonné un => conflit
      } else if (sauce.usersLiked.includes(req.body.userId) && req.body.like === 1) {
        res.status(409).json({ message: "Même si tu aimes beacoup, tu ne peux le faire qu'une fois" });

        // L'utilisateur à déjà donné un like et maintenant il dislike
      } else if (sauce.usersLiked.includes(req.body.userId) && req.body.like === -1) {
        Sauce.updateOne(
          { _id: req.params.id },

          { $inc: { likes: -1, dislikes: 1 }, $pull: { usersLiked: req.body.userId }, $push: { usersDisliked: req.body.userId } }
        )
          .then(() => res.status(201).json({ message: "Tu aimais cette sauce, tu n'aimes plus'" }))

          .catch((error) => res.status(500).json({ error }));

        // L'utilisateur n'a pas encore donné d'avis et il n'aime pas
      } else if (!sauce.usersDisliked.includes(req.body.userId) && !sauce.usersLiked.includes(req.body.userId) && req.body.like === -1) {
        Sauce.updateOne(
          { _id: req.params.id },

          { $inc: { dislikes: 1 }, $push: { usersDisliked: req.body.userId } }
        )
          .then(() => res.status(201).json({ message: "Tu n'aimes pas cette sauce :(" }))

          .catch((error) => res.status(500).json({ error }));

        // L'utilisateur a déjà donné un dislike et l'enlève
      } else if (sauce.usersDisliked.includes(req.body.userId) && req.body.like === 0) {
        Sauce.updateOne(
          { _id: req.params.id },

          { $inc: { dislikes: -1 }, $pull: { usersDisliked: req.body.userId } }
        )
          .then(() => res.status(201).json({ message: "Tu n'aimais pas cette sauce, tu ne donnes plus ton avis sur cette sauce" }))
          .catch((error) => res.status(500).json({ error }));

        // L'utilisateur a déjà donné un dislike et maintenant il like
      } else if (sauce.usersDisliked.includes(req.body.userId) && req.body.like === 1) {
        Sauce.updateOne(
          { _id: req.params.id },

          { $inc: { dislikes: -1, likes: 1 }, $pull: { usersDisliked: req.body.userId }, $push: { usersLiked: req.body.userId } }
        )
          .then(() => res.status(201).json({ message: "Tu n'aimais pas cette sauce, maintenant tu aimes" }))
          .catch((error) => res.status(500).json({ error }));

        // L'utilisateur à déjà dislike mais essaye encore une fois
      } else if (sauce.usersDisliked.includes(req.body.userId) && req.body.like === -1) {
        res.status(409).json({ message: "Même si tu n'aimes pas, tu ne peux le faire qu'une fois" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.deletePost = (req, res, next) => {
  db.Post.findOne({ where: { id: req.params.id } })

    .then((post) => {
      if (!post || post == null) {
        alert("1");
        res.status(404).json({ Message: { error_post: "Publication non trouvée !" } });
      }
      if (post.UserId !== req.auth.userId && req.auth.userAdmin == false) {
        console.log("post :>> ", req.auth.userAdmin);
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
      console.log("req.body :>> ", req.body);
      if (!post) {
        return res.status(404).json({ Message: { error_post: "Publication non trouvée !" } });
      }
      if (post.UserId !== req.auth.userId && req.auth.userAdmin == false) {
        console.log("post.userId :>> ", post.userId);
        res.status(401).json({ Message: { error_auth: "Ce post ne vous appartient pas !" } });

        // <<<<<< Si le post initial n'a pas d'image >>>>>>
      } else if (post.image == null) {
        // Si le post initial n'a pas d'image et qu'on en ajoute pas
        if (!req.file) {
          const postUpdate = {
            title: req.body.title,
            message: req.body.message,
            UserId: req.auth.UserId,
          };
          // if (postUpdate.likes || postUpdate.dislikes || postUpdate.usersLiked || postUpdate.usersDisliked) {
          //   res.status(401).json({ Message: { error_likes: "Interdiction de modifier ces champs par ici" } });
          // }
          console.log("postUpdate :>> ", postUpdate);

          post
            .update({ ...postUpdate, id: req.params.id }, { where: { id: req.params.id } })
            .then((post) => res.status(200).json({ post: post }))
            .catch((errorPostUpdate) => res.status(500).json({ Message: { error_serveur: " B Une erreur inconnue s'est produite, veuillez reessayer plus tard ou contactez votre administrateur" } }));
        } else {
          // Si le post initial n'a pas d'image et qu'on en ajoute une

          const postUpdate = {
            title: req.body.title,
            message: req.body.message,
            UserId: req.auth.UserId,
            image: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
          };
          // if (postUpdate.likes || postUpdate.dislikes || postUpdate.usersLiked || postUpdate.usersDisliked) {
          //   res.status(401).json({ Message: { error_likes: "Interdiction de modifier ces champs par ici" } });
          // } else {
          post
            .update({ ...postUpdate, id: req.params.id }, { where: { id: req.params.id } })
            .then((postUpdate) => res.status(200).json({ postUpdate: postUpdate }))
            .catch((errorPostUpdate) => res.status(500).json({ Message: { error_serveur: "A Une erreur inconnue s'est produite, veuillez reessayer plus tard ou contactez votre administrateur" } }));
        }

        // <<<<<< Si le post initial à un image >>>>>>
      } else if (post.image !== null) {
        if (req.file) {
          // Si le post intital à une image et que l'utilisateur en ajoute une, on supprime l'ancienne, on remplace par la nouvelle
          const filename = post.image.split("/images/")[1];

          fs.unlink(`images/${filename}`, () => {
            const postUpdate = {
              title: req.body.title,
              message: req.body.message,
              UserId: req.auth.UserId,
              image: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
            };
            console.log("postUpdate :>> ", postUpdate);

            // if (postUpdate.likes || postUpdate.dislikes || postUpdate.usersLiked || postUpdate.usersDisliked) {
            //   res.status(401).json({ Message: { error_likes: "Interdiction de modifier ces champs par ici" } });
            // } else {
            post
              .update({ ...postUpdate, id: req.params.id }, { where: { id: req.params.id } })
              .then((postUpdate) => res.status(200).json({ postUpdate: postUpdate }))
              .catch((errorPostUpdate) => res.status(500).json({ Message: { error_serveur: "A Une erreur inconnue s'est produite, veuillez reessayer plus tard ou contactez votre administrateur" } }));
            // }
          });
        } else {
          // Si le post initial à un image et que l'utilisateur n'en ajoute pas, on garde l'image initiale
          const filename = post.image.split("/images/")[1];

          const postUpdate = {
            title: req.body.title,
            message: req.body.message,
            UserId: req.auth.UserId,
          };
          console.log("postUpdate :>> ", postUpdate);

          // if (postUpdate.likes || postUpdate.dislikes || postUpdate.usersLiked || postUpdate.usersDisliked) {
          //   res.status(401).json({ Message: { error_likes: "Interdiction de modifier ces champs par ici" } });
          // } else {
          post
            .update({ ...postUpdate, id: req.params.id }, { where: { id: req.params.id } })
            .then((postUpdate) => res.status(200).json({ postUpdate: postUpdate }))
            .catch((errorPostUpdate) => res.status(500).json({ Message: { error_serveur: "A Une erreur inconnue s'est produite, veuillez reessayer plus tard ou contactez votre administrateur" } }));
          // }
        }
      }
    })
    .catch((error) => res.status(500).json({ Message: { error_serveur: "all Une erreur inconnue s'est produite, veuillez reessayer plus tard ou contactez votre administrateur" } }));
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
      .then((postCreate) =>
        // console.log('postCreate :>> ', postCreate)
        res.status(201).json({ postCreate })
      )
      .catch((errorPostCreate) => res.status(500).json({ Message: { error_serveur: " Une erreur inconnue s'est produite, veuillez reessayer plus tard ou contactez votre administrateur" } }));
  } else if (!req.file) {
    const post = {
      title: req.body.title,
      message: req.body.message,
      UserId: req.auth.userId,
    };
    db.Post.create(post)
      .then((postCreate) =>
        // console.log("postCreate :>> ", postCreate)

        res.status(201).json({ postCreate })
      )
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
      {
        model: db.User,
        attributes: ["admin"],
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
      {
        model: db.User,
        attributes: ["admin"],
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
    ],
  })
    .then((post) => res.status(200).json(post))
    .catch((error) => res.status(404).json({ error }));
};
