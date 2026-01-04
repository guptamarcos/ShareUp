const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    content:{
        type: String,
        required: [true,"Content is required!!!"],
    },
},{timestamps:true});

const Comment = mongoose.model("Comment",commentSchema);

module.exports = Comment;