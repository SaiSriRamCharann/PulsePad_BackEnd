const validator=require("validator")
const Validation=(req)=>{

    const {name,email,password,gender}=req.body;

    if(name.length>50 || name.length<4)
    {
        throw new Error("Name is not Valid");
    }
    else if(!validator.isStrongPassword(password))
    {
        throw new Error("enter strong Password ");
    }
    else if(!validator.isEmail(email))
    {
         throw new Error("email is not Valid");
    }

}

module.exports=Validation;