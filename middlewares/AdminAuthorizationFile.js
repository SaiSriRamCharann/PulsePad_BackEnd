const jwt=require("jsonwebtoken")
const User=require("../src/models/User.js")
const AdminAuthorization=async (req,res,next)=>
 {

  try
  { 
    const {token}=req.cookies;
    if(!token)
    {
        throw new Error("Token is invalid.........")
    }
    const isVerifyUser=jwt.verify(token,"GlobalStar@123")
    const {_id}=isVerifyUser

    const user=await User.findById(_id)
    if(!user)
    {
        throw new Error("not a Verified User Please login again")
    }
    req.user=user;
    next();
    
   }
    catch(err)
    {
        res.send(err.message)

    }

   
    
    
 }

 module.exports=AdminAuthorization;


 