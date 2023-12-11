const jwt =require("jsonwebtoken")

require("dotenv").config();
const {BlacklistModel}= require("../model/blacklist.model")
const auth =async(req,res,next)=>{
    const token=req.headers.authorization.split("")[1];

    try{
        let existingToken =await BlacklistModel.find({
            blacklist:{$in:token},
        })

        if(existingToken){
            res.statur(400).json("please login");
        }
        else{
            const decoded= jwt.verify(token,process.env.SECRET);
            req.body.userID=decoded.userID;
            next()
        }
    }
catch(err){
res.status(400).json({err:err.message})
}
}

module.exports={auth}