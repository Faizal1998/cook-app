import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import user from '../Images/user1.jfif';
import {
    signOut,
    onAuthStateChanged
} from "firebase/auth";
import { auth } from "../API/Base";

export default function ProfileMenu({ displayName, profilePic, setIsLoggedIn, setDisplayName }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        console.log(event)

    };
    const handleClose = (event) => {
        setAnchorEl(null);
        console.log(event.target.value)
        // if (event.target.value == 'signOut') {
        //     // console.log(dropdown)
        //     const signoutVar = await signOut(auth);
        //     console.log(signoutVar)
        //     setIsLoggedIn(false)
        //     setDisplayName('')
        // }
    };

    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                {
                    (profilePic !== null || displayName === undefined) ?
                        <Avatar >{`${displayName.split(' ')[0][0]}${displayName.split(' ')[1] !== undefined ? displayName.split(' ')[1][0] : ''}`}</Avatar>
                        :
                        <Avatar alt={displayName} src={user} />
                }
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
        </div>
    );
}
