const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Player name is required"], //The name field must be present and not empty. If you try to save a player without a name, Mongoose will throw a validation error with the message "Player name is required".
        trim: true,
    },
    season: {
        type: String,
        required: [true, "Season is required"],
    },
    runs: {
        type: Number,
        required: [true, "Runs are required"],
        min: [0, "Runs cannot be negative"],
    },
    innings: {
        type: Number,
        required: [true, "Innings are required"],
        min: [0, "Innings cannot be negative"],
    },
    notOuts: {
        type: Number,
        required: [true, "Not outs are required"],
        min: [0, "Not outs cannot be negative"],
    },
    wickets: {
        type: Number,
        required: [true, "Wickets are required"],
        min: [0, "Wickets cannot be negative"],
    },
    ballsFaced: {
        type: Number,
        required: [true, "Balls faced are required"],
        min: [0, "Balls faced cannot be negative"],
    },
    overs: {
        type: Number,
        required: [true, "Overs bowled are required"],
        min: [0, "Overs bowled cannot be negative"],
    },
    runsGiven: {
        type: Number,
        required: [true, "Runs given are required"],
        min: [0, "Runs given cannot be negative"],
    },
});

const Player = mongoose.model("Player", playerSchema);

module.exports = Player;
