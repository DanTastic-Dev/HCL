// const express = require("express");
// require('dotenv').config();
// const mongoose = require("mongoose");
// const cors = require("cors");

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Connect to MongoDB
// console.log("🔗 MONGO_URI:", process.env.MONGO_URI);

// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
//     .then(() => console.log("✅ MongoDB connected"))
//     .catch(err => console.error("❌ MongoDB connection error:", err));

// // Routes
// const playerRoutes = require("./routes/players"); //"Get all the routes that were exported from the file routes/players.js, and store them in a variable called playerRoutes."
// app.use("/players", playerRoutes); //Tell Express to prefix every route from playerRoutes with /players.
// //so this means that the router.get("/") in the router/players.js becomes "/players" and the router.post("/add") becomes ("/players/add")

// // Test route
// app.get("/", (req, res) => {
//     res.send("Backend is working!");
// });


// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`🚀 Server running on port ${PORT}`);
// });


// server.js
const express = require("express");
require('dotenv').config();
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ✅ CORS configuration (allow only your Netlify frontend)
app.use(cors({
    origin: "https://fascinating-boba-218925.netlify.app", // Change if your Netlify URL changes
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

// ✅ Body parser for JSON
app.use(express.json());

// ✅ Log environment info (for debugging)
console.log("🔗 MONGO_URI:", process.env.MONGO_URI);

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("✅ MongoDB connected"))
    .catch(err => console.error("❌ MongoDB connection error:", err));

// ✅ Import and use routes
const playerRoutes = require("./routes/players");
app.use("/players", playerRoutes);

// ✅ Health check route
app.get("/", (req, res) => {
    res.send("Backend is working! 🚀");
});

// ✅ Handle unknown routes (optional but good practice)
app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
