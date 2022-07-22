const passwordValidator = require("password-validator");

const passwordSchema = new passwordValidator();

passwordSchema
  .is()
  .min(8, "minimum 8 ") // Longueur Mini 8
  .is()
  .max(200, "max 200") // Longueur Maxi 200
  .has()
  .uppercase("1", "Majuscule") // Doit contenir une majuscule
  .has()
  .lowercase("1", "Minuscule") // Doit contenir une minuscule
  .has()
  .not()
  .spaces(); // Ne doit pas contenir d'espace

// Vérification de la qualité du password par rapport au schéma

module.exports = (req, res, next) => {
  const password = req.body.password;

  if (passwordSchema.validate(password)) {
    return next();
  } else {
    return res.status(400).json({ Message: { error_password: " Votre mot de passe doit comprendre entre 8 et 200 caractères, une majuscule, une minuscule, et aucun espace" } });
  }
};
