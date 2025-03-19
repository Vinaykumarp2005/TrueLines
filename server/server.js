const exp=require("express")
const app=exp();
require('dotenv').config();
const mongoose=require("mongoose");
const userApp=require("./APIs/userApi");
const authorApp=require("./APIs/authorApi");
const adminApp=require("./APIs/adminApi");
const cors=require('cors')
app.use(cors())
const port =process.env.PORT||4000;
const frontendurl="https://truelines-frontend.onrender.com/"
//db connection
mongoose.connect(process.env.DBURL)
.then(()=>{app.listen(frontendurl,()=>console.log(`server listening on port ${port} ..`))
    console.log("DB connection success")
})
.catch(err=>console.log("Err in DB connecion ",err))
app.use(exp.json())
//connect API routes
app.use('/user-api',userApp)
app.use('/author-api',authorApp)
app.use('/admin-api',adminApp)

//error handler
app.use((err,req,res,next)=>{
    console.log("err object in express error handler :",err)
    res.send({message:err.messsage})
})
