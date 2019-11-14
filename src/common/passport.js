const JwtStrategy = require('passport-jwt').Strategy;
const {
  ExtractJwt,
} = require('passport-jwt');
const config = require('config');

const User = require('../models/user.model');

const jwtOptions = {
  secretOrKey: config.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
};

exports.jwt = new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    console.log(payload.sub);
    const user = User.findById(payload.sub);
    if (user) {
      done(null, user);
      return;
    }
    done(null, false);
  } catch (e) {
    done(e);
  }
});
