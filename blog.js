// Payment handling function
async function initiatePayment() {
  const button = document.getElementById('yoco-buy-button');
  const loadingIndicator = document.querySelector('.payment-loading');
  
  try {
    button.disabled = true;
    loadingIndicator.style.display = 'block';

    const response = await fetch('/api/create-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        amount: 90000, // R900.00 in cents
        orderId: generateOrderId(), // Implement this function
        productName: 'Your Product Name'
      })
    });

    const data = await response.json();

    if (data.redirectUrl) {
      window.location.href = data.redirectUrl;
    } else {
      throw new Error('No redirect URL received');
    }

  } catch (error) {
    console.error('Payment initiation failed:', error);
    alert('Payment initiation failed. Please try again.');
  } finally {
    button.disabled = false;
    loadingIndicator.style.display = 'none';
  }
}

function generateOrderId() {
  return 'ORDER-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
}

// Update the HTML button to include an ID
document.querySelector('.buy-button').addEventListener('click', initiatePayment); 