const UserAuthor=require("../models/userAuthorModel")

async function createUserOrAuthor(req,res){
//businness logic
try{
    const newUserAuthor=req.body;

    // console.log(userAuthor)
    const userInDb=await UserAuthor.findOne({email:newUserAuthor.email})
    //if useror author existed
    if(userInDb !== null){
        if (!userInDb.isActive) {
            return res.status(403).send({ message: "Your account is blocked. Please contact admin." });
        }
        if(newUserAuthor.role === userInDb.role){
            res.status(200).send({message:newUserAuthor.role,payload:userInDb})
        }else{
            res.status(200).send({message:"Invalid role "})
        }
    }else{
        let newUser=new UserAuthor(newUserAuthor)
        let newUserOrAuthorDoc=await newUser.save();
        res.status(201).send({message:newUserOrAuthorDoc.role,payload:newUserOrAuthorDoc})
    }
}
catch (error) {
    console.error("Error creating user or author:", error);
    res.status(500).send({ message: "Internal Server Error" });
}

}
module.exports=createUserOrAuthor;