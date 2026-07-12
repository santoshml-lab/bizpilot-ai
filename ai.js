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

div.className = "message user-message";

div.innerHTML = `
<div class="bubble">
${message}
</div>

<div class="avatar">
👤
</div>
`;

chatBox.appendChild(div);

chatBox.scrollTop = chatBox.scrollHeight;

}






// Add AI Message
function addAIMessage(message){

const div = document.createElement("div");

div.className = "message ai-message";

div.innerHTML = `
<div class="avatar">
🤖
</div>

<div class="bubble">

<h4 class="ai-title">
BizPilot AI
</h4>

${marked.parse(message)}

<div class="message-actions">

<button class="copy-btn">📋 Copy</button>

<button class="regen-btn">🔄</button>

</div>

</div>
`;

chatBox.appendChild(div);

chatBox.scrollTop = chatBox.scrollHeight;

// Copy Button
div.querySelector(".copy-btn").onclick = () => {

navigator.clipboard.writeText(message);

showToast("✅ Copied to Clipboard");

};

}

    



// AI Typing
function showTyping(){

const div=document.createElement("div");

div.className="message ai-message";

div.id="typing";

div.innerHTML=`

<div class="avatar">
🤖
</div>

<div class="bubble">

<h4 class="ai-title">
🤖 BizPilot AI
</h4>

<div class="typing">

<span></span>

<span></span>

<span></span>

</div>

<p style="margin-top:10px;color:#94A3B8;">
Thinking...
</p>

</div>

`;

chatBox.appendChild(div);

chatBox.scrollTop=chatBox.scrollHeight;

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

function showToast(text){

const toast = document.getElementById("toast");

toast.innerHTML = text;

toast.classList.add("show");

setTimeout(()=>{

toast.classList.remove("show");

},2000);

}



