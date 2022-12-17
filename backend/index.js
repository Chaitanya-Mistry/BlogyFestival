// CONTRIBUTED BY JAYAPAL SINH RAMLAVAT, CHAITANYA MISTRY, HEVIN PATEL, ANMOL GARG 
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const signUp = require("./controllers/user/signUp");
const addBlog = require("./controllers/blog/addBlog");
const login = require("./controllers/user/login");
const deleteBlog = require("./controllers/blog/deleteBlog");
const updateBlog = require("./controllers/blog/updateBlog");
const getAllBlogs = require("./controllers/blog/getAllBlogs");
const cors = require("cors");
const getBlogByID = require("./controllers/blog/getBlogByID");
const authMiddleware = require("./middlewares/authMiddleware");
const getUserBlog = require("./controllers/user/getUserBlog");
const cookieParser = require("cookie-parser");
const logout = require("./controllers/user/logout");
const fileUpload = require("express-fileupload");
const path = require('path');

const app = express();
// Set up Global configuration access
dotenv.config();
const port = process.env.PORT || 4000; // Server PORT
// Mongodb Connection String ..
const connectionString = process.env.DatabaseConnection || "mongodb+srv://GroupProject1:wuQCXmX7064WlvFn@cluster0.omc4c40.mongodb.net/?retryWrites=true&w=majority";

// To connect to the mongodb database 
mongoose.connect(connectionString).then(() => app.listen(port)).then(() => {
    console.log(`Express is 🏃 on port ${port} `);
    console.log(`Express is connected to the database 😄`);
});

// Middlewares ..
app.use(cors({
    origin: 'http://localhost:3000', // Allowed domains to communicate with our api
    credentials: true
})
); // To allow our front-end to make requests to our API server ..
app.use(express.json()); // To access data from client in JSON format ..
app.use(cookieParser()); // Parse Cookie header and populate req.cookies with an object keyed by the cookie names.
app.use(fileUpload()); // When you upload a file, the file will be accessible from req.files
app.use('/blogImages', express.static(path.join(__dirname, 'public/blogImages'))); // To give absolute path 
// app.use('/blogImages',express.static('public/blogImages'));


/* GET Requests */
// user
app.get('/api/logout', authMiddleware, logout);

// blog
app.get('/api/getBlogByID/:blogID', authMiddleware, getBlogByID);
app.get('/api/getAllBlogs', authMiddleware, getAllBlogs);
app.get('/api/myAllBlogs', authMiddleware, getUserBlog);

/* POST Requests */
// blog
app.post('/api/addBlog', authMiddleware, addBlog);
// user
app.post('/api/signUp', signUp); // SignUp
app.post('/api/login', login);    // Login

/* UPDATE Requests */
app.put('/api/updateBlog/:blogID', authMiddleware, updateBlog);

/* DELETE Requests */
app.delete('/api/deleteBlog/:blogID', authMiddleware, deleteBlog); // delete blog