const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');


// const req = require('express/lib/request');
const port = 5000;
const app = express();
app.use(cookieParser());
app.set('trust proxy', 1); 
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost:27017/form-database',
        collectionName: 'sessions'
    }),
    cookie: { secure: false, httpOnly: true, sameSite: 'lax' } 
}));
app.use(express.static(__dirname));
app.use(express.urlencoded({extended:true}));
app.use(cors({
    credentials: true,
    origin: function (origin, callback) {
        const allowedOrigins = ['http://127.0.0.1:5500', 'http://localhost:4000', 'http://localhost:3000', 'http://localhost:5000'];
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    allowedHeaders: 'Content-Type, Authorization',
    methods: ['GET', 'POST' , 'PUT'],
  }));
app.use(bodyParser.json());
app.use(express.json()); // To parse JSON data
app.get('/', (req,res) =>{
    res.sendFile(path.join(__dirname , 'form.html'))
})

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/form-database', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Define User Schema
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: {type: String , required: true, unique: true},
    password: { type: String, required: true },
    // confirm_password: {type: String, required: true},
});
const User = mongoose.model('User', UserSchema);

// Signup Route
app.post('/signup', async (req, res) => {
    // console.log(req.body);
    const { name, email, phone, password} = req.body;
    console.log("Received Signup Data:", req.body); 
    // console.log(req.body);
    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email is already registered' });
        }
    
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
    //  create new user
    const newUser = new User({
        name,
        email,
        phone,
        password: hashedPassword
    });
    await newUser.save();
     // ✅ Set session after signup
     req.session.user = { email: newUser.email, name: newUser.name, phone: newUser.phone };
     req.session.save(err => {
         if (err) {
             console.error("Session save error:", err);
             return res.status(500).json({ message: "Session error" });
         }
         res.status(201).json({ message: 'User created successfully', user: newUser });
     });
} catch (err) {
    console.error('Error creating user' , err);
    res.status(500).json({ error: 'Server error' });
}
});

// Login Route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        req.session.user = { email: user.email, name: user.name, phone: user.phone};
        console.log("Session after login:", req.session);
           // Store user ID in session
        req.session.userId = user._id.toString(); // Convert ObjectId to string
        req.session.save(err => {
            if (err) {
                console.error("Session save error:", err);
                return res.status(500).json({ message: "Session error" });
            }
        res.status(200).json({ message: 'Login successful',user});
        });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in' });
    }
});
app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: "Logout failed" });
        }
        res.clearCookie('connect.sid'); // Clear session cookie
        return res.json({ message: "Logged out successfully" });
    });
});
app.get('/api/users', async (req, res) => {
    try {
      const users = await User.find(); // Ensure you are using a valid DB query
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  });
 
  app.get('/api/users/me', async (req, res) => {
    console.log("Session in /api/users/me:", req.session.user);
    if (!req.session.user || !req.session.user.email) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const user = await User.findOne({ email: req.session.user.email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ name: user.name, email: user.email, phone: user.phone });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});
// Update User Profile Route
app.put('/api/users/update', async (req, res) => {
    console.log("Session in update:", req.session.user);
    if (!req.session.user || !req.session.user.email) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const { name, phone } = req.body; // Get updated details
    try {
        // Find user by session email and update details
        const updatedUser = await User.findOneAndUpdate(
            { email: req.session.user.email },
            { name, phone },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update session with new details
        req.session.user.name = updatedUser.name;
        req.session.user.phone = updatedUser.phone;

        res.json({ message: "Profile updated successfully", user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
// Check if user is logged in
app.get('/api/check-auth', (req, res) => {
    if (req.session.user) {
        return res.json({ isAuthenticated: true, user: req.session.user });
    } else {
        return res.json({ isAuthenticated: false });
    }
});

app.listen(port, () => {
    console.log('Server is running on port: 5000');
});