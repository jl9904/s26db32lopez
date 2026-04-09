const mongoose = require("mongoose");

const lighthouseSchema = mongoose.Schema({
    name: String,
    location: String,
    height: Number
});

module.exports = mongoose.model("Lighthouse", lighthouseSchema);