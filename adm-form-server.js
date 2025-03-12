const express = require('express');
const multer = require('multer');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const port = 4000;
// Initialize Express
const app = express();
app.use(express.json());
app.use(cors());

app.use(express.static(__dirname));
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin: 'http://127.0.0.1:5500'
}));
app.get('/', (req,res) =>{
    res.sendFile(path.join(__dirname , 'admin-form.html'));
})

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/Admin-form-database',{
    useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error: ', err));

// Admin Schema and Model
const adminSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  });
  
  const Admin = mongoose.model('Admin', adminSchema);
  
// //   Seed Admin Users (Run this once if you need to seed the data)
//   async function seedAdmins() {
//     const admins = [
//       { username: 'sanjana72', password: await bcrypt.hash('sanjana123', 10) },
//       { username: 'shekhar79', password: await bcrypt.hash('shekhar123', 10) },
//       { username: 'sanskar73', password: await bcrypt.hash('sanskar123', 10) },
//     ];
//     await Admin.insertMany(admins);
//     console.log('Admins seeded successfully!');
//   }
//   seedAdmins(); // Uncomment to seed the admins initially

// Handle Login Form Submission
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const admin = await Admin.findOne({ username });

        if (!admin || !(await bcrypt.compare(password, admin.password))) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        res.status(200).json({ message: 'Login successful' });  // Send success response
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Start the server
app.listen(4000, () => {
    console.log('Server running on http://localhost:4000');
  });