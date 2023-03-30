const asyncHandler=require('express-async-handler');
const jwt=require('jsonwebtoken');
const { model } = require('mongoose');

const validateToken = asyncHandler(async (req,res,next) =>{
 let token;
 let authoerizerHead= req.headers.Authorization || req.headers.authorization 
 if(authoerizerHead && authoerizerHead.startsWith("Bearer")){
  token=authoerizerHead.split(" ")[1];
  console.log(token)
  jwt.verify(token,process.env.SECRET_ACCESS_TOKEN, (err,decode)=>{
    if(err){
        res.status(401)
        console.log("Not able to validate ")
        throw new Error("Token Is Not Valid !")
    }
    res.json({"user":decode.user})
  })
 }
});

module.exports= validateToken;