const validator = require("email-validator");

module.exports = (req, res, next) => {
  const email = req.body.email;
  //   console.log(validator.validate(email));
  if (validator.validate(email)) {
    next();
  } else {
    return res.status(400).json({ Message: { error_email: " Merci d'entrer un courriel conforme. Ex : contact@groupomania.com" } });
  }
};
