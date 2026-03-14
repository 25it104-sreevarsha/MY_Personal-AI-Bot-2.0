const chat = document.getElementById("chat")
const input = document.getElementById("userInput")
const chatList = document.getElementById("chatList")

let data = JSON.parse(localStorage.getItem("assistantData")) || {
folders:{},
chats:{}
}

let currentChat = null

function saveData(){
localStorage.setItem("assistantData",JSON.stringify(data))
}

/* ---------- FOLDER SYSTEM ---------- */

function newFolder(){

const name = prompt("Folder name")

if(!name) return

const id = "folder_"+Date.now()

data.folders[id] = {
title:name,
chats:[]
}

saveData()
renderChatList()

}

/* ---------- CHAT SYSTEM ---------- */

function newChat(){

const name = prompt("Chat name")

if(!name) return

const id = "chat_"+Date.now()

data.chats[id] = {
title:name,
messages:[]
}

const folderIds = Object.keys(data.folders)

if(folderIds.length>0){

const folderChoice = prompt(
"Enter folder name or leave empty for no folder"
)

if(folderChoice){

for(let f in data.folders){

if(data.folders[f].title === folderChoice){
data.folders[f].chats.push(id)
}

}

}

}

currentChat=id

saveData()
renderChatList()
renderMessages()

}

function renameChat(){

if(!currentChat) return

const name = prompt("New chat name")

if(!name) return

data.chats[currentChat].title=name

saveData()
renderChatList()

}

function deleteCurrentChat(){

if(!currentChat) return

delete data.chats[currentChat]

for(let f in data.folders){

data.folders[f].chats =
data.folders[f].chats.filter(c=>c!==currentChat)

}

currentChat=null

chat.innerHTML=""

saveData()
renderChatList()

}

function clearChat(){

if(!currentChat) return

data.chats[currentChat].messages=[]

saveData()
renderMessages()

}

/* ---------- CHAT LIST UI ---------- */

function renderChatList(){

chatList.innerHTML=""

for(let f in data.folders){

const folderDiv=document.createElement("div")

folderDiv.innerHTML="<b>📂 "+data.folders[f].title+"</b>"

chatList.appendChild(folderDiv)

data.folders[f].chats.forEach(id=>{

const btn=document.createElement("button")

btn.innerText=data.chats[id].title

btn.onclick=()=>{
currentChat=id
renderMessages()
}

chatList.appendChild(btn)

})

}

for(let id in data.chats){

let inside=false

for(let f in data.folders){
if(data.folders[f].chats.includes(id)) inside=true
}

if(!inside){

const btn=document.createElement("button")

btn.innerText=data.chats[id].title

btn.onclick=()=>{
currentChat=id
renderMessages()
}

chatList.appendChild(btn)

}

}

}

/* ---------- MESSAGES ---------- */

function renderMessages(){

chat.innerHTML=""

if(!currentChat) return

data.chats[currentChat].messages.forEach((msg,index)=>{

chat.innerHTML+=`
<div class="${msg.role}">
${marked.parse(msg.text)}
<button class="deleteMsg" onclick="deleteMessage(${index})">🗑</button>
</div>
`

})

chat.scrollTop=chat.scrollHeight

}

function deleteMessage(index){

data.chats[currentChat].messages.splice(index,1)

saveData()
renderMessages()

}

/* ---------- AI CHAT ---------- */

async function sendMessage(){

if(!currentChat) newChat()

const userText=input.value

if(userText.trim()==="") return

data.chats[currentChat].messages.push({
role:"user",
text:userText
})

renderMessages()

input.value=""

const typing=document.createElement("div")
typing.className="ai"
typing.innerText="🤖 AI is typing..."
chat.appendChild(typing)

try{

const response=await fetch("https://my-personal-ai-bot-2-0.onrender.com/ask",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({message:userText})

})

const result=await response.json()

typing.remove()

const aiText = result.content

let index = 0
let typingText = ""

const typingBubble = document.createElement("div")
typingBubble.className = "ai"
chat.appendChild(typingBubble)

const typingInterval = setInterval(()=>{

typingText += aiText[index]
typingBubble.innerHTML = marked.parse(typingText)

index++

chat.scrollTop = chat.scrollHeight

if(index >= aiText.length){

clearInterval(typingInterval)

data.chats[currentChat].messages.push({
role:"ai",
text:aiText
})

saveData()

}

},20)

}catch{

typing.remove()

data.chats[currentChat].messages.push({
role:"ai",
text:"AI connection failed"
})

renderMessages()

}

}

input.addEventListener("keypress",(e)=>{
if(e.key==="Enter") sendMessage()
})

renderChatList()

/* ---------- THEME ---------- */

function changeTheme(theme){

document.body.className=""
document.body.classList.add(theme)

localStorage.setItem("theme",theme)

}

const savedTheme = localStorage.getItem("theme")

if(savedTheme){
document.body.classList.add(savedTheme)
}else{
document.body.classList.add("ocean")
}
