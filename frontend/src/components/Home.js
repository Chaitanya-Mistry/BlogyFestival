// CREATED BY CHAITANYA MISTRY
import { useContext } from "react";
import { UserLoginContext } from "../App";
import { AllBlogs } from "./AllBlogs";

export const Home = () => {
    const { isLoggedIn } = useContext(UserLoginContext);
    
    // if user is logged in display all the blogs 
    if(isLoggedIn){
        return(
            <>
            <main>
                <AllBlogs/>
            </main>
            </>
        )
    }else{
        return (
            <main>
                <h1 id='homePage'>
                    Welcome to the Sky Rocker Blogs <br />🛺
                </h1>
            </main>
        )
    }
}