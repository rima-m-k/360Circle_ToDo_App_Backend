

function authenticate(req, res, next) {
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      const email = req.headers.authorization.split("\"")[1];
      req.User = email
      next()
    }
  }
  module.exports = {
    authenticate  }