const asyncHandler= require('express-async-handler');
const User=require('../modles/userModle')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
//@User auth at /users/login----/users/register---/users/current
//@public 

const registerUser = asyncHandler(async(req,res)=>{
    const {username,email,password}=req.body
    if(!username ||!email ||!password){
        res.status(400);
        console.log("Fill all the data")
        throw new Error("All Fields Are Mandetory")
    }
    const userAvailable=await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("User Already Exist ");
    }
    const hashedPassword=await bcrypt.hash(password,10);
    const createUser=await User.create({
        username,
        email,
        password:hashedPassword
    });
    console.log(`user Created ${createUser}`)
    console.log(hashedPassword)
    if(createUser){
        res.status(201).json({_id:createUser.id,email:createUser.email})
    }
    
});

const loginUser = asyncHandler(async(req,res)=>{
    const {email,password}=req.body;
    if(!email ||!password){
        res.status(400)
        throw new Error("All Fields Are Mandetory");
    }
    else{
        const user=await User.findOne({email});
        if(user && (await bcrypt.compare(password,user.password))){
            const accessToken=jwt.sign({
                user:{
                username:user.username,
                email:user.email,
                id:user.id,
                }
            },process.env.SECRET_ACCESS_TOKEN,{expiresIn:"5m"}
            )
            res.json({accessToken})
        }
        else{
            res.status(401)
            throw new Error("Wornf password or not user !")
        }
    }
    res.status(200).json("Succesfully Done !")
});

const currentUser = asyncHandler(async(req,res)=>{
    res.status(200).json("Succesfully Done !")
});

module.exports={registerUser,loginUser,currentUser}