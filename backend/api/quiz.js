import fetch from "node-fetch";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method === "GET") {
    try {
      const response = await fetch("https://api.jsonserve.com/Uw5CrX");
      if (!response.ok) {
        throw new Error("Failed to fetch quiz data");
      }
      const data = await response.json();
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ error: "Error fetching quiz data" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
