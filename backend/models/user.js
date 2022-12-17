const mongoose = require("mongoose");
const { Schema } = mongoose;

// USER Schema
const userSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
        minlength: 6  // Password should be minimum 6 length 💪
    },
    blogsWritten: [
        {
            type: mongoose.Types.ObjectId, // To store user's id 
            ref: "Blog",
            require: true
        }
    ]
});

// User Model
module.exports = User = mongoose.model("User", userSchema); // Database object to work with it later ..