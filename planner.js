/* ===================================
   BIZPILOT AI
   SMART PLANNER
=================================== */

const API_URL = "https://bizpilot-backend-graw.onrender.com/planner";

const generateBtn = document.getElementById("generateBtn");
const plannerPrompt = document.getElementById("plannerPrompt");
const plannerOutput = document.getElementById("plannerOutput");

async function generatePlan(){

    if(plannerPrompt.value.trim()===""){

        alert("Please enter your goal.");

        return;

    }

    plannerOutput.innerHTML=`

    <div class="placeholder">

        <div class="placeholder-icon">🤖</div>

        <h3>Generating Smart Plan...</h3>

        <p>Please wait a few seconds.</p>

    </div>

    `;

    setLoading(true);

    try{

        const response=await fetch(API_URL,{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                prompt:plannerPrompt.value

            })

        });

        const data=await response.json();

        if(data.success){

            plannerOutput.innerHTML=marked.parse(data.reply);

        }

        else{

            plannerOutput.innerHTML=
            `<p>❌ ${data.error}</p>`;

        }

    }

    catch(error){

        plannerOutput.innerHTML=
        `<p>❌ Unable to connect to server.</p>`;

        console.error(error);

    }

    finally{

        setLoading(false);

    }

}

generateBtn.addEventListener("click",generatePlan);

function setLoading(isLoading){

    if(isLoading){

        generateBtn.disabled=true;

        generateBtn.innerHTML="⏳ Generating...";

    }

    else{

        generateBtn.disabled=false;

        generateBtn.innerHTML="🚀 Generate Plan";

    }

}

/* ===================================
   ACTION BUTTONS
=================================== */

const copyBtn = document.getElementById("copyBtn");
const downloadBtn = document.getElementById("downloadBtn");
const editBtn = document.getElementById("editBtn");

/* ===========================
   TOAST
=========================== */

function showToast(text){

    const toast=document.getElementById("toast");

    toast.innerHTML=text;

    toast.classList.add("show");

    setTimeout(()=>{

        toast.classList.remove("show");

    },2000);

}

/* ===========================
   COPY
=========================== */

copyBtn.addEventListener("click",()=>{

    const text=plannerOutput.innerText;

    if(text.trim()==="") return;

    navigator.clipboard.writeText(text);

    showToast("✅ Plan Copied");

});

/* ===========================
   DOWNLOAD
=========================== */

downloadBtn.addEventListener("click",()=>{

    const text=plannerOutput.innerText;

    if(text.trim()==="") return;

    const blob=new Blob([text],{

        type:"text/plain"

    });

    const link=document.createElement("a");

    link.href=URL.createObjectURL(blob);

    link.download="BizPilot_Plan.txt";

    link.click();

    URL.revokeObjectURL(link.href);

    showToast("⬇ Plan Downloaded");

});

/* ===========================
   EDIT
=========================== */

editBtn.addEventListener("click",()=>{

    const text=plannerOutput.innerText;

    if(text.trim()==="") return;

    plannerPrompt.value=text;

    plannerPrompt.focus();

    showToast("✏ Plan loaded into editor");

});

/* ===========================
   CTRL + ENTER
=========================== */

plannerPrompt.addEventListener("keydown",(e)=>{

    if(e.key==="Enter" && e.ctrlKey){

        e.preventDefault();

        generatePlan();

    }

});

/* ===========================
   AUTO RESIZE
=========================== */

plannerPrompt.addEventListener("input",()=>{

    plannerPrompt.style.height="auto";

    plannerPrompt.style.height=plannerPrompt.scrollHeight+"px";

});
