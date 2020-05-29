const express = require('express');
const User = require('../models/user');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validateSignupInput = require('../validation/signup');
const validateLoginInput = require('../validation/login');
const key = require('../config/keys');
const secretOrKey = process.env.SECRETORKEY || key.secretOrKey;


router.get('/', async (req, res) => {
    console.log(req.auth)
    try {
        const user = await User.findOne({ _id:req.auth.id })

        return res.json({
            user
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server error'
        });
    }
})

router.post('/logout', (req, res) => {
    res.cookie('token', "", {httpOnly: true})
    res.json({success: true})
})

router.get('/users', async (req, res) => {

    try {
        const users = await User.find({});

        return res.json({
            users
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server error'
        });
    }

});

module.exports = router;