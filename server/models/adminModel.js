const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    // email: { type: String, required: true, unique: true },
    // password: { type: String, required: true },
    role: { type: String, default: "admin" }
    ,
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        // required:true
    },
    email:{
        type:String,
        required:true
    },
    profileImageUrl:{
        type:String,
    },isActive:{
        type:Boolean,
        default:true
    }

}, { strict: "throw" });

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
