const express = require('express');
const router = express.Router();
const passport = require('passport');

// we use 'google' strategy for this route authentication
router.get('/auth/google', passport.authenticate('google', {
    // 'profile' and 'email' are not made up parameters
    scope: ['profile', 'email']
}));

// instead of writing logic, we pass in google strategy through passport to grab user data
router.get('/auth/google/callback', passport.authenticate('google'));

router.get('/api/current_user', (req, res) => {
    res.send(req.user);
})

router.get('/api/logout', (req, res) => {
    req.logout();
    res.send(req.user);
})

module.exports = router;