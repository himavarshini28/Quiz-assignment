import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));


const leaderboardSchema = new mongoose.Schema({
  name: String,
  score: Number,
  timeTaken: Number,
  date: { type: Date, default: Date.now }
});

const Leaderboard = mongoose.model("Leaderboard", leaderboardSchema);

app.get('/api/quiz', async (req, res) => {
  try {
    const response = await fetch("https://api.jsonserve.com/Uw5CrX");
    if (!response.ok) {
      throw new Error("Failed to fetch quiz data");
    }
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Error fetching quiz data" });
  }
});

app.post("/api/leaderboard", async (req, res) => {
  try {
    console.log("Received Data:", req.body);

    const { name, score, timeTaken } = req.body;
    if (!name || score === undefined || timeTaken === undefined) {
      console.log("Invalid data received:", req.body);
      return res.status(400).json({ error: "Invalid data received" });
    }

    const newEntry = new Leaderboard({ name, score, timeTaken });
    await newEntry.save();
    console.log("Data Saved to DB:", newEntry);

    res.status(201).json({ message: "Score saved successfully!" });
  } catch (error) {
    console.error(" Error saving score:", error);
    res.status(500).json({ error: "Failed to save score" });
  }
});

app.get("/api/leaderboard", async (req, res) => {
  try {
    const leaderboard = await Leaderboard.find().sort({ score: -1, timeTaken: 1 }).limit(5);
    console.log("Leaderboard Data:", leaderboard);
    res.json(leaderboard);
  } catch (error) {
    console.error(" Error fetching leaderboard:", error);
    res.status(500).json({ error: "Failed to fetch leaderboard" });
  }
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
