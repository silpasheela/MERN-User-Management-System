const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware')
const userController = require('../controllers/userController');

router.post('/signup',userController.signUp);
router.post('/login',userController.login);
router.get('/user',auth.verifyToken, userController.userHome);
router.patch('/update',auth.verifyToken, userController.updateProfile);
router.get('/logout', userController.logout);

module.exports = router;