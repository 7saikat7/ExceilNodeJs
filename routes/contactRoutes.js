const express=require('express');
const router=express.Router();
const {getContacts,createContacts,updateContacts,deleteContacts}=require('../controller/contactControllers')

router.route("/:id").get(getContacts);

router.route("/:id").put(updateContacts);

router.route("/").post(createContacts);

router.route("/:id").delete(deleteContacts);

module.exports=router