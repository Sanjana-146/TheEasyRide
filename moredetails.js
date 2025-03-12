// Details Page Script (details.js)
const params = new URLSearchParams(window.location.search);
const vehicle = Object.fromEntries(params.entries());

document.getElementById('vehicleName').textContent = vehicle.vehicleName;
document.getElementById('fuelType').textContent = vehicle.fuelType;
document.getElementById('pickupAddress').textContent = vehicle.pickupAddress;
document.getElementById('areaPinCode').textContent = vehicle.areaPinCode;
document.getElementById('phoneNo').textContent = vehicle.phoneNo;
document.getElementById('price').textContent = vehicle.price;

// Display images in the slider
const thumbnailContainer = document.getElementById('thumbnailContainer');
const mainImage = document.getElementById('mainImage');

const images = vehicle.vehicleImages.split(','); // Assuming images are comma-separated
mainImage.src = images[0];

images.forEach(img => {
  const thumbnail = document.createElement('img');
  thumbnail.src = img;
  thumbnail.classList.add('w-60', 'h-28', 'object-contain', 'cursor-pointer');
  thumbnail.addEventListener('click', () => {
    mainImage.src = img;
  });
  thumbnailContainer.appendChild(thumbnail);
});



function redirectToPayment() {
  window.location.href = "payment.html"; // Replace with actual payment page URL
}

// Function to redirect to the location page
function redirectToLocation() {
  window.location.href = "https://www.google.com/maps"; // Replace with actual location URL
}