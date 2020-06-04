### What is this?
This is a dashboard that displays giftcards purchased through wix. A user has to create an account with a store ID to see gift cards only purchased on that store.

### How to run locally
* Create a keys_dev.js file in the config directory and put in your mongo connection string URI in mongoURI and a secret key for JSON Web Token like:
```javascript
module.exports = {
    mongoURI: 'mongodb+srv://username:password@cluster0-h7ijx.mongodb.net/test?retryWrites=true&w=majority',
    secretOrKey: 'secret'
}
```
(Not an actual connection String)
* npm install
* npm start dev
* Create a user with these store IDs to view their respective gift card sales:
  * 12345 - for WcDonalds gift cards
  * abcde - for Benny's gift cards
  * 6890 - for Burger Queen gift cards