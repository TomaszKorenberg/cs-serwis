const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.use(new LocalStrategy(
    {passReqToCallback : true},
    function (username, password, done) {
        User.findOne({username}, function (err, user) {
            if (err) return done(err);
            if (!user) {
                return done(null, false, {message: "Incorrect password"})
            }
            if (!user.validPassword(password)) {
                return done(null, false, {message: "Invalid password"})
            }
            return done(null, user)
        })
    }
));

passport.use(new FacebookStrategy({
        clientID: process.env['FACEBOOK_CLIENT_ID'],
        clientSecret: process.env['FACEBOOK_CLIENT_SECRET'],
        callbackURL: '/login/facebook/callback',
        profileFields: ['emails', 'name']
    },
    function(accessToken, refreshToken, profile, cb) {
        return cb(null, profile);
    }));

passport.serializeUser(function(user, cb) {
    cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});

module.exports = passport;