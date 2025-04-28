const params = new URLSearchParams(window.location.search);

const vehicleName = params.get("vehicleName");
// const fuelType = params.get("fuelType");
const pickupAddress = params.get("pickupAddress");
// const areaPinCode = params.get("areaPinCode");
const phoneNo = params.get("phoneNo");
const price = parseFloat(params.get("price"));
const startTime = params.get("startTime");
const endTime = params.get("endTime");
const hours = parseFloat(params.get("hours"));

const amount = price * hours;
const discount = 0.1 * amount; // 10% discount
const gst = 0.18 * (amount - discount); // 18% GST after discount
const total = amount - discount + gst;
console.log("Received params:", { price, hours });

document.getElementById("vehicleName").textContent = vehicleName;
document.getElementById("startTime").textContent = startTime;
document.getElementById("endTime").textContent = endTime;
document.getElementById("startDate").textContent = new Date().toLocaleDateString();
document.getElementById("pickupLocation").textContent = `${pickupAddress}`;
document.getElementById("amount").textContent = `₹${amount.toFixed(2)}`;
document.getElementById("discount").textContent = `$${discount.toFixed(2)}`;
document.getElementById("gst").textContent = `$${gst.toFixed(2)}`;
document.getElementById("totalAmount").textContent = `$${total.toFixed(2)}`;
// document.getElementById("ownerName").textContent = vehicleName + " Owner";
document.getElementById("ownerPhone").textContent = phoneNo;


function payementGateway() {
    // Hide the "Proceed to Payment" button after click
    document.querySelector('button').style.display = 'none';

    paypal.Buttons({
        createOrder: function(data, actions) {
            const amountToPay = (total / 80).toFixed(2); 
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: amountToPay,  // Use the correctly rounded value
                    },
                    description: `Payment for ${vehicleName}`
                }]
            });
        },
        onApprove: function(data, actions) {
            return actions.order.capture().then(function(details) {
                alert('Transaction completed by ' + details.payer.name.given_name);
                // You can redirect user to a thank you page here
                window.location.href = "payment.html"; // Example
            });
        },
        onError: function (err) {
            console.error('PayPal Checkout error', err);
            alert('Something went wrong during payment. Please try again.');
        }
    }).render('#paypal-button-container'); // Render the PayPal button into container
}
