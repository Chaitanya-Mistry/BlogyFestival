const User = require("../../models/user");

module.exports = getUserBlog = async (req, res) => {

    let userBlogs;
    // Fetch all user's blogs ...
    try {
        userBlogs = await User.findOne({ _id: req.userID }).populate("blogsWritten");
    } catch (error) {
        return res.status(500).json({ message: error });
    }

    // console.log(userBlogs);
    if (userBlogs && userBlogs.blogsWritten.length !== 0) {
        return res.status(200).json(userBlogs);
    } else {
        return res.status(204).json({ message: `You haven't created any blog yet ... 😕` });
    }
}