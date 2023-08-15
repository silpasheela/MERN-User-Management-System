const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController')
const auth = require('../middleware/authMiddleware')


router.get('/dashboard',auth.verifyToken,auth.isAdmin,adminController.adminDashboard);
router.put('/user/:id',auth.verifyToken,auth.isAdmin,adminController.editUser);
router.post('/user/search',auth.verifyToken,auth.isAdmin,adminController.searchUser);
router.delete('/user/:id',auth.verifyToken,auth.isAdmin,adminController.deleteUser);

module.exports = router;