import * as React from 'react';
import { Box, Button,  TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignUp() {

    const navigate = useNavigate();
    const [formData,setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleInputChange = (e) => {
        const {name,value} = e.target;
        setFormData((prevData) => ({
            ...prevData,[name]: value
        }));
    }

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:4000/signup', formData);
          console.log(response.data);
          navigate('/login');
        } catch (error) {
          console.error(error);
        }
      };


return (
    <Box
        component="form"
        sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '50%',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#f9f9f9',
            marginLeft: '25%',
            marginTop: '100px'
        }}
        noValidate
        autoComplete="off"
    >
        <Typography variant="h4" gutterBottom>
            Sign Up
        </Typography>
        <TextField
            id="outlined-basic"
            label="Enter your Name"
            variant="outlined"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            sx={{ marginBottom: 2, width: '75%' }}
        />
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
        <TextField
            id="outlined-basic"
            label="Re-enter the password"
            variant="outlined"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            sx={{ marginBottom: 2, width: '75%' }}
        />
        <Button
            variant="contained"
            onClick={handleSignUp}
            sx={{ width: '25%', backgroundColor: '#0AE4B3', color: '#fff', '&:hover': { backgroundColor: '#0CE0FF' } }}
        >
            Sign up
        </Button>

        <Link to="/login" sx={{ marginTop: 2, color: '#ff5722', textDecoration: 'none', fontWeight: 'bold' }}>
        Already have an account ? Log In
        </Link>
    </Box>
);
}

export default SignUp

