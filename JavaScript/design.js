const form = document.querySelector('#payment-form');
const expirationMonthSelect = document.querySelector('#expiration-month');
const expirationYearSelect = document.querySelector('#expiration-year');

// Populate expiration month dropdown
for (let i = 1; i <= 12; i++) {
  const option = document.createElement('option');
  option.value = i.toString().padStart(2, '0');
  option.text = i.toString().padStart(2, '0');
  expirationMonthSelect.appendChild(option);
}

// Populate expiration year dropdown
const currentYear = new Date().getFullYear();
for (let i = 0; i < 10; i++) {
  const option = document.createElement('option');
  option.value = (currentYear + i).toString();
  option.text = (currentYear + i).toString();
  expirationYearSelect.appendChild(option);
}


form.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(event) {
  event.preventDefault();

  const cardNumber = document.querySelector('#card-number').value;
  const expirationDate = `${expirationYearSelect.value}-${expirationMonthSelect.value}`;
  const securityCode = document.querySelector('#security-code').value;

  if (isValidCardNumber(cardNumber) &&
    isValidExpirationDate(expirationDate) &&
    isValidSecurityCode(securityCode)) {
    const paymentData = {
      master_card: cardNumber,
      exp_year: parseInt(expirationYearSelect.value),
      exp_month: parseInt(expirationMonthSelect.value),
      cvv_code: securityCode
    };

    sendPaymentData(paymentData);
  } else {
    alert('Please fill in the form correctly.');
  }
}

function isValidCardNumber(cardNumber) {
  // Check that the card number has 16 digits and starts with 51-55
  const regex = /^5[1-5]\d{14}$/;
  return regex.test(cardNumber);
}

function isValidExpirationDate(expirationDate) {
  // Check that the expiration date is in the future
  const now = new Date();
  const year = parseInt(expirationDate.substr(0, 4));
  const month = parseInt(expirationDate.substr(5, 2)) - 1;
  const expiration = new Date(year, month, 1);
  return expiration > now;
}

function isValidSecurityCode(securityCode) {
  // Check that the security code has 3 or 4 digits
  const regex = /^\d{3,4}$/;
  return regex.test(securityCode);
}




function sendPaymentData(paymentData) {
  const url = 'https://mudfoot.doc.stu.mmu.ac.uk/node/api/creditcard';
  const data = JSON.stringify(paymentData);
  const xhr = new XMLHttpRequest();
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        // Connection between the payment html and success html
        const cardNumber = paymentData.master_card;
        const lastFourDigits = cardNumber.substr(cardNumber.length - 4);
        window.open('success.html?digits='+lastFourDigits, '_blank')
        // alert('Payment successful!');
      } else {
        alert('Payment failed. Please try again.');
      }
    }
  };
  xhr.send(data);
}

// Generate dropdown options for the expiration month
const monthDropdown = document.querySelector('#expiration-month');
const Monthoption = document.createElement('option');
const option = document.createElement('option');
for (let i = 1; i <= 12; i++) {
  // const option = document.createElement('option');
  Monthoption.text = i.toString().padStart(2, '0');
  Monthoption.value = i.toString().padStart(2, '0');
  monthDropdown.appendChild(option);
}

// Generate dropdown options for the expiration year
const yearDropdown = document.querySelector('#expiration-year');
// const currentYear = new Date().getFullYear();
// const option = document.createElement('option');
for (let i = currentYear; i <= currentYear + 10; i++) {
  option.text = i.toString();
  option.value = i.toString().substr(2, 2);
  yearDropdown.appendChild(option);
}


form.addEventListener('submit', handleFormSubmit);
 
function handleFormSubmit(event) {
  event.preventDefault();

  const cardNumber = document.querySelector('#card-number').value;
  const expirationMonth = document.querySelector('#expiration-month').value;
  const expirationYear = document.querySelector('#expiration-year').value;
  const securityCode = document.querySelector('#security-code').value;

  if (isValidCardNumber(cardNumber) &&
    isValidExpirationDate(expirationMonth, expirationYear) &&
    isValidSecurityCode(securityCode)) {
    const paymentData = {
      master_card: cardNumber,
      exp_year: expirationYear,
      exp_month: expirationMonth,
      cvv_code: securityCode
    };

    sendPaymentData(paymentData);
  } else {
    alert('Payment failed. Please try again.');
  }
}

function isValidCardNumber(cardNumber) {
  // Checking that the card number has 16 digits and starts with 51-55
  const regex = /^5[1-5]\d{14}$/;
  return regex.test(cardNumber);
}

function isValidExpirationDate(expirationMonth, expirationYear) {
  // Check that the expiration date is in the future
  const now = new Date();
  const year = parseInt(expirationYear, 10) + 2000;
  const month = parseInt(expirationMonth, 10) - 1;
  const expiration = new Date(year, month, 1);
  return expiration > now;
}

function isValidSecurityCode(securityCode) {
  // Check that the security code has 3 or 4 digits
  const regex = /^\d{3,4}$/;
  return regex.test(securityCode);
}
 

