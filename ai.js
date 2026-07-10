/* ===================================
   BIZPILOT AI
   ai.js - PART 1
=================================== */

const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

// Add User Message
function addUserMessage(message){

const div = document.createElement("div");

div.className = "user-message";

div.innerHTML = message;

chatBox.appendChild(div);

chatBox.scrollTop = chatBox.scrollHeight;

}

// Add AI Message
function addAIMessage(message){

const div = document.createElement("div");

div.className = "ai-message";

div.innerHTML = message;

chatBox.appendChild(div);

chatBox.scrollTop = chatBox.scrollHeight;

}

// AI Typing
function showTyping(){

const div = document.createElement("div");

div.className = "ai-message";

div.id = "typing";

div.innerHTML = "🤖 Typing...";

chatBox.appendChild(div);

chatBox.scrollTop = chatBox.scrollHeight;

}

function removeTyping(){

const typing = document.getElementById("typing");

if(typing){

typing.remove();

}

}
