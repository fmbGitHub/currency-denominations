const currencyDolaresButton = document.getElementById('currency-dolares-btn');
const currencyCordobasButton = document.getElementById('currency-cordobas-btn');

currencyDolaresButton.addEventListener('click', () => {
  window.location.href = 'dolares/index.html';
});
currencyCordobasButton.addEventListener('click', () => {
  window.location.href = 'cordobas/index.html';
});
