const jwt = require('jsonwebtoken');
const User = require('../models/userModel')
const jwt_secret = process.env.JWT_SECRET;
const authSocket = async (socket, next) => {
  // Get token from header
  const token = socket.handshake.auth.token;

  if (!token) {
    return next(new Error('Authentication error'));
  }

  // Varify token
  try {
    const decoded = jwt.verify(token, jwt_secret);
    const user = await User.findById(decoded.userId);
    if (!user) { 
      return res.status(401).json({ message: 'Token is not valid' });
    }
    socket.userId = decoded.userId;
    next();
  } catch (err) {
    console.log(err.message);
    return next(err);
  }
};

module.exports = authSocket;
