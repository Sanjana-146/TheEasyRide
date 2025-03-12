
function showSidebar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'flex'
  }
  function hideSidebar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'none'
  }

  const loginNav = document.getElementById('login-nav');
  const userIcon = document.getElementById('user-icon');
  const userDropdown = document.getElementById('user-dropdown');
    const myAccount = document.getElementById('my-account');
    const logoutBtn = document.getElementById('logout-btn');
    console.log(logoutBtn);
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  // const username = localStorage.getItem('username');

  if (isLoggedIn) {
      if (loginNav) loginNav.style.display = 'none';
      if (userIcon) {
          userIcon.classList.remove('hidden');
          // userIcon.textContent = username ? username.charAt(0).toUpperCase() : 'U'; // Show user initial
      }
  } //else {
  //     if (loginNav) loginNav.style.display = 'block';
  //     if (userIcon) userIcon.classList.add('hidden');
  // }
  userIcon.addEventListener('click' , function() {
    // e.preventDefault();
    userDropdown.classList.remove('hidden');
  })

// Hide dropdown when clicking outside
document.addEventListener('click', function (event) {
  if (!userIcon.contains(event.target) && !userDropdown.contains(event.target)) {
      userDropdown.classList.add('hidden');
  }
});
// My Account click handler
myAccount.addEventListener('click', () => {
  window.location.href = 'profileSec.html'; // Replace with actual account page
});
// Logout click handler
  // logoutBtn.addEventListener('click', () => {
  //   console.log("Logout button clicked");
  //   localStorage.removeItem('isLoggedIn');
  //   userIcon.classList.add('hidden');
  //   loginNav.style.display = 'block';
  //   userDropdown.classList.add('hidden');

  //   setTimeout(() => {
  //     window.location.href = 'index.html';
  //   }, 100);
  // });
  logoutBtn.addEventListener('click', async () => {
    try {
        const response = await fetch('http://localhost:5000/logout', { method: 'POST', credentials: 'include' });
        const data = await response.json();
        console.log(data.message);
        
        localStorage.removeItem('isLoggedIn'); // Also clear local storage
        userIcon.classList.add('hidden');
        loginNav.style.display = 'block';
        userDropdown.classList.add('hidden');

        setTimeout(() => {
            window.location.href = 'index.html';
        }, 100);
    } catch (error) {
        console.error("Logout error:", error);
    }
});


///// about us page 
document.getElementById('more-info-btn').addEventListener('click', function() {
  window.location.href = 'aboutus.html'; // Replace with your actual More Info page link
});


//// rentout page 

document.getElementById('upload-details-btn').addEventListener('click', async function() {
  try {
    const response = await fetch("http://localhost:5000/api/check-auth", {
        credentials: "include", // Important to send session cookies
    });
    const data = await response.json();

    if (data.isAuthenticated) {
        window.location.href = "rent-out-form.html"
    } else {
        // User is NOT logged in -> Show login/signup message
        alert("Please log in or sign up before filling out the Rentout Form.");
        window.location.href = "form.html"; // Redirect to login page
    }
} catch (error) {
    console.error("Error checking authentication:", error);
}
});

