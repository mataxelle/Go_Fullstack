const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; // extraction du token du header Authorization, split récupère tout ce qu'il y a après l'espace dans le header
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); // verify décode le token
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};