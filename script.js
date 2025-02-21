// Function to set Login Background
function setLoginBackground() {
    const app = document.getElementById("app");
    app.style.background = "url('images/img-2.png') no-repeat center center";
    app.style.backgroundSize = "cover";
}

// Function to set Dashboard Background
function setDashboardBackground() {
    const app = document.getElementById("app");
    app.style.background = "url('images/img-3.png') no-repeat center center";
    app.style.backgroundSize = "cover";
}

// Show Sign Up Page
function showSignUp() {
    document.getElementById("loginPage").classList.add("hidden");
    document.getElementById("signUpPage").classList.remove("hidden");
}

// Show Login Page
function showLogin() {
    document.getElementById("signUpPage").classList.add("hidden");
    document.getElementById("loginPage").classList.remove("hidden");
}

// Check Login Status
if (localStorage.getItem("username")) {
    showDashboard(localStorage.getItem("username"));
} else {
    setLoginBackground();
}

// Login Function
document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "admin" && password === "password") { // Replace with proper authentication
        localStorage.setItem("username", username);
        showDashboard(username);
    } else {
        const message = document.getElementById("message");
        message.textContent = "Invalid credentials!";
        message.style.color = "red";
    }
});

// Show Dashboard
function showDashboard(username) {
    document.getElementById("loginPage").style.display = "none";
    document.getElementById("dashboardPage").style.display = "block";
    setDashboardBackground();
}

// Disease Data
const diseases = {
    disease: {
        title: "Alzheimer's Disease",
        description: "A progressive neurological disorder that affects memory and thinking.",
        image: "images/OIP.png",
        stages: [
            "Stage 1: Memory Lapses – Forgetting recent conversations, appointments, or names.",
            "Stage 2: Increased Confusion – Forgetting personal history, addresses, or phone numbers.",
            "Stage 3: Loss of Communication – Limited ability to speak or understand language.",
            "Stage 4: Severe Memory Loss – Forgetting close family members and major life events.",
            "Stage 5: Total Dependence – Needing round-the-clock care for eating, hygiene, and movement."
        ]
    }
};

// Show Disease Details
function showDetails(diseaseKey) {
    const disease = diseases[diseaseKey];
    if (!disease) return;

    document.getElementById("diseaseTitle").textContent = disease.title;
    document.getElementById("diseaseDescription").textContent = disease.description;
    document.getElementById("diseaseImage").src = disease.image;

    const stagesList = document.getElementById("diseaseStages");
    stagesList.innerHTML = "";
    disease.stages.forEach(stage => {
        const li = document.createElement("li");
        li.textContent = stage;
        stagesList.appendChild(li);
    });
    function closePopup() {
        document.getElementById("diseaseDetails").classList.add("hidden");
    }    
}

// Load User Profile
document.addEventListener("DOMContentLoaded", function () {
    loadUserProfile();

    const stages = document.querySelectorAll(".stage");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, { threshold: 0.2 });

    stages.forEach(stage => observer.observe(stage));
});

function loadUserProfile() {
    document.getElementById("displayUsername").textContent = localStorage.getItem("username") || "Guest";
    document.getElementById("displayEmail").textContent = localStorage.getItem("email") || "Not Set";
}

// Edit Profile Functions
function editProfile() {
    document.getElementById("editProfileForm").classList.remove("hidden");
}

function closeEditProfile() {
    document.getElementById("editProfileForm").classList.add("hidden");
}

function saveProfile() {
    const newUsername = document.getElementById("newUsername").value;
    const newEmail = document.getElementById("newEmail").value;
    
    if (newUsername) localStorage.setItem("username", newUsername);
    if (newEmail) localStorage.setItem("email", newEmail);

    loadUserProfile();
    closeEditProfile();
}

// Change Password
function changePassword() {
    const oldPassword = document.getElementById("oldPassword").value;
    const newPassword = document.getElementById("newPassword").value;

    if (oldPassword === "password") { // Replace with real authentication logic
        alert("Password changed successfully!");
    } else {
        alert("Incorrect old password!");
    }
}

function closeChangePassword() {
    document.getElementById("changePasswordForm").classList.add("hidden");
}

// Load Medical History
function loadMedicalHistory() {
    const historyList = document.getElementById("medicalHistoryList");
    historyList.innerHTML = "<li>No records found.</li>"; // Replace with real data
}

// Show Pages
function showPage(pageId) {
    document.querySelectorAll(".page").forEach(page => page.style.display = "none");
    document.getElementById(pageId).style.display = "block";
}

// File Upload
function uploadFile() {
    const fileInput = document.getElementById("fileInput");
    alert(fileInput.files.length > 0 ? "File uploaded!" : "Select a file first.");
}

// Logout
document.getElementById("logout").addEventListener("click", function () {
    localStorage.removeItem("username");
    document.getElementById("dashboardPage").style.display = "none";
    document.getElementById("loginPage").style.display = "block";
    setLoginBackground();
});

// Toggle Mobile Menu
function toggleMenu() {
    document.getElementById("navLinks").classList.toggle("show");
}

// GSAP Animations
gsap.from(".stage", {
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: 0.3,
    scrollTrigger: {
        trigger: ".stages-container",
        start: "top 80%",
        toggleActions: "play none none reverse"
    }
});
