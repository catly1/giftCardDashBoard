const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.get('/', (req, res) => {
   
    User.findOne({ _id:req.auth.id }).then(user => res.json({user})).catch(err => {
        console.log(err);
        res.status(500).json(err)
    })

})

router.post('/logout', (req, res) => {
    res.cookie('token', "", {httpOnly: true})
    res.json({success: true})
})


module.exports = router;