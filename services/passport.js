const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
const keys = require('../config/keys');

passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    })
})

passport.use(
    new GoogleStrategy(
        {
            clientID: keys.GOOGLE_CLIENT_ID,
            clientSecret: keys.GOOGLE_CLIENT_SECRET,
            // this is the authorized callback url in order to move forward after user grants permission
            callbackURL: '/auth/google/callback',
            proxy: true
        },
        (accessToken, refreshToken, profile, done) => {
            User.findOne({ googleId: profile.id })
                .then(user => {
                    if (user) {
                        // we already have a record with the given profile ID
                        done(null, user);
                    } else {
                        // we don't have a record with this ID, make a new record
                        new User({ googleId: profile.id }).save().then(user => {
                            done(null, user);
                        })
                    }
                })
        }));
