const express = require('express');
const mongoose = require('mongoose');
// const passport = require('passport');
const keys = require('./config/keys');
require('./services/passport');

mongoose.connect(keys.MONGO_URI, { useNewUrlParser: true })
    .then(() => {
        console.log('Database is connected')
    }, err => {
        console.log('Cannot connect to database' + err)
    })

const app = express();

// app.use(passport.initialize());

const authRouter = require('./routes/authRoutes');
app.use('/', authRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
})