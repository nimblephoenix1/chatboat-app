  async function sendMessage() {
  const input = document.getElementById("input");
  const chatBox = document.getElementById("chat-box");

  const message = input.value.trim();
  if (!message) return;

  // Show user message
  chatBox.innerHTML += `<div class="message user">${message}</div>`;
  input.value = "";

  // Scroll down
  chatBox.scrollTop = chatBox.scrollHeight;

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    // ✅ FIXED: properly parse response
    const data = await res.json();

    // ✅ Show bot response correctly
    chatBox.innerHTML += `<div class="message bot">${typeof data.reply === "string" ? data.reply : JSON.stringify(data.reply)}</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;

  } catch (err) {
    // ✅ FIXED error display
    chatBox.innerHTML += `<div class="message bot">Error: ${err.message}</div>`;
  }
}