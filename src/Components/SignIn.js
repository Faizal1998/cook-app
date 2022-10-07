import React from 'react';
import './css/SignIn.css';
import Snackbar from '@mui/material/Snackbar';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
} from "firebase/auth";
import { auth } from "../API/Base";
import MuiAlert from '@mui/material/Alert';
// import LoginService from './LoginService';
// import { connect } from 'react-redux';
// import { login } from '../actions/'

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

class SignIn extends React.Component {
    constructor(props) {
        super(props)
        console.log(props)
        this.state = {
            email: "",
            password: " ",
            SIGN_IN: false || this.props.isLogged,
            isLogged: '',
            errorMsg: '',
            accessToken: '',
            displayName: ''
        }
    }


    signinHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        // console.log(val)
        if (nam === "email") {
            this.setState({ email: val })
        }
        else if (nam === "password") {
            this.setState({ password: val })
        }
        console.log(this.state.email, this.state.password)
    }


    onSigninSubmit = async (event) => {
        console.log("Submited")
        //alert("Sign in successfully")
        event.preventDefault()

        const data = {
            auth,
            email: this.state.email,
            password: this.state.password
        }
        console.log(data.email)

        try {
            const user = await signInWithEmailAndPassword(
                // data
                auth,
                this.state.email,
                this.state.password
            );
            console.log(user);
            this.setState({ accessToken: user.user.accessToken });
            this.setState({ displayName: user.user.displayName });
            this.setState({ SIGN_IN: true })
            this.props.setIsLoggedIn(true)
            this.props.setDisplayName(user.user.displayName);
            this.props.setAccessToken(user.user.accessToken);
            document.getElementById("signin").style.display = "none"

            // document.getElementById("signinForm").reset()
        } catch (error) {
            this.props.setIsLoggedIn(false)
            this.setState({ SIGN_IN: false })
            this.setState({ errorMsg: error.message })
            console.log(error.message);
        }

        // const loginResult = await LoginService(data)

        // console.log(loginResult)


        // if (loginResult === 200) {
        //     console.log("logged in");
        //     this.setState({ SIGN_IN: true })
        // }
        // else if (loginResult === 203) {
        //     console.log("password incorrect")
        //     this.setState({ errorMsg: "Password Incorrect" })
        //     this.setState({ SIGN_IN: false })
        // }
        // else {
        //     console.log("email invalid")
        //     this.setState({ errorMsg: "Email Invalid" })
        //     this.setState({ SIGN_IN: false })
        // }

        // const signinData  ={
        //     fromPlace:this.state.from,
        //     toPlace:this.state.toplace,
        //     travelDate :this.state.travelDate
        // }
        // await axios.post('http://localhost:4000/app/signinInfo',signinData)
        // .then(res => {
        //     console.log(res.data)
        //     this.setState({busData : res.data})

        // })
        // .catch(err => console.log(err.data))


        // this.props.login({
        //     isLogged: this.state.SIGN_IN

        // })

        // console.log(this.state.SIGN_IN, this.props.isLogged)
        // if (this.props.isLogged) {

        // document.getElementById("signin").style.display = "none"
        // // }

        // document.getElementById("signinForm").reset()
        return <Alert severity="success">This is a success message!</Alert>
    }
    // signout = (e) => {
    //     console.log(this.props.login(false))

    // }



    render() {
        return (
            <>
                <div id="signin">
                    <button className="closeBtn" onClick={() => (document.getElementById("signin").style.display = "none")}>X</button>
                    <h2>Sign In</h2>
                    {this.state.SIGN_IN ? <h4 className="text-success">Logged in successfully</h4> : <h4 className="text-danger">{this.state.errorMsg}</h4>}
                    <form id='signinForm' className='d-flex justify-content-center row' onSubmit={this.onSigninSubmit}>

                        <input type='email' required name="email" className='form-control m-3' placeholder='Email' onChange={this.signinHandler} />
                        <input type='password' required name='password' className='form-control m-3' placeholder='Password' onChange={this.signinHandler} />
                        <input type='submit' name='submit' className='signInButton form-control btn btn-success text-white col-3 m-2' value='Sign In' />
                        {this.state.SIGN_IN && <button onClick={() => (document.getElementById("signup").style.display = "flex")} className='form-control btn btn-success text-white col-3 m-2'>Sign Up</button>}


                    </form>
                </div>
            </>
        )

    }

}

// const mapStateToProps = (state, ownProps) => {
//     return {
//         isLogged: state.isLogged.isLogged
//     }
// }
// const mapDispatchToProps = () => {
//     return {
//         login
//     }
// }
export default SignIn
// export default connect(
//     mapStateToProps,
//     mapDispatchToProps()
// )(SignIn);