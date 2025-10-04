(function () {
  // DOM elements
  const hourDisplay = document.getElementById("hours");
  const minuteDisplay = document.getElementById("minutes");
  const secondDisplay = document.getElementById("seconds");
  const millisecondDisplay = document.getElementById("milliseconds");
  const lapsList = document.getElementById("laps-list");
  const startButton = document.getElementById("start");
  const stopButton = document.getElementById("stop");
  const resetButton = document.getElementById("reset");
  const lapButton = document.getElementById("laps");
  const themeSwitch = document.getElementById("theme-switch");

  // State of values
  let hours = 0;
  let minutes = 0;
  let seconds = 0;
  let milliseconds = 0;
  let timerInterval = null;
  let lapTimes = [];

  // Format two-digit time (for hours, minutes, seconds)
  function formatTime(time) {
    return time < 10 ? `0${time}` : time;
  }

  // Format trimmed milliseconds
  function formatMilliseconds(ms) {
    let hundredths = Math.floor(ms / 10); // convert 0–999 ms → 0–99
    return hundredths < 10 ? `0${hundredths}` : `${hundredths}`;
  }

  // Update display

  function updateDisplay() {
    hourDisplay.textContent = formatTime(hours);
    minuteDisplay.textContent = formatTime(minutes);
    secondDisplay.textContent = formatTime(seconds);
    millisecondDisplay.textContent = formatMilliseconds(milliseconds);
  }

  // Timer logic

  function startTimer() {
    if (timerInterval) return; // Prevent multiple timers
    timerInterval = setInterval(() => {
      milliseconds += 10;
      if (milliseconds >= 1000) {
        milliseconds = 0;
        seconds++;
      }
      if (seconds >= 60) {
        seconds = 0;
        minutes++;
      }
      if (minutes >= 60) {
        minutes = 0;
        hours++;
      }
      updateDisplay();
    }, 10);
  }

  // Stop timer

  function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
  }

  // Reset timer

  function resetTimer() {
    stopTimer();
    hours = 0;
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    lapTimes = [];
    updateDisplay();
    lapsList.innerHTML = "";
  }

  // Record lap
  function recordLap() {
    const lapTime = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(
      seconds
    )}.${formatMilliseconds(milliseconds)}`;
    lapTimes.push(lapTime);
    const lapElement = document.createElement("li");
    lapElement.textContent = `Lap ${lapTimes.length}: ${lapTime}`;
    lapsList.appendChild(lapElement);
  }

  // Event listeners
  startButton.addEventListener("click", startTimer);
  stopButton.addEventListener("click", stopTimer);
  resetButton.addEventListener("click", resetTimer);
  lapButton.addEventListener("click", recordLap);

  // Theme switch
  document.body.classList.add("light");
  themeSwitch.addEventListener("click", () => {
    document.body.classList.toggle("light");
    document.body.classList.toggle("dark");
  });

  // Initialize display

  updateDisplay();
})();
