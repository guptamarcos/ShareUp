const mongoose = require("mongoose");
const Post = require("../models/postSchema");

const posts = [
  {
    username: "gauri_shankar",
    title: "Launched My New MERN Project 🚀",
    content: "Excited to share my new MERN project today!",
    imageUrl: "https://picsum.photos/seed/post1/600/400",
  },
  {
    username: "rahul_dev",
    title: "600+ LeetCode Questions Solved! 💯",
    content: "Just finished solving 600+ DSA questions on LeetCode 🚀",
    imageUrl: "https://picsum.photos/seed/post2/600/400",
  },
  {
    username: "tech_guru",
    title: "Deep Dive into MongoDB Aggregation 🧩",
    content: "Exploring MongoDB aggregation pipelines today!",
    imageUrl: "https://picsum.photos/seed/post3/600/400",
  },
  {
    username: "coder_queen",
    title: "Render Deployment Success ✨",
    content: "Full-stack deployment done successfully on Render ✨",
    imageUrl: "https://picsum.photos/seed/post4/600/400",
  },
  {
    username: "fitness_dev",
    title: "Code and Workout Grind 💪",
    content: "A productive day — coded for 6 hours and hit the gym 💪",
    imageUrl: "https://picsum.photos/seed/post5/600/400",
  },
  {
    username: "ai_researcher",
    title: "Building an IPL Chatbot ⚡",
    content: "Building an IPL chatbot using pattern matching and NLP ⚡",
    imageUrl: "https://picsum.photos/seed/post6/600/400",
  },
  {
    username: "web_wizard",
    title: "Understanding Express Middleware 🧠",
    content: "New blog post up: ‘Understanding Express Middleware’ 🧠",
    imageUrl: "https://picsum.photos/seed/post7/600/400",
  },
  {
    username: "dev_dreamer",
    title: "Learning AWS Deployment ☁️",
    content: "Learning AWS deployment — loving the cloud ☁️",
    imageUrl: "https://picsum.photos/seed/post8/600/400",
  },
  {
    username: "mern_maniac",
    title: "Pushed My MERN App to GitHub 🔥",
    content: "Just pushed my MERN stack app to GitHub 🔥",
    imageUrl: "https://picsum.photos/seed/post9/600/400",
  },
  {
    username: "data_dynamo",
    title: "Data Visualization Adventures 📊",
    content: "Exploring data visualization with D3.js and Recharts 📊",
    imageUrl: "https://picsum.photos/seed/post10/600/400",
  }
];


// CONNECT THE DB
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/ShareUp");
  await Post.insertMany(posts);
}

main()
  .then((data) => {
    console.log("connection successful");
  })
  .catch((err) => {
    console.log(err);
});
