const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
const keys = require('../config/keys');

passport.use(
    new GoogleStrategy(
        {
            clientID: keys.GOOGLE_CLIENT_ID,
            clientSecret: keys.GOOGLE_CLIENT_SECRET,
            callbackURL: '/auth/google/callback'
        },
        (accessToken, refreshToken, profile, done) => {
            User.findOne({ googleId: profile.id })
                .then(user => {
                    if (user) {
                        done(null, user);
                    } else {
                        new User({ googleId: profile.id }).save().then(user => {
                            done(null, user);
                        })
                    }
                })
        }));
