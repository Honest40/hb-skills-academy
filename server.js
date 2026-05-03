const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = "AIzaSyAbb_sssaRoIsaKxNvr05yCRY_FQbRMkyE";

// CHAT ROUTE
app.post("/chat", async (req, res) => {
  const userText = req.body.message;

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=" + API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `
You are HB Skills Academy AI tutor.

Rules:
- Teach simply
- Help students learn skills
- Recommend courses when needed
- Be friendly and short

User: ${userText}
                `
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response from AI";

    res.json({ reply });

  } catch (err) {
    res.json({ reply: "Server error" });
  }
});

// IMPORTANT FOR RENDER
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("AI backend running on port " + PORT);
});
