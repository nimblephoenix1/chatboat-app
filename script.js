  let sessionPassword = "";
  let conversationHistory = [];

  async function checkPassword() {
    const input = document.getElementById("password").value;
    const errorEl = document.getElementById("error");

    errorEl.innerText = "Checking...";

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: input, messages: [{ role: "user", content: "ping" }] }),
      });

      if (res.status === 401) {
        errorEl.innerText = "Wrong password!";
        return;
      }

      sessionPassword = input;
      document.getElementById("login").style.display = "none";
      document.getElementById("chat").style.display = "block";
      errorEl.innerText = "";

    } catch (err) {
      errorEl.innerText = "Could not connect. Try again.";
    }
  }

  async function sendMessage() {
    const messageInput = document.getElementById("message");
    const chatbox = document.getElementById("chatbox");
    const message = messageInput.value.trim();

    if (!message) return;

    conversationHistory.push({ role: "user", content: message });

    const userMsg = document.createElement("div");
    userMsg.className = "msg user";
    userMsg.innerText = message;
    chatbox.appendChild(userMsg);

    messageInput.value = "";

    const botMsg = document.createElement("div");
    botMsg.className = "msg bot";
    botMsg.innerText = "Thinking...";
    chatbox.appendChild(botMsg);

    chatbox.scrollTop = chatbox.scrollHeight;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: sessionPassword, messages: conversationHistory }),
      });

      const data = await res.json();
      const reply = data.reply || "No response.";
      botMsg.innerText = reply;

      conversationHistory.push({ role: "assistant", content: reply });

    } catch (err) {
      botMsg.innerText = "Error talking to AI.";
    }

    chatbox.scrollTop = chatbox.scrollHeight;
  }
