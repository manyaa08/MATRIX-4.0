document.addEventListener("DOMContentLoaded", () => {
    // --- 1. ELEMENT SELECTION ---
    const plMaster = document.getElementById('pl_master_wrapper');
    const plGlitch = document.getElementById('pl_glitch_container');
    const progressPre = document.getElementById('pl_progress_bar');
    const consolePre = document.getElementById('pl_console_output');
    const keyPre = document.getElementById('pl_key_gen');
    
    // Phase 2, 3, 4 Elements
    const plInterface = document.getElementById('pl_interface');
    const staticBg = document.getElementById('pl_bg_static');
    const codeLog = document.getElementById('pl_code_log');
    const hexLog = document.getElementById('pl_live_hex');
    const fw1 = document.getElementById('pl_fw_1');
    const accessContainer = document.getElementById('pl_access_container');
    const acCard = document.getElementById('pl_card');
    const shackle = document.getElementById('pl_shackle');
    const blackout = document.getElementById('pl_blackout');
    
    // Main Site Content
    const mainSite = document.getElementById('main_site_content');

    // --- LOGIC TO DETECT RELOAD VS NAVIGATION ---
    const navEntries = performance.getEntriesByType('navigation');
    const isReload = navEntries.length > 0 && navEntries[0].type === 'reload';
    const hasVisitedThisSession = sessionStorage.getItem('pl_seen');

    // If it's internal navigation (already seen and NOT a reload)
    if (hasVisitedThisSession && !isReload) {
        if (plMaster) plMaster.style.display = 'none';
        if (mainSite) {
            mainSite.style.display = 'block';
            mainSite.style.opacity = '1';
        }
        return; 
    }

    // --- NEW: ASSET ORCHESTRATION ---
    // Pre-loading heavy media and pre-fetching other pages in the background
    const assets = [
        'images/matrix_lead_logo.png',
        'images/Favicon.png',
        'events.html',
        'sponsors.html',
        'contact_us.html'
    ];

    function preloadAssets() {
        assets.forEach(url => {
            if (url.endsWith('.html')) {
                // Prefetch future pages to make navigation instant
                const link = document.createElement('link');
                link.rel = 'prefetch';
                link.href = url;
                document.head.appendChild(link);
            } else {
                // Prime images in the cache
                const img = new Image();
                img.src = url;
            }
        });
    }
    preloadAssets();

    // Updated log sequence to reflect background activity
    const logSequence = [
        "> INITIALIZING DECRYPTOR...",
        "> BYPASSING SECURE_LAYER_01",
        "> CACHING STATIC_RESOURCES...",
        "> PRE-FETCHING NAV_COORDINATES",
        "> ENCRYPTION KEY FOUND: 0x8F2",
        "> WIPING SYSTEM TRACES...",
        "> BREACH SUCCESSFUL."
    ];

    // --- PHASE ONE: PRELOADER (2.37s) ---
    if (plMaster) plMaster.style.display = 'block';

    let logIdx = 0;
    const logInterval = setInterval(() => {
        if (logIdx < logSequence.length) {
            const div = document.createElement('div');
            div.innerText = logSequence[logIdx];
            div.style.color = logIdx % 2 === 0 ? "white" : "red";
            consolePre.appendChild(div);
            consolePre.scrollTop = consolePre.scrollHeight;
            logIdx++;
        }
    }, 300);

    let startTime = Date.now();
    const durationPre = 2370;

    const preInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        let progress = (elapsed / durationPre) * 100;
        progressPre.style.width = Math.min(progress, 100) + "%";
        
        keyPre.innerText = "0x" + Math.floor(Math.random() * 16777215).toString(16).toUpperCase();

        if (elapsed >= durationPre) {
            clearInterval(preInterval);
            clearInterval(logInterval);
            plGlitch.style.opacity = '0'; 
            setTimeout(() => {
                plGlitch.style.display = 'none';
                plInterface.style.display = 'block'; 
                initPhaseTwo();
            }, 350);
        }
    }, 50);

    function initPhaseTwo() {
        for (let i = 0; i < 60; i++) {
            const block = document.createElement('div');
            block.className = 'pl_static_code';
            block.innerText = "0x" + Math.random().toString(16).slice(2, 6);
            staticBg.appendChild(block);
        }
        document.querySelectorAll('.pl_terminal').forEach(t => t.classList.add('pop-entry'));
        fw1.style.width = "100%";
        const spam = setInterval(() => {
            const line = document.createElement('div');
            line.innerText = "> " + Math.random().toString(36).substring(7);
            codeLog.appendChild(line);
            if (codeLog.childNodes.length > 20) codeLog.removeChild(codeLog.firstChild);
            hexLog.innerText += Math.floor(Math.random() * 16).toString(16) + " ";
            if (hexLog.innerText.length > 400) hexLog.innerText = "";
        }, 40);
        setTimeout(() => {
            clearInterval(spam);
            initPhaseThree();
        }, 550);
    }

    function initPhaseThree() {
        accessContainer.style.display = 'flex';
        setTimeout(() => {
            acCard.style.opacity = "1";
            shackle.style.transform = "translateY(-15px)";
            setTimeout(() => {
                initPhaseFour();
            }, 1100); 
        }, 50);
    }

    function initPhaseFour() {
        blackout.classList.add('active'); 
        setTimeout(() => {
            completeSequence();
        }, 1000); 
    }

    function completeSequence() {
        // Set the flag so internal nav knows we've seen it
        sessionStorage.setItem('pl_seen', 'true');
        
        plMaster.style.display = 'none';
        mainSite.style.display = 'block';
        setTimeout(() => {
            mainSite.style.opacity = '1'; 
        }, 50);
    }
});