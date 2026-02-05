// Final working code - Just right

//DOM variables
//Main Page
let background_slider = document.getElementById("timer-progress-background");
let countdown_text = document.getElementById("countdown");
let session_icon = document.querySelector('.session-icon');
const session_container = document.getElementById("session-counter");
let pause_btn = document.getElementById("pause-btn");
let start_btn = document.getElementById("start-btn");
let reset_btn = document.getElementById("reset-btn");
let dialog = document.getElementById("popup");

//Nav Menu
let nav_menu = document.getElementById("nav-menu");
let menu_toggle = document.getElementById("nav-toggle");
let background_timeout = document.getElementById("timeout-nav-screen");
let preset_label = document.getElementsByClassName("subheading")[0];
let custom_label = document.getElementsByClassName("subheading")[1];
let preset_menu = document.getElementById("preset-table");
let custom_menu = document.getElementById("custom-timer-form");
let socials_menu = document.getElementById("social-links");

//Helper: Resets buttons
function resetControls() {
    start_btn.style.display = "inline";
    pause_btn.style.display = "none";
    dialog.style.display = "none";
}

//Helper: Resets background slider
function resetBackground(){
    background_slider.style.animation = "none";
    void background_slider.offsetWidth;
    background_slider.style.animation = null;
}

//State Management
const MODES = {
    focus: { 
        time: 0.3 * 60 * 1000,
        label: "Focus Mode",
        color: "#ff5638ff"
    },
    short: { 
        time: 0.1 * 60 * 1000,
        label: "Short Break",
        color: "#9c5313ff"
    },
    long: { 
        time: 0.2 * 60 * 1000,
        label: "Long Break", 
        color: "#17325aff"
    }
};

//Foundation variables
let currentMode = "focus";
let sessionsCompleted = 0; 
const SESSIONS_BEFORE_LONG_BREAK = 2;
let countdown_counter = MODES[currentMode].time; 
countdown_text.textContent = formatTime(countdown_counter);

//Change these into a function
resetControls();

//Time renderer on the page = seconds to MM:SS
function formatTime(ms) {
    const totalSec = Math.ceil(ms / 1000);
    const min = Math.floor(totalSec / 60);
    const sec = totalSec % 60;
    return `${min < 10 ? "0" : ""}${min}:${sec < 10 ? "0" : ""}${sec}`;
}

//Switch the state of the app
function switchMode(newMode) {
    currentMode = newMode;
    
    countdown_counter = MODES[newMode].time;
    countdown_text.textContent = formatTime(countdown_counter);
    
    session_icon.textContent = MODES[newMode].label;

    background_slider.style.backgroundColor = MODES[newMode].color;

    resetControls();
    resetBackground();
    
    //Log it (for debugging)
    console.log(`Switched to ${newMode}`);
}


//Timer Buttons
let startTime;
let animationFrameId;
let isRunning = false;

function updateTimer() {
    const now = Date.now();
    const elapsed = now - startTime;
    const timeLeft = countdown_counter - elapsed;

    if (timeLeft <= 0) {
        isRunning = false;
        cancelAnimationFrame(animationFrameId);
        countdown_text.textContent = "00:00";

        //Sound

        if (currentMode === "focus") {
            sessionsCompleted++;
            updateSessionVisuals(); 
            
            if (sessionsCompleted >= SESSIONS_BEFORE_LONG_BREAK) {
                sessionsCompleted = 0; // Reset the cycle
                switchMode("long");
            } else {
                switchMode("short");
            }
            
            // Show message for break
            dialog.innerText = "Nice work! Time for a break.";
            dialog.style.display = "block";

        } else {
            switchMode("focus");
            
            // Show message for work
            dialog.innerText = "Break over! Let's focus.";
            dialog.style.display = "block";
        }

        //resetControls();
        return;
    }

    countdown_text.textContent = formatTime(timeLeft);
    animationFrameId = requestAnimationFrame(updateTimer);
}

function updateSessionVisuals() {
    const dot = document.createElement("div");
    dot.classList.add("session-dot");
    dot.style.backgroundColor = "white";
    
    session_container.appendChild(dot);
}



//Start Button
function startTimer() {
    if (isRunning) return;
    isRunning = true;

    start_btn.style.display = "none";
    pause_btn.style.display = "inline";
    dialog.style.display = "none";

    startTime = Date.now();
    const durationInSeconds = MODES[currentMode].time / 1000;
    
    let animationName = "slideOutLeft";
    
    if (currentMode !== "focus") {
        animationName = "slideInRight";
        
        background_slider.style.transform = "translateX(-100%)";
    }

    background_slider.style.animation = `${animationName} ${durationInSeconds}s linear forwards`;
    background_slider.style.animationPlayState = "running";
    
    animationFrameId = requestAnimationFrame(updateTimer);
};


//Pause Button
function pauseTimer() {
    if (!isRunning) return;
    isRunning = false;

    const now = Date.now();
    countdown_counter -= (now - startTime);

    cancelAnimationFrame(animationFrameId);

    resetControls();
    background_slider.style.animationPlayState = "paused";
};


//Reset Button
function resetTimer() {
    cancelAnimationFrame(animationFrameId);
    isRunning = false;

    countdown_counter = MODES[currentMode].time;
    countdown_text.textContent = formatTime(countdown_counter);

    resetControls();
    resetBackground();
    
    background_slider.style.transform = "translateX(0)";
};

