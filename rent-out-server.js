const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const session = require('express-session');
const axios = require('axios');
const { json } = require('body-parser');
const port = 3000;
// Initialize Express
const app = express();
app.use(express.json());
app.use(cors());
// CORS Configuration - Allow multiple origins
const allowedOrigins = ['http://127.0.0.1:5500', 'http://localhost:4000','http://localhost:3000', 'http://localhost:5000'];

app.use(express.static(__dirname));
app.use(express.urlencoded({extended:true}))
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like Postman or server-side requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
    allowedHeaders: 'Content-Type, Authorization', // Allow specific headers
    methods: ['GET', 'POST'],
}));
app.get('/', (req,res) =>{
    res.sendFile(path.join(__dirname , 'rent-out-form.html'));
})
// Ensure the uploads directory exists
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}
// MongoDB connection
mongoose.connect('mongodb://localhost:27017/rent-out-form-database',{
    useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error: ', err));


// Vehicle Schema
const vehicleSchema = new mongoose.Schema({
  ownerName: String,
  vehicleType: String,
  vehicleName: String,
  vehicleNumberPlate: String,
  startTime: String,
  endTime: String,
  date: String,
  vehicleImages: [String],
  pickupAddress: String,
  areaPinCode: String,
  landmark: String,
  fuelType: String,
  phoneNo: String,
  email: String,
  license: String,
  aadhar: String,
  registrationPaper: String,
  latitude: Number,  // New field for latitude
  longitude: Number, // New field for longitude
  status: { type: String, default: 'pending' }
  });
const Vehicle = mongoose.model('Vehicle',vehicleSchema);

async function getCoordinates(address) {
  try {
    const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
      params: {
        q: address,
        format: 'json',
        limit: 1
      }
    });

    // **Log the full response for debugging**
    console.log('API Response:', response.data);

    if (response.data.length > 0) {
      return {
        latitude: parseFloat(response.data[0].lat),
        longitude: parseFloat(response.data[0].lon)
      };
    } else {
      console.log('No results found for address:', address);
      return { latitude: null, longitude: null };
    }
  } catch (error) {
    console.error('Error fetching coordinates:', error.message);
    return { latitude: null, longitude: null };
  }
}
// Set up Multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
  const upload = multer({ storage });
  
//   const GEOAPIFY_API_KEY = "258de1ab37bf48ddb568641483208702";
//   async function getCoordinates(address) {
//     try {
//         const response = await axios.get(`https://api.geoapify.com/v1/geocode/search?text=38%20Upper%20${address}Indore%20India&apiKey=`, {
//             params: {
//                 text: address,
//                 format: 'json',
//                 apiKey: "258de1ab37bf48ddb568641483208702",
//             }
//         });
        
//         if (response.data && response.data.features && response.data.features.length > 0) {
//           const { lat, lon } = response.data.results[0];
//           console.log('Geoapify Response:', JSON.stringify(response.data, null, 2));
//           return { latitude: lat, longitude: lon };
//       } else {
//           throw new Error('No coordinates found for the given address');
//       }
//   } catch (error) {
//       console.error('Geocoding error:', error.message);
//       throw new Error('Failed to get coordinates');
//   }
// } 
  // POST route for vehicle details submission
app.post('/api/rentout', upload.fields([
    { name: 'vehicleImages', maxCount: 7 },
    { name: 'license', maxCount: 1 },
    { name: 'aadhar', maxCount: 1 },
    {name: 'registrationPaper' , maxCount: 1},
  ]), async (req, res) => {
    console.log('Received request on /api/rentout'); // Log request
    console.log('Body:', req.body); // Check body data
    // console.log('Files:', req.files); // Check files data
    try {
      console.log('Received request:', req.body);
      const { ownerName, vehicleType, vehicleName, vehicleNumberPlate, startTime, endTime, date, pickupAddress, areaPinCode, landmark, fuelType, phoneNo, email , status} = req.body;
    // Get latitude and longitude from Geoapify API
    const { latitude, longitude } = await getCoordinates(pickupAddress);
    console.log('Geocoded Coordinates:', latitude, longitude);
      const vehicleImages = req.files['vehicleImages'].map(file => file.path);
      const license = req.files['license'][0].path;
      const aadhar = req.files['aadhar'][0].path;
      const registrationPaper = req.files['registrationPaper'][0].path;
      const vehicle = new Vehicle({
        ownerName,
        vehicleType,
        vehicleName,
        vehicleNumberPlate,
        startTime,
        endTime,
        date,
        vehicleImages,
        pickupAddress,
        areaPinCode,
        landmark,
        fuelType,
        phoneNo,
        email,
        license,
        aadhar,
        registrationPaper,
        status: "pending",
        latitude,
        longitude,
      });
      
      await vehicle.save();
        res.status(200).json({ message: 'Vehicle details uploaded successfully' });
    } catch (error) {
      console.error('Server Error:', error); // Log the full error
  res.status(500).json({ message: 'Server error', error: error.message });
    }
  });
  // GET route to fetch all vehicle data
app.get('/api/vehicles', async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch vehicle data', error });
  }
});
// app.get('/myVehicles', async (req, res) => {
//   try {
//       if (!req.session.userId) {
//           return res.status(401).json({ success: false, message: "Unauthorized" });
//       }

//       const userId = req.session.userId;
//       const vehicles = await Vehicle.find({ owner: userId });

//       return res.status(200).json({ success: true, vehicles });
//   } catch (error) {
//       console.error(error);
//       return res.status(500).json({ success: false, message: "Server Error" });
//   }
// });


// PUT route to update the status of a vehicle
app.put('/api/vehicles/:id', async (req, res) => {
  const { id } = req.params; // Extract vehicle ID from the request parameters
  const { status } = req.body; // Extract new status from request body

  try {
    const vehicle = await Vehicle.findByIdAndUpdate(
      id,
      { status },
      { new: true } // Return the updated document
    );

    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    res.status(200).json({ message: 'Status updated successfully', vehicle });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});


// New route to fetch only approved vehicles
app.get('/api/vehicles/approved', async (req, res) => {
  try {
    const currentTime = new Date();
    const approvedVehicles = await Vehicle.find({ status: 'approved',
      $or: [
        { date: { $gt: currentTime.toISOString().split("T")[0] } }, // Future dates
        { 
          date: currentTime.toISOString().split("T")[0], // Today’s date
          endTime: { $gt: currentTime.toTimeString().split(" ")[0] } // End time not passed
        }
      ]
    });
    res.status(200).json(approvedVehicles);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch approved vehicles', error });
  }
});

  // Start the server
  app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
  });