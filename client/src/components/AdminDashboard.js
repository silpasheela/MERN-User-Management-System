import React, {useEffect, useState} from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUsers, editUsers, getUsers, searchUsers } from '../app/features/Admin/adminSlice';

function AdminDashboard() {

    const dispatch = useDispatch();
    const users = useSelector(state => state.admin.users);

    const [editedUser,setEditedUser] = useState(null);
    const [isModalOpen,setIsModalOpen] = useState(false);


    const [formData,setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [addUserModalOpen,setAddUserModalOpen] = useState(false);


    useEffect(() => {
        dispatch(getUsers());
      }, [dispatch]);


      //HANDLE DELETE OPERATION

      const handleDelete = (id) => {
        dispatch(deleteUsers(id)).then(() => {
            dispatch(getUsers());
        })    
      }

      //HANDLE EDIT OPERATION

      const handleEdit = (user) => {
        setEditedUser(user);
        setIsModalOpen(true);
      }

      const handleEditSave = () => {
        if(editedUser) {
            dispatch(editUsers({user: editedUser, editId: editedUser._id})).then(()=> {
                dispatch(getUsers());
                setIsModalOpen(false);
                setEditedUser(null);
            })
        }
      }

      //HANDLE SEARCH OPERATION

      const handleSearch = (text) => {
        dispatch(searchUsers(text));
      }


      //HANDLE ADD USER OPERATION


        const handleAddUser = async (e) => {
            e.preventDefault();
            console.log(formData)
            try {
            const response = await axios.post('http://localhost:4000/admin/adduser', formData);
            console.log(response.data);
            handleToggleAddUserModal();
            dispatch(getUsers())
            } catch (error) {
            console.error(error);
            }
        };

        const handleToggleAddUserModal = () => {
            setAddUserModalOpen(!addUserModalOpen);
        };

      const tableContainerStyle = {
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        margin: '20px auto',
        width: '90%',
      };
    
      const tableHeaderCellStyle = {
        fontWeight: 'bold',
        backgroundColor: '#000000',
        color: 'white',
      };
    
      const tableCellStyle = {
        border: '1px solid rgba(0, 0, 0, 0.1)',
        backgroundColor: '#FDFDFD',
      };
    
      const buttonStyle = {
        margin: '0 10px 0 0', // Add margin to create space between buttons
      };

      const searchStyle = {
        display: 'flex',
        justifyContent:'left',
        marginTop: '50px',
        marginLeft: '80px',
        marginRight: '80px',
        // eslint-disable-next-line no-dupe-keys
        justifyContent: 'space-between',
      }
    

  return (
    
    <div style={{ textAlign: 'center' }}>
        <div style={searchStyle}>
            <form>
                <TextField label="Search here" id="fullWidth" onChange={(e) => {
                handleSearch(e.target.value)
                }}/>
            </form>
            <Button variant="contained" color="primary" style={{ marginLeft: '10px' }} onClick={handleToggleAddUserModal}>
            Add User
            </Button>
        </div>
        <TableContainer component={Paper} style={tableContainerStyle}>
        <Table style={{ minWidth: '650px' }} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell style={tableHeaderCellStyle} align="center">User Id</TableCell>
                <TableCell align="center" style={tableHeaderCellStyle}>
                User Name
                </TableCell>
                <TableCell align="center" style={tableHeaderCellStyle}>
                Email
                </TableCell>
                <TableCell align="center" style={tableHeaderCellStyle}>
                Actions
                </TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {users.map((user) => (
                <TableRow key={user._id} style={tableCellStyle}>
                <TableCell component="th" scope="row" align="center">
                    {user._id}
                </TableCell>
                <TableCell align="center">{user.name}</TableCell>
                <TableCell align="center">{user.email}</TableCell>
                <TableCell align="center">
                    <Button variant="contained" color="success" style={buttonStyle} onClick={() => {handleEdit(user)}}>
                    Edit
                    </Button>
                    <Button variant="contained" color="error" onClick={()=> {handleDelete(user._id)}}>
                    Delete
                    </Button>
                </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>

        <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
          <h2>Edit User</h2>
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
              <Button variant="contained" color="primary" onClick={handleEditSave}>Save</Button>
            </div>
          )}
        </div>
        </Modal>

        <Modal open={addUserModalOpen} onClose={handleToggleAddUserModal}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '100px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
          <h2>Add User</h2>
          {(
            <div>
              <TextField           
                id="outlined-basic"
                label="Enter the Name"
                variant="outlined"
                name="name"
                value={formData.name}
                onChange={(e)=>setFormData({...formData,name:e.target.value})}
                sx={{ marginBottom: 2, width: '75%' }}
              />
              <TextField
                id="outlined-basic"
                label="Enter the email"
                variant="outlined"
                name="email"
                value={formData.email}
                onChange={(e)=>setFormData({...formData,email:e.target.value})}
                sx={{ marginBottom: 2, width: '75%' }}
              />
            <TextField
                id="outlined-basic"
                label="Enter the password"
                variant="outlined"
                type="password"
                name="password"
                value={formData.password}
                onChange={(e)=>setFormData({...formData,password:e.target.value})}
                sx={{ marginBottom: 2, width: '75%' }}
            />
            <TextField
                id="outlined-basic"
                label="Re-enter the password"
                variant="outlined"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={(e)=>setFormData({...formData,confirmPassword:e.target.value})}
                sx={{ marginBottom: 2, width: '75%' }}
            />
              <Button variant="contained" color="primary" onClick={handleAddUser} sx={{ marginTop: 2, marginRight: 15 }}>Save</Button>
            </div>
          )}
        </div>
        </Modal>
        <div>
        <Button
            variant="outlined"
            color="primary"
            component={Link}
            to="/userhome" 
            style={{ marginTop: '20px' }}
        >
            Go to Home
        </Button>
    </div>
  </div>


  )
}

export default AdminDashboard