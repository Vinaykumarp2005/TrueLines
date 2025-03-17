const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const Admin = require("../models/adminModel");
const UserAuthor = require("../models/userAuthorModel");
const Article = require("../models/articleModel");

const adminApp = express.Router();

// adminApp.post("/admin",expressAsyncHandler(createUserOrAuthor))
// 

// adminApp.post("/admin", expressAsyncHandler(async (req, res) => {
//     // const newAdmin= { firstName, lastName, email, profileImageUrl, role } = req.body;

//     try {

//         // Check if an Admin already exists with this email
//         const existingUser = await UserAuthor.findOne({ email:newAdmin.email });
//         if (existingUser) {
//             return res.status(400).json({ message: "This email is already registered as User/Author. Cannot register as Admin." });
//         }
//         let admin = await Admin.findOne({ email:newAdmin.email });

//         if (admin!==null) {
//             if (!admin.isActive) {
//                 return res.status(403).json({ message: "Your admin account is blocked. Contact support." });
//             }
//             return res.status(200).json({ message: "Admin already exists", payload: admin });
//         }

//         // ❌ If email is already a User or Author, prevent Admin registration
//         let existingUser = await UserAuthor.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ message: "This email is already registered as User/Author. Cannot be Admin." });
//         }

//         // ✅ Allow new Admin creation
//         admin = new Admin({ firstName, lastName, email, profileImageUrl, role });
//         await admin.save();

//         return res.status(201).json({ message: "Admin created successfully", payload: admin });
//     } catch (error) {
//         console.error("Error creating/fetching admin:", error);
//         return res.status(500).json({ message: "Internal Server Error" });
//     }
// }));

adminApp.post("/admin", expressAsyncHandler(async (req, res) => {
    const { firstName, lastName, email, profileImageUrl, role } = req.body;

    try {
        // ❌ Check if email is already registered as User/Author
        const existingUser = await UserAuthor.findOne({ email });
        if (existingUser) {
            return res.status(200).json({ message: "This email is already registered as User/Author. Cannot register as Admin." });
        }

        // Check if an Admin already exists with this email
        let admin = await Admin.findOne({ email });

        if (admin) {
            if (!admin.isActive) {
                return res.status(403).json({ message: "Your admin account is blocked. Contact support." });
            }
            return res.status(200).json({ message: "Admin already exists", payload: admin });
        }

        // ✅ Allow new Admin creation
        admin = new Admin({ firstName, lastName, email, profileImageUrl, role });
        await admin.save();

        return res.status(201).json({ message: "Admin created successfully", payload: admin });
    } catch (error) {
        console.error("Error creating/fetching admin:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}));



//  Get all Users & Authors
adminApp.get("/users-authors", expressAsyncHandler(async (req, res) => {
    try {
        const users = await UserAuthor.find();
        res.status(200).send({ message: "Users & Authors List", payload: users });
    } catch (error) {
        res.status(500).send({ message: "Error fetching users/authors" });
    }
}));

//  Enable/Disable User or Author
adminApp.put("/toggle-user/:id", expressAsyncHandler(async (req, res) => {
    try {
        const user = await UserAuthor.findById(req.params.id);
        if (!user) return res.status(404).send({ message: "User not found" });

        user.isActive = !user.isActive;
        await user.save();
        
        res.status(200).send({ message: `User ${user.isActive ? "Enabled" : "Blocked"}` });
    } catch (error) {
        res.status(500).send({ message: "Error toggling user status" });
    }
}));

//  Get all Articles
adminApp.get("/articles", expressAsyncHandler(async (req, res) => {
    try {
        const articles = await Article.find();
        res.status(200).send({ message: "Articles List", payload: articles });
    } catch (error) {
        res.status(500).send({ message: "Error fetching articles" });
    }
}));

//  Block/Unblock Article
adminApp.put("/toggle-article/:articleId", expressAsyncHandler(async (req, res) => {
    try {
        const article = await Article.findOne({ articleId: req.params.articleId });
        if (!article) return res.status(404).send({ message: "Article not found" });

        article.isArticleActive = !article.isArticleActive;
        await article.save();
        
        res.status(200).send({ message: `Article ${article.isArticleActive ? "Unblocked" : "Blocked"}` });
    } catch (error) {
        res.status(500).send({ message: "Error toggling article status" });
    }
}));

module.exports = adminApp;
