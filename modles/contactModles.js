const mongoose=require("mongoose");

const contactSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Add The Contact Now !"],
    },
    email:{
        type:String,
        required:[true,"Add email "],
    },
    phone:{
        type:String,
        required:[true,"Please add your phone number! "]
    }
},
{
    timestamps:true,
});

module.exports=mongoose.model("DbContacts",contactSchema);
