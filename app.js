
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');

const app = express();

mongoose.connect(process.env.DB_CONNECTOR);

app.listen(3000, () => {
    console.log('Server listens on port=3000 ...')
});
