const PASSWORD = "q12we34rt56";

function checkPassword() {
  const input = document.getElementById("password").value;

  if (input === PASSWORD) {
    document.getElementById("login").style.display = "none";
    document.getElementById("chat").style.display = "block";
  } else {
    document.getElementById("error").innerText = "Wrong password!";
  }
}

async function sendMessage() {
  const messageInput = document.getElementById("message");
  const chatbox = document.getElementById("chatbox");
  const message = messageInput.value;

  if (!message) return;

  // 👤 Add user message
  const userMsg = document.createElement("div");
  userMsg.className = "msg user";
  userMsg.innerText = message;
  chatbox.appendChild(userMsg);

  messageInput.value = "";

  // 🤖 Loading message
  const botMsg = document.createElement("div");
  botMsg.className = "msg bot";
  botMsg.innerText = "Thinking...";
  chatbox.appendChild(botMsg);

  chatbox.scrollTop = chatbox.scrollHeight;

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();

    botMsg.innerText = data.reply;
  } catch (err) {
    botMsg.innerText = "Error talking to AI.";
  }

  chatbox.scrollTop = chatbox.scrollHeight;
}