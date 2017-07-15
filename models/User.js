const mongoose = require('mongoose'),
      crypto = require('crypto'),
      jwt = require('jsonwebtoken'),
      jwtSecret = require('../config').jwtSecret;

const UserSchema = new mongoose.Schema({
  login: {type: String, lowercase: true, unique: true, required: true, index: true},
  passwordHash: String,
  salt: String
}, {timestamps: true});

UserSchema.methods.validatePassword = function(password) {
  let hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.passwordHash === hash;
};

UserSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.passwordHash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.generateJWT = function() {
  let date = new Date();
  date.setDate(date.getDate() + 30);

  return jwt.sign({
    id: this._id,
    login: this.login,
    exp: parseInt(date.getTime() / 1000),
  }, jwtSecret);
};

mongoose.model('User', UserSchema);