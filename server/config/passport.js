const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require("../models/User");

const keys = require('../config/keys');

// TO REVIEWER: Never used passport before, I'd like to give it a try.
// Mabye not its best practice.

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