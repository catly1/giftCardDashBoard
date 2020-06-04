const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const key = require('./config/keys');
const cors = require('cors');
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

const users = require('./routes/users');
const auths = require('./routes/auths')

const app = express();
const log = console.log;
const PORT = process.env.PORT || 8080; 

mongoose.connect(process.env.MONGODB_URI || key.mongoURI, {
    useNewUrlParser: true
});

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

app.use('/api/auth/', (req, res, next) => {
    const token = req.cookies.token 
    jwt.verify(token, process.env.SECRETORKEY || key.secretOrKey, function (err, decoded) {
        if (err) {
            res.json(err)
            throw new Error(err)
        } 
        req.auth = decoded 
        next()   
})
})

app.use('/api/auth/', auths);
app.use('/api/', users);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')); 
    });
}

app.listen(PORT, () => {
    log(`Server is starting at PORT: ${PORT}`);
});