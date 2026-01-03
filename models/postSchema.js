const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    title: {
        type: String,  
        required: [true,"Title is required!!"],
        minlength: [5, "Title must contain at least 5 letters"],
    },
    content: {
        type: String,
        required: [true,"Content is required!!"],
        minlength: [10,"content must contain at least 10 letters"],
    },
    imageUrl:{
        type: String,
        required: [true,"ImageUrl is required!!"],
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