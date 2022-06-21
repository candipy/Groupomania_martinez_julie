const db = require("../models");

const fs = require("fs");
const auth = require("../middelware/auth");

exports.modifyPost = (req, res, next) => {
  db.Post.findOne({ where: { id: req.params.id } })

    .then((post) => {
   
      if (!post) {
        return res.status(404).json({ Message: { error_post: "Publication non trouvée !" } });
      }
      if (req.body.userId !== req.auth.userId) {
        // compare Userid de la bdb avec userId de la requete d'authentification
        res.status(401).json({ Message: { error_auth: "Requete non authorisée par cet utilisateur !" } });
      } else if (req.file) {
        // Si l'image est modifiée
        const filename = post.urlImage.split("/images/")[1]; // On sait qu'on a l'URL du fichier retrouné par la base, cette image aura une partie ('/images/'),

        //plit (divise) en 2 tableaux, ce qui vient avant et ce qui vient après, ce qui vient après [index1] est le nom du fichier
        fs.unlink(
          `images/${filename}`, //unlink = supprimmer un fichier, argument 1 chemin du fichier,
          () => {
            const postObject = {
              title: req.body.title,
              userId: req.auth.userId,
              urlImage: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
              description: req.body.description,
            };
            if (postObject.likes || postObject.dislikes || postObject.usersLiked || postObject.usersDisliked) {
              res.status(401).json({ Message: { error_likes: "Interdiction de modifier ces champs par ici" } });
            } else {
              post
                .update(postObject, { where: { id: req.params.id } }, console.log("postObject :>> ", postObject))
                .then((postUpdate) => res.status(200).json({ postUpdate: postUpdate }))
                .catch((errorPostUpdate) => res.status(500).json({ Message: { error_serveur: "Une erreur inconnue s'est produite, veuillez reessayer plus tard ou contactez votre administrateur" } }));
            }
          }
        );
      } else if (!req.file) {
        const postObject = { title: req.body.title, userId: req.auth.userId, description: req.body.description };
        if (postObject.likes || postObject.dislikes || postObject.usersLiked || postObject.usersDisliked) {
          res.status(401).json({ Message: { error_likes: "Interdiction de modifier ces champs par ici" } });
        } else {
          post
            .update(postObject, { where: { id: req.params.id } }, console.log("postObject :>> ", postObject))
            .then((postUpdate) => res.status(200).json({ postUpdate: postUpdate }))
            .catch((errorPostUpdate) => res.status(500).json({ Message: { error_serveur: "Une erreur inconnue s'est produite, veuillez reessayer plus tard ou contactez votre administrateur" } }));
        }
      }
    })
    .catch((error) => res.status(500).json({ Message: { error_serveur: "Une erreur inconnue s'est produite, veuillez reessayer plus tard ou contactez votre administrateur" } }));
};

exports.createPost = (req, res, next) => {
  console.log("req.body.userId :>> ", req.body.userId);
  console.log("req.auth.userId :>> ", req.auth.userId);
  if (req.body.userId != req.auth.userId) {
    // ATTENTION AU !== A REMETTRE QUAND SOLUTION POUR POSTMAN

    res.status(401).json({ Message: { error_auth: "Requete non authorisée par cet utilisateur !" } });
  } else {
    if (req.file) {
      db.Post.create({
        title: req.body.title,
        userId: req.auth.userId,
        urlImage: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
        description: req.body.description,
      })

        .then((postCreate) => res.status(201).json({ postCreate }))
        .catch((errorPostCreate) => res.status(500).json({ errorPostCreate }));
    } else
      db.Post.create({
        title: req.body.title,
        userId: req.auth.userId,
        urlImage: null,
        description: req.body.description,
      })

        .then((postCreate) => res.status(201).json({ postCreate }))
        .catch((errorPostCreate) => res.status(500).json({ errorPostCreate }));
  }
};

exports.getAllPost = (req, res, next) => {
  db.Post.findAll()
    .then((posts) => res.status(200).json(posts))
    .catch((error) => res.status(500).json({ error }));
};

exports.getOnePost = (req, res, next) => {
  db.Post.findOne({ where: { id: req.params.id } })
    .then((post) => res.status(200).json(post))
    .catch((error) => res.status(404).json({ error }));
};
