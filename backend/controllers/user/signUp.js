const User = require("../../models/user");
const bcrypt = require("bcryptjs");

// Sign Up 
module.exports = signUp = async (req, res) => {
    // Get user's entered data  ..
    const { name, email, password } = req.body;

    // Password length Validation
    if(password.length < 6){
        return res.status(400).json({message:`Password must be at least 6 characters long ..😏`});
    }
    let existingUser;
    // Check for duplicate email id ..
    try {
        existingUser = await User.findOne({ email });
    } catch (error) {
        return res.json({ message: error });
    }

    // if duplicate email id found 
    if (existingUser) {
        return res.status(409).json({ message: `User with email = ${email} is already existed, please log in ..` });
    } else {
        // Hash user's password .. 👮
        const hasedPassword = bcrypt.hashSync(password);

        const userData = new User({
            name,
            email,
            password: hasedPassword,
            // Initialize empty array of blogs when user create account for the very first time
            blogsWritten: []
        });

        try {
            // Saving user's data 
            await userData.save();
        } catch (error) {
            return res.status(400).json({ message: error });
        }
        // console.log(`User's data: `, name, email, password);
        return res.status(201).json({ message: `User : ${name} created successfully 👍` });
    }

}