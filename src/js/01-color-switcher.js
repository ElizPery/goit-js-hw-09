const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
}

refs.startBtn.addEventListener('click', onStartClick);
refs.stopBtn.addEventListener('click', onStopClick);

refs.stopBtn.disabled = true;
timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onStartClick() {
  refs.startBtn.disabled = true;
  refs.stopBtn.disabled = false;
  changeColor();

  timerId = setInterval(() => {
    changeColor();
  }, 1000)
}

function onStopClick() {
  refs.startBtn.disabled = false;
  refs.stopBtn.disabled = true;

  clearInterval(timerId);
}

function changeColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}