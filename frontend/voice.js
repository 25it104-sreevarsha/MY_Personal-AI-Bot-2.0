const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition;

if (SpeechRecognition) {

recognition = new SpeechRecognition();
recognition.lang = "en-US";
recognition.continuous = false;

recognition.onresult = function(event){

const transcript = event.results[0][0].transcript;

document.getElementById("userInput").value = transcript;

};

recognition.onerror = function(event){
console.log("Voice error:",event.error);
};

}

function startVoice(){

if(!SpeechRecognition){
alert("Voice recognition not supported in this browser");
return;
}

recognition.start();

}