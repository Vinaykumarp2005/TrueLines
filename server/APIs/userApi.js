const exp=require('express')
const userApp=exp.Router();
const Article=require("../models/articleModel")
const UserAuthor=require("../models/userAuthorModel");
const expressAsyncHandler=require("express-async-handler");

const createUserOrAuthor=require("./createUserOrAuthor")
//API
//create new user
userApp.post("/user",expressAsyncHandler(createUserOrAuthor))

//add comment
userApp.put("/comment/:articleId",expressAsyncHandler(async(req,res)=>{
    
    const commentObj=req.body;
    //add commnet object to comments array of article
    const articleWithComments=await Article.findOneAndUpdate(
        {articleId:req.params.articleId},
        {$push:{comments:commentObj}},
        {returnOriginal:false})
        //send res
        res.send({message:"comnentss added",payload:articleWithComments})

}))


module.exports=userApp;