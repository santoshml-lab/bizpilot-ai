/* ===================================
   BIZPILOT AI
   dashboard.js
=================================== */

// ==========================
// Welcome Message
// ==========================

const heading = document.querySelector("header h1");

const hour = new Date().getHours();

let greeting = "Welcome";

if (hour < 12) {
    greeting = "🌅 Good Morning";
} else if (hour < 17) {
    greeting = "☀ Good Afternoon";
} else {
    greeting = "🌙 Good Evening";
}

if (heading) {
    heading.innerHTML = `${greeting}, Santosh 👋`;
}

// ==========================
// Overview Counter Animation
// ==========================

function animateCounter(element, target) {

    let count = 0;

    const speed = target / 60;

    const timer = setInterval(() => {

        count += speed;

        if (count >= target) {

            count = target;

            clearInterval(timer);

        }

        element.innerHTML = Math.floor(count);

    }, 25);

}

document.querySelectorAll(".overview-card h1").forEach(card => {

    const value = parseInt(card.innerText);

    if (!isNaN(value)) {

        card.innerHTML = "0";

        animateCounter(card, value);

    }

});

// ==========================
// Quick Button Click
// ==========================

document.querySelectorAll(".quick-btn").forEach(btn => {

    btn.addEventListener("click", () => {

        alert("🚀 This feature will be connected soon.");

    });

});

// ==========================
// Card Button Click
// ==========================

document.querySelectorAll(".card-btn").forEach(btn => {

    btn.addEventListener("click", () => {

        alert("🤖 AI Module Coming Soon!");

    });

});

// ==========================
// Logout
// ==========================

const logout = document.getElementById("logoutBtn");

if (logout) {

    logout.addEventListener("click", () => {

        if (confirm("Logout from BizPilot AI?")) {

            localStorage.removeItem("user");

            window.location.href = "pages/login.html";

        }

    });

}

// ==========================
// Notification
// ==========================

setTimeout(() => {

    alert("🎉 Welcome to BizPilot AI Dashboard!");

}, 1200);

console.log("✅ Dashboard Loaded Successfully");
