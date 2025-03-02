const mongoose=require("mongoose")
const authorDataSchema=new mongoose.Schema({
    nameOfAuthor:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    profileImageUrl:{
        type:String
    }
})
const userCommentSchema=new mongoose.Schema({
    nameOfUser:{
        type:String,
        required:true
    },
    comment:{
        type:String,
        require:true
    }
},{"strict":"throw"})


//create article schema
const articleSchema=new mongoose.Schema({
    authorData:authorDataSchema
    ,articleId:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    category:{     
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    dateOfCreation:{
        type:String,
        required:true
    },
    dateOfModification:{
        type:String,
        required:true
    },
    comments:[userCommentSchema],
    isArticleActive:{
        type:Boolean,
        default:true
    },
},{"strict":"throw"})

//create model
const Article=mongoose.model('article',articleSchema)


//export
module.exports=Article;


