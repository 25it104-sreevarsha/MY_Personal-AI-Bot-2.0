const express = require("express");
const axios = require("axios");
const cors = require("cors");
const fs = require("fs");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

/* ---------- FILE PATHS ---------- */

const USERS_FILE = "./users.json";
const MEMORY_FILE = "./memory.json";

/* ---------- TEST ROUTE ---------- */

app.get("/", (req, res) => {
  res.send("AI backend is running");
});

/* ---------- LOGIN ROUTE ---------- */

app.post("/login", (req, res) => {

  const { username, password } = req.body;

  const users = JSON.parse(fs.readFileSync(USERS_FILE));

  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (user) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }

});

/* ---------- MEMORY FUNCTIONS ---------- */

function loadMemory(){

  try{

    const data = fs.readFileSync(MEMORY_FILE);
    return JSON.parse(data);

  }catch{

    return {};

  }

}

function saveMemory(memory){

  fs.writeFileSync(
    MEMORY_FILE,
    JSON.stringify(memory,null,2)
  );

}

/* ---------- AI ROUTE ---------- */

app.post("/ask", async (req, res) => {

  const userMessage = req.body.message;

  let memory = loadMemory();

  let memoryText = "";

  for(let key in memory){
    memoryText += key + ": " + memory[key] + ". ";
  }

  try{

    const response = await axios.post(

      "https://api.groq.com/openai/v1/chat/completions",

      {
        model:"llama-3.3-70b-versatile",

        messages:[

          {
            role:"system",
            content:
            "You are a helpful personal AI assistant. Use the stored user information when relevant. User info: " + memoryText
          },

          {
            role:"user",
            content:userMessage
          }

        ]

      },

      {
        headers:{
          Authorization:`Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type":"application/json"
        }
      }

    );

    const aiReply = response.data.choices[0].message.content;

    /* ---------- SIMPLE MEMORY DETECTION ---------- */

    if(userMessage.toLowerCase().includes("my name is")){

      const name = userMessage.split("my name is")[1].trim();

      memory.name = name;

      saveMemory(memory);

    }

    if(userMessage.toLowerCase().includes("my favorite language is")){

      const lang = userMessage.split("my favorite language is")[1].trim();

      memory.favorite_language = lang;

      saveMemory(memory);

    }

    res.json({
      content: aiReply
    });

  }

  catch(error){

    console.log("AI ERROR:",error.response?.data || error.message);

    res.status(500).json({
      content:"AI request failed"
    });

  }

});

/* ---------- SERVER ---------- */

app.listen(3000, () => {

  console.log("Server running on port 3000");

});