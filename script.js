let timeDisplay = document.getElementById('time-display');
let startBtn = document.getElementById('start-btn');
let stopBtn = document.getElementById('stop-btn');
let resetBtn = document.getElementById('reset-btn');
let lapBtn = document.getElementById('lap-btn');
let lapList = document.getElementById('lap-list');

let startTime;
let elapsedTime = 0;
let timerInterval;
let running = false;

function formatTime(ms) {
  let totalSeconds = Math.floor(ms / 1000);
  let hours = Math.floor(totalSeconds / 3600);
  let minutes = Math.floor((totalSeconds % 3600) / 60);
  let seconds = totalSeconds % 60;
  let milliseconds = ms % 1000;

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
}

function updateDisplay() {
  if (running) {
    elapsedTime = Date.now() - startTime;
  }
  timeDisplay.textContent = formatTime(elapsedTime);
}

startBtn.addEventListener('click', () => {
  if (!running) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateDisplay, 10);
    running = true;
    startBtn.textContent = 'Pause';
    stopBtn.disabled = false;
  } else {
    clearInterval(timerInterval);
    running = false;
    elapsedTime += Date.now() - startTime;
    startBtn.textContent = 'Start';
    stopBtn.disabled = true;
  }
});

stopBtn.addEventListener('click', () => {
  clearInterval(timerInterval);
  running = false;
  elapsedTime += Date.now() - startTime;
  startBtn.textContent = 'Start';
  stopBtn.disabled = true;
});

resetBtn.addEventListener('click', () => {
  clearInterval(timerInterval);
  running = false;
  elapsedTime = 0;
  timeDisplay.textContent = formatTime(elapsedTime);
  startBtn.textContent = 'Start';
  stopBtn.disabled = true;
  lapList.innerHTML = ''; // Clear the lap list when reset
});

lapBtn.addEventListener('click', () => {
  if (running) {
    let lapTime = formatTime(elapsedTime);
    let lapElement = document.createElement('div');
    lapElement.classList.add('lap');
    lapElement.innerHTML = `
      <span>Lap: ${lapTime}</span>
      <button onclick="deleteLap(this)">Delete</button>
    `;
    lapList.appendChild(lapElement);
  }
});

function deleteLap(button) {
  let lapElement = button.parentElement;
  lapList.removeChild(lapElement);
}
