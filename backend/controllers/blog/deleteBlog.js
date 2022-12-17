const Blog = require("../../models/blog");
const fs = require("fs"); // To access and interact with the files. 📕 📘 📗 
const path = require("path");

module.exports = deleteBlog = async (req, res) => {
    // Get ID of a blog to be deleted ...
    const { blogID } = req.params;

    let blog;
    try {
        // Delete blog first
        blog = await Blog.findByIdAndDelete(blogID).populate("user");
        // Then delete blog reference from user
        await blog.user.blogsWritten.pull(blogID);
        await blog.user.save();

        const directoryPath = path.resolve(__dirname, '../../public/blogImages');
        const filePath = `${directoryPath}/${blog.image}`;
        fs.unlinkSync(filePath); // Remove associated blog image
    } catch (error) {
        return res.status(500).json({ message: error });
    }

    if(blog){
        return res.status(200).json({message:"Successfully deleted blog 😄"});
    }else{
        return res.status(500).json({message:"Unable to delete blog 😐"});
    }
}
