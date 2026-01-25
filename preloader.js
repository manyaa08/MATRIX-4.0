document.addEventListener("DOMContentLoaded", () => {
    // --- 1. ELEMENT SELECTION ---
    const plMaster = document.getElementById('pl_master_wrapper');
    const mainSite = document.getElementById('main_site_content');
    
    // Elements for the animation phases
    const plGlitch = document.getElementById('pl_glitch_container');
    const progressPre = document.getElementById('pl_progress_bar');
    const consolePre = document.getElementById('pl_console_output');
    const keyPre = document.getElementById('pl_key_gen');
    const plInterface = document.getElementById('pl_interface');
    const staticBg = document.getElementById('pl_bg_static');
    const codeLog = document.getElementById('pl_code_log');
    const hexLog = document.getElementById('pl_live_hex');
    const fw1 = document.getElementById('pl_fw_1');
    const accessContainer = document.getElementById('pl_access_container');
    const acCard = document.getElementById('pl_card');
    const shackle = document.getElementById('pl_shackle');
    const blackout = document.getElementById('pl_blackout');

    // --- 2. MODIFIED SESSION CHECK ---
    // We only check if the flag exists. We ignore performance.navigation types (reloads).
    const hasVisitedThisSession = sessionStorage.getItem('pl_seen');

    if (hasVisitedThisSession) {
        if (plMaster) plMaster.style.display = 'none';
        if (mainSite) {
            mainSite.style.display = 'block';
            mainSite.style.opacity = '1';
        }
        return; // Stop execution here
    }

    // --- NEW: ADVANCED BACKGROUND LOADING ---
    const pagesToPrefetch = [
        'events.html', 
        'sponsors.html', 
        'contact_us.html',
        'Registration_index.html', 
        'index.html'
    ];

    // FIXED: Changed backslashes to forward slashes
    const imagesToCache = [
        'images/Title_Sponsor.jpeg',
        'images/Sponsor2.jpeg',
        'images/Sponsor1.jpeg',
        'images/Sponsor_BG.png',
        'images/background-image.jpeg',
        'images/matrix_lead_logo.png', 
        'images/Favicon.png', 
        'images/events_page_i1.jpeg',
        'images/R1.png',
        'images/R2.png',    
        'images/R3.png',
        'assets/images/bg.png',
        'assets/images/bg2.png',
        'assets/images/bg3.png',
        'assets/images/bg4.png',
        'assets/images/matrix_lead_logo.png'
    ];

    // This line is syntactically correct!
    const vaultVideoPath = 'images/Vault_Handle_Animation_Generation.mp4';

    function initiateBackgroundLoad() {
        // 1. Prefetch HTML pages
        pagesToPrefetch.forEach(url => {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = url;
            document.head.appendChild(link);
        });

        // 2. Cache Images
        imagesToCache.forEach(src => {
            const img = new Image();
            img.src = src;
        });

        // 3. Prime the Vault Video
        const videoLoader = document.createElement('video');
        videoLoader.src = vaultVideoPath;
        videoLoader.preload = 'auto';
        videoLoader.muted = true;
        videoLoader.style.display = 'none';
        document.body.appendChild(videoLoader);
    }
    
    initiateBackgroundLoad();

    const logSequence = [
        "> INITIALIZING DECRYPTOR...",
        "> BYPASSING SECURE_LAYER_01",
        "> BUFFERING VAULT_STREAM...",
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
        sessionStorage.setItem('pl_seen', 'true');
        plMaster.style.display = 'none';
        mainSite.style.display = 'block';
        setTimeout(() => {
            mainSite.style.opacity = '1'; 
        }, 50);
    }
});