const express = require('express');
const User = require('../models/user');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validateSignupInput = require('../validation/signup');
const validateLoginInput = require('../validation/login');
const key = require('../config/keys');
const secretOrKey = process.env.SECRETORKEY || key.secretOrKey;


router.get('/users', (req, res) => {

    User.find({}).then(users => res.json(users)).catch(err =>{
        console.log(err);
        res.status(400).json(err);
    });

});


router.post("/signup", (req, res) => {
    const { errors, isValid } = validateSignupInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            errors.email = "Email already exists";
            return res.status(400).json(errors);
        } else {
            const newUser = new User({
                email: req.body.email,
                password: req.body.password,
                storeID: req.body.storeID
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => {
                            const payload = { id: user.id, email: user.email, storeID: user.storeID };

                            jwt.sign(payload, secretOrKey, { expiresIn: 3600 }, (err, token) => {
                                
                                res.cookie('token', token, { httpOnly: true});
                                
                                res.json({
                                    success: true,
                                    token: token
                                });
                            });
                        })
                        .catch(err => console.log(err));
                });
            });
        }
    });
});

router.post("/login", (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email }).then(user => {
        if (!user) {
            errors.email = "This user does not exist";
            return res.status(400).json(errors);
        }

        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                const payload = { id: user.id, email: user.email, storeID: user.storeID };

                jwt.sign(payload, secretOrKey, { expiresIn: 3600 }, (err, token) => {

                    res.cookie('token', token, { httpOnly: true });

                    res.json({
                        success: true,
                        token: token
                    });
                });
            } else {
                errors.password = "Incorrect password";
                return res.status(400).json(errors);
            }
        });
    });
});



module.exports = router;