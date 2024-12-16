const express =require('express');
const { registerUser } = require('../controllers/UserController');


const router=express.Router();
router.route('/').post(registerUser);


module.exports=router;