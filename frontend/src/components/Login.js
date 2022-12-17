// CREATED BY HEVIN PATEL
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useContext } from "react";
import { UserLoginContext } from "../App";

export const Login = () => {
    const {isLoggedIn,setUserLogIn} = useContext(UserLoginContext); // To use the Context in a child component, we can access it using the useContext Hook.
    
    // To Navigate to a different component 🗺️
    const navigate = useNavigate();

    const locationData = useLocation(); // To get the data from sign up page where user has already entered their data ..

    let userData = null;
    if(locationData.state){
        userData = locationData.state; // Store user data in an object ..
    }
    // Login Form Submit Event Handler 
    const handleSubmit = async (event) => {
        event.preventDefault();
        // Store user credentials in an object ..
        const userLoginCredentials = {
            userEmail: event.target["userEmail"].value,
            userPassword: event.target["userPassword"].value
        }

        // XHR Request to our API .. 
        // Sending POST request to our API server .. ⬆️
         const baseURL = 'http://localhost:4000/api/login'; 
         let response;

         try{
             response = await axios.post(baseURL,{
                 email : userLoginCredentials.userEmail,
                 password : userLoginCredentials.userPassword
             },{withCredentials:true}); // To send cookies data to our API server ..
         }catch(err){
             response = err.response;
         }

         if(response.status === 200){
            alert(`${response.data.message}`);
            setUserLogIn(true);
            navigate("/"); // Navigate to the user's home page .. 
         }else{
            // console.warn('error');
            alert(`🟥 ERROR 🟥: ${response.data.message}`);
         }
    }

    return (
        <main>
            <div id="loginContainer">
                {/* For login illustration */}
                <div id="loginImage">
                    {/* https://www.freepik.com/free-vector/access-control-system-abstract-concept_12085707.htm#query=login&position=0&from_view=keyword */}
                    {/* Image provided by www.freepik.com */}
                    <img src="https://img.freepik.com/free-vector/access-control-system-abstract-concept_335657-3180.jpg?w=740&t=st=1662589406~exp=1662590006~hmac=4bc3af49bb257fc5b5a4543e663bd66c92286af862a8e4527ae233e0efd4fff9" />
                </div>
                {/* To enter login details */}
                <div id="loginDetails">
                    <h2 id="loginTitle">Sign In</h2>
                    <form onSubmit={handleSubmit} id="loginForm">

                        <input type="email" name="userEmail" id="userEmail" defaultValue={userData ? userData.userEmail : ""} placeholder="📧 Your Email" required />
                        <input type="password" name="userPassword" id="userPassword" defaultValue={userData? userData.userPassword : ""} placeholder="🔒 Password" required />
                        <button>Log in</button>

                        <div id="otherLoginOptions">
                            <strong style={{ fontSize: "21px" }}>or</strong> <br />
                            <span className="fa-brands fa-facebook faIcons" style={{ color: "dodgerblue" }} />
                            <span className="fa-brands fa-github faIcons" style={{ color: "purple" }} />
                            <span className="fa-brands fa-google faIcons" style={{ color: "red", fontSize: "21.4px" }} />
                        </div>

                        {/* Facebook Github LinkedIn */}
                    </form>
                </div>
            </div>
        </main>
    )
}