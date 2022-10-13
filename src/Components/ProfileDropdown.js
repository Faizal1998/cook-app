import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Avatar from '@mui/material/Avatar';
import user from '../Images/user1.jfif';
import {
    signOut,
    onAuthStateChanged
} from "firebase/auth";
import { auth } from "../API/Base";

export default function profileDropDown({ displayName, profilePic, setIsLoggedIn, setDisplayName }) {

    // const [dropdown, setDropdown] = React.useState('');
    // const [profilePic, setProfilePic] = useState(true);

    // const [user, setUser] = useState('');

    // onAuthStateChanged(auth, (currentUser) => {
    //     console.log(currentUser)
    //     // setUser(currentUser);
    // });


    const handleChange = async (event) => {
        console.log(event.target.value)
        // setDropdown(event.target.value);
        if (event.target.value == 'signOut') {
            // console.log(dropdown)
            const signoutVar = await signOut(auth);
            console.log(signoutVar)
            setIsLoggedIn(false)
            setDisplayName('')
        }
    };

    return (
        <Box sx={{ minWidth: 68 }}>
            <FormControl fullWidth sx={{ p: 1 }}>
                <InputLabel id="demo-simple-select-label">{
                    (profilePic !== null || displayName === undefined) ?
                        <Avatar >{`${displayName.split(' ')[0][0]}${displayName.split(' ')[1] !== undefined ? displayName.split(' ')[1][0] : ''}`}</Avatar>
                        // ${displayName.split(' ')[1][0] !== undefined ? displayName.split(' ')[1][0] : null}
                        :
                        <Avatar alt={displayName} src={user} />
                }</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // value={dropdown}
                    // label="Age"
                    onChange={handleChange}
                >

                    <MenuItem value={10}>View Profile</MenuItem>
                    {/* <MenuItem value={20}>Setting</MenuItem> */}
                    <MenuItem value={'signOut'}>Sign Out</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}
