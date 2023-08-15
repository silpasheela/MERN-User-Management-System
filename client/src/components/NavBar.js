import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function NavBar() {

    const navigate = useNavigate()
    console.log(localStorage.getItem('user'))
    const user = localStorage.getItem('user') ? localStorage.getItem('user'):null


    const handleLogout = async() => {

        try {
            await axios.get('http://localhost:4000/logout');

            localStorage.removeItem('user');

            navigate('/login');
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                sx={{ mr: 2 }}
              >
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                User Management System
              </Typography>
              {!user ? (
                    <React.Fragment>
                        <Button color="inherit" onClick={() => navigate('/login')}>Sign In</Button>
                        <Button color="inherit" onClick={() => navigate('/signup')}>Sign Up</Button>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Button color="inherit" onClick={handleLogout}>Logout</Button>
                        <Button color="inherit" onClick={() => navigate('/editprofile')}>Edit Profile</Button>
                    </React.Fragment>
                )}
            </Toolbar>
          </AppBar>
        </Box>
      );
}

export default NavBar

