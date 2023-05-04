function myFunction() {
    // this is the function that I am using for the dropdown list
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }





  function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  }
  
  /* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
  function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  }
  

  const form = document.querySelector('#payment-form');
  form.addEventListener('submit', handleFormSubmit);

  function handleFormSubmit(event) {
    event.preventDefault();

    const cardNumber = document.querySelector('#card-number').value;
    const expirationDate = document.querySelector('#expiration-date').value;
    const securityCode = document.querySelector('#security-code').value;

    if (isValidCardNumber(cardNumber) &&
        isValidExpirationDate(expirationDate) &&
        isValidSecurityCode(securityCode)) {
      const paymentData = {
        master_card: cardNumber,
        exp_year: parseInt(expirationDate.substr(0, 4)),
        exp_month: parseInt(expirationDate.substr(5, 2)),
        cvv_code: securityCode
      };

      paymentData(paymentData);
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
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          alert('Payment successful!');
        } else {
          alert('Payment failed. Please try again.');
        }
      }
    };
    xhr.send(data);
  }  

  function openWindow(paymentData) {
    // Open a new window with the specified URL and window features
    const newWindow = window.open("", "newWindow", "width=400,height=300");

    // Create a new form element
    const form = document.createElement("form");
    form.id = "payment-form";
    
    // Copy the contents of the original form element into the new form element
    const originalForm = document.querySelector("#payment-form");
    form.innerHTML = originalForm.innerHTML;

    // Disable all the form elements in the original form
    const formElements = originalForm.querySelectorAll("input, button");
    formElements.forEach(element => {
      element.disabled = true;
    });

    // Append the form to the new window's document body
    newWindow.document.body.appendChild(form);

  }


  