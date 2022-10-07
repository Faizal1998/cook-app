import './css/Header.css'
import logo from '../Images/circuit.png';
import user from '../Images/user1.jfif';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import ProfileDropdown from './ProfileDropdown';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { useState } from 'react';
import ProfileMenu from './ProfileMenu';

const Header = ({ title, displayName, isLoggedIn, setIsLoggedIn, setDisplayName }) => {
  const [profilePic, setProfilePic] = useState(true);
  console.log("isLoggedIn", isLoggedIn)

  const handleSignUp = (event) => {
    event.preventDefault()
    console.log("handleSignUp");
    document.getElementById("signup").style.display = "flex";
    document.getElementById("signin").style.display = "none";
  }
  const handleSignIn = (event) => {
    event.preventDefault()
    console.log("handleSignUp");
    document.getElementById("signin").style.display = "flex";
    document.getElementById("signup").style.display = "none";
  }

  return (
    <header className="Header">
      <img src={logo} alt="logo" />
      <h1>{title}</h1>
      <div>

        {isLoggedIn ?
          <>
            {/* <button onClick={handleDropDown}><img src={user}></img></button> */}
            {/* <Button onClick={handleDropDown}>{
              profilePic !== null ?
                <Avatar >{`${displayName.split(' ')[0][0]}${displayName.split(' ')[1][0]}`}</Avatar>
                :
                <Avatar alt={displayName} src={user} />
            }</Button> */}
            <ProfileDropdown displayName={displayName} setDisplayName={setDisplayName} profilePic={profilePic} setIsLoggedIn={setIsLoggedIn} />
            {/* <ProfileMenu displayName={displayName} setDisplayName={setDisplayName} profilePic={profilePic} setIsLoggedIn={setIsLoggedIn} /> */}
          </>
          :
          <>
            {/* <Button variant="contained">Contained</Button> */}

            <Button variant="contained" onClick={handleSignIn}>Login</Button>
            <Button variant="contained" onClick={handleSignUp}>Register User</Button>

          </>
        }

      </div>
    </header>
  )
}

export default Header