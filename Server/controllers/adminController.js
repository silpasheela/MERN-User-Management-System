const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel')


//ADMIN DASHBOARD WITH USERS DATA

const adminDashboard = async (req,res) => {
    
    try {
        const users = await User.find({role: {$ne: 'admin'}});
        return res.status(200).json({
            users,
            message: 'User Details'
        })
    } catch (error) {
        res.status(400).json({
            message: 'No users found !'
        })
    }
}

//EDIT USER BY ADMIN

const editUser = async (req,res) => {
    const {id} = req.params;
    const {user} = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(id,user,{
            new:true
        });
        res.status(200).json({
            message: 'User details updated successfully',
            user: updatedUser
        })
    } catch (error) {
        res.status(400).json({
            message: 'Bad request'
        })
    }
}

//SEARCH USER BY ADMIN

const searchUser = async (req,res) => {

    const {searchData} = req.body;
    try {
        const users = await User.find({email: new RegExp(searchData,'i')});
        res.status(200).json({
            users
        })
    } catch (error) {
        res.status(400).json({
            message: 'Bad request'
        })
    }
}

//DELETE USER BY ADMIN

const deleteUser = async (req,res) => {
    const {id}= req.params;
    try {
        await User.findByIdAndDelete({_id:id});
        res.status(200).json({
            message:'User deleted Successfully!'
        });
    } catch (error) {
        res.status(404).json({
            message: 'Bad Request'
        })
    }
}

module.exports = {
    adminDashboard,
    editUser,
    searchUser,
    deleteUser
}