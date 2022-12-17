// CREATED BY HEVIN PATEL

import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Blog = ({ blogData, personalBlogs, myBlogFetch}) => {
    const navigate = useNavigate();

    // To delete blog
    const deleteBlog = async (event) => {
        const confirmation = window.confirm('Do you really want to delete this ? 🧐');
        if (confirmation) {
            const currentBlogId = event.target.dataset.blogid;
            const baseURL = `http://localhost:4000/api/deleteBlog/${currentBlogId}`;
            let response;
            // Send delete request to our API
            try {
                response = await axios.delete(baseURL, { withCredentials: true });
            } catch (err) {
                response = err.response;
            }

            if(response.status === 200){
                alert('Blog deleted successfully ✔️');
                myBlogFetch();
            }else{
                alert(response);
            }
        }
    }
    // console.log('From Blog Component :', blogData?.user?.name);
    return (
        <section className="blogContainer">
            {/* Blog Image */}
            <section className="blogImageContainer">
                <img src={`http://localhost:4000/blogImages/${blogData.image}`} alt={`${blogData.user.name}'s`} />
            </section>
            {/* Blog Details */}
            <section className="blogDetailsContainer">
                <p className="blogTitle"><strong>Title:</strong> {blogData.title}</p>
                <p className="blogDescription"><strong>Description:</strong> {blogData.description}</p>
                <p className="blogWrittenBy"><strong>Written by:</strong> <em> {personalBlogs ? `You` : `${blogData.user.name}`}</em></p>

                {/* Additional Operations */}
                {personalBlogs ? <p className="blogOperations">

                    {/* Edit blog  ✍️ */}
                    <span className="material-symbols-sharp material-icons" style={{ color: 'green' }} onClick={() => navigate('/editBlog',{state:blogData._id})}>edit</span>
                    {/* Delete blog ❎ */}
                    <span className="material-symbols-sharp material-icons" style={{ color: 'red' }} onClick={deleteBlog} data-blogid={blogData._id}>delete</span>

                </p> : ''}
            </section>
        </section>
    )
} 