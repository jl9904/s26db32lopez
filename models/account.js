const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const accountSchema = new Schema({
    username: String,
    password: String
});

// Use a conditional check to grab the function regardless of how it was imported
if (typeof passportLocalMongoose === 'function') {
    accountSchema.plugin(passportLocalMongoose);
} else {
    // This handles the case where it's imported as an object
    accountSchema.plugin(passportLocalMongoose.default || passportLocalMongoose);
}

module.exports = mongoose.model("Account", accountSchema);