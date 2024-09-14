let pomodoro = document.getElementById("pomodoro-timer");
let short = document.getElementById("short-timer");
let long = document.getElementById("long-timer");
let currentTimer = null;
let myInterval = null;

function showDefaultTimer() {
    pomodoro.style.display = "block";
    short.style.display = "none";
    long.style.display = "none";
}

function hideAll() {
    let timers = document.querySelectorAll(".timer-display");
    timers.forEach((timer) => (timer.style.display = "none"));
}

function startTimer(timerDisplay) {
    if (myInterval) {
        clearInterval(myInterval);
    }

    let timerDuration = timerDisplay.getAttribute("data-duration");
    let durationInMilliseconds = timerDuration * 60 * 1000;
    let endTimestamp = Date.now() + durationInMilliseconds;

    myInterval = setInterval(function () {
        let timeRemaining = endTimestamp - Date.now();

        if (timeRemaining <= 0) {
            clearInterval(myInterval);
            timerDisplay.textContent = "00:00";
            let alarm = new Audio("https://www.freespecialeffects.co.uk/soundfx/scifi/electronic.wav");
            alarm.play();
        } else {
            let minutes = Math.floor(timeRemaining / 60000);
            let seconds = Math.floor((timeRemaining % 60000) / 1000).toString().padStart(2, "0");
            timerDisplay.textContent = `${minutes}:${seconds}`;
        }
    }, 1000);
}

document.getElementById("pomodoro-session").addEventListener("click", function () {
    hideAll();
    pomodoro.style.display = "block";
    currentTimer = pomodoro;
});

document.getElementById("short-break").addEventListener("click", function () {
    hideAll();
    short.style.display = "block";
    currentTimer = short;
});

document.getElementById("long-break").addEventListener("click", function () {
    hideAll();
    long.style.display = "block";
    currentTimer = long;
});

document.getElementById("start").addEventListener("click", function () {
    if (currentTimer) {
        startTimer(currentTimer);
        document.getElementById("timer-message").style.display = "none"; 
    } else {
        document.getElementById("timer-message").style.display = "block";
    }
});

document.getElementById("stop").addEventListener("click", function () {
    if (myInterval) {
        clearInterval(myInterval);
    }
});
