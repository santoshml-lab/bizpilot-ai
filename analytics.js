/* ===================================
   BIZPILOT AI
   ANALYTICS
=================================== */

const API_URL = "https://bizpilot-backend-graw.onrender.com/analytics";

const requests = document.getElementById("requests");
const emails = document.getElementById("emails");
const documents = document.getElementById("documents");
const invoices = document.getElementById("invoices");
const plans = document.getElementById("plans");
const productivity = document.getElementById("productivity");

const activityList = document.getElementById("activityList");
const toolName = document.getElementById("toolName");

async function loadAnalytics(){

    try{

        const response = await fetch(API_URL,{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({})

        });

        const data = await response.json();

        if(data.success){

            animateCounter(requests,data.requests);

            animateCounter(emails,data.emails);

            animateCounter(documents,data.documents);

            animateCounter(invoices,data.invoices);

            animateCounter(plans,data.plans);

            animateCounter(productivity,data.productivity,"%");

            toolName.innerHTML=data.tool;

            activityList.innerHTML="";

            data.activity.forEach(item=>{

                activityList.innerHTML+=`

                <div class="activity-item">

                    ✅ ${item}

                </div>

                `;

            });

            showToast("✅ Analytics Updated");

        }

    }

    catch(error){

        activityList.innerHTML=`

        <div class="activity-item">

            ❌ Unable to load analytics.

        </div>

        `;

        console.error(error);

    }

}

loadAnalytics();

/* ===================================
   ANIMATED COUNTER
=================================== */

function animateCounter(element,target,suffix=""){

    let start=0;

    const duration=1200;

    const increment=target/(duration/16);

    const timer=setInterval(()=>{

        start+=increment;

        if(start>=target){

            start=target;

            clearInterval(timer);

        }

        element.innerHTML=Math.floor(start)+suffix;

    },16);

}

/* ===================================
   TOAST
=================================== */

function showToast(text){

    const toast=document.getElementById("toast");

    toast.innerHTML=text;

    toast.classList.add("show");

    setTimeout(()=>{

        toast.classList.remove("show");

    },2000);

}

/* ===================================
   REFRESH BUTTON
=================================== */

const refreshBtn=document.querySelector(".new-chat");

refreshBtn.addEventListener("click",()=>{

    showToast("🔄 Refreshing Analytics...");

    loadAnalytics();

});

/* ===================================
   AUTO REFRESH
=================================== */

setInterval(()=>{

    loadAnalytics();

},30000);
