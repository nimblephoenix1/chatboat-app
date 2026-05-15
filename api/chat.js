 export default async function handler(req, res) {
    try {
      const { messages, password } = req.body;

      if (password !== process.env.PASSWORD) {
        return res.status(401).json({ reply: "Unauthorized" });
      }

      if (!messages || !messages.length) {
        return res.status(400).json({ reply: "No messages provided" });
      }

      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "openai/gpt-4o-mini",
          messages: [
            { role: "system", content: process.env.SYSTEM_PROMPT },
            ...messages,
          ],
        }),
      });

      const data = await response.json();
      const reply = data?.choices?.[0]?.message?.content || "No response";

      return res.status(200).json({ reply });

    } catch (error) {
      return res.status(500).json({
        reply: "Server error: " + error.message,
      });
    }
  }

