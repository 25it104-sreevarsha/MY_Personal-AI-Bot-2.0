async function login(){

const username = document.getElementById("username").value
const password = document.getElementById("password").value

const res = await fetch("https://my-personal-ai-bot-2-0.onrender.com/",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
username,
password
})

})

const data = await res.json()

if(data.success){

localStorage.setItem("username",username)

window.location="chat.html"

}else{

document.getElementById("error").innerText="Invalid login"

}

}
function logout(){
localStorage.removeItem("username")
window.location="index.html"
}
