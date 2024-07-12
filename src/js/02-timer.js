import flatpickr from '../../node_modules/flatpickr/dist/flatpickr.js';
import '../../node_modules/flatpickr/dist/flatpickr.min.js';
import Notiflix from 'notiflix';

const datetimePicker = document.getElementById("datetime-picker");
const startBtn = document.querySelector('[data-start]');
const timerDaysEl = document.querySelector('[data-days]');
const timerHoursEl = document.querySelector('[data-hours]');
const timerMinutesEl = document.querySelector('[data-minutes]');
const timerSecondsEl = document.querySelector('[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();
    if (selectedDate < currentDate) {
      Notiflix.Notify.warning('Please choose a date in the future');
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
    }
  }
};

flatpickr(datetimePicker, options);

function addLeadingZero(value) {
  return value < 10 ? `0${value}` : `${value}`;
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor((ms % hour) / minute);
  const seconds = Math.floor((ms % minute) / second);

  return { days, hours, minutes, seconds };
}

let countdownInterval;

function startCountdown(targetDate) {
  clearInterval(countdownInterval);

  countdownInterval = setInterval(() => {
    const currentDate = new Date().getTime();
    const difference = targetDate - currentDate;

    if (difference <= 0) {
      clearInterval(countdownInterval);
      timerDaysEl.textContent = '00';
      timerHoursEl.textContent = '00';
      timerMinutesEl.textContent = '00';
      timerSecondsEl.textContent = '00';
      Notiflix.Notify.success('Countdown finished!');
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(difference);

    timerDaysEl.textContent = addLeadingZero(days);
    timerHoursEl.textContent = addLeadingZero(hours);
    timerMinutesEl.textContent = addLeadingZero(minutes);
    timerSecondsEl.textContent = addLeadingZero(seconds);
  }, 1000);
}

startBtn.addEventListener('click', () => {
  const selectedDate = new Date(datetimePicker.value).getTime();
  startCountdown(selectedDate);
});