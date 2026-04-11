export default async function handler(req, res) {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ reply: "No message provided " });
    }
const hfResponse = await fetch(
  "https://router.huggingface.co/hf-inference/models/google/flan-t5-base",
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
  return res.status(500).json({ reply: "HF Error: " + text });
}
    let reply = "No response from model.";

		if (Array.isArray(data) && data[0]?.generated_text) {
      reply = data[0].generated_text;
    } else if (data.error) {
      reply = "Error: " + data.error;
    }

    res.status(200).json({ reply });

  } catch (error) {
    res.status(500).json({ reply: "Server error: " + error.message });
  }
}	