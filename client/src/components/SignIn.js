import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuth } from '../app/features/Auth/authSlice';

function SignIn() {

    const navigate = useNavigate();
    const [formData,setFormData] = useState({
        email:'',
        password:''
    });

    const handleInputChange = ((e) => {
        const {name,value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    });

    const dispatch = useDispatch()

    const handleLogin = async(e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:4000/login',formData);
            console.log(response.data);
            console.log(response.data.user)
            // Store user's login status and other relevant data
            // Set a key-value pair
            localStorage.setItem('user', JSON.stringify(response.data?.user));
            dispatch(setAuth())
            setFormData({
            email: '' ,
            password: ''
           })
           navigate('/userhome');
        } catch (error) {
            console.log(error)
        }
    } 

  return (
    <Box
    component="form"
    sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '30%',
        margin: 'auto',
        padding: '20px',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        borderRadius: '8px',
        marginTop:  '100px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    }}
    noValidate
    autoComplete="off"
    >
    <Typography variant="h4" gutterBottom>
        Log In
    </Typography>
    <TextField
        id="outlined-basic"
        label="Enter your email"
        variant="outlined"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        sx={{ marginBottom: 2, width: '75%' }}
    />
    <TextField
        id="outlined-basic"
        label="Enter your password"
        variant="outlined"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleInputChange}
        sx={{ marginBottom: 2, width: '75%' }}
    />
    <Button variant="contained" onClick={handleLogin} sx={{ width: '25%', backgroundColor: '#1FAA59', color: '#fff' }}>
        Log In
    </Button>
    <Link to="/signup" sx={{ marginTop: 2, color: '#ff5722', textDecoration: 'none', fontWeight: 'bold' }}>
        Don't have an account? Sign Up
    </Link>
    </Box>

  )
}

export default SignIn



