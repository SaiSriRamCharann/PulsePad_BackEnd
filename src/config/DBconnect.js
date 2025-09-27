const mongoose= require("mongoose")

const DBconnect=async()=>{
    await mongoose.connect("mongodb+srv://ramnaidu_db_user:qcQYQnszvYfGoYGg@projectcluster.ztjia9f.mongodb.net/PulsePad");
    
}

module.exports=DBconnect;
