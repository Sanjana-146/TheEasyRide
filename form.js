document.addEventListener('DOMContentLoaded', () => {
    // Toggle between Signup and Login forms
    const signupForm = document.getElementById('signup-form');
    const loginForm = document.getElementById('login-form');
    const showLoginLink = document.getElementById('show-login');
    const showSignupLink = document.getElementById('show-signup');
    const authForm = document.getElementById('authForm');
    const authFormLogin = document.getElementById('authFormLogin');
    const loginNav = document.getElementById('login-nav');
    const logoutBtn = document.getElementById('logout-btn');
    
    
    if (!loginNav) {
            console.error('loginNav element not found');
        }
    
    showLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        signupForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
        showLoginLink.classList.add('hidden');
        showSignupLink.classList.remove('hidden');
    });
    
    showSignupLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.classList.add('hidden');
        signupForm.classList.remove('hidden');
        showSignupLink.classList.add('hidden');
        showLoginLink.classList.remove('hidden');
    });
    
    // Utility functions for validation
    const validateEmail = email => /\S+@\S+\.\S+/.test(email);
    const validatePhone = phone => /^\d{10}$/.test(phone);
    const validatePassword = password => {
        const conditions = {
            lowercase: /[a-z]/.test(password),
            uppercase: /[A-Z]/.test(password),
            number: /\d/.test(password),
            length: password.length >= 8
        };
    
        for (const [key, valid] of Object.entries(conditions)) {
            const conditionElement = document.getElementById(key);
            conditionElement.style.color = valid ? 'green' : 'red';
            conditionElement.textContent = `${valid ? '✓' : '❌'} ${conditionElement.textContent.slice(2)}`;
        }
    
        return Object.values(conditions).every(Boolean);
    };
    
    // Function to show error messages
    const showError = (elementId, message) => {
        document.getElementById(elementId).textContent = message;
    };
    
    // Real-time validation listener
    const addRealTimeValidation = (inputId, validationFunc, errorId, errorMessage) => {
        document.getElementById(inputId).addEventListener('input', function () {
            const value = this.value;
            if (validationFunc && !validationFunc(value)) {
                showError(errorId, errorMessage);
            } else {
                showError(errorId, '');
            }
        });
    };
    
    // Password toggle visibility
    document.getElementById('toggle-password').addEventListener('click', function () {
        const passwordInput = document.getElementById('password');
        const isPassword = passwordInput.type === 'password';
        passwordInput.type = isPassword ? 'text' : 'password';
        this.textContent = isPassword ? '👁‍🗨' : '👁';
    });
    
    
    // Function to update the navbar after login/signup
    
    // Signup form submission handler
    authForm.addEventListener('submit', async function (e) {
        e.preventDefault();
    
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
    
        let hasError = false;
    
        if (!name) {
            showError('name-error', 'Name is required.');
            hasError = true;
        } else {
            showError('name-error', '');
        }
    
        if (!email) {
            showError('email-error', 'Email is required.');
            hasError = true;
        } else if (!validateEmail(email)) {
            showError('email-error', 'Email is invalid.');
            hasError = true;
        } else {
            showError('email-error', '');
        }
    
        if (!phone) {
            showError('phone-error', 'Phone number is required.');
            hasError = true;
        } else if (!validatePhone(phone)) {
            showError('phone-error', 'Phone number must be 10 digits.');
            hasError = true;
        } else {
            showError('phone-error', '');
        }
    
        if (!password) {
            showError('password-error', 'Password is required.');
            hasError = true;
        } else if (!validatePassword(password)) {
            showError('password-error', 'Password does not meet the criteria.');
            hasError = true;
        } else {
            showError('password-error', '');
        }
    
        if (!confirmPassword) {
            showError('confirm-password-error', 'Confirm password is required.');
            hasError = true;
        } else if (confirmPassword !== password) {
            showError('confirm-password-error', 'Passwords do not match.');
            hasError = true;
        } else {
            showError('confirm-password-error', '');
        }
        if (!hasError) {
            const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const password = document.getElementById("password").value;

            // Send data to the backend
            const response = await fetch('http://localhost:5000/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: "include",
                body: JSON.stringify({ name, email, phone, password })
            });
    
            const data = await response.json();
            if (response.ok) { 
                alert('Signup successful');
                localStorage.setItem('isLoggedIn', true);
                window.location.href = "index.html"; // Redirect to index page
            } else {
                alert(data.message);
            }
        }
    });
    
    // Login form submission handler
    authFormLogin.addEventListener('submit', async function (e) {
        e.preventDefault();
        console.log("login form submitted");
    
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        let errors = false;
    
        if (!email) {
            showError('login-email-error', 'Email is required.');
            errors = true;
        } else if (!validateEmail(email)) {
            showError('login-email-error', 'Email is invalid.');
            errors = true;
        } else {
            showError('login-email-error', '');
        }
    
        if (!password) {
            showError('login-password-error', 'Password is required.');
            errors = true;
        } else {
            showError('login-password-error', '');
        }
        if(!errors){
            console.log("no error submitting form");
        const response = await fetch('http://localhost:5000/login', {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
    
        const data = await response.json();
        if (response.ok) {
            alert("Login successful");
            localStorage.setItem('isLoggedIn', true);
            window.location.href = "index.html";
        } else {
            alert(data.message);
        }
    }
    });
    
    // Real-time validation listeners
    addRealTimeValidation('email', validateEmail, 'email-error', 'Email is invalid.');
    addRealTimeValidation('phone', validatePhone, 'phone-error', 'Phone number must be 10 digits.');
    addRealTimeValidation('password', validatePassword, 'password-error', 'Password does not meet the criteria.');
    addRealTimeValidation('confirm-password', () => document.getElementById('confirm-password').value === document.getElementById('password').value, 'confirm-password-error', 'Passwords do not match.');
    
    // Password condition visibility
    const passwordField = document.getElementById('password');
    const passwordConditions = document.getElementById('password-conditions');
    
    passwordConditions.style.display = 'none';
    
    passwordField.addEventListener('focus', function () {
        passwordConditions.style.display = 'block';
    });
    
    passwordField.addEventListener('blur', function () {
        passwordConditions.style.display = 'none';
    });
    });