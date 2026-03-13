async function login(){

const username = document.getElementById("username").value
const password = document.getElementById("password").value

const res = await fetch("http://localhost:3000/login",{

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

window.location="index.html"

}else{

document.getElementById("error").innerText="Invalid login"

}

}
function logout(){
localStorage.removeItem("username")
window.location="login.html"
}