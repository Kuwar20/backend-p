// server/server.js
import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import authRoutes from './routes/auth.js';
import dashboardRoutes from './routes/dashboard.js';
import connectDB from './config/db.js';
import User from './models/Users.js';

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Function to create initial users
async function createInitialUsers() {
  try {
    // Check if users already exist
    const userCount = await User.countDocuments();
    if (userCount > 0) {
      console.log('Users already exist, skipping creation of initial users');
      return;
    }

    // Create a normal user
    const normalUser = new User({
      username: 'user',
      password: await bcrypt.hash('userpassword', 10),
      role: 'user'
    });
    await normalUser.save();

    // Create an admin user
    const adminUser = new User({
      username: 'admin',
      password: await bcrypt.hash('adminpassword', 10),
      role: 'admin'
    });
    await adminUser.save();

    console.log('Initial users created successfully');
  } catch (error) {
    console.error('Error creating initial users:', error);
  }
}

// Call the function to create initial users when the server starts
createInitialUsers();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));