import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const leaderboardSchema = new mongoose.Schema({
  name: String,
  score: Number,
  timeTaken: Number,
  date: { type: Date, default: Date.now }
});

const Leaderboard = mongoose.model("Leaderboard", leaderboardSchema);

export default async function handler(req, res) {
  if (req.method === "POST") {
    // Handle the POST request to save leaderboard data
    try {
      const { name, score, timeTaken } = req.body;
      if (!name || score === undefined || timeTaken === undefined) {
        return res.status(400).json({ error: "Invalid data received" });
      }

      const newEntry = new Leaderboard({ name, score, timeTaken });
      await newEntry.save();
      res.status(201).json({ message: "Score saved successfully!" });
    } catch (error) {
      res.status(500).json({ error: "Failed to save score" });
    }
  } else if (req.method === "GET") {
    // Handle GET request to fetch leaderboard data
    try {
      const leaderboard = await Leaderboard.find().sort({ score: -1, timeTaken: 1 }).limit(5);
      res.status(200).json(leaderboard);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch leaderboard" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
