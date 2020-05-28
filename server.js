const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const key = require('./config/keys_dev').mongoURI

// importing files
const users = require('./routes/users');

// Define Global Variables
const app = express();
const log = console.log;
const PORT = process.env.PORT || 8080; // Step 1


// Step 2
mongoose.connect(process.env.MONGODB_URI || key, {
    useNewUrlParser: true
});

// Configuration
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
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