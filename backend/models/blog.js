const mongoose = require("mongoose");
const { Schema } = mongoose;

// Blog Schema
const blogPostSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    user: {
        type: mongoose.Types.ObjectId, // To store user's id 
        ref: "User",
        require: true
    }
});

module.exports = Blog = mongoose.model('Blog', blogPostSchema);