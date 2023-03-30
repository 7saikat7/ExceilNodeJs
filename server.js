const express=require('express');

const app=express();
const dotenv=require('dotenv').config()
const port= process.env.port||5000;
const errorHandler=require("./middleware/errorHandler")
const db= require('./config/dbConnections')


app.use(express.json());
app.use('/api/contacts', require('./routes/contactRoutes')); 
app.use('/api/users', require('./routes/usersRoutes'));   //adding middlewere in the code 
app.use(errorHandler)

app.listen(port,()=>{
 db.connect();
 console.log(`Running server succesfully on port ${port}!`)
});
