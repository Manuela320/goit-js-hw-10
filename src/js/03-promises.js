import Notiflix from 'notiflix';

// Funcția pentru crearea promisiunii
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3; 

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}


const form = document.querySelector('.form');


form.addEventListener('submit', function(event) {
  event.preventDefault();


  const delay = parseInt(form.elements['delay'].value);
  const step = parseInt(form.elements['step'].value);
  const amount = parseInt(form.elements['amount'].value);

  
  if (isNaN(delay) || isNaN(step) || isNaN(amount)) {
    alert('Please fill in all fields with valid numbers.');
    return;
  }

  // Creăm și gestionăm promisiunile
  for (let i = 1; i <= amount; i++) {
    (function (i) { 
      const currentDelay = delay + (i - 1) * step; //  delay-ul pentru fiecare promise

      createPromise(i, currentDelay)
        .then(({ position, delay }) => {
          Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        });
    })(i);
  }
});