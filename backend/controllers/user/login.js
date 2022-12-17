const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = login = async (req, res) => {
    const { email, password } = req.body;
    console.log('Login api hit .. 🏏', email, password);
    let userExists;
    try {
        // Find user by email .. 🧐
        userExists = await User.findOne({ email });
    } catch (error) {
        console.log('From Catch : ', error)
        return res.status(500).json({ message: 'Something went wrong try again later ...' });
    }

    // if there is no user in our database 
    if (!userExists) {
        return res.status(404).json({ message: `There is no user with email '${email}' 😑` });
    } else {
        // Password comparison of that particular user ... 
        const isValidPassword = bcrypt.compareSync(password, userExists.password);

        // IF password is valid ✅
        if (isValidPassword) {
            // Generating a JWT(Json Web Token) for user 🍪
            const token = generateToken(userExists);

            res.cookie("jwtoken", token, {
                // expires: new Date(Date.now() + 300000), // Expires after 5 minutes 
                // httpOnly: true // Prevents client-side scripts from accessing our token 👮
            }).status(200).json({message:`Login Successfully 😄`});
        }
        // If password is NOT valid 🟥 
        else {
            return res.status(400).json({ message: `Incorrect password 🙁` });
        }
    }
}

// Token generation goes here 
const generateToken = ({ _id }) => {
    const jwtSecretKey = process.env.JWT_SECRET_KEY || "secret_key_123";

    const token = jwt.sign({ user_id: _id }, jwtSecretKey);
    return token;
}