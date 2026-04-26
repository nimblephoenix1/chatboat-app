export default async function handler(req, res) {
  try {
    const { message, password } = req.body;

    // ✅ Password is checked HERE on the server — users never see this file
    if (password !== process.env.PASSWORD) {
      return res.status(401).json({ reply: "Unauthorized" });
    }

    if (!message) {
      return res.status(400).json({ reply: "No message provided" });
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        // ✅ API key lives in Vercel env variables — never in your code
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [
          { role: "user", content: message }
        ],
      }),
    });

    const data = await response.json();

    const reply =
      data?.choices?.[0]?.message?.content ||
      "No response";

    return res.status(200).json({ reply });

  } catch (error) {
    return res.status(500).json({
      reply: "Server error: " + error.message,
    });
  }
}