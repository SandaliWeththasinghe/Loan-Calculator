// Listen for submit
document.getElementById('loan-form').addEventListener('submit', calculateResults);

// Calcuate Results
function calculateResults(e) {
  console.log('Calculating...');
  // UI vars
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  const principal = parseFloat(amount.value);
  // Monthly Interest
  const calculateInterest = parseFloat(interest.value) / 100 / 12;
  // Number of months to repay 
  const calculatePayments = parseFloat(years.value) * 12;

  // Compute Monthly Payment
  const x = Math.pow(1 + calculateInterest, calculatePayments);
  const monthly = (principal*x*calculateInterest) / (x-1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatePayments).toFixed(2);
    totalInterest.value = ((monthly * calculatePayments) - principal).toFixed(2);
  } else {
    showError('Please check your numbers');  
  }

  e.preventDefault();
}

// Show error
function showError(error){
  // create a div
  const errorDiv = document.createElement('div');

  // Get elements
  const card = document.querySelector('.card');
  const heading =  document.querySelector('.heading');

  // Add class
  errorDiv.className = 'alert alert-danger'

  // Create text nodee and append to div
  errorDiv.appendChild(document.createTextNode(error));

  // Insert error above heading
  card.insertBefore(errorDiv, heading);

  // Clear error after 3 seconds
  setTimeout(clearError, 3000);
}

// Clear error
function clearError() {
  document.querySelector('.alert').remove();
}
