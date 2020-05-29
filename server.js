const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const key = require('./config/keys');
const cors = require('cors');
// const jwt = require('express-jwt');
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

// importing files
const users = require('./routes/users');
const auths = require('./routes/auths')

// Define Global Variables
const app = express();
const log = console.log;
const PORT = process.env.PORT || 8080; // Step 1


// Step 2
mongoose.connect(process.env.MONGODB_URI || key.mongoURI, {
    useNewUrlParser: true
});

// Configuration
app.use(cors({
    origin: [
        `${process.env.FRONT_URL}`,
        'http://localhost:3000',
        'https://mypage.com',
    ],
    credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use('/api/auth/',jwt({
//     secret: process.env.SECRETORKEY || key.secretOrKey,
//     getToken: req => req.cookies.token
// }))
app.use('/api/auth/', (req, res, next) => {
    console.log(req.cookies)
    const token = req.cookies.token // Get your token from the request
    console.log(token)
    jwt.verify(token, process.env.SECRETORKEY || key.secretOrKey, function (err, decoded) {
        if (err) {
            res.json(err)
            throw new Error(err)
        } // Manage different errors here (Expired, untrusted...)
        req.auth = decoded // If no error, token info is returned in 'decoded'
        next()   
})
})

app.use('/api/auth/', auths)
app.get('/api/jwt', (req, res) =>{
    res.json()
})
app.use('/api/', users);

// Step 3
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')); // relative path
    });
}

app.listen(PORT, () => {
    log(`Server is starting at PORT: ${PORT}`);
});