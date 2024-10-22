
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');

const app = express();

const filmsRoute = require('./routes/films');
const authRoute = require('./routes/auth');

app.use('/api/film', filmsRoute);
app.use('/api/user', authRoute);

mongoose.connect(process.env.DB_CONNECTOR);

app.listen(3000, () => {
    console.log('Server listens on port=3000 ...')
});
