import React from 'react'
// import NavBar from './NavBar';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';



function Home() {

    const navigate = useNavigate()

    return (
        <div>
            {/* <NavBar/> */}
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
                        <React.Fragment>
                            <Button color="inherit" onClick={() => navigate('/login')}>Sign In</Button>
                            <Button color="inherit" onClick={() => navigate('/signup')}>Sign Up</Button>
                        </React.Fragment>
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    );
}

export default Home