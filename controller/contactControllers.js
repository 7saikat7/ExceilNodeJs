const asyncHandler= require('express-async-handler');
const { default: mongoose } = require('mongoose');
const ContactDbModel = require('../modles/contactModles')
//@get all contacts 
//@endpoint /api/contacts
//@public 
const getContacts= asyncHandler(async (req,res)=>{
    // res.send("got it !")
    let contact = await ContactDbModel.findById(req.params.id);
    if(!contact){
        res.status(400)
        console.log("No Contacts Found !")
        //throw new Error("Contacts not found ")
        //contact=await ContactDbModel.find();
    }
    contact=await ContactDbModel.find();
    res.status(200).json(contact);
    return;
});

//@update some contacts 
//@endpoint /api/contactss
//@public 
const updateContacts = asyncHandler(async (req,res)=>{
    const checker=await ContactDbModel.findById(req.params.id)
    if(!checker){
        res.status(400)
        throw new Error(" Contacts Are Not Found ! ")
    }
    const updateContactSchema= await ContactDbModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );
    res.json(updateContactSchema);
});
//@create contacts 
//@endpoint /api/contacts
//@public 
const createContacts = asyncHandler (async (req,res)=>{
    console.log("The body of the request is",req.body)
    var {name,email,phone}=req.body
    if(!name || !email || !phone){
        res.status(400)
        throw new Error("All Fields Are Mandetory !")

    }
    const obj=await ContactDbModel.create({
        name,
        email,
        phone
    })
    res.status(201).json(obj)
    
});
//@delete all contacts 
//@endpoint /api/contacts
//@public 
const deleteContacts = asyncHandler(async (req,res)=>{
    const checker=await ContactDbModel.findById(req.params.id)
    if(!checker){
        res.status(400)
        throw new Error(" Contacts Are Not Found ! ")
    }
    await ContactDbModel.findByIdAndRemove(req.params.id);
   
    res.json({"message":checker})
});
module.exports={getContacts,updateContacts,createContacts,deleteContacts}