import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';
import './css/SignUp.css';
import {
    createUserWithEmailAndPassword,
    updateProfile
    // signInWithEmailAndPassword,
    // onAuthStateChanged,
    // signOut,
} from "firebase/auth";
import { auth } from "../API/Base";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Signup = ({ setIsLoggedIn, displayName, setDisplayName, setAccessToken }) => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState("");

    //const inputField = useRef(null);

    const onChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;

        if (nam === "name") {
            setName(val);
        }
        else if (nam === "email") {
            setEmail(val)
        }
        else if (nam === "mobile") {
            setMobile(val)
        }
        else if (nam === "password") {
            setPassword(val)
        }
        else if (nam === "dob") {
            setDob(val)
        }
        else if (nam === "gender") {
            setGender(val)
        }
        //console.log(name,email,mobile,password,dob,gender)
    }

    const onSubmitSignUp = async (event) => {
        console.log("submited")
        // alert("signed up successfully")
        event.preventDefault()

        // const registered = {
        //     name: name,
        //     email: email,
        //     mobile: mobile,
        //     password: password,
        //     dob: dob,
        //     gender: gender
        // }
        try {
            const user = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            console.log(user);

            updateProfile(auth.currentUser, {
                displayName: name
            }).then(() => {
                console.log("name updated")
                setDisplayName(name);
                setAccessToken(user.user.accessToken)
                console.log(displayName)
                setIsLoggedIn(true)
                // Profile updated!
                // ...
            }).catch((error) => {
                setIsLoggedIn(false)
                // An error occurred
                // ...
            });
        } catch (error) {
            console.log(error.message);
            setIsLoggedIn(false)
        }
        // axios.post('http://localhost:4000/app/signup', registered)
        //     .then(res => console.log(res.data))
        //     .catch(err => console.log(err.data))
        <Alert severity="success">This is a success message!</Alert>
        reset()
        document.getElementById("signup").style.display = "none"
        // document.getElementById("signin").style.display = "flex"
    }

    function reset() {
        document.getElementById("signupForm").reset();

    }

    return (
        <div id="signup">
            <div className="closeBtnDiv">
                <button className="closeBtn" onClick={() => (document.getElementById("signup").style.display = "none")}>✖</button>
            </div>
            <h3>Create</h3>
            <form id="signupForm" onSubmit={(event) => onSubmitSignUp(event)}>
                <input type="text" className="inputEle" id="name" placeholder="Name*" name="name" value={name} onChange={(event) => onChangeHandler(event)} />
                <input type="email" className="inputEle" id="email" placeholder="Email*" required name="email" value={email} onChange={(event) => onChangeHandler(event)} />
                <input type="tel" className="inputEle" id="mobile" placeholder="Mobile No" name="mobile" value={mobile} onChange={(event) => onChangeHandler(event)} />
                <input type="password" className="inputEle" id="password" placeholder="Password*" required name="password" value={password} onChange={(event) => onChangeHandler(event)} />
                <label className="inputEle dob text-dark" for="dob">DOB</label>
                <input type="date" className="inputEle" id="dob" placeholder="Name" name="dob" value={dob} onChange={(event) => onChangeHandler(event)} />

                <div className="inputEle" >
                    <label className="text-dark" ><input name="gender" type="radio" value="male" onClick={(event) => onChangeHandler(event)} />Male</label>
                    <label className="text-dark" ><input name="gender" type="radio" value="female" onClick={(event) => onChangeHandler(event)} />Female</label>
                </div>
                <input type="submit" id="submitSignUp" name="submit" value="Create Account" />
                {/* <Route>
                    <NavLink to="/" className="signupMain">Back to Main Page</NavLink>

                    <Switch>
                        <Route path ="/" exact component={Main}/>
                    </Switch>
                </Route> */}

            </form>
        </div>
    )
}
export default Signup