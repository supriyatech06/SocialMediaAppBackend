const {Router}=require("express")
const bcrypt=require("bcrypt")

const jwt= require("jsonwebtoken");

const {UserModel}= require("../model/user.model")
// const { UserModel } = require("../model/user.model");
require("dotenv").config();

////
////


const userRoute=Router();

userRoute.post("/register",async(req,res)=>{
    try {
        const email=req.body.email;

        const user =await UserModel.findOne({email})


        if(user){
            res.status(400).json({msg:"User Already Registered"});

        }
        else{
            bcrypt.hash(req.body.password ,8, async(error,hash)=>{
                if(hash){
                    const newUser= new UserModel({
                        ...req.body,
                        password:hash,
                    })

                    await newUser.save();

                    res.status(200).json({msg:"New User Registered"})
                }
            })
        }
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})



userRoute.post("/login",async(req,res)=>{
    try {
        const {email,password}=req.body;


        const user =await UserModel.findOne({email})


        if(user){
            bcrypt.compare(password,user.password,(err,res)=>{
                if(res){
                    let token= jwt.sign({userID:user._id},process.env.SECRET)
                
                    res.status(200).json({msg:"User Logged In",token})
                
                }
                else{
                    res.status(400).json({msg:"Incorrect Password"})
                }
               
            })

        }
       
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})


module.exports={userRoute}