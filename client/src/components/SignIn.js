import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

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

    const handleLogin = async(e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:4000/login',formData);
            console.log(response.data);
            console.log(response.data.user)
            // Store user's login status and other relevant data
            // localStorage.setItem('isLoggedIn', 'true'); // Set a key-value pair
            localStorage.setItem('user', JSON.stringify(response.data?.user));
            setFormData({
            email: '' ,
            password: ''
           })
           navigate('/');
        } catch (error) {
            console.log(error)
        }
    } 

  return (
//     <Box
//     component="form"
//     sx={{
//       '& > :not(style)': { m: 1, width: '25ch' },
//       display: 'flex' ,
//       flexDirection: 'column' ,
//       width: '50%' ,
//       margin: 'auto'
//     }}
//     noValidate
//     autoComplete="off"
//   >
//     <TextField id="outlined-basic" label="Enter your email" variant="outlined" name='email' value={formData.email} onChange={handleInputChange}/>
//     <TextField id="outlined-basic" label="Enter your password" variant="outlined" name='password' value={formData.password} onChange={handleInputChange}/>

//     <Stack spacing={2} direction="row">
//       <Button variant="contained" onClick={handleLogin} >Log In</Button>
//     </Stack>
//     <Link to="/signup">Already have an account?</Link>   
//   </Box>


<Box
component="form"
sx={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    margin: 'auto',
    padding: '20px',
    backgroundColor: '#f3f3f3',
    borderRadius: '8px',
    marginTop:  '100px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
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
<Button variant="contained" onClick={handleLogin} sx={{ width: '25%', backgroundColor: '#0AE4B3', color: '#fff' }}>
    Log In
</Button>
<Link to="/signup" sx={{ marginTop: 2, color: '#ff5722', textDecoration: 'none', fontWeight: 'bold' }}>
    Don't have an account? Sign Up
</Link>
</Box>


  )
}

export default SignIn



