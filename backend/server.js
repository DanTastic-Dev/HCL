const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
console.log("🔗 MONGO_URI:", process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("✅ MongoDB connected"))
    .catch(err => console.error("❌ MongoDB connection error:", err));

// Routes
const playerRoutes = require("./routes/players"); //"Get all the routes that were exported from the file routes/players.js, and store them in a variable called playerRoutes."
app.use("/players", playerRoutes); //Tell Express to prefix every route from playerRoutes with /players.
//so this means that the router.get("/") in the router/players.js becomes "/players" and the router.post("/add") becomes ("/players/add")

// Test route
app.get("/", (req, res) => {
    res.send("Backend is working!");
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
