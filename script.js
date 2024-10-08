let totalAmount = 0;

// Calculate total amount when the number of tickets or additional events changes
function calculateTotal() {
    totalAmount = 0;

    const ticketCount = parseInt(document.getElementById('ticketCount').value);
    const ticketPrice = 5000;

    totalAmount += ticketCount * ticketPrice;

    // Calculate additional events' prices
    document.querySelectorAll('.additional-event').forEach(event => {
        if (event.checked) {
            totalAmount += parseInt(event.getAttribute('data-price'));
        }
    });
    updateTotal();
}

// Update the total amount in the payment form
function updateTotal() {
    document.getElementById('totalAmount').value = `₹${totalAmount}`;
}

// Handle ticket selection
document.getElementById('selectTicket').addEventListener('click', function () {
    calculateTotal();
});

// Handle form submission for payment and email
document.getElementById('paymentForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    // Create the email parameters
    const emailParams = {
        name: name,
        email: email,
        phone: phone,
        totalAmount: totalAmount
    };

    // Send email using EmailJS
    emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", emailParams) // Replace with your EmailJS service and template IDs
        .then(function(response) {
            console.log('Email sent successfully:', response);
            alert(`Thank you, ${name}! Your payment of ₹${totalAmount} has been processed. A confirmation email has been sent to ${email}.`);
        }, function(error) {
            console.error('Error sending email:', error);
            alert('An error occurred while sending the email. Please try again.');
        });

    // You can integrate payment processing here using Stripe.js
    // For now, we'll just reset the form and amount
    this.reset();
    totalAmount = 0;
    updateTotal();
});
