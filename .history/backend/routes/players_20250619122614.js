const express = require("express");

const router = express.Router();  //a router is created that is used to manage the requests like the get / post etc
const Player = require("../models/Player");

// POST - Create a new player
router.post("/add", async (req, res) => {
    try {
        const {
            name,
            season,
            innings,
            notOuts,
            runs,
            ballsFaced,
            wickets,
            runsGiven,
            overs
        } = req.body;

        const newPlayer = new Player({
            name,
            season,
            innings: parseInt(innings),
            notOuts: parseInt(notOuts),
            runs: parseInt(runs),
            ballsFaced: parseInt(ballsFaced),
            wickets: parseInt(wickets),
            runsGiven: parseInt(runsGiven),
            overs: parseFloat(overs)   // ✅ This is the fix
        });

        await newPlayer.save();
        res.status(201).json({ message: "Player added successfully", player: newPlayer });
    } catch (err) {
        if (err.name === "ValidationError") {
            const messages = Object.values(err.errors).map(e => e.message);
            return res.status(400).json({ errors: messages });
        }
        res.status(500).json({ error: "Server error" });
    }
});


// GET a player by ID
router.get("/:id", async (req, res) => {
    try {
        const player = await Player.findById(req.params.id);
        if (!player) return res.status(404).json({ message: "Player not found" });
        res.json(player);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET: All players (optional helper)
router.get("/", async (req, res) => {
    try {
        const players = await Player.find();
        res.json(players);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT - Update a player by ID
router.put("/:id", async (req, res) => {
    try {
        const updatedPlayer = await Player.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }  // runValidators ensures schema validation on update
        );
        if (!updatedPlayer) return res.status(404).json({ message: "Player not found" });
        res.json({ message: "Player updated successfully", player: updatedPlayer });
    } catch (err) {
        if (err.name === "ValidationError") {
            const messages = Object.values(err.errors).map(e => e.message);
            return res.status(400).json({ errors: messages });
        }
        res.status(500).json({ error: "Server error" });
    }
});

// DELETE a player by ID
router.delete("/:id", async (req, res) => {
    try {
        const deletedPlayer = await Player.findByIdAndDelete(req.params.id);
        if (!deletedPlayer) {
            return res.status(404).json({ message: "Player not found" });
        }
        res.json({ message: "Player deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
