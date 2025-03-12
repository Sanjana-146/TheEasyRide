
document.addEventListener('DOMContentLoaded', () => {
  const vehicleCards = document.getElementById('vehicleCards');
  const rideNowBtn = document.getElementById('ride-now-btn');
  const startDate = document.getElementById('start-date');
  const startTime = document.getElementById('start-time');
  const endTime = document.getElementById('end-time');
  const vehicleType = document.getElementById('vehicle-type');


  fetchVehicles();

   // Add event listener to the search button
rideNowBtn.addEventListener('click', () => {
  const filters = {
    vehicleType: vehicleType.value,
    startTime: startTime.value,
    endTime: endTime.value,
    startDate: startDate.value,
  };
  fetchVehicles(filters);
});


function getUserLocation(callback) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        callback(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        console.error("Error getting location:", error);
        callback(null, null);
      }
    );
  } else {
    console.error("Geolocation is not supported by this browser.");
    callback(null, null);
  }
}
// Function to fetch vehicles with optional filters
function fetchVehicles(filters = {}) {
  // getUserLocation((latitude, longitude) => {
  fetch('http://localhost:3000/api/vehicles/approved')
    .then((response) => response.json())
    .then((vehicles) => {
      if (!Array.isArray(vehicles)) {
        console.error("Error: Vehicles data is not an array!", vehicles);
        return;
      }
      let filteredVehicles = filterVehicles(vehicles, filters);
      // Get user's live location before sorting by distance
      getUserLocation((latitude, longitude) => {
        if (latitude && longitude) {
          filteredVehicles = sortVehiclesByDistance(filteredVehicles, latitude, longitude);
        } else {
          console.warn("User location not available. Showing unsorted vehicles.");
        }

        console.log("Final Vehicles Data:", filteredVehicles); // Debugging
        renderCards(filteredVehicles); // ✅ Ensure vehicles always have the `distance` property
      });
    })
    .catch((error) => console.error('Error fetching vehicles:', error));
}
function calculateDistance(lat1, lon1, lat2, lon2) {
      console.log(`Calculating distance between:
        Point 1: ${lat1}, ${lon1}
        Point 2: ${lat2}, ${lon2}
      `);
    
      if (!lat1 || !lon1 || !lat2 || !lon2) {
        console.error("Error: Invalid coordinates provided!");
        return "N/A"; // Returning N/A if any coordinate is missing
      }
    
      const R = 6371; // Earth's radius in km
      const dLat = (lat2 - lat1) * (Math.PI / 180);
      const dLon = (lon2 - lon1) * (Math.PI / 180);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) *
          Math.cos(lat2 * (Math.PI / 180)) *
          Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c;
    
      console.log("Calculated Distance:", distance);
      return distance.toFixed(2); // Convert to 2 decimal places
    }
    function sortVehiclesByDistance(vehicles, userLat, userLon) {
      return vehicles
        .filter(vehicle => vehicle.latitude && vehicle.longitude) // Ensure coordinates exist
        .map(vehicle => ({
          ...vehicle,
          distance: calculateDistance(userLat, userLon, vehicle.latitude, vehicle.longitude)
        }))
        .sort((a, b) => a.distance - b.distance);
    }
// Function to filter vehicles based on selected criteria
function filterVehicles(vehicles, filters) {
  return vehicles.filter((vehicle) => {
    const { vehicleType, startDate, startTime, endTime } = filters;

    // Filter by vehicle type if selected
    if (vehicleType !== "All" && vehicle.vehicleType !== vehicleType) return false;

     // ✅ Filter by date (must match exactly)
  if (startDate && vehicle.date !== startDate) return false;
    
    // Filter by time slot if both times are provided
    if (startTime && endTime) {
      const vehicleStart = vehicle.startTime || '00:00';
      const vehicleEnd = vehicle.endTime || '23:59';
      return (
        vehicleStart <= startTime &&
        vehicleEnd >= endTime
      );
    }

    return true; // Return all vehicles if no filters are applied
  });
}


  // Fetch only approved vehicles
fetch('http://localhost:3000/api/vehicles/approved')
    .then(response => response.json())

    //sort distance
    //harsive
    
  //   .then(data => renderCards(data))
  .then((vehicles) => {
    getUserLocation((latitude, longitude) => {
      if (latitude && longitude) {
        vehicles = sortVehiclesByDistance(vehicles, latitude, longitude);
      } else {
        console.warn("User location not available. Showing unsorted vehicles.");
      }
      console.log('Fetched Vehicles:', vehicles); // Add this line
      renderCards(vehicles);
    })
  })
    .catch(error => console.error('Error fetching vehicles:', error));

  function renderCards(vehicles) {
    vehicleCards.innerHTML = ''; // Clear cards
    vehicles.forEach(vehicle => {
      const distanceText = vehicle.distance && vehicle.distance !== "N/A" 
      ? `${vehicle.distance} km` 
      : "N/A";
      const card = document.createElement('div');
    card.classList.add(
      'bg-white', 
      'shadow-lg', 
      'rounded-lg', 
      'overflow-hidden',
      'w-full',
      'max-w-sm',
      'mt-10',
      'mx-auto'
    );

    const vehicleImage = vehicle.vehicleImages.length
      ? vehicle.vehicleImages[0]
      : 'default-image.jpg'; // Use a placeholder image if no images available

    card.innerHTML = `
      <img src="${vehicleImage}" alt="${vehicle.vehicleName}" class="w-full h-48 object-cover"/>
      <div class="p-3">
        <div class="flex justify-between items-center mb-2">
          <h2 class="text-xl font-bold">${vehicle.vehicleName}</h2>
          <span class="text-sm bg-gray-100 text-gray-600 px-2 py-1 rounded">${vehicle.fuelType}</span>
        </div>
        <div class="flex justify-between items-center mb-2">
        <h2 class="text-sm text-gray-500 mb-4 font-semibold">Pickup: ${vehicle.pickupAddress}</h2>
        <span class="text-lg text-gray-800 mb-1 px-2 py-1 rounded">Price: ₹${vehicle.price || 'N/A'}</span>
        <p class="text-sm text-gray-500">Distance: ${distanceText}</p>
        </div>
        <div class="flex justify-between">
          <button class="more-details-btn bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
            More Details
          </button>
          <button class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
            Book Now
          </button>
        </div>
      </div>
    `;
    card.querySelector('.more-details-btn').addEventListener('click', () => {
      const queryParams = new URLSearchParams({
        vehicleName: vehicle.vehicleName,
        fuelType: vehicle.fuelType,
        pickupAddress: vehicle.pickupAddress,
        areaPinCode: vehicle.areaPinCode,
        phoneNo: vehicle.phoneNo,
        price: vehicle.price,
        vehicleImages: vehicle.vehicleImages.join(',') // Convert array to string if it's an array
      }).toString();
  
      window.location.href = `moredetails.html?${queryParams}`;
  });
    
    vehicleCards.appendChild(card);
  });
  }
});