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
  "https://router.huggingface.co/v1/chat/completions",
  {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.HF_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "google/flan-t5-small",
      messages: [
        { role: "user", content: message }
      ],
      max_tokens: 200
    }),
  }
);

const data = await hfResponse.json();

const reply =
  data?.choices?.[0]?.message?.content ||
  data?.error ||
  "No response";

res.status(200).json({ reply });