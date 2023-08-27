const bcrypt = require('bcrypt');
const User = require('../models/userModel')
const jwt = require('jsonwebtoken');

const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: 'dmho1xzge',
    api_key:"823174675493399",
    api_secret:"QatdjHHLj-4VapxJ3jBwZaXZkuo-NNfeLVKd8U_C0"
})


//USER REGISTRATION

const signUp = async (req,res) => {
    
    const {name,email,password,confirmPassword} = req.body;
    if(!(name && email && password && confirmPassword)) {
        return res.status(400).json({
            message: 'Please fill out the required fields !'
        })
    }
    try {
        if(password!=confirmPassword) {
            return res.status(400).json({
                message: 'Password doesnot match !'
            })
        }
        const existingUser = await User.find({email:email});
        if(existingUser.length != 0) {
            return res.status(400).json({
                message: 'User already exists !'
            })
        }

        else{
            const securedPassword = await bcrypt.hash(password,10);
            const user = await User.create({
                name,
                email,
                password: securedPassword,
                profileImage: null
            })
            const responseData = {
                name: user.name,
                email: user.email
            }

            res.status(200).json({
                user: responseData,
                message: 'User Registration Successful'
            })
        }
    } catch (error) {
        console.log(error);
    }
}

//USER LOGIN

const login = async (req,res) => {
    
    const {email,password} = req.body;
    if(!(email,password)) {
        return res.status(400).json({
            message: 'Please fill out the required fields !'
        })
    }
    try {
        const user = await User.find({email:email});
        if(user.length != 0) {
            const isPasswordMatch = await bcrypt.compare(password,user[0].password) //checks the matching of entered password and password retrived from db
            if(isPasswordMatch) {
                
                const token = await jwt.sign(
                    {user_id : user[0]._id, email : email},
                    'secret',
                    {expiresIn : "2h"}
                );

                user[0].token = token;
                user[0].password = undefined;

                const cookieOptions = {
                    expires : new Date(Date.now() + 2*24*60*60*1000),
                    httpOnly: true
                }

                return res.status(200).cookie('token',token,cookieOptions).json({
                    success : true,
                    user: user[0],
                    message: 'Login Successful'
                });
            }

            else {
                return res.status(400).json({
                    message: 'Incorrect Password !'
                })
            }
        }
        else {
            return res.status(404).json({
                message: 'User not found !'
            });
        }
    }

    catch(error) {
        console.log("Error in Login", error);
    }
}

//USER HOME PAGE

const userHome = async (req,res) => {

    const user = await User.findOne({_id:req.userId});
    user.password = undefined;

    res.status(200).json({
        user: user,
        message: 'Welcome to the user dashboard'
    })
}

//UPDATE USER PROFILE

const updateProfile = async(req,res) => {

    const {id} = req.params;

    try {
        const user = await User.find({_id:id});
        console.log(user);
        if (user.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        let result;

        if(req.files) {
            // result = await cloudinary.uploader.upload(req.files.profilePic.tempFilePath , {folder: 'users'});
            // console.log(result.secure_url);
            try {
                result = await cloudinary.uploader.upload(req.files.profilePic.tempFilePath, { folder: 'users' });
            } catch (error) {
                console.error(error);
                return res.status(500).json({ message: 'Error uploading file' });
            }
        }

        user[0].profileImage = result.secure_url;
        // await user[0].save()

        try {
            await user[0].save();
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error updating user data' });
        }

        console.log(user[0]);

        res.status(200).json({
            message: 'Updation Successful',
            user: user
        })
    } catch (error) {
        console.log(error)
    }
}



//USER LOGOUT

const logout = async (req,res) => {

    res.cookie('token',null, {
        expires: new Date(Date.now()),
        httpOnly : true
    })
    res.status(200).json({
        success: true,
        message: 'Logout Successful'
    })
}


module.exports = {
    signUp,
    login,
    userHome,
    updateProfile,
    logout
}