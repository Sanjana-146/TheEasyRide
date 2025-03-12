// Time slot validation
const startTime = document.getElementById('startTime');
const endTime = document.getElementById('endTime');
const timeError = document.getElementById('time-error');

function isTimeValid() {
    const start = new Date(`1970-01-01T${startTime.value}`);
    const end = new Date(`1970-01-01T${endTime.value}`);
    const diff = (end - start) / (1000 * 60 * 60); // in hours
    return diff >= 2;
}

// Phone validation
const phoneNo = document.getElementById('phoneNo');
const phoneError = document.getElementById('phone-error');

function isPhoneValid() {
    return phoneNo.value.length === 10 && /^\d+$/.test(phoneNo.value);
}

// Vehicle type and fuel type logic
const vehicleType = document.getElementById('vehicleType');
const fuelType = document.getElementById('fuelType');
const dieselOption = document.querySelector('#fuelType option[value="diesel"]');

vehicleType.addEventListener('change', () => {
    if (vehicleType.value === 'car') {
        dieselOption.classList.remove('hidden');
    } else {
        dieselOption.classList.add('hidden');
        fuelType.value = 'petrol';
    }
});

// Terms & Conditions Checkbox
const agreeCheckbox = document.getElementById("agreeCheckbox");
const termsError = document.createElement("p");
termsError.textContent = "You must agree to the Terms & Conditions before submitting.";
termsError.classList.add("text-red-500", "mt-2", "hidden");
agreeCheckbox.parentNode.appendChild(termsError);

// Form submission and validation
document.getElementById('rentOutForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    let isValid = true;

    // Time and phone validation
    if (!isTimeValid()) {
        timeError.classList.remove('hidden');
        isValid = false;
    } else {
        timeError.classList.add('hidden');
    }

    if (!isPhoneValid()) {
        phoneError.classList.remove('hidden');
        isValid = false;
    } else {
        phoneError.classList.add('hidden');
    }

    // Terms & Conditions Validation
    if (!agreeCheckbox.checked) {
        termsError.classList.remove("hidden");
        isValid = false;
    } else {
        termsError.classList.add("hidden");
    }

    // Stop form submission if any validation fails
    if (!isValid) return;

    // If valid, submit the form
    const formData = new FormData();
    formData.append('ownerName', document.getElementById('ownerName').value);
    formData.append('vehicleType', document.getElementById('vehicleType').value);
    formData.append('vehicleName', document.getElementById('vehicleName').value);
    formData.append('vehicleNumberPlate', document.getElementById('vehicleNumberPlate').value);
    formData.append('startTime', document.getElementById('startTime').value);
    formData.append('endTime', document.getElementById('endTime').value);
    formData.append('date', document.getElementById('date').value);
    formData.append('pickupAddress', document.getElementById('pickupAddress').value);
    formData.append('areaPinCode', document.getElementById('areaPinCode').value);
    formData.append('landmark', document.getElementById('landmark').value);
    formData.append('fuelType', document.getElementById('fuelType').value);
    formData.append('phoneNo', document.getElementById('phoneNo').value);
    formData.append('email', document.getElementById('email').value);
    formData.append('license', document.getElementById('license').files[0]);
    formData.append('aadhar', document.getElementById('aadhar').files[0]);
    formData.append('registrationPaper' , document.getElementById('registrationPaper').files[0]);

    // Vehicle Images (allowing up to 7)
    const vehicleImages = document.getElementById('vehicleImages').files;
    for (let i = 0; i < vehicleImages.length; i++) {
        formData.append('vehicleImages', vehicleImages[i]);
    }

    try {
        const response = await fetch('http://localhost:3000/api/rentout', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();
        if (response.ok) {
            window.location.href = "index.html";
            alert('Vehicle details uploaded successfully');
        } else {
            alert('Error uploading details: ' + result.message);
        }
    } catch (error) {
        console.error('Fetch error:', error);
        alert('Failed to connect to the server. Please try again later.');
    }
});

// Open and Close Modal
function openTermsModal() {
    document.getElementById("termsModal").classList.remove("hidden");
}
function closeTermsModal() {
    document.getElementById("termsModal").classList.add("hidden");
}

// Enable Submit Button When Checkbox is Checked
agreeCheckbox.addEventListener("change", function() {
    const submitBtn = document.getElementById("submitBtn");
    if (this.checked) {
        submitBtn.classList.remove("bg-gray-400", "cursor-not-allowed");
        submitBtn.classList.add("bg-blue-600", "hover:bg-blue-700", "cursor-pointer");
        submitBtn.removeAttribute("disabled");
        termsError.classList.add("hidden");
    } else {
        submitBtn.classList.remove("bg-blue-600", "hover:bg-blue-700", "cursor-pointer");
        submitBtn.classList.add("bg-gray-400", "cursor-not-allowed");
        submitBtn.setAttribute("disabled", true);
    }
});