const Blog = require("../../models/blog");

module.exports = getAllBlogs = async (req,res) => {
    let blogs;
    // Fetch all stored blogs except the blogs of logged in user  ...
    try{
        blogs = await Blog.find({ user: { $ne: req.userID } }).populate("user");
        console.log(typeof blogs,"❤️‍🔥");
    }catch(error){
        return res.status(500).json({message:error});
    }

    if(blogs && blogs.length !== 0){
        return res.status(200).json(blogs);
    }else{
        return res.status(204).json({message: `No blogs were created ... 😕`});
    }
}