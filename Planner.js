const plannerPrompt = document.getElementById("plannerPrompt");
const plannerBtn = document.getElementById("plannerBtn");
const plannerResult = document.getElementById("plannerResult");

const copyPlan = document.getElementById("copyPlan");
const downloadPlan = document.getElementById("downloadPlan");

// Generate AI Plan
plannerBtn.addEventListener("click", generatePlan);

async function generatePlan() {

    if (plannerPrompt.value.trim() === "") {

        alert("Please enter your goal.");

        return;

    }

    plannerResult.innerHTML = "🤖 Generating your AI plan...";

    try {

        const response = await fetch("https://bizpilot-backend-graw.onrender.com/planner", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                prompt: plannerPrompt.value

            })

        });

        const data = await response.json();

        if (data.success) {

            plannerResult.innerHTML = data.reply;

        } else {

            plannerResult.innerHTML = "❌ " + data.error;

        }

    } catch (err) {

        console.error(err);

        plannerResult.innerHTML = "❌ Unable to connect to AI Server.";

    }

}

// Copy Plan
copyPlan.addEventListener("click", () => {

    navigator.clipboard.writeText(plannerResult.innerText);

    alert("✅ Plan copied!");

});

// Download Plan
downloadPlan.addEventListener("click", () => {

    const blob = new Blob([plannerResult.innerText], {

        type: "text/plain"

    });

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);

    link.download = "AI_Plan.txt";

    link.click();

});
