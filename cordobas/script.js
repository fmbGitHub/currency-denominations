const tableBody = document.getElementById('table-body');
const grandTotalLabel = document.getElementById('grand-total-label');
const grandTotalValue = document.getElementById('grand-total-value');
const inputs = Array.from(tableBody.querySelectorAll('input'));
const clearButton = document.getElementById('clear-btn');
const currencyButton = document.getElementById('currency-btn');

currencyButton.addEventListener('click', () => {
  window.location.href = '../dolares/index.html';
});

grandTotalLabel.classList.add('grand-total-label');
grandTotalValue.classList.add('grand-total-value');

function formatCurrency(value) {
  return value > 0
    ? `C$ ${value.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`
    : 'C$ -';
}

function updateTotals() {
  let grandTotal = 0;

  [...tableBody.rows].forEach((row) => {
    const denomination = parseFloat(row.cells[0].dataset.denomination);
    const qtyInput = row.cells[1].querySelector('input');
    const quantity = parseFloat(qtyInput.value) || 0;
    const rowTotal = denomination * quantity;

    // console.log(
    //   `Denomination: ${denomination}, Quantity: ${quantity}, Row Total: ${rowTotal}`
    // );

    row.querySelector('.row-total').textContent = formatCurrency(rowTotal);
    grandTotal += rowTotal;
  });

  // Update grand total text
  grandTotalValue.textContent = `C$ ${grandTotal.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function handleNavigation(event) {
  const currentIndex = inputs.indexOf(event.target);

  if (event.key === 'Enter' || event.key === 'ArrowDown') {
    event.preventDefault();
    const nextIndex = (currentIndex + 1) % inputs.length;
    inputs[nextIndex].focus();
    inputs[nextIndex].select();
  }

  if (event.key === 'ArrowUp') {
    event.preventDefault();
    const prevIndex = (currentIndex - 1 + inputs.length) % inputs.length;
    inputs[prevIndex].focus();
    inputs[prevIndex].select();
  }
}

function handleFocus(event) {
  tableBody
    .querySelectorAll('tr')
    .forEach((row) => row.classList.remove('active'));
  event.target.closest('tr').classList.add('active');
}

function clearAll() {
  inputs.forEach((input) => (input.value = 0));
  updateTotals();
  inputs[0].focus();
  inputs[0].select();
}

inputs.forEach((input) => {
  input.addEventListener('input', updateTotals);
  input.addEventListener('keydown', handleNavigation);
  input.addEventListener('focus', handleFocus);
});

clearButton.addEventListener('click', clearAll);

updateTotals();
