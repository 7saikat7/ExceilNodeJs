const express=require('express');
const router=express.Router();
const {registerUser,loginUser,currentUser}=require('../controller/userController')
const validateToken=require('../middleware/validateTokenHandler')


router.post("/register",registerUser);
router.get("/current",validateToken,currentUser);
router.post("/login",loginUser);

module.exports = router