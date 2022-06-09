const passwordValidator = require("password-validator");

const passwordSchema = new passwordValidator();

passwordSchema
  .is()
  .min(8, "minimum 8 ") // Minimum length 8
  .is()
  .max(200, "max 200") // Maximum length 20
  .has()
  .uppercase("1", "Majuscule") // Must have uppercase letters
  .has()
  .lowercase("1", "Minuscule") // Must have lowercase letters
  .has()
  .not()
  .spaces(); // Should not have spaces

// Vérification de la qualité du password par rapport au schéma

module.exports = (req, res, next) => {
  const password = req.body.password;

  if (passwordSchema.validate(password)) {
    return next();
  } else {
    return res.status(400).json({ error: passwordSchema.validate(password, { list: true }) });
  }
};
