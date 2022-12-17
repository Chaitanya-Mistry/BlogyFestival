// CREATED BY ANMOL GARG
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {

    // To Navigate to a different component 🗺️
    const navigate = useNavigate();

    // Submit event handler of sign up form
    const handleSubmit = async (event) => {
        const baseURL = 'http://localhost:4000/api/signUp'; // Our API server 

        event.preventDefault(); // to prevent the browser window from reloading ..

        const uPass = event.target["userPassword"].value;
        const uPassAgain = event.target["userPasswordAgain"].value;

        //  Match the both passwords @Client Side 🧐
        if (uPass === uPassAgain) {
            // Store user credentials in an object ..
            const userData = {
                userName: event.target["userName"].value,
                userEmail: event.target["userEmail"].value,
                userPassword: event.target["userPassword"].value
            }

            let response;
            // Sending POST Request to our API Server
            try {
                response = await axios.post(baseURL, {
                    name: userData.userName,
                    email: userData.userEmail,
                    password: userData.userPassword
                });
            } catch (err) {
                response = err.response;
            }

            // IF user created, Navigate to Sign in component .. 👍
            if (response.status === 201) {
                alert('Registration completed 😀');
                navigate("/login",{state:userData}); 
            } else {
                alert(`ERROR: ${response.data.message}`);
            }

        } else {
            alert('Password is not matched .. 😐');
            event.target["userPasswordAgain"].focus();
        }
    }
    return (
        <main>
            <div id="signUpContainer">
                {/* For login illustration */}
                <div id="signUpImage">
                    {/* https://www.freepik.com/free-vector/businessman-holding-pencil-big-complete-checklist-with-tick-marks_11879344.htm#query=registration&position=14&from_view=search */}
                    {/* Image provided by https://www.freepik.com */}

                    <img src="https://img.freepik.com/free-vector/businessman-holding-pencil-big-complete-checklist-with-tick-marks_1150-35019.jpg?w=1060&t=st=1662662477~exp=1662663077~hmac=2579b589aa13dff324a354771e7f9a8fb2597ec3084e8109c3546a67125aff90" />
                </div>
                {/* To enter sign up details */}
                <div id="signUpDetails">
                    <h2 id="signUpTitle">Sign Up</h2>

                    <form id="signUpForm" onSubmit={handleSubmit}>
                        <input type="text" name="userName" id="userName" placeholder="🌟 Your Name" required />
                        <input type="email" name="userEmail" id="userEmail" placeholder="📧 Your Email" required />
                        <input type="password" name="userPassword" id="userPassword" placeholder="🔒 Password" minLength={6} required />
                        <input type="password" name="userPasswordAgain" id="userPasswordAgain" placeholder="🔐 Confirm password" minLength={6} required />
                        <button>Register</button>
                    </form>
                </div>
            </div>
        </main>
    )
}