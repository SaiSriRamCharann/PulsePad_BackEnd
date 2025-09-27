const express=require("express")
const Jurnol=require("../models/Jurnol")
const jurnolRouter=express.Router();
const AuthorizationMiddleWare=require("../../middlewares/AdminAuthorizationFile");
const mongoose=require("mongoose")

jurnolRouter.post("/writejurnol",AuthorizationMiddleWare,async (req,res)=>{
    try{
     const { description, discipline, dayWeight, supplements, dayWorkouts } = req.body;
     const jurnol=new Jurnol({ user:req.user._id, description, discipline, dayWeight, supplements, dayWorkouts });
     await jurnol.save();
     res.send(jurnol)
    }
    catch(err)
    {
        res.send(err.message);
    }
})

jurnolRouter.get("/getjurnol",AuthorizationMiddleWare,async (req,res)=>{
    try{
        const jurnols=await Jurnol.find({user:req.user._id});
        res.send(jurnols)
    }
    catch(err)
    {
        res.send(err.message);
    }
})

jurnolRouter.patch("/:id",AuthorizationMiddleWare, async (req,res)=>{
    try{

        const{id}=req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ error: "Invalid journal ID" });
        }
        const updateJurnol=await Jurnol.findOneAndUpdate({ _id:id, user: req.user._id },req.body,{new:true})
        res.send(updateJurnol)
    }
    catch(err)
    {
        res.send(err.message)
    }
})


jurnolRouter.delete("/:id",AuthorizationMiddleWare,async(req,res)=>{
    try{
        const{id}=req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
         return res.status(400).send({ error: "Invalid journal ID" });
       }
        
        const deletedJurnol=await Jurnol.findOneAndDelete({ _id: id, user: req.user._id });
        if (!deletedJurnol) {
          return res.status(404).send({ error: "Journal not found or you are not authorized" });
    }
        res.send("deleted jurnol")
    }
    catch(err)
    {
        res.send(err.message)
    }
})

module.exports=jurnolRouter;