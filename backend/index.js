// const express= require("express")

// const PORT=process.env.PORT||3000
// const app=express()
// app.listen(PORT,async()=>{
//     try {
//         console.log("connecting Db");
//         console.log("server running on port 3000")
//     } catch (error) {
//      console.log(err)   
//     }
// })




const express= require("express")
const cors =require("cors")
const connection= require("./config/db")
const {userRouter}= require("./routes/user.route")
const {postRouter}= require("./routes/post.route")
const {auth}=require("./middleware/auth.middleware")
require("dotenv").config()
const app=express()

app.use(express.json()) 
app.use(cors())
app.use("/users",userRouter)
app.use("/posts",auth,postRouter)
const PORT=process.env.PORT||3000

app.listen(PORT,async()=>{
    try {
        await connection
        console.log("connecting Db");
        console.log("server running on port 3000")
    } catch (error) {
     console.log(error)   
    }
 })