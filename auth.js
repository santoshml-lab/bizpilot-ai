// ===================================
// BizPilot AI Authentication
// ===================================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

loginForm.addEventListener("submit", async (e) => {

e.preventDefault();

const email = document.getElementById("email").value;

const password = document.getElementById("password").value;

const { data, error } = await db.auth.signInWithPassword({

email: email,

password: password

});

if (error) {

alert("❌ " + error.message);

return;

}

alert("✅ Login Successful");

window.location.href = "../dashboard.html";

});

}

// ===================================
// SIGNUP
// ===================================

const signupForm = document.getElementById("signupForm");

if (signupForm) {

signupForm.addEventListener("submit", async (e) => {

e.preventDefault();

const email = document.getElementById("email").value;

const password = document.getElementById("password").value;

const { data, error } = await db.auth.signUp({

email: email,

password: password

});

if (error) {

alert("❌ " + error.message);

return;

}

alert("🎉 Account Created Successfully! Please verify your email.");

window.location.href = "login.html";

});

}

// ===================================
// GOOGLE LOGIN
// ===================================

const googleBtn = document.getElementById("googleLogin");

if (googleBtn) {

googleBtn.addEventListener("click", async () => {

const { error } = await db.auth.signInWithOAuth({

provider: "google"

});

if (error) {

alert(error.message);

}

});

}

// ===================================
// CHECK LOGIN SESSION
// ===================================

async function checkUser() {

const {

data: { session }

} = await db.auth.getSession();

if (session) {

console.log("✅ Logged in as:", session.user.email);

}

}

checkUser();
