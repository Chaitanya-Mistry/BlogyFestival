// CREATED BY JAYPAL SINH RAMLAVAT

import axios from "axios";
import { useEffect, useState } from "react"
import { Blog } from "./Blog";

export const AllBlogs = () => {

    const [blogs, setBlogs] = useState([]);
    const [noBlogs, setNoBlogs] = useState(false);

    useEffect(() => {
        fetchAllBlogs();
    }, []);

    // Fetch all blogs
    const fetchAllBlogs = async () => {
        const baseURL = 'http://localhost:4000/api/getAllBlogs'; // Our API server 
        let response;

        // Get Request
        try {
            response = await axios.get(baseURL, { withCredentials: true });
        } catch (err) {
            response = err.response;
            console.log(response);
        }

        // if blogs were not created by any other user
        if (response.status === 204) {
            setNoBlogs(true);
        } else {
            setBlogs(response.data);
            // console.log(response.data)
        }
    }

    if (noBlogs) {
        return (
            <main>
                <h2>No blogs to display 😶 </h2>
            </main>
        )
    } else {
        const allBlogs = blogs?.map((currBlog, index) => {
            return <Blog blogData={currBlog} key={index} personalBlogs={false} />
        });
        return (
            <main id="mainBlogContainer">
                {allBlogs}
            </main>
        )
    }
} 