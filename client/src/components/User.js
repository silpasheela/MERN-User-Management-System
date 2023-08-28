import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, Avatar, Typography, Button, Box, Input } from '@mui/material';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import axios from 'axios';


function User() {

    const [userData,setUserData] = useState({
        name:'',
        email:'',
        profileImage:''
    });

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const [editedUser,setEditedUser] = useState(null);

    const [editedProfileImage, setEditedProfileImage] = useState(null);

    const handleProfileImageChange = (e) => {
        const imageFile = e.target.files[0];
        setEditedProfileImage(imageFile);
      };

    useEffect(() => {
        axios.get('http://localhost:4000/user').then((response) => {
            const {name, email, profileImage} = response.data.user;
            console.log(response.data.user)
            setUserData({
                name:name,
                email:email,
                profileImage:profileImage
            });
            setEditedUser(response.data.user);
        })

        .catch((error) => console.error('Error in fetching user data:', error));
    },[])




    const handleEditUser = async (e) => {
        e.preventDefault();
        console.log(editedUser)
        try {
            const formData = new FormData();
            formData.append('name', editedUser.name);
            formData.append('email', editedUser.email);
            formData.append('profileImage', editedProfileImage);
            console.log("hey",editedUser)
            const response = await axios.patch(`http://localhost:4000/update/${editedUser._id}`, formData);

            console.log(response.data);

            setUserData(response.data.user); 
            setEditedUser(response.data.user);
            handleToggleEditUserModal();
        } 
        
        catch (error) {
        console.error(error);
        }
    };

    const handleToggleEditUserModal = () => {
        console.log("hello")
        console.log('isEditModalOpen:', isEditModalOpen);
        setIsEditModalOpen(!isEditModalOpen);
        console.log('isEditModalOpen:', isEditModalOpen);
    };

    // if (!userData.name) {
    //     return <div>Loading...</div>;
    //   }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card
          sx={{
          maxWidth: 345,
          margin: 'auto',
          marginTop: 20,
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          borderRadius: '10px',
          backgroundColor: '#CBEACA',
        }}>
        <CardHeader
          avatar={<Avatar alt={userData.name} src={userData.profileImage} sx={{ width: 150, height: 150 }} />}
          title={userData.name}
          subheader={userData.email}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleToggleEditUserModal}
          >
            Edit Profile
          </Button>
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/userhome" 
            style={{ marginLeft: '10px' }}
          >
            Go to Home
          </Button>
        </CardContent>
      </Card>
        {/* {console.log('isEditModalOpen:', isEditModalOpen)} */}
      <Modal open={isEditModalOpen} onClose={handleToggleEditUserModal}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
          <h2>Edit User</h2>
          {console.log("hi",editedUser)}
          {editedUser && (
            <div>
              <TextField
                label="Name"
                value={editedUser.name}
                onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Email"
                value={editedUser.email}
                onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                fullWidth
                margin="normal"
              />
              <Input
                type="file"
                accept="image/*"
                onChange={handleProfileImageChange}
                sx={{ marginBottom: 2, width: '75%' }}
              />
              {console.log(editedUser)}
              <Button variant="contained" color="primary" onClick={handleEditUser} sx={{ marginTop: 2, marginRight: 15 }}>Save</Button>
            </div>
          )}
        </div>
      </Modal>

    </Box>
  )
}

export default User
