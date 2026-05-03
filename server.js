const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// ⚠️ DO NOT expose this publicly in real apps later
const API_KEY = "AIzaSyAbb_sssaRoIsaKxNvr05yCRY_FQbRMkyE";

app.post("/chat", async (req, res) => {
  try {
    const userText = req.body.message;

    const prompt = `
You are HB Skills Academy AI assistant.
Be helpful, simple, and educational.

User: ${userText}
`;

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=" + API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }]
            }
          ]
        })
      }
    );

    const data = await response.json();

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response from AI";

    res.json({ reply });

  } catch (err) {
    console.log(err);
    res.json({ reply: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
