const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbznnPeJ9EwnY0gSQsDRw22-65sqyLccifgH6sVf96CHfHYdcq7yX4h05zCV5o_oB9Zi/exec";

let teamSize = 0;
let isSubmitting = false; 

const dropdown = document.querySelector(".dropdown");
const selectedText = document.getElementById("selectedText");
const formArea = document.getElementById("formArea");
const regForm = document.getElementById("regForm");
const msg = document.getElementById("msg");
const teamSizeInput = document.getElementById("teamSize");
const clearBtn = document.getElementById("clearBtn");
const submitBtn = regForm.querySelector('button[type="submit"]');
const loaderOverlay = document.getElementById("loaderOverlay"); // Added Loader Ref

/* --- Helper: Show/Remove Errors --- */
function showError(element, message) {
    removeError(element);
    if (!element) return;
    const error = document.createElement("span");
    error.className = "error-msg";
    error.innerText = message;
    if (element.type === 'checkbox') {
        error.style.marginTop = "8px"; 
        element.closest('.check-item').insertAdjacentElement("afterend", error);
    } else {
        element.insertAdjacentElement("afterend", error);
    }
}

function removeError(element) {
    let nextEl = element.type === 'checkbox' ? element.closest('.check-item').nextElementSibling : element.nextElementSibling;
    if (nextEl && nextEl.classList.contains("error-msg")) {
        nextEl.remove();
    }
}

function applySanitization(input) {
    const name = input.name;

    input.addEventListener("input", () => {
        let val = input.value;

        // 1. NAME FIELDS: Remove digits and special characters (Allow only A-Z and spaces)
        // We exclude "team_name" if you want teams to have numbers/symbols
        if (name.includes("name") && !name.includes("team")) {
            val = val.replace(/[^A-Za-z\s]/g, "");
        }

        // 2. EMAIL, PHONE, & ROLL NO: Strip all spaces immediately
        if (name.includes("email") || name.includes("phone") || name.includes("roll")) {
            val = val.replace(/\s/g, "");
        }

        // 3. PHONE & ROLL NO: Strip everything except digits
        if (name.includes("phone") || name.includes("roll")) {
            val = val.replace(/\D/g, "");
        }

        input.value = val;
    });

    // Handle Pasting
    input.addEventListener("paste", (e) => {
        setTimeout(() => {
            input.dispatchEvent(new Event("input"));
        }, 0);
    });
}

function validateField(input) {
    const val = input.value.trim();
    const name = input.name;

    if (!val) { showError(input, "Please fill in this field"); return false; }
    
    // Name Validation (Fallback check)
    if (name.includes("name") && !name.includes("team")) {
        if (!/^[A-Za-z\s]+$/.test(val)) { showError(input, "Only alphabets are allowed"); return false; }
    }
    
    // Email Validation
    if (name.includes("email")) {
        if (!val.toLowerCase().endsWith("@thapar.edu")) { 
            showError(input, "Only Thapar mail is accepted"); 
            return false; 
        }
    }
    
    // Phone Validation
    if (name.includes("phone")) {
        if (val.length !== 10) { 
            showError(input, "Phone number must be exactly 10 digits"); 
            return false; 
        }
    }
    
    // Roll Number Validation
    if (name.includes("roll")) {
        if (!/^[17]\d{8,9}$/.test(val)) { 
            showError(input, "Roll number must be 9-10 digits and start with 1 or 7"); 
            return false; 
        }
    }

    removeError(input);
    return true;
}


dropdown.querySelector(".dropdown-selected").onclick = () => {
    if (isSubmitting) return;
    dropdown.classList.toggle("open");
};

dropdown.querySelectorAll(".option").forEach(opt => {
    opt.onclick = () => {
        if (isSubmitting) return;
        teamSize = parseInt(opt.dataset.size);
        teamSizeInput.value = teamSize;
        selectedText.textContent = opt.textContent;
        dropdown.classList.remove("open");
        removeError(dropdown);
        renderForm();
    };
});

function renderForm() {
    formArea.innerHTML = "";
    let html = "";
    if (teamSize === 1) {
        html = `<h2 class="section-title">Member Details</h2>
                <input class="input" name="main_member_name" placeholder="Member Name" required>
                <input class="input" name="main_member_roll" placeholder="Roll Number" maxlength="10" inputmode="numeric" required>
                <input class="input" name="main_member_email" placeholder="Member Thapar Email ID" required>
                <input class="input" name="main_member_phone" placeholder="Member Phone No" maxlength="10" inputmode="numeric" required>`;
    } else if (teamSize === 2) {
        html = `<h2 class="section-title">Member Details</h2>
                <input class="input" name="main_member_name" placeholder="Member 1 Name" required>
                <input class="input" name="main_member_roll" placeholder="Member 1 Roll No" maxlength="10" inputmode="numeric" required>
                <input class="input" name="main_member_email" placeholder="Member 1 Thapar Email ID" required>
                <input class="input" name="main_member_phone" placeholder="Member 1 Phone No" maxlength="10" inputmode="numeric" required>
                <input class="input" name="member2_name" placeholder="Member 2 Name" required>
                <input class="input" name="member2_roll" placeholder="Member 2 Roll No" maxlength="10" inputmode="numeric" required>
                <input class="input" name="member2_phone" placeholder="Member 2 Phone No" maxlength="10" inputmode="numeric" required>`;
    } else if (teamSize > 2) {
        html = `<h2 class="section-title">Team Leader Details</h2>
                <input class="input" name="team_leader_name" placeholder="Team Leader Name" required>
                <input class="input" name="team_leader_roll" placeholder="Team Leader Roll No" maxlength="10" inputmode="numeric" required>
                <input class="input" name="team_leader_email" placeholder="Team Leader Thapar Email ID" required>
                <input class="input" name="team_leader_phone" placeholder="Team Leader Phone No" maxlength="10" inputmode="numeric" required>
                <h2 class="section-title">Team Details</h2>
                <input class="input" name="team_name" placeholder="Team Name" required>
                <h2 class="section-title">Member Details</h2>`;
        for (let i = 2; i <= teamSize; i++) {
            html += `<input class="input" name="member${i}_name" placeholder="Member ${i} Name" required>
                     <input class="input" name="member${i}_roll" placeholder="Member ${i} Roll No" maxlength="10" inputmode="numeric" required>
                     <input class="input" name="member${i}_phone" placeholder="Member ${i} Phone No" maxlength="10" inputmode="numeric" required>`;
        }
    }
    formArea.innerHTML = html;
    formArea.querySelectorAll(".input").forEach(input => {
        input.addEventListener("blur", () => validateField(input));
    });
    // ... existing code in renderForm ...
    formArea.querySelectorAll(".input").forEach(input => {
        input.addEventListener("blur", () => validateField(input));
        // ADD THIS LINE BELOW:
        applySanitization(input); 
    });
}

regForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    let isValid = true;
    document.querySelectorAll(".error-msg").forEach(err => err.remove());
    
    if (!teamSize) { showError(dropdown, "Please select team size"); isValid = false; }
    formArea.querySelectorAll(".input").forEach(input => { if (!validateField(input)) isValid = false; });
    
    const d1_check = document.getElementById("reg_day1");
    const d2_check = document.getElementById("reg_day2");
    const d3_check = document.getElementById("reg_day3");
    
    if(!d1_check.checked && !d2_check.checked && !d3_check.checked) { 
        showError(d3_check, "Please select at least one day"); 
        isValid = false; 
    }

    if (!isValid) return;

    // --- LOCKDOWN FORM & SHOW LOADER ---
    isSubmitting = true;
    loaderOverlay.classList.add("active"); // SHOW LOADER
    submitBtn.disabled = true;
    submitBtn.style.opacity = "0.5";
    regForm.querySelectorAll("input").forEach(el => el.readOnly = true);
    document.querySelectorAll('input[type="checkbox"]').forEach(el => el.disabled = true);
    
    msg.style.color = "white";
    msg.textContent = "Processing registration...";

    // --- AUTO-SCROLL TO BOTTOM ---
    regForm.scrollTo({
        top: regForm.scrollHeight,
        behavior: 'smooth'
    });

    try {
        const formData = new FormData(regForm);

        if (d1_check.checked) formData.set("reg_day1", "on");
        if (d2_check.checked) formData.set("reg_day2", "on");
        if (d3_check.checked) formData.set("reg_day3", "on");

        const res = await fetch(WEB_APP_URL, { method: "POST", body: formData });
        const result = await res.text();

        // HIDE LOADER AFTER FETCH
        loaderOverlay.classList.remove("active"); 

        if (result.includes("SUCCESS")) {
            let chosenDays = [];
            if(d1_check.checked) chosenDays.push("Day 1");
            if(d2_check.checked) chosenDays.push("Day 2");
            if(d3_check.checked) chosenDays.push("Day 3");

            msg.style.color = "lightgreen";
            msg.textContent = "Successfully Registered for " + chosenDays.join(", ") + "!";
            
            regForm.scrollTo({ top: regForm.scrollHeight, behavior: 'smooth' });

            setTimeout(() => location.reload(), 4000);
        } else {
            // UNLOCK FORM ON ERROR
            isSubmitting = false; 
            submitBtn.disabled = false; 
            submitBtn.style.opacity = "1";
            regForm.querySelectorAll("input").forEach(el => el.readOnly = false);
            document.querySelectorAll('input[type="checkbox"]').forEach(el => el.disabled = false);

            msg.style.color = "#ff4d4d";
            if (result.includes("ERR_TEAM_NAME")) msg.textContent = "Team name already taken.";
            else if (result.includes("ERR_USER")) msg.textContent = "Member already registered for selected day(s).";
            else if (result.includes("ERR_EXACT")) msg.textContent = "This team is already registered.";
            else msg.textContent = "Error: " + result;

            regForm.scrollTo({ top: regForm.scrollHeight, behavior: 'smooth' });
        }
    } catch (e) {
        loaderOverlay.classList.remove("active"); // HIDE LOADER ON CRASH
        isSubmitting = false; 
        submitBtn.disabled = false; 
        submitBtn.style.opacity = "1";
        msg.textContent = "Connection error. Please try again.";
        regForm.scrollTo({ top: regForm.scrollHeight, behavior: 'smooth' });
    }
});

clearBtn.onclick = () => {
    if (isSubmitting) return;
    location.reload();
};
        let originalTitle = document.title; 
        window.addEventListener("visibilitychange", function() {
            if (document.hidden) { document.title = "Please come back! 🔴"; } 
            else { document.title = originalTitle; updateTimer(); }
        });


        
/* --- RESPONSIVE NAVBAR SCRIPT --- */
const hamburger = document.getElementById('hamburger-menu');
const navMenu = document.getElementById('nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        // Toggle the Mobile Menu
        navMenu.classList.toggle('active');
        // Toggle the Hamburger Animation
        hamburger.classList.toggle('toggle');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('toggle');
        });
    });
}