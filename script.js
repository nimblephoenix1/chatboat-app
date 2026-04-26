// ✅ No password stored here anymore — it's in Vercel's environment variables
let sessionPassword = "";

async function checkPassword() {
  const input = document.getElementById("password").value;
  const errorEl = document.getElementById("error");

  errorEl.innerText = "Checking...";

  try {
    // Send a test message to the server to validate the password
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: input, message: "ping" }),
    });

    if (res.status === 401) {
      errorEl.innerText = "Wrong password!";
      return;
    }

    // ✅ Password was accepted — store it in memory for this session only
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

  // Add user message to chat
  const userMsg = document.createElement("div");
  userMsg.className = "msg user";
  userMsg.innerText = message;
  chatbox.appendChild(userMsg);

  messageInput.value = "";

  // Add loading placeholder
  const botMsg = document.createElement("div");
  botMsg.className = "msg bot";
  botMsg.innerText = "Thinking...";
  chatbox.appendChild(botMsg);

  chatbox.scrollTop = chatbox.scrollHeight;

  try {
    // ✅ Password travels with each request — validated on the server each time
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: sessionPassword, message }),
    });

    const data = await res.json();
    botMsg.innerText = data.reply || "No response.";

  } catch (err) {
    botMsg.innerText = "Error talking to AI.";
  }

  chatbox.scrollTop = chatbox.scrollHeight;
}