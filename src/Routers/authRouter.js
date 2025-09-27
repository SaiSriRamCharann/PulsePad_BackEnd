const express=require("express")
const User=require("../models/User")
const jwt=require("jsonwebtoken")
const Encrypt=require("bcryptjs")

const authRouter=express.Router();
const validateFun=require("../utils/validation")



authRouter.post("/signup",async (req,res)=>{

    try{
        validateFun(req);
       const { name, email, password, gender } = req.body;
        const hashPass=await Encrypt.hash(password,12)
        const userObj=new User({
            name,password:hashPass,gender,email
        });
        console.log(hashPass)

    await userObj.save();
    res.send("SuccesFull")
   }
   catch(err)
   {
     res.send(err.message)
   }

    
})


authRouter.post("/login",async(req,res)=>{

    try{

         const {password,email}=req.body;
         const user=await User.findOne({email:email})
         if(!user)
         {
            throw new Error("Inavalid Credentials")
         }
        

         const isStrongPasswordvalid=await user.ValidatePassword(password)
          if(!isStrongPasswordvalid)
         {
            throw new Error("Inavalid Credentials")
         }
          else{

            const JWTtoken=jwt.sign({_id:user._id},"GlobalStar@123")

            res.cookie("token",JWTtoken)

            res.send({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    gender: user.gender
                });
         }

    }

    catch(err)
    {
        res.send(err.message)
    }

   

})


authRouter.post("/logout",async(req,res)=>{
    res.clearCookie("token");
    res.send("SuccesFully LoggedOut")
})
module.exports=authRouter;
