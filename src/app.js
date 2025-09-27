const express=require("express");
const DBconnect=require("./config/DBconnect")
const cors=require("cors")
const app=express();
const jurnolRouter=require("./Routers/jurnolRouter")
const cookieParser=require("cookie-parser")
app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:1234",
    credentials:true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], 
    allowedHeaders: ["Content-Type", "Authorization"], 
}));

const authRouter=require("./Routers/authRouter")
const profileRouter=require("./Routers/profileRouter")
app.use("/auth",authRouter)
app.use("/profile",profileRouter)
app.use("/jurnols",jurnolRouter)
DBconnect().then(()=>{
    console.log("DataBase Established Succesfully");
    app.listen(7777,()=>{
        console.log("Port 7777 is listening")
    });

}).catch(err=>{
    console.log("something Went Wrong");
});





