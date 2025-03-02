// const exp=require('express')
// const adminApp=exp.Router();
// //API
// adminApp.get("/",(req,res)=>{
//     res.send({message:"from admin api"})
// })


// module.exports=adminApp;


const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const Admin = require("../models/adminModel");
const UserAuthor = require("../models/userAuthorModel");
const Article = require("../models/articleModel");

const adminApp = express.Router();

// Get all users & authors
adminApp.get("/users-authors", expressAsyncHandler(async (req, res) => {
    const users = await UserAuthor.find();
    res.status(200).send({ message: "Users & Authors List", payload: users });
}));

// Enable/Disable User or Author
adminApp.put("/toggle-user/:id", expressAsyncHandler(async (req, res) => {
    const user = await UserAuthor.findById(req.params.id);
    if (!user) return res.status(404).send({ message: "User not found" });

    user.isActive = !user.isActive;
    await user.save();
    
    res.status(200).send({ message: `User ${user.isActive ? "Enabled" : "Blocked"}` });
}));

// Get all articles
adminApp.get("/articles", expressAsyncHandler(async (req, res) => {
    const articles = await Article.find();
    res.status(200).send({ message: "Articles List", payload: articles });
}));

// Block/Unblock Article
adminApp.put("/toggle-article/:articleId", expressAsyncHandler(async (req, res) => {
    const article = await Article.findOne({ articleId: req.params.articleId });
    if (!article) return res.status(404).send({ message: "Article not found" });

    article.isArticleActive = !article.isArticleActive;
    await article.save();
    
    res.status(200).send({ message: `Article ${article.isArticleActive ? "Unblocked" : "Blocked"}` });
}));

module.exports = adminApp;
