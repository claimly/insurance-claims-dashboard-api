const jwtSecret = process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'secret1';

module.exports = {
  jwtSecret
};