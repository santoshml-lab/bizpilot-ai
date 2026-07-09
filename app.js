/* ===================================
   BIZPILOT AI
   app.js
   PART 1
=================================== */

// ==========================
// Smooth Scroll
// ==========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

anchor.addEventListener("click", function(e){

e.preventDefault();

const target=document.querySelector(this.getAttribute("href"));

if(target){

target.scrollIntoView({

behavior:"smooth"

});

}

});

});

// ==========================
// Hero Buttons
// ==========================

const primaryBtn=document.querySelector(".primary-btn");

if(primaryBtn){

primaryBtn.addEventListener("click",()=>{

alert("🚀 Welcome to BizPilot AI!");

});

}

const secondaryBtn=document.querySelector(".secondary-btn");

if(secondaryBtn){

secondaryBtn.addEventListener("click",()=>{

alert("🎥 Demo Coming Soon!");

});

}

// ==========================
// Fade Animation
// ==========================

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.style.opacity="1";

entry.target.style.transform="translateY(0)";

}

});

},

{

threshold:.2

});

document.querySelectorAll(

".feature-card,.why-card,.price-card,.testimonial-card,.about-box"

).forEach(card=>{

card.style.opacity="0";

card.style.transform="translateY(40px)";

card.style.transition=".8s";

observer.observe(card);

});

// ==========================
// Counter Animation
// ==========================

function animateCounter(el,target){

let count=0;

const speed=target/80;

const timer=setInterval(()=>{

count+=speed;

if(count>=target){

count=target;

clearInterval(timer);

}

el.innerText=Math.floor(count);

},20);

}

/* ===================================
   BIZPILOT AI
   app.js
   PART 2
=================================== */

// ==========================
// About Stats Counter
// ==========================

const aboutSection = document.querySelector(".about-stats");

if (aboutSection) {

let started = false;

window.addEventListener("scroll", () => {

const top = aboutSection.getBoundingClientRect().top;

if (top < window.innerHeight - 100 && !started) {

started = true;

document.querySelectorAll(".about-box h1").forEach(counter => {

let value = counter.innerText.replace(/\D/g, "");

if (value) {

animateCounter(counter, parseInt(value));

}

});

}

});

}

// ==========================
// Floating Cards Effect
// ==========================

document.querySelectorAll(

".feature-card,.why-card,.price-card,.testimonial-card"

).forEach(card => {

card.addEventListener("mousemove", (e) => {

const rect = card.getBoundingClientRect();

const x = e.clientX - rect.left;

const y = e.clientY - rect.top;

card.style.background = `radial-gradient(circle at ${x}px ${y}px,
rgba(37,99,235,.20),
rgba(17,24,39,.92))`;

});

card.addEventListener("mouseleave", () => {

card.style.background = "rgba(17,24,39,.80)";

});

});

// ==========================
// Navbar Shadow
// ==========================

window.addEventListener("scroll", () => {

const header = document.querySelector("header");

if (window.scrollY > 40) {

header.style.boxShadow =
"0 10px 35px rgba(0,0,0,.35)";

} else {

header.style.boxShadow = "none";

}

});

// ==========================
// Logo Animation
// ==========================

const logo = document.querySelector(".logo");

if (logo) {

setInterval(() => {

logo.style.transform = "scale(1.05)";

setTimeout(() => {

logo.style.transform = "scale(1)";

}, 500);

}, 4000);

}

/* ===================================
   BIZPILOT AI
   app.js
   PART 3 (FINAL)
=================================== */

// ==========================
// AI Welcome Notification
// ==========================

window.addEventListener("load", () => {

setTimeout(() => {

const popup = document.createElement("div");

popup.className = "ai-popup";

popup.innerHTML = "🤖 Welcome to <b>BizPilot AI</b>!";

popup.style.cssText = `
position:fixed;
top:20px;
right:20px;
background:#2563EB;
color:white;
padding:16px 24px;
border-radius:14px;
box-shadow:0 15px 40px rgba(37,99,235,.35);
z-index:9999;
font-weight:600;
transition:.4s;
`;

document.body.appendChild(popup);

setTimeout(() => {

popup.style.opacity = "0";
popup.style.transform = "translateY(-20px)";

setTimeout(() => popup.remove(), 500);

}, 3000);

}, 1000);

});

// ==========================
// Hero Fade Animation
// ==========================

const heroTitle = document.querySelector(".hero h1");

if (heroTitle) {
    heroTitle.style.opacity = "0";
    heroTitle.style.transform = "translateY(20px)";

    setTimeout(() => {
        heroTitle.style.transition = "all 0.8s ease";
        heroTitle.style.opacity = "1";
        heroTitle.style.transform = "translateY(0)";
    }, 300);
}













// ==========================
// Live Clock
// ==========================

const clock = document.createElement("div");

clock.style.cssText = `
position:fixed;
bottom:20px;
right:20px;
background:#111827;
color:#fff;
padding:12px 18px;
border-radius:12px;
font-weight:600;
box-shadow:0 10px 30px rgba(0,0,0,.3);
z-index:999;
`;

document.body.appendChild(clock);

setInterval(() => {

const now = new Date();

clock.innerHTML = "🕒 " + now.toLocaleTimeString();

}, 1000);

// ==========================
// Button Ripple Effect
// ==========================

document.querySelectorAll("button").forEach(btn => {

btn.addEventListener("click", function(e){

const ripple = document.createElement("span");

const rect = this.getBoundingClientRect();

const size = Math.max(rect.width, rect.height);

ripple.style.width = ripple.style.height = size + "px";

ripple.style.left = (e.clientX - rect.left - size/2) + "px";

ripple.style.top = (e.clientY - rect.top - size/2) + "px";

ripple.className = "ripple";

this.appendChild(ripple);

setTimeout(() => ripple.remove(), 600);

});

});

console.log("✅ BizPilot AI Loaded Successfully");
