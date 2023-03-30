var {constants}=require('./constants')

const errorHandler= (err,req,res,next) =>{
 const statusCode = res.statusCode? res.statusCode:500;
 switch (statusCode) {
    case constants.VALIDATION_ERROR:
        res.json({
         title:"Validation Error",
         message:err.message,
         stackTrace:err.stack
        })
        break;
    case constants.NOT_FOUND:
        res.json({
            title:"Resources Not Found ",
            message:err.message,
            stackTrace:err.stack
           })
        break;
    default:
        break;
 }
 res.json({message:err.message,stackTeace:err.stack})
};

module.exports=errorHandler