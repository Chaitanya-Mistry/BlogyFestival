const Blog = require("../../models/blog");

module.exports = getBlogByID = async(req,res) => {
      // Get ID of a blog  ...
      const { blogID } = req.params;
      let foundBlog;

      try {
        foundBlog = await Blog.findById(blogID);   
      } catch (error) {
        return res.status(500).json({message:error});
      }

      if(foundBlog){
        return res.status(200).json({foundBlog});
      }else{
        return res.status(500).json({message:'Blog not found 😅'});
      }

}