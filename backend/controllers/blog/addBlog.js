const mongoose = require("mongoose");
const Blog = require("../../models/blog");
const path = require("path");

module.exports = addBlog = async (req, res) => {
    // Get blog data
    const { title, description } = req.body;
    const blogImage = req.files.image;

    const currentTimeStamp = new Date().getTime();
    const blogData = new Blog({
        title,
        description,
        image: `${currentTimeStamp}_${blogImage.name}`,
        user: req.userID
    });

    try {
        const session = await mongoose.startSession();
        // Start of Transaction
        session.startTransaction();

        // First save blog 
        await blogData.save({ session });
        // Then, Insert saved blog's id in user's blogs 
        req.rootUser.blogsWritten.push(blogData._id);
        // Save user
        await req.rootUser.save({ session });

        /* 
            Finally move uploaded blog's image somewhere on the server
            Use the mv() method to place the file somewhere on your server 
        */
       try{
        await blogImage.mv(path.resolve(__dirname, '../../public/blogImages', `${currentTimeStamp}_${blogImage.name}`), function (err) {
            if (err){
                return res.status(500).json({ message: err });
            }
        });
       }catch(err){
          return res.status(500).json({message:err});
       }
        // Commit Transaction
        session.commitTransaction();
    } catch (error) {
        return res.status(500).json({ message: error });
    }

    // if our transaction committed successfully 😎
    return res.status(201).json({ message: `Blog created by user successfully 😃` });
}
