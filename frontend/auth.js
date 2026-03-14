// Backend URL
const backendUrl = "https://my-personal-ai-bot-2-0.onrender.com";

// LOGIN FUNCTION
async function login() {

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {

    const res = await fetch(`${backendUrl}/login`, {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        username: username,
        password: password
      })

    });

    const data = await res.json();

    if (data.success) {

      localStorage.setItem("username", username);

      // go to assistant page
      window.location = "