//Reusable Hide Element Toggle Function
function toggleHidden(element){
    element.classList.toggle("hidden");
};

//Customization Panel - Navigation Menu

nav_menu.classList.add("hidden");
menu_toggle.onclick = () => {
    toggleHidden(nav_menu);
    background_timeout.classList.toggle("timeout-set")
};
background_timeout.onclick = () => {
  nav_menu.classList.add("hidden");
  background_timeout.classList.remove("timeout-set");
};

//Customization Panel - Main Buttons (Timer, Follow)
preset_menu.classList.add("hidden");
custom_menu.classList.add("hidden");

preset_label.onclick = () =>{
    toggleHidden(preset_menu);
    toggleHidden(socials_menu);
    toggleHidden(custom_label)
}

custom_label.onclick = () =>{
    toggleHidden(custom_menu);
    toggleHidden(socials_menu);
    toggleHidden(preset_label);
}
/*First Draft - Error: Timer too slow

//DOM variables
let background_image = document.getElementById("timer-progress-background");
let countdown_text = document.getElementById("countdown");
let pause_btn = document.getElementById("pause-btn");
let start_btn = document.getElementById("start-btn");
let reset_btn = document.getElementById("reset-btn");
let dialog = document.getElementById("popup");

//Foundation variables
let countdown = 5;
let interval = null;
let countdown_counter = countdown; //for how much time is left
countdown_text.textContent = formatTime(countdown_counter);

start_btn.style.display = "inline";
pause_btn.style.display = "none";
dialog.style.display = "none";

//Time renderer on the page = seconds to MM:SS
function formatTime(seconds){
    let min = Math.floor(seconds / 60);
    let sec = seconds % 60;
    return `${min < 10 ? "0" : ""}${min}:${sec < 10 ? "0" : ""}${sec}`;
}

//Button functions

//Start Button (contains setInterval)
function startTimer(){
    start_btn.style.display = "none";
    pause_btn.style.display = "inline";
    dialog.style.display = "none";
    background_image.style.animation = `backgroundImage ${countdown}s linear forwards`;

    interval = setInterval(() => {
        if (countdown_counter <= 0){
            clearInterval(interval);
            countdown_text.textContent = "00:00";
            start_btn.style.display = "none";
            pause_btn.style.display = "inline";
            dialog.style.display = "block";
        } else{
            countdown_counter--;
            countdown_text.textContent = formatTime(countdown_counter);    
        }
    }, 1000);
};

//Pause Button
function pauseTimer(){
    clearInterval(interval);    
    start_btn.style.display = "inline";
    pause_btn.style.display = "none";
    background_image.style.animationPlayState = "paused";
};

//Reset Button
function resetTimer(){
    //Timer update
    clearInterval(interval);
    countdown_counter = countdown;
    countdown_text.textContent = formatTime(countdown_counter);
    
    //Button states
    start_btn.style.display = "inline";
    pause_btn.style.display = "none";
    dialog.style.display = "none";
    background_image.style.animation = "none";
    void background_image.offsetWidth; // trick to re-trigger animation
    background_image.style.animation = null;
};
*/

/* Second Draft - Error: Timer too fast

//DOM variables
let background_image = document.getElementById("timer-progress-background");
let countdown_text = document.getElementById("countdown");
let pause_btn = document.getElementById("pause-btn");
let start_btn = document.getElementById("start-btn");
let reset_btn = document.getElementById("reset-btn");
let dialog = document.getElementById("popup");

//Foundation variables
let countdown = 5;
let interval = null;
let countdown_counter = countdown; //for how much time is left
countdown_text.textContent = formatTime(countdown_counter);

start_btn.style.display = "inline";
pause_btn.style.display = "none";
dialog.style.display = "none";

function formatTime(seconds){
    let min = Math.floor(seconds / 60);
    let sec = seconds % 60;
    return `${min < 10 ? "0" : ""}${min}:${sec < 10 ? "0" : ""}${sec}`;
}

let startTime;
let timeoutId;
let isRunning = false;

function tick() {
    if (countdown_counter <= 0) {
        countdown_text.textContent = "00:00";
        dialog.style.display = "block";
        start_btn.style.display = "none";
        pause_btn.style.display = "none";
        isRunning = false;
        return;
    }

    countdown_text.textContent = formatTime(countdown_counter);
    countdown_counter--;

    timeoutId = setTimeout(tick, 1000);
}


function startTimer() {
    if (isRunning) return; // prevent spamming

    isRunning = true;
    start_btn.style.display = "none";
    pause_btn.style.display = "inline";
    dialog.style.display = "none";

    background_image.style.animation = `backgroundImage ${countdown}s linear running`;

    tick(); // start ticking immediately
}


function pauseTimer() {
    clearTimeout(timeoutId);
    isRunning = false;

    start_btn.style.display = "inline";
    pause_btn.style.display = "none";

    background_image.style.animationPlayState = "paused";
}


function resetTimer() {
    clearTimeout(timeoutId);
    countdown_counter = countdown;
    isRunning = false;

    countdown_text.textContent = formatTime(countdown_counter);

    start_btn.style.display = "inline";
    pause_btn.style.display = "none";
    dialog.style.display = "none";

    background_image.style.animation = "none";
    void background_image.offsetWidth;
    background_image.style.animation = null;
}
*/

