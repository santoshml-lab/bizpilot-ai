/* ===================================
   BIZPILOT AI
   DOCUMENT AI
=================================== */

const fileInput = document.getElementById("documentFile");
const analyzeBtn = document.getElementById("analyzeBtn");

const result = document.getElementById("result");

const copyBtn = document.getElementById("copyBtn");
const downloadBtn = document.getElementById("downloadBtn");

/* Analyze Document */

analyzeBtn.addEventListener("click", analyzeDocument);

async function analyzeDocument() {

    if (fileInput.files.length === 0) {

        alert("Please select a PDF or DOCX file.");

        return;

    }

    result.innerHTML = "⏳ AI is analyzing your document...";

    const formData = new FormData();

    formData.append("file", fileInput.files[0]);

    try {

        const response = await fetch(
            "https://bizpilot-backend-graw.onrender.com/document",
            {
                method: "POST",
                body: formData
            }
        );

        const data = await response.json();

        if (data.success) {

            result.innerHTML = marked.parse(data.analysis);

        } else {

            result.innerHTML = "❌ " + data.error;

        }

    } catch (err) {

        console.log(err);

        result.innerHTML = "❌ Unable to connect to AI Server.";

    }

}

/* Copy */

copyBtn.addEventListener("click", () => {

    navigator.clipboard.writeText(result.innerText);

    copyBtn.innerHTML = "✅ Copied";

    setTimeout(() => {

        copyBtn.innerHTML = "📋 Copy";

    }, 2000);

});

/* Download */

downloadBtn.addEventListener("click", () => {

    const blob = new Blob([result.innerText], {
        type: "text/plain"
    });

    const a = document.createElement("a");

    a.href = URL.createObjectURL(blob);

    a.download = "Document_Analysis.txt";

    a.click();

});
