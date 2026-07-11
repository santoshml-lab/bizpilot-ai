const requests = document.getElementById("requests");
const emails = document.getElementById("emails");
const documents = document.getElementById("documents");
const invoices = document.getElementById("invoices");
const plans = document.getElementById("plans");
const productivity = document.getElementById("productivity");
const activity = document.getElementById("activity");
const tool = document.getElementById("tool");

// Backend URL
const API = "https://bizpilot-backend-graw.onrender.com/analytics";

loadAnalytics();

async function loadAnalytics(){

    try{

        const res = await fetch(API,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({})
        });

        const data = await res.json();

        if(data.success){

            animate(requests,data.requests);
            animate(emails,data.emails);
            animate(documents,data.documents);
            animate(invoices,data.invoices);
            animate(plans,data.plans);

            productivity.innerHTML=data.productivity+"%";

            tool.innerHTML=data.tool;

            activity.innerHTML="";

            data.activity.forEach(item=>{

                activity.innerHTML+=`
                <p>✅ ${item}</p>
                `;

            });

        }

    }

    catch(e){

        console.log(e);

        // Demo Data
        animate(requests,245);
        animate(emails,61);
        animate(documents,18);
        animate(invoices,29);
        animate(plans,41);

        productivity.innerHTML="96%";

        tool.innerHTML="🤖 AI Chat";

        activity.innerHTML=`
        <p>✅ Invoice Generated</p>
        <p>✅ Document Analyzed</p>
        <p>✅ Smart Plan Created</p>
        <p>✅ Email Generated</p>
        <p>✅ AI Chat Completed</p>
        `;
    }

}

function animate(element,target){

    let count=0;

    const speed=20;

    const timer=setInterval(()=>{

        count++;

        element.innerHTML=count;

        if(count>=target){

            clearInterval(timer);

            element.innerHTML=target;

        }

    },speed);

}
