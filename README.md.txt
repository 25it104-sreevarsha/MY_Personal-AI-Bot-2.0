# 🤖 Personal AI Assistant

A full-stack AI assistant web application that allows users to chat with an AI, store conversations, organize chats into folders, and maintain persistent memory about the user.
The project demonstrates frontend development, backend API integration, authentication, deployment, and AI integration.

---

# 🌐 Live Deployment

Frontend deployed on **Netlify**
Backend deployed on **Render**

AI responses powered by **Groq API (Llama models)**.

---

# 🚀 Features

### 🔐 Authentication System

* Login page with username and password
* Secure login verification via backend
* Redirect to chat interface after login
* Logout functionality

### 🤖 AI Chat Assistant

* Users can ask questions and receive AI responses
* Backend connects to Groq AI models
* AI responses are rendered with Markdown support

### 💬 Multiple Chats

* Create new chats
* Rename chats
* Delete chats
* Clear chat history

### 📂 Chat Folder Organization

Users can organize chats into folders.

Example:

📂 College
  DSA doubts
  Python practice

📂 Personal
  Daily planning
  Ideas

This makes long-term usage easier.

### 🧠 Persistent AI Memory

The assistant remembers user information.

Example:

User:
My name is Siya

Later:

User:
What is my name?

AI:
Your name is Siya.

Memory is stored in:

```
backend/memory.json
```

### 🎤 Voice Input

Users can speak instead of typing messages.

The browser converts speech to text and sends it to the AI.

### 🎨 Theme System

Users can switch between UI themes for personalization.

Example themes:

* Ocean theme
* Dark cyber theme
* Cute aesthetic theme

Themes are stored in **localStorage**.

### ✨ AI Typing Animation

AI responses appear with a typing animation instead of appearing instantly.
This makes the interface feel more natural and interactive.

---

# 🏗️ Project Architecture

The project follows a **frontend + backend architecture**.

```
Frontend (Netlify)
       │
       │ API calls
       ▼
Backend (Render - Node.js)
       │
       │ AI requests
       ▼
Groq AI API
```

---

# 📁 Project Structure

```
personal-ai-assistant

frontend
│
├── index.html        (login page)
├── chat.html         (main assistant interface)
├── script.js         (chat logic)
├── auth.js           (login/logout logic)
├── style.css
└── themes.css

backend
│
├── server.js         (Node.js backend server)
├── package.json
├── users.json        (login credentials)
└── memory.json       (AI stored user memory)
```

---

# ⚙️ Technologies Used

Frontend

* HTML
* CSS
* JavaScript

Backend

* Node.js
* Express
* Axios
* CORS
* Dotenv

AI Integration

* Groq API
* Llama model

Deployment

* Netlify (frontend)
* Render (backend)

Version Control

* Git
* GitHub

---

# 🧠 How AI Memory Works

1. User sends a message.
2. Backend reads `memory.json`.
3. Stored information is added to the AI prompt.
4. AI generates a response using this context.
5. New personal facts are stored back into memory.

Example stored memory:

```
{
"name": "Siya",
"favorite_language": "Python"
}
```

---

# 🔧 Setup Instructions (Local Development)

### 1. Clone Repository

```
git clone https://github.com/yourusername/personal-ai-assistant.git
```

### 2. Install Backend Dependencies

```
cd backend
npm install
```

### 3. Add Environment Variable

Create `.env` file inside backend:

```
GROQ_API_KEY=your_api_key_here
```

### 4. Start Server

```
node server.js
```

Server runs at:

```
http://localhost:3000
```

### 5. Open Frontend

Open:

```
frontend/index.html
```

in your browser.

---

# 🔑 Default Login Credentials

```
Username: admin
Password: 123
```

Stored in:

```
backend/users.json
```

---

# 🌍 Deployment Process

### Backend

Deployed using **Render**

Steps:

1. Connect GitHub repository
2. Set root directory to `backend`
3. Build command: `npm install`
4. Start command: `npm start`
5. Add environment variable `GROQ_API_KEY`

### Frontend

Deployed using **Netlify**

Steps:

1. Import GitHub repository
2. Set publish directory to:

```
frontend
```

3. Deploy site

---

# 📚 What I Learned From This Project

This project helped me learn:

* Full-stack development
* API integration
* Authentication systems
* AI model integration
* Deployment pipelines
* Git & GitHub workflow
* UI/UX improvements
* State management using localStorage

---

# 🔮 Possible Future Improvements

* Streaming AI responses
* Chat export to PDF
* Database storage instead of JSON
* User signup system
* Real-time chat synchronization
* Voice output (AI speaking)

---

# 👩‍💻 Author

Built by **Sree Varsha**
B.Tech IT Student
Exploring AI, development, and hackathons.

---

# ⭐ If you like this project

Give the repository a ⭐ on GitHub.
