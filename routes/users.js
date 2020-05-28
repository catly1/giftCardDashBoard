const express = require('express');
const User = require('../models/user');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validateSignupInput = require('../validation/signup');
const validateLoginInput = require('../validation/login');
const key = require('../config/keys_dev');
const secretOrKey = process.env.SECRETORKEY || key.secretOrKey;

// router.post('/add', async (req, res) => {
//     if (isEmpty(req.body)) {
//         return res.status(403).json({
//             message: 'Body should not be empty',
//             statusCode: 403
//         });
//     }
//     const { name, position, company } = req.body;

//     const newUser = new User({
//         position,
//         name,
//         company,
//         date: Date.now()
//     });
//     try {
//         await newUser.save();
//         res.json({
//             message: 'Data successfully saved',
//             statusCode: 200,
//             name,
//             position,
//             company
//         });
//     } catch (error) {
//         console.log('Error: ', error);
//         res.status(500).json({
//             message: 'Internal Server error',
//             statusCode: 500
//         });
//     }
// });


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

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
})

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
                                res.json({
                                    success: true,
                                    token: "Bearer " + token
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
                const payload = { id: user.id, email: user.email, name: user.name };

                jwt.sign(payload, secretOrKey, { expiresIn: 3600 }, (err, token) => {
                    res.json({
                        success: true,
                        token: "Bearer " + token
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