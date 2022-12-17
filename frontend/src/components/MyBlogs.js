// CREATED BY JAYPAL SINH RAMLAVAT

import axios from "axios";
import { useEffect, useState } from "react";
import { Blog } from "./Blog";

export const MyBlogs = () => {

    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetchMyBlogs();
    }, []);

    // Fetch all blogs
    const fetchMyBlogs = async () => {
        const baseURL = 'http://localhost:4000/api/myAllBlogs'; // Our API server 
        let response;

        // Get Request
        try {
            response = await axios.get(baseURL, { withCredentials: true });
        } catch (err) {
            response = err.response;
        }

        if (response.status === 200) {
            setBlogs(Array.from(response.data.blogsWritten));
        }
    }

    if (blogs.length === 0 || !blogs) {
        return (
            <main>
                {setTimeout(() => {
                    <h2 style={{ textAlign: 'center' }}>First you need to create a blog to display 🙄</h2>
                }, 500)}
            </main>
        );
    } else {
        const myAllBlogs = blogs?.map((currBlog, index) => <Blog blogData={currBlog} key={index} personalBlogs={true} myBlogFetch={fetchMyBlogs} />);
        return (
            <main id="mainBlogContainer">
                {myAllBlogs}
            </main>
        )
    }

}