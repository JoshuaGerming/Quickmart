const jwt = require('jsonwebtoken');

exports.protect = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: 'Not authorized' });
  const token = header.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id };
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};
