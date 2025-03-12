document.addEventListener('DOMContentLoaded', () => {
const contentDiv = document.getElementById('content');
    const sidebar = document.getElementById('sidebar');
    const resizeHandle = document.getElementById('resizeHandle');

    // Function to show the selected content and hide others
    function showContent(sectionId) {
      const sections = ['dashboard', 'userDetails', 'profile', 'settings', 'welcome'];
      sections.forEach(section => {
        document.getElementById(section).classList.add('hidden'); // Hide all sections
      });
      document.getElementById(sectionId).classList.remove('hidden'); // Show the selected section
    }

    // Event listeners for menu links
    document.getElementById('dashboardLink').addEventListener('click', () => {
      showContent('dashboard');
    });

    document.getElementById('userDetailsLink').addEventListener('click', () => {
      showContent('userDetails');
    });

    document.getElementById('profileLink').addEventListener('click', () => {
      showContent('profile');
    });

    document.getElementById('settingsLink').addEventListener('click', () => {
      showContent('settings');
    });

    // Initial state
    showContent('welcome'); // Show welcome message by default

    // Resizing sidebar functionality
    let isResizing = false;

    resizeHandle.addEventListener('mousedown', (e) => {
      isResizing = true;
      document.body.style.cursor = 'col-resize';
    });

    document.addEventListener('mousemove', (e) => {
      if (!isResizing) return;

      // Calculate new width
      const newWidth = e.clientX;
      if (newWidth > 160 && newWidth < 400) { // Set min/max width
        sidebar.style.width = `${newWidth}px`;
      }
    });

    document.addEventListener('mouseup', () => {
      isResizing = false;
      document.body.style.cursor = 'default';
    });

  fetch('http://localhost:5000/api/users')
  .then(response => response.json())
  .then(data => renderUsersTable(data))
  .catch(error => console.error('Error fetching users:', error));
  function renderUsersTable(users) {
    const usersTableBody = document.getElementById('usersTableBody'); 
    usersTableBody.innerHTML = ''; // Clear existing rows

    users.forEach(user => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
       <td class="border border-gray-300 p-2">${user.name}</td>
                  <td class="border border-gray-300 p-2">${user.email}</td>
                  <td class= "border border-gray-300 p-2">${user.phone}</td>
      `
      usersTableBody.appendChild(tr);
    })
  }

    
    fetch('http://localhost:3000/api/vehicles')
  .then(response => response.json())
  .then(data => renderTable(data))
  .catch(error => console.error('Error fetching vehicles:', error));
  function renderTable(vehicles) {
    const tableBody = document.getElementById('tableBody'); 
    tableBody.innerHTML = ''; // Clear existing rows
  
    vehicles.forEach(vehicle => {
      const tr = document.createElement('tr');
      const imageLinks = vehicle.vehicleImages
        .map((img, index) => `<a href="${img}" target="_blank" class="text-blue-500">Img ${index + 1}</a>`)
        .join(' | '); // Join with '|' separator
  
              tr.innerHTML = `
                  <td class="border border-gray-300 p-2">${vehicle.ownerName}</td>
                  <td class="border border-gray-300 p-2">${vehicle.vehicleName}</td>
                  <td class= "border border-gray-300 p-2">${vehicle.date}</td>
                  <td class="border border-gray-300 p-2">${vehicle.startTime} - ${vehicle.endTime}</td>

                  <td class="border border-gray-300 p-2">${imageLinks}</td>
                  <td class="border border-gray-300 p-2">${vehicle.pickupAddress}</td>
                  <td class="border border-gray-300 p-2">${vehicle.phoneNo}</td>
                  <td class="border border-gray-300 p-2">
                      <a href="${vehicle.license}" class="text-blue-500" target="_blank">License</a> | 
                      <a href="${vehicle.aadhar}" class="text-blue-500" target="_blank">Aadhar</a> |
                      <a href="${vehicle.registrationPaper}" class="text-blue-500" target="_blank">Registration-Paper</a>
                  </td>
                  
<td class="border border-gray-300 p-2">
                      <span class="status ${getStatusClass(vehicle.status)} bg-yellow-500 text-xs text-white px-1 py-1 rounded">${vehicle.status}</span>
                  </td>
                  <td class="border border-gray-300 p-2">
                  <button class="approve-btn bg-green-500 text-white text-sm px-1 py-1 rounded mr-2" >Approve</button>
                      <button class="reject-btn bg-red-500 text-white text-sm px-1 py-1 rounded">Reject</button>
                  </td>
              `;
              const approveBtn = tr.querySelector('.approve-btn');
      const rejectBtn = tr.querySelector('.reject-btn');
       const statusSpan = tr.querySelector('.status');

      approveBtn.addEventListener('click', () => updateStatus(vehicle._id, 'approved' , statusSpan));
      rejectBtn.addEventListener('click', () => updateStatus(vehicle._id, 'rejected' , statusSpan));
              tableBody.appendChild(tr);
    
  });
}
function getStatusClass(status) {
  return status === 'approved' ? 'bg-green-500' : status === 'rejected' ? 'bg-red-500' : 'bg-yellow-500';
}

function updateStatus(vehicleId, newStatus, statusSpan) {
  console.log(`Updating vehicle ID: ${vehicleId} to status: ${newStatus}`);

  fetch(`http://localhost:3000/api/vehicles/${vehicleId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: newStatus })
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to update status');
      }
      // Update the status in the UI dynamically
      statusSpan.textContent = newStatus;
      statusSpan.className = `status ${getStatusClass(newStatus)} text-xs text-white px-1 py-1 rounded`;
    })
    .catch(error => console.error('Error updating status:', error));
}
});
        