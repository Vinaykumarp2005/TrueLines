const exp=require('express')
const authorApp=exp.Router();
const expressAsyncHandler=require("express-async-handler")
const createUserOrAuthor=require("./createUserOrAuthor")
const Article=require("../models/articleModel")
const {requireAuth,clerkMiddleware}=require("@clerk/express")
require('dotenv').config()

// authorApp.use(clerkMiddleware())

//API
// authorApp.get("/",(req,res)=>{
//     res.send({message:"from author api"})
// })


authorApp.post("/author",expressAsyncHandler(createUserOrAuthor))
//create new app
authorApp.post("/article",expressAsyncHandler(async(req,res)=>{
    const newArticleObj=req.body;
    const newArticle=new Article(newArticleObj);
    const articleObj=await newArticle.save();
    res.status(201).send({message:"article published",payload:articleObj})
}))

//read all articles
authorApp.get('/articles',requireAuth({signInUrl:"unauthorized"}),expressAsyncHandler(async(req,res)=>{
    const listOfArticles= await Article.find({isArticleActive:true});
    res.status(200).send({message:"articles",payload:listOfArticles})
}))

authorApp.get('/unauthorized',(req,res) =>{
    res.send({message:"Unauthorized request "})
}
)

//modify
authorApp.put('/article/:articleId',requireAuth({signInUrl:"unauthorized"}),expressAsyncHandler(async(req,res)=>{
    
    //get modified article
    const modifiedArticle=req.body;
    //update aticle by article ID
    const latestArticle=await Article.findByIdAndUpdate(modifiedArticle._id,{...modifiedArticle},{returnOriginal:false})
    res.status(200).send({message:"article modified",payload:latestArticle})


}))

//soft delete
authorApp.put('/articles/:articleId',expressAsyncHandler(async(req,res)=>{
    
    //get modified article
    const modifiedArticle=req.body;
    //update aticle by article ID
    const latestArticle=await Article.findByIdAndUpdate(modifiedArticle._id,{...modifiedArticle},{returnOriginal:false})
    res.status(200).send({message:"article deleted or restore",payload:latestArticle})


}))

module.exports=authorApp;