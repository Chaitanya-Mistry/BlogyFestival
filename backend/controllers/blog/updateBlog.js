const Blog = require("../../models/blog");
const fs = require("fs");
const path = require("path");

module.exports = updateBlog = async (req, res) => {
    const { blogID } = req.params; // Blog id
    const { title, description } = req.body; // Blog data provided by user
    const blogImage = req?.files?.image;

    let oldBlogImage;
    let foundBlog;
    let updatedBlog;
    const directoryPath = path.resolve(__dirname, '../../public/blogImages');

    // if a user wants to update blog image as well 
    if (blogImage) {

        // 1st find blog by id 
        try {
            foundBlog = await Blog.findById(blogID);

            if (foundBlog) {
                oldBlogImage = foundBlog.image; // Store name of old blog image

                // 2nd remove associated blog image
                try {
                    // First delete old associated blog image
                    const filePathToDelete = `${directoryPath}/${oldBlogImage}`;
                    fs.unlinkSync(filePathToDelete);
                } catch (err) {
                    return res.status(500).json({ message: `${err} while deleting old image` });
                }
            }
        } catch (err) {
            return res.status(500).json({ message: `${err} while fetching blog data` });
        }

        const currentTimeStamp = new Date().getTime();
        // 3.1 Update this blog
        try {
            updatedBlog = await Blog.updateOne({ _id: blogID },
                {
                    $set: {
                        title,
                        description,
                        image: `${currentTimeStamp}_${blogImage.name}`
                    }
                });

            // 3.2 Move uploaded image to specific directory .. 
            try {
                await blogImage.mv(path.resolve(directoryPath, `${currentTimeStamp}_${blogImage.name}`), function (err) {
                    if (err) {
                        return res.status(500).json({ message: `${err} while uploading image` });
                    }
                });
            } catch (err) {
                res.status(500).json({ message: `${err} while updating blog` })
            }

        } catch (error) {
            return res.status(500).json({ message: `${error} while updating ..` });
        }

        // Finally, IF a blog updated successfully .. 😃
        if (updatedBlog) {
            return res.status(200).json({ message: `Blog updated successfully along with its image 👍` });
        } else {
            return res.status(500).json({ message: `Unable to update your blog post .. 😑` });
        }
    }
    // IF user only wants to update the text information of blog  
    else {
        try {
            updatedBlog = await Blog.findByIdAndUpdate(blogID, {
                title,
                description,
            });

        } catch (error) {
            return res.status(500).json({ message: error });
        }

        // IF a blog updated successfully ..
        if (updatedBlog) {
            return res.status(200).json({ message: `Blog updated successfully 👍` });
        } else {
            return res.status(500).json({ message: `Unable to update your blog post .. 😑` });
        }
    }
}