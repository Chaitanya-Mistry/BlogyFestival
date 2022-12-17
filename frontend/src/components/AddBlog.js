// CREATED BY CHAITANYA MISTRY
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export const AddBlog = () => {
    const navigate = useNavigate();
    const [blogImage, setBlogImage] = useState('');

    // When user select an image to upload
    const changeHandler = (event) => {
        setBlogImage(event.target.files[0]); // Store blog image in our state 
    }
    // Submit event handler of add blog form
    const handleSubmit = async (event) => {
        event.preventDefault();
        const baseURL = 'http://localhost:4000/api/addBlog'; // Our API server 

        const formdata = new FormData();
        formdata.append('title', event.target['blogTitle'].value);
        formdata.append('description', event.target['blogDescription'].value);
        formdata.append('image', blogImage);

        let response;
        // Sending POST Request to our API Server
        try {
            response = await axios({
                method: 'POST',
                url: baseURL,
                data: formdata,
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true
            });           
        } catch (err) {
            response = err.response;
        }

        // IF blog created navigate to user's blog 👍
        if (response.status === 201) {
            alert('Blog created 😀');
            navigate("/myBlogs");
        } else {
            alert(`ERROR: ${response.data.message}`);
        }
    }

    return (
        <main>
            <div id="addBlogContainer">
                {/* Add illustration */}
                <div id="addBlogImage">
                    {/* https://www.freepik.com/free-vector/add-files-concept-illustration_5573510.htm */}
                    {/* Image provided by https://www.freepik.com */}

                    <img src="https://img.freepik.com/free-vector/add-files-concept-illustration_114360-481.jpg?w=1060&t=st=1663539583~exp=1663540183~hmac=b839d535fda7a5dc902338f809c47cf2060424912f27c9e75ec92e7fbbbee07c" />
                </div>
                {/* To enter blog details */}
                <div id="blogDetails">
                    <h2 id="blogTitleMain">
                        Add Blog ➕
                    </h2>

                    <form id="addBlogForm" encType="multipart/form-data" onSubmit={handleSubmit}>
                        <input type="text" name="blogTitle" id="blogTitle" placeholder="🚩 Title " required />
                        <textarea id="blogDescription" name="blogDescription" placeholder="💬 Description" required />
                        <label htmlFor="blogImage">
                            <p style={{ fontSize: '21px' }}>🖼️ Image</p>
                        </label>
                        <input type="file" name="blogImage" id="blogImage" onChange={changeHandler} required />
                        <button id="createBlogBtn">
                            Create
                        </button>
                    </form>
                </div>
            </div>
        </main>
    )


}