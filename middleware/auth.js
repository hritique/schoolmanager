const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.cookies.token || '';

  if (!token) {
    req.user = null;
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    return next();
  } catch (err) {
    req.user = null;
    return next();
  }
};

const protectAPI = (req, res, next) => {
  if (req.user) {
    return next();
  }
  res.status(401).json({ msg: 'Unauthorized route' });
};

const protectApp = (req, res, next) => {
  if (req.user) {
    return next();
  }
  res.redirect('/login');
};

const isAlreadyAuthenticated = (req, res, next) => {
  if (!req.user) {
    return next();
  }
  res.redirect('/app');
};

module.exports = { auth, protectAPI, protectApp, isAlreadyAuthenticated };
