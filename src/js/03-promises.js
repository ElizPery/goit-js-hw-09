import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
}

refs.form.addEventListener('submit', onSubmit);
refs.form.addEventListener('input', onInputChange);

const formData = {};

function onInputChange(e) {
  formData[e.target.name] = Number(e.target.value);
}


function onSubmit(e) {
  e.preventDefault();
  const { delay, step, amount } = formData;
  
  for (let i = 0; i < amount; i += 1) {
  createPromise(i + 1, delay + step * i)
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  })
}
