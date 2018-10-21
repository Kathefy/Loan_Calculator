document.querySelector('#loan-form').addEventListener('submit', function(e) {
  e.preventDefault();

  document.querySelector('#loading').style.display = 'block';
  document.querySelector('#results').style.display = 'none';

  setTimeout(calculateResult, 2000);
});

function calculateResult() {
  const amount = document.querySelector('#amount');
  const interest = document.querySelector('#interest');
  const years = document.querySelector('#years');
  const monthPayment = document.querySelector('#month-payment');
  const totalPayment = document.querySelector('#total-payment');
  const totalInterest = document.querySelector('#total-interest');

  const principal = parseFloat(amount.value);
  const calculInterest = parseFloat(interest.value) / 100 / 12;
  const calculPayment = parseFloat(years.value) * 12;

  const x = Math.pow(1 + calculInterest, calculPayment);
  const monthly = (principal * x * calculInterest) / (x - 1);

  if(isFinite(monthly)) {
    monthPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculPayment).toFixed(2);
    totalInterest.value = ((monthly * calculPayment) - principal).toFixed(2);

    document.querySelector('#loading').style.display = 'none';
    document.querySelector('#results').style.display = 'block';
  } else {
    showError('Information is incorrect. Please try again');
  }
}

function showError(text) {
  document.querySelector('#loading').style.display = 'none';
  document.querySelector('#results').style.display = 'none';

  const errorDiv = document.createElement('div');
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  errorDiv.className = 'alert alert-danger';
  errorDiv.appendChild(document.createTextNode(text));
  card.insertBefore(errorDiv, heading);

  setTimeout(clearError, 5000);
}

function clearError() {
  document.querySelector('.alert').remove()
}