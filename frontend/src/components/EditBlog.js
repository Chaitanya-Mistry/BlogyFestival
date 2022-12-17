// CREATED BY ANMOL GARG
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"

export const EditBlog = () => {
    const { state: blogId } = useLocation(); // To access the current state of '/editBlog'
    const [currentBlog, setCurrentBlog] = useState([]); // To store current blog detail
    const [blogImage, setBlogImage] = useState(''); // To store selected image file
    const navigate = useNavigate(); // To navigate to a different route

    // Get Blog By ID Request
    const fetchBlog = async () => {
        let response;
        const baseURL = `http://localhost:4000/api/getBlogByID/${blogId}`;

        try {
            response = await axios({
                url: baseURL,
                method: "GET",
                withCredentials: true,
            });
        } catch (err) {
            alert(err);
        }

        if (response.status === 200) {
            setCurrentBlog(response.data.foundBlog);
        }
        else {
            alert('Something went wrong, Try again later');
        }
    }

    // File input change handler
    const fileChangeHandler = (event) => {
        const image = event.target.files[0];
        if (image) {
            setBlogImage(image);
        } else {
            setBlogImage('');
        }
    }

    // When user finally submit the form in-order to update his/her blog ..
    const updateBlog = async (event) => {
        event.preventDefault();
        const baseURL = `http://localhost:4000/api/updateBlog/${blogId}`;
        const formData = new FormData();
        formData.append('title', event.target['blogTitle'].value);
        formData.append('description', event.target['blogDescription'].value);

        // If user also wants to update blog image
        if (blogImage) {
            formData.append('image', blogImage);
        }

        let response;
        // Axios PUT request to the API server ...
        try {
            response = await axios({
                url: baseURL,
                method: "PUT",
                data: formData,
                withCredentials: true
            })
        } catch (error) {
            response = error.response;
        }

        if (response.status === 200) {
            alert('Blog Updated Successfully ✔️');
            navigate('/myBlogs');
        }else{
            alert(`Error: `+response);
        }
    }

    // When component is loaded properly ..
    useEffect(() => {
        fetchBlog();
    }, []);
    return (
        <main>
            <div id="updateBlogContainer">
                {/* Blog image  */}
                <div id="updateBlogImage">
                    <img src={`http://localhost:4000/blogImages/${currentBlog.image}`} />
                </div>
                {/* To enter blog details */}
                <div id="blogDetails">
                    <h2 id="blogTitleMain">
                        Update Blog
                    </h2>

                    <form id="updateBlogForm" encType="multipart/form-data" onSubmit={updateBlog}>
                        <input type="text" name="blogTitle" id="blogTitle" placeholder="🚩 Title " required defaultValue={currentBlog ? currentBlog.title : ''} />
                        <textarea id="blogDescription" name="blogDescription" placeholder="💬 Description" required defaultValue={currentBlog ? currentBlog.description : ''} />
                        <label htmlFor="blogImage">
                            <p style={{ fontSize: '21px' }}>🖼️ Image</p>
                        </label>
                        <input type="file" name="blogImage" id="blogImage" onChange={fileChangeHandler} />
                        <button>
                            Update
                        </button>
                    </form>
                </div>
            </div>
        </main>
    )
}