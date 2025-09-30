let hours = 0;
let minutes = 0;
let seconds = 0;
let milliseconds = 0; 
let timerInterval; 

// Get elements by ID
const hourDisplay = document.getElementById('hours');
const minuteDisplay = document.getElementById('minutes');
const secondDisplay = document.getElementById('seconds');
const millisecondDisplay = document.getElementById('miliseconds'); 
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('laps');

// Start button
startButton.addEventListener('click', function () {
    if (timerInterval) return;  // Prevent multiple timers from being set
    
    timerInterval = setInterval(function () {
        milliseconds++; // Increment milliseconds
        
        if (milliseconds === 100) {
            milliseconds = 0;
            seconds++;  // Increment seconds
        }

        if (seconds === 60) {
            seconds = 0;
            minutes++;  // Increment minutes
        }

        if (minutes === 60) {
            minutes = 0;
            hours++;  // Increment hours
        }

        // Update time displays
        hourDisplay.textContent = formatTime(hours);
        minuteDisplay.textContent = formatTime(minutes);
        secondDisplay.textContent = formatTime(seconds);
        millisecondDisplay.textContent = formatTime(milliseconds);  // Display milliseconds
    }, 10); // Update every 10ms for milliseconds
});

// Stop button
stopButton.addEventListener('click', function () {
    clearInterval(timerInterval);
    timerInterval = null;
});

// Reset button
resetButton.addEventListener('click', function () {
    clearInterval(timerInterval);
    timerInterval = null;
    
    hours = 0;
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    
    hourDisplay.textContent = formatTime(hours);
    minuteDisplay.textContent = formatTime(minutes);
    secondDisplay.textContent = formatTime(seconds);
    millisecondDisplay.textContent = formatTime(milliseconds);
});

// Format time to display two digits
function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}