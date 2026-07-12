/* ===================================
   BIZPILOT AI
   EMAIL WRITER
=================================== */

const API_URL = "https://bizpilot-backend-graw.onrender.com/email";

const generateBtn = document.getElementById("generateBtn");
const emailOutput = document.getElementById("emailOutput");

const emailType = document.getElementById("emailType");
const tone = document.getElementById("tone");
const subject = document.getElementById("subject");
const details = document.getElementById("details");

async function generateEmail(){

    if(subject.value.trim()==="" || details.value.trim()===""){

        alert("Please fill Subject and Details.");

        return;

    }

    emailOutput.innerHTML = `
        <div class="placeholder">
            <div class="placeholder-icon">🤖</div>
            <h3>Generating Email...</h3>
            <p>Please wait a few seconds.</p>
        </div>
    `;
   setLoading(true);

    try{

        const response = await fetch(API_URL,{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                subject:subject.value,

                type:emailType.value,

                tone:tone.value,

                details:details.value

            })

        });

        const data = await response.json();

        if(data.success){

            emailOutput.innerHTML = marked.parse(data.email);

        }

        else{

            emailOutput.innerHTML =
            `<p>❌ ${data.error}</p>`;

        }

    }

    catch(error){

        emailOutput.innerHTML =
        `<p>❌ Unable to connect to server.</p>`;

        console.error(error);

    }

}

finally{
    setLoading(false);
}

generateBtn.addEventListener("click",generateEmail);

/* ===================================
   ACTION BUTTONS
=================================== */

const copyBtn = document.getElementById("copyBtn");
const downloadBtn = document.getElementById("downloadBtn");
const editBtn = document.getElementById("editBtn");

/* Toast */

function showToast(text){

const toast = document.getElementById("toast");

toast.innerHTML = text;

toast.classList.add("show");

setTimeout(()=>{

toast.classList.remove("show");

},2000);

}

/* Copy */

copyBtn.addEventListener("click",()=>{

const text = emailOutput.innerText;

if(text.trim()==="") return;

navigator.clipboard.writeText(text);

showToast("✅ Email Copied");

});

/* Download */

downloadBtn.addEventListener("click",()=>{

const text = emailOutput.innerText;

if(text.trim()==="") return;

const blob = new Blob([text],{
type:"text/plain"
});

const link=document.createElement("a");

link.href=URL.createObjectURL(blob);

link.download="BizPilot_Email.txt";

link.click();

URL.revokeObjectURL(link.href);

showToast("⬇ Email Downloaded");

});

/* Edit */

editBtn.addEventListener("click",()=>{

const text=emailOutput.innerText;

details.value=text;

details.focus();

showToast("✏ Email loaded into editor");

});


function setLoading(isLoading){

    if(isLoading){
        generateBtn.disabled = true;
        generateBtn.innerHTML = "⏳ Generating...";
    }else{
        generateBtn.disabled = false;
        generateBtn.innerHTML = "🚀 Generate Email";
    }

}
