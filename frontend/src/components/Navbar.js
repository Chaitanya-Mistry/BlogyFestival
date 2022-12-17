// CREATED BY CHAITANYA MISTRY

import axios from "axios";
import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserLoginContext } from "../App";

export function Navbar() {
    const { isLoggedIn, setUserLogIn } = useContext(UserLoginContext);
    const navigate = useNavigate();

    // Logout functionality ..
    const allowUserToLogout = async (event) => {
        event.preventDefault();

        const baseURL = 'http://localhost:4000/api/logout'; // Our API server 
        let response;

        try {
            response = await axios.get(baseURL, { withCredentials: true });
        } catch (err) {
            response = err.response;
        }

        if (response.status === 200) {
            // console.log(response)
            setUserLogIn(); // toggle user login status 
            navigate('/'); // Navigate to default home page after log out .. 
        } else {
            alert('ERROR in logout ..', response);
        }
    }

    if (isLoggedIn) {

        return (
            <>
                <header>
                    {/* Site Logo */}
                    <NavLink to="/" style={{ textDecoration: 'none' }}>
                        <h1 id="siteLogo">Sky Rocker Blog ✍️ </h1>
                    </NavLink>
                    <nav>
                        <NavLink to='/'>Home</NavLink>
                        <NavLink to='/myBlogs'>My Blogs</NavLink>
                        <NavLink to='/addBlog'>Add Blog</NavLink>
                        <NavLink to='' onClick={allowUserToLogout}>Logout</NavLink>
                    </nav>
                </header>
            </>
        )
    } else {
        return (
            <>
                <header>
                    {/* Site Logo */}
                    <NavLink to="/" style={{ textDecoration: 'none' }}>
                        <h1 id="siteLogo">Sky Rocker Blog ✍️ </h1>
                    </NavLink>
                    <nav>
                        <NavLink to='/'>Home</NavLink>
                        <NavLink to='/login'>Login</NavLink>
                        <NavLink to='/signUp'>Sign Up</NavLink>
                    </nav>

                </header>
            </>
        );
    }

}
