const mongoose=require("mongoose")
const validator=require("validator")
const Encrypt=require("bcryptjs")

const UserSchema=new mongoose.Schema(
    {
        "name":{type:String,
            required:true},
        "email":{type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
            immutable: true,
            validate(value)
            {
                if(!validator.isEmail(value))
                {
                    throw new Error("Not Valid Email")
                }

            }
        },
        "password":{type:String,required:true},
        "gender":{type:String,required:true, 
                enum:{
                    values:["male","female","others"],
                    message:`{VALUE} is not correct`
                }
    },
},{timestamps:true},
    
)
UserSchema.methods.ValidatePassword=async function(Inputpassword) {

    const passwordHash=this.password
    const isValidPassword=await Encrypt.compare(Inputpassword,passwordHash);
    return isValidPassword;
    
}

const User=mongoose.model('User',UserSchema)



module.exports= User;