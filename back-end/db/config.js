const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/trip-planner-ai");
// // mongoos.connect("mongodb+srv://adityaanu20023:Aditya@123@cluster0.xt80gyk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");


// const mongoURI = "mongodb+srv://adityaanu20023:Aditya@123@cluster0.xt80gyk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

// mongoose.connect(mongoURI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.error("Failed to connect to MongoDB", err));

// //mongodb+srv://adityaanu20023:Aditya@123@cluster0.zx6n2ny.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
// const mongoose = require("mongoose");
// require('dotenv').config();

// const mongoURI = process.env.MONGODB_URI;

// mongoose.connect(mongoURI)
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.error("Failed to connect to MongoDB", err));


