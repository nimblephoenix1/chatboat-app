export default async function handler(req, res) {
  // ✅ Only allow POST requests (important for Vercel)
  if (req.method !== "POST") {
    return res.status(405).json({ reply: "Method not allowed" });
  }

  try {
    const { message } = req.body;

    // ✅ Validate input
    if (!message) {
      return res.status(400).json({ reply: "No message provided" });
    }

    // ✅ Call Hugging Face
    const hfResponse = await fetch(
      "https://api-inference.huggingface.co/models/google/flan-t5-small",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: message,
        }),
      }
    );

    const text = await hfResponse.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      return res.status(500).json({ reply: "Invalid JSON from HF: " + text });
    }

    // 🔁 Handle model loading (VERY common on free tier)
    if (data.error && data.error.toLowerCase().includes("loading")) {
      return res.status(503).json({
        reply: "Model is loading, try again in a few seconds...",
      });
    }

    // ❗ Handle API errors
    if (!hfResponse.ok || data.error) {
      return res.status(500).json({
        reply: "HF Error: " + (data.error || hfResponse.statusText),
      });
    }

    // ✅ Extract response safely
    let reply = "No response from model.";

    if (Array.isArray(data)) {
      reply = data[0]?.generated_text || reply;
    } else if (data.generated_text) {
      reply = data.generated_text;
    }

    return res.status(200).json({ reply });

  } catch (error) {
    return res.status(500).json({
      reply: "Server error: " + error.message,
    });
  }
}