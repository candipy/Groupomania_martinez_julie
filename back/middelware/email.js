module.exports = (req, res, next) => {
  const email = req.body.email;

  if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+.[a-zA-Z]{2,4}$/.test(email)) {
    next();
  } else {
    return res.status(400).json({ Message: { error_email: " Merci d'entrer un courriel conforme. Ex : contact@groupomania.com" } });
  }
};
