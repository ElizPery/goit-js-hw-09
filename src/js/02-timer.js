import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const refs = {
    startBtn: document.querySelector('[data-start]'),
    dataInfo: document.querySelector('[data-days]'),
    hoursInfo: document.querySelector('[data-hours]'),
    minutesInfo: document.querySelector('[data-minutes]'),
    secondsInfo: document.querySelector('[data-seconds]'),
}

refs.startBtn.setAttribute('disabled', true);
refs.startBtn.addEventListener('click', onStartBtnClick)
let selectedTime = 0;
let differenceTime = 0;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      console.log(selectedDates[0]);
      selectedTime = selectedDates[0].getTime();
      const currentTime = Date.now();
      differenceTime = selectedTime - currentTime;

      if (differenceTime < 0) {
        Notiflix.Notify.failure("Please choose a date in the future");
      } else {
        refs.startBtn.removeAttribute('disabled', true);
      }
  },
};

flatpickr("#datetime-picker", options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

function onStartBtnClick() {

  refs.startBtn.setAttribute('disabled', true);
  visualTranslateData();
  
  timerId = setInterval(() => {
    differenceTime -= 1000;
    visualTranslateData();
    if (differenceTime < 0) {
        refs.secondsInfo.textContent = '00';
        clearInterval(timerId);
        refs.startBtn.removeAttribute('disabled', true);
    }
  }, 1000)
}

function visualTranslateData() {
  const convertDifferenceData = convertMs(differenceTime);
  const values = Object.values(convertDifferenceData);
  refs.dataInfo.textContent = values[0];
  refs.hoursInfo.textContent = values[1];
  refs.minutesInfo.textContent = values[2];
  refs.secondsInfo.textContent = values[3];
}