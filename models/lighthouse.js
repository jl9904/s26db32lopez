const mongoose = require("mongoose");

const lighthouseSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Lighthouse name is required"],
        // BONUS: added name min and max requirement
        minLength: [5, "Name must be at least 5 characters"],
        maxLength: [30, "Name cannot exceed 30 characters"]
    },
    location: {
        type: String,
        // BONUS: added a requirement for a location
        required: [true, "Location is required"]
    },
    height: {
        type: Number,
        min: [0, "Height must be at least 0"],
        max: [1000, "Height cannot exceed 1000 feet"]
    }
});

module.exports = mongoose.model("Lighthouse", lighthouseSchema);