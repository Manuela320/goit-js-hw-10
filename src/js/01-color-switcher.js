function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }

  const startBtn = document.querySelector('[data-start]');
  const stopBtn = document.querySelector('[data-stop]');

  let intervalId = null;

  function changeBackgroundColor () {
    document.body.style.backgroundColor = getRandomHexColor();
  }

  startBtn.addEventListener('click', () => {
    startBtn.disabled = true;

    intervalId = setInterval(changeBackgroundColor, 1000);
  });

  stopBtn.addEventListener('click', () => {
    clearInterval(intervalId);

    startBtn.disabled = false;
  });
