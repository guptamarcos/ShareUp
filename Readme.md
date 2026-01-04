ShareUp

ShareUp is a lightweight, secure file-sharing web application designed to make uploading and sharing files simple, fast, and reliable.
The platform focuses on authentication, session security, and clean backend architecture that follows best practices.

🚀 Features

🔐 User authentication (Local Strategy – Passport.js)

💾 Persistent sessions using connect-mongo (Mongo Store)

📁 File uploads powered by Multer

🧾 Server-rendered UI with EJS

✔️ Input validation using Joi

🗄️ MongoDB + Mongoose for data persistence

🔄 Method-override support for RESTful routes

⚙️ Environment configuration using dotenv

✨ Flash messages for user feedback

🛠️ Tech Stack

Backend: Node.js, Express
Database: MongoDB, Mongoose
Authentication: Passport + Passport-Local + Sessions
Templating: EJS
File Handling: Multer
Session Storage: connect-mongo
Validation: Joi

📂 Project Structure
ShareUp/
│
├── controllers/
├── db/
├── models/
├── routes/
├── utils/
├── public/
├── views/
├── uploads/
│
├── app.js
├── server.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md


Structure may evolve as the project grows.

⚙️ Getting Started
1️⃣ Clone the repository
git clone https://github.com/your-username/shareup.git
cd shareup

2️⃣ Install dependencies
npm install

3️⃣ Create a .env file

Add the following variables:

PORT=4000
MONGO_URL=your_mongodb_connection_string
SESSION_SECRET=your_session_secret

4️⃣ Run the application
npm start


Application runs at:

http://localhost:4000