const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
// const mongoose = require('mongoose');
// const User = mongoose.model('users');
const User = require("../models/User");

const keys = require('../config/keys');

module.exports = passport => {
  passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.secretOrKey
  }, (payload, done) => {
    User.findById(payload.id).then(user => {
      return done(null, user || false);
    }).catch(err => {
      console.error(err);
    });
  }));
};