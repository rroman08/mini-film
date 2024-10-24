
const express = require('express');

const router = express.Router();

const User = require('../models/User');
const { registerValidation, loginValidation } = require('../validations/validation');

const bcryptjs = require('bcryptjs');

router.post('/register', async (req, res) => {
    // Validation-1: to check user input
    const { error } = registerValidation(req.body);
    if (error) {
        return res.send({ message: error['details'][0]['message'] });
    }

    // Validation-2: to check if user exists
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
        return res.status(400).send({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcryptjs.genSalt(5);
    const hashedPassword = await bcryptjs.hash(req.body.password, salt);

    const newUser = new User({
        user_name: req.body.user_name,
        email: req.body.email,
        password: hashedPassword
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
    // Validation-1: to check user input
    const { error } = loginValidation(req.body);
    if (error) {
        return res.send({ message: error['details'][0]['message'] });
    }

    // Validation-2: to check if user exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).send({ message: 'User does not exists' });
    }

    // Validation-3: to check user password
    const passwordValidation = await bcryptjs.compare(req.body.password, user.password);
    if (!passwordValidation) {
        return res.status(400).send({ message: "Invalid password"})
    }

    res.send("SUCCESS")
});

module.exports = router;
