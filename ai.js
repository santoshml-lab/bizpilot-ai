/* ===================================
   BIZPILOT AI
   ai.js - PART 1
=================================== */
alert("AI JS Loaded");

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

/* ===================================
   BIZPILOT AI
   ai.js - PART 2
=================================== */

async function sendMessage() {

    const message = userInput.value.trim();

    if (message === "") return;

    // User Message
    addUserMessage(message);

    userInput.value = "";

    // Typing Animation
    showTyping();

    try {

        const response = await fetch("https://bizpilot-backend-graw.onrender.com/chat", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message: message
            })

        });

        const data = await response.json();

        removeTyping();

        if (data.success) {

            addAIMessage(data.reply);

        } else {

            addAIMessage("❌ " + data.error);

        }

    } catch (error) {

        removeTyping();

        addAIMessage("❌ Unable to connect to AI Server.");

        console.error(error);

    }

}



// Send Button
sendBtn.addEventListener("click",sendMessage);

// Enter Key
userInput.addEventListener("keydown",(e)=>{

if(e.key==="Enter" && !e.shiftKey){

e.preventDefault();

sendMessage();

}

});
