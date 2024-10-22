
const express = require('express');

const router = express.Router();

const User = require('../models/User');
const { registerValidation } = require('../validations/validation');

router.post('/register', async (req, res) => {

    const { error } = registerValidation(req.body);
    if (error) {
        res.send({ message: error['details'][0]['message'] });
    }

    const newUser = new User({
        user_name: req.body.user_name,
        email: req.body.email,
        password: req.body.password
    });

    try{
        // .save() words on mongoDB mongoose object
        const savedUser = await newUser.save();
        res.send(savedUser);
    } catch(err) {
        res.status(400).send({ message: err });
    }
    
});

router.post('/login', async (req, res) => {

});

module.exports = router;
