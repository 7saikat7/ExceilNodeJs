const mongoose=require("mongoose");

const userSchema= mongoose.Schema({
    username:{
        type:String,
        required:[true,'Please Enter Username']
    },
    email:{
        type:String,
        required:[true,"Please Enter Email"],
        unique:[true,"Email Must Be Qunique"]
    },
    password:{
        type:String,
        required:[true]
    }

});

module.exports=mongoose.model("UserModle",userSchema)