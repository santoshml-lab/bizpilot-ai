/* ===================================
   BIZPILOT AI
   EMAIL WRITER
=================================== */

const subject = document.getElementById("subject");
const type = document.getElementById("type");
const tone = document.getElementById("tone");
const details = document.getElementById("details");

const output = document.getElementById("output");

const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const downloadBtn = document.getElementById("downloadBtn");

/* Generate Email */

generateBtn.addEventListener("click", generateEmail);

async function generateEmail(){

    if(details.value.trim()==""){

        alert("Please enter email details.");

        return;

    }

    output.innerHTML="⏳ Generating Professional Email...";

    try{

        const response = await fetch("https://bizpilot-backend-graw.onrender.com/email",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                subject:subject.value,

                type:type.value,

                tone:tone.value,

                details:details.value

            })

        });

        const data=await response.json();

        if(data.success){

            output.innerHTML=data.email;

        }else{

            output.innerHTML="❌ "+data.error;

        }

    }

    catch(err){

        output.innerHTML="❌ Unable to connect to AI Server.";

        console.log(err);

    }

}

/* Copy */

copyBtn.addEventListener("click",()=>{

    navigator.clipboard.writeText(output.innerText);

    copyBtn.innerHTML="✅ Copied";

    setTimeout(()=>{

        copyBtn.innerHTML="📋 Copy";

    },2000);

});

/* Download */

downloadBtn.addEventListener("click",()=>{

    const blob=new Blob([output.innerText],{type:"text/plain"});

    const a=document.createElement("a");

    a.href=URL.createObjectURL(blob);

    a.download="BizPilot_Email.txt";

    a.click();

});
