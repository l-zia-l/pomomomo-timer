// Final working code - Just right

//DOM variables
let background_image = document.getElementById("timer-progress-background");
let countdown_text = document.getElementById("countdown");
let pause_btn = document.getElementById("pause-btn");
let start_btn = document.getElementById("start-btn");
let reset_btn = document.getElementById("reset-btn");
let dialog = document.getElementById("popup");

//Foundation variables
let countdown = 1;
let interval = null;
let countdown_counter = countdown * 1000; // convert to milliseconds and for how much time is left
countdown_text.textContent = formatTime(countdown_counter);

start_btn.style.display = "inline";
pause_btn.style.display = "none";
dialog.style.display = "none";

//Time renderer on the page = seconds to MM:SS
function formatTime(ms) {
    const totalSec = Math.ceil(ms / 1000);
    const min = Math.floor(totalSec / 60);
    const sec = totalSec % 60;
    return `${min < 10 ? "0" : ""}${min}:${sec < 10 ? "0" : ""}${sec}`;
}

//Synchronization issues fixed with a separate timing function

let startTime;
let animationFrameId;
let isRunning = false;

function updateTimer() {
    const now = Date.now();
    const elapsed = now - startTime;
    const timeLeft = countdown_counter - elapsed;

    if (timeLeft <= 0) {
        countdown_text.textContent = "00:00";
        dialog.style.display = "block";
        addSessionDot(currentSessionType);
        pause_btn.style.display = "none";
        start_btn.style.display = "none";
        isRunning = false;
        cancelAnimationFrame(animationFrameId);
        return;
    }

    countdown_text.textContent = formatTime(timeLeft);
    animationFrameId = requestAnimationFrame(updateTimer);
}



//Start Button
function startTimer() {
    if (isRunning) return;
    isRunning = true;

    start_btn.style.display = "none";
    pause_btn.style.display = "inline";
    dialog.style.display = "none";

    startTime = Date.now();
    background_image.style.animation = `backgroundImage ${countdown}s linear`;
    background_image.style.animationPlayState = "running";
    animationFrameId = requestAnimationFrame(updateTimer);
};


//Pause Button
function pauseTimer() {
    if (!isRunning) return;
    isRunning = false;

    const now = Date.now();
    countdown_counter -= (now - startTime);

    cancelAnimationFrame(animationFrameId);

    start_btn.style.display = "inline";
    pause_btn.style.display = "none";
    background_image.style.animationPlayState = "paused";
};


//Reset Button
function resetTimer() {
    cancelAnimationFrame(animationFrameId);
    isRunning = false;
    countdown_counter = countdown * 1000;

    countdown_text.textContent = formatTime(countdown_counter);

    start_btn.style.display = "inline";
    pause_btn.style.display = "none";
    dialog.style.display = "none";

    background_image.style.animation = "none";
    void background_image.offsetWidth;
    background_image.style.animation = null;
};

//Session Tracker
let sessionCount = 0;
let currentSessionType = "work";
const sessionIcon = document.querySelector(".session-icon");

function handleSessionEnd() {
  addSessionDot(currentSessionType);

  const justFinishedWork = currentSessionType === "work";
  if (justFinishedWork) sessionCount++;

  currentSessionType = justFinishedWork
    ? (sessionCount % 4 === 0 ? "longBreak" : "shortBreak")
    : "work";

  updateSessionVisuals(currentSessionType);
}

function updateSessionVisuals(type){
    const colors = {
        work: "white",
        shortBreak: "aqua",
        longBreak: "yellow"
    };

    sessionIcon.style.backgroundColor = colors[type] || "gray";
}

function addSessionDot(type){
    const tracker = document.getElementById("session-counter");
    const dot = document.createElement("div");
   dot.classList.add("session-dot");

   const colors = {
        work: "white",
        shortBreak: "aqua",
        longBreak: "yellow"
   };

   dot.style.backgroundColor = colors[type] || "gray";
   tracker.appendChild(dot);
};

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

