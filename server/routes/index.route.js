const express = require("express");

const router= express.Router();

const {registerUser} = require('../controller/registerUser.controller');
const { checkEmail } = require("../controller/checkEmail.controller");
const { checkPassword } = require("../controller/checkPassword.controller");
const userDetails = require("../controller/userDetails.controller");
const logout = require("../controller/logout.controller");
const updateUserDetails = require("../controller/updateUserDetails.controller");

router.post('/register', registerUser);
router.post('/email', checkEmail);
router.post('/password', checkPassword);
router.get('/userDetails', userDetails);
router.post('/logout', logout);
router.post('/updateUser', updateUserDetails);


module.exports = router;