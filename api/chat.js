export default async function handler(req, res) {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ reply: "No message provided" });
    }

    const hfResponse = await fetch(
      "https://router.huggingface.co/models/mistralai/Mistral-7B-Instruct",
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

    const data = await hfResponse.json();

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