Simple AI Chatbot (HTML + Node.js + OpenRouter)

This is a lightweight, beginner-friendly AI chatbot built with:

- HTML / CSS / JavaScript (frontend)
- Node.js (serverless backend)
- OpenRouter (AI API)
- Vercel (deployment)

---

🚀 Features

- Simple chat interface
- AI-powered responses
- Free-tier friendly
- Easy deployment with Vercel
- No complex frameworks required

---

📁 Project Structure

chatbot-app/
│
├── api/
│   └── chat.js        # Backend API (handles AI requests)
│
├── public/
│   ├── index.html     # Main UI
│   ├── style.css      # Styling
│   └── script.js      # Frontend logic
│
├── package.json
└── README.md

---

🧰 Requirements

Before starting, install:

- Node.js (v18 or newer)
- Git
- A GitHub account
- A Vercel account
- An OpenRouter account

---

🔑 Step 1: Get OpenRouter API Key

1. Go to: https://openrouter.ai
2. Sign up / log in
3. Copy your API key

---

💻 Step 2: Clone the Repository

git clone https://github.com/YOUR_USERNAME/chatbot-app.git
cd chatbot-app

---

📦 Step 3: Install Dependencies

npm install

(If nothing installs, that’s fine — this project is minimal.)

---

🔐 Step 4: Add Environment Variable

Create a ".env" file (optional for local testing):

OPENROUTER_API_KEY=your_api_key_here

---

▶️ Step 5: Run Locally (Optional)

You can test locally using:

npx vercel dev

Then open:

http://localhost:3000

---

🌐 Step 6: Deploy to Vercel

1. Push to GitHub

git add .
git commit -m "initial commit"
git push

---

2. Import Project into Vercel

1. Go to https://vercel.com
2. Click "Add New Project"
3. Import your GitHub repo
4. Click Deploy

---

3. Add Environment Variable in Vercel

In your Vercel project:

- Go to Settings → Environment Variables
- Add:

OPENROUTER_API_KEY = your_api_key_here

- Redeploy the project

---

🧪 Step 7: Test the Chatbot

Open your deployed URL and try:

What color is an orange?

You should get an AI-generated response 🎉

---

⚙️ How It Works

Frontend ("script.js")

- Sends user message to "/api/chat"
- Displays response in chat UI

Backend ("api/chat.js")

- Receives message
- Sends request to OpenRouter API
- Returns AI response

---

💸 Pricing Notes

- OpenRouter may charge small amounts per request
- Many models have free tiers
- Typical usage costs fractions of a cent

---

🛠 Troubleshooting

❌ “[object Object]”

- Make sure frontend uses "data.reply"

❌ “Invalid API Key”

- Check environment variable spelling

❌ No response

- Verify OpenRouter key is set in Vercel
- Redeploy after adding variables

---

🚀 Future Improvements

- Add chat history (memory)
- Improve UI (chat bubbles, animations)
- Add user authentication
- Save conversations to database

---

📄 License

This project is open source and free to use.

---

🙌 Credits

Built using:

- Node.js
- Vercel
- OpenRouter API

---

Enjoy your AI chatbot! 🤖
