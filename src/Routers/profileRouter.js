const express=require("express")
const profileRouter=express.Router();
const AuthorizationMiddleWare=require("../../middlewares/AdminAuthorizationFile")
const User=require("../models/User")


profileRouter.get("/getprofile",AuthorizationMiddleWare,async (req,res)=>{
    try{

        const user=req.user;

         res.send(user)

    }
    catch(err)
    {
        res.send(err.message)
    }
    
})

profileRouter.patch("/getprofile/edit",AuthorizationMiddleWare,async (req,res)=>{
 try{
     const {name,gender}=req.body;
    const userId=req.user._id;

    const updates={};

    if(name.length<4 || name.length>50)
        throw new Error("Enter Valid Name")

    updates.name=name;

    if(gender) updates.gender=gender;

    const updateUser= await User.findByIdAndUpdate(userId,{$set:updates},{new:true})
   

    if(!updateUser)
    {
        res.send("Update Unsuccesgul")
    }
    else
        res.send(updateUser)


 }
 catch(err)
 {
    res.send(err.message)
 }
   
    
})

module.exports=profileRouter;