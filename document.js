/* ===================================
   BIZPILOT AI
   DOCUMENT AI
=================================== */

const API_URL = "https://bizpilot-backend-graw.onrender.com/document";

const fileInput = document.getElementById("documentFile");
const task = document.getElementById("task");

const analyzeBtn = document.getElementById("analyzeBtn");

const documentOutput = document.getElementById("documentOutput");

async function analyzeDocument(){

    if(fileInput.files.length===0){

        alert("Please select a document.");

        return;

    }

    documentOutput.innerHTML=`

    <div class="placeholder">

        <div class="placeholder-icon">🤖</div>

        <h3>Analyzing Document...</h3>

        <p>Please wait...</p>

    </div>

    `;

    const formData=new FormData();

    formData.append("file",fileInput.files[0]);

    formData.append("task",task.value);

    try{

        const response=await fetch(API_URL,{

            method:"POST",

            body:formData

        });

        const data=await response.json();

        if(data.success){

            documentOutput.innerHTML = marked.parse(data.analysis);

            

        }

        else{

            documentOutput.innerHTML=

            `<p>❌ ${data.error}</p>`;

        }

    }

    catch(error){

        documentOutput.innerHTML=

        `<p>❌ Unable to connect to server.</p>`;

        console.error(error);

    }

}

analyzeBtn.addEventListener("click",analyzeDocument);
