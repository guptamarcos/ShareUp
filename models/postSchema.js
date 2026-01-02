const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    title: {
        type: String,  
        required: true,
        minlength: 6,
    },
    content: {
        type: String,
        required: true,
        minlength: 6,
    },
    imageUrl:{
        type: String,
        required: true,
    },
    isOwner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    allComments:[
       {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
       }
    ],
},{timestamps: true});

const Post = mongoose.model("Post",postSchema);

module.exports = Post;