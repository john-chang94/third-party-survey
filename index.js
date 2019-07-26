const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./services/passport');

mongoose.connect(keys.MONGO_URI, { useNewUrlParser: true })
    .then(() => {
        console.log('Database is connected')
    }, err => {
        console.log('Cannot connect to database' + err)
    })

const app = express();

app.use(cookieSession({
    // 30 days, 24 hours, 60 mins, 60 seconds, 1000 milliseconds == 30 days // the total is based off milliseconds
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
}));
app.use(passport.initialize());
app.use(passport.session());

// require('./routes/authRoutes')(app);
const authRouter = require('./routes/authRoutes');
app.use(authRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
})