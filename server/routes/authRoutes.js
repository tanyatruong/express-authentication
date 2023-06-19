const express = require('express');
const router = express.Router();
const userController = require('../controllers/authController');

// GET route to handle user login
router.get('/', userController.getLoginPage);

// POST route to handle user login
router.post('/', userController.postLoginPage);

/* Get Route for displaying the Register Page */
router.get('/register', userController.getRegisterPage);

/* Get Route for processing the Register Page */
router.post('/register', userController.postRegisterPage);

/* Get to perform UserLogout */
router.get('/logout', userController.getLogout);



module.exports = router;
