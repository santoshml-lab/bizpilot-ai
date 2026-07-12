/* ===================================
   BIZPILOT AI
   INVOICE AI
=================================== */

const API_URL = "https://bizpilot-backend-graw.onrender.com/invoice-ai";

const generateBtn = document.getElementById("generateBtn");

const invoicePrompt = document.getElementById("invoicePrompt");

const invoiceOutput = document.getElementById("invoiceOutput");

async function generateInvoice(){

    if(invoicePrompt.value.trim()===""){

        alert("Please enter invoice details.");

        return;

    }

    invoiceOutput.innerHTML=`

    <div class="placeholder">

        <div class="placeholder-icon">🤖</div>

        <h3>Generating Invoice...</h3>

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

                prompt:invoicePrompt.value

            })

        });

        const data = await response.json();

        if(data.success){

            invoiceOutput.innerHTML = data.reply;

        }

        else{

            invoiceOutput.innerHTML=

            `<p>❌ ${data.error}</p>`;

        }

    }

    catch(error){

        invoiceOutput.innerHTML=

        `<p>❌ Unable to connect to server.</p>`;

        console.error(error);

    }

    finally{

        setLoading(false);

    }

}

generateBtn.addEventListener("click",generateInvoice);

function setLoading(isLoading){

    if(isLoading){

        generateBtn.disabled=true;

        generateBtn.innerHTML="⏳ Generating...";

    }

    else{

        generateBtn.disabled=false;

        generateBtn.innerHTML="🚀 Generate Invoice";

    }

}

/* ===================================
   ACTION BUTTONS
=================================== */

const copyBtn = document.getElementById("copyBtn");

const downloadBtn = document.getElementById("downloadBtn");

const printBtn = document.getElementById("printBtn");

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

    const text=invoiceOutput.innerText;

    if(text.trim()==="") return;

    navigator.clipboard.writeText(text);

    showToast("✅ Invoice Copied");

});

/* ===========================
   DOWNLOAD
=========================== */

downloadBtn.addEventListener("click",()=>{

    const html=invoiceOutput.innerHTML;

    if(html.trim()==="") return;

    const blob=new Blob([html],{

        type:"text/html"

    });

    const link=document.createElement("a");

    link.href=URL.createObjectURL(blob);

    link.download="BizPilot_Invoice.html";

    link.click();

    URL.revokeObjectURL(link.href);

    showToast("⬇ Invoice Downloaded");

});

/* ===================================
   PRINT
=================================== */

printBtn.addEventListener("click",()=>{

    const html = invoiceOutput.innerHTML;

    if(html.trim()==="") return;

    const printWindow = window.open("","","width=900,height=700");

    printWindow.document.write(`
        <html>
        <head>
            <title>BizPilot Invoice</title>
        </head>
        <body style="margin:20px;font-family:Arial,sans-serif;background:white;">
            ${html}
        </body>
        </html>
    `);

    printWindow.document.close();

    printWindow.focus();

    printWindow.print();

});

/* ===================================
   EDIT
=================================== */

editBtn.addEventListener("click",()=>{

    const text = invoiceOutput.innerText;

    if(text.trim()==="") return;

    invoicePrompt.value = text;

    invoicePrompt.focus();

    showToast("✏ Invoice loaded into editor");

});

/* ===================================
   AUTO RESIZE TEXTAREA
=================================== */

invoicePrompt.addEventListener("input",()=>{

    invoicePrompt.style.height="auto";

    invoicePrompt.style.height=invoicePrompt.scrollHeight+"px";

});

/* ===================================
   CTRL + ENTER
=================================== */

invoicePrompt.addEventListener("keydown",(e)=>{

    if(e.key==="Enter" && e.ctrlKey){

        e.preventDefault();

        generateInvoice();

    }

});




