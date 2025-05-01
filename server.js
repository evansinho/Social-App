import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes/index.js';
import path from 'path';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import Post from './models/Post.js';
import Profile from './models/Profile.js';

dotenv.config();
const Database = process.env.DATABASE;

// Database connection with improved error handling
const connectDB = async () => {
  try {
    await mongoose.connect(Database);
    console.log('Database Connected');
    await seedDatabase();
  } catch (err) {
    console.error('Database connection error:', err);
    process.exit(1);
  }
};

// Seed function
const seedDatabase = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Post.deleteMany({});
    await Profile.deleteMany({});

    // Create users
    const users = [];
    const password = await bcrypt.hash('password123', 10);
    
    for (let i = 1; i <= 5; i++) {
      users.push({
        name: `User ${i}`,
        email: `user${i}@example.com`,
        password,
        avatar: `https://i.pravatar.cc/150?img=${i}`
      });
    }

    const createdUsers = await User.insertMany(users);
    console.log(`${createdUsers.length} users created`);

    // Create profiles
    const profiles = createdUsers.map((user, index) => ({
      user: user._id,
      company: `Company ${index + 1}`,
      website: `https://user${index + 1}.com`,
      location: ['New York', 'London', 'Tokyo', 'Sydney', 'Berlin'][index],
      status: ['Developer', 'Designer', 'Manager', 'Student', 'Teacher'][index],
      skills: ['JavaScript', 'React', 'Node.js', 'Python', 'CSS'].slice(0, index + 1),
      bio: `This is a bio for User ${index + 1}`,
      social: {
        twitter: `user${index + 1}`,
        linkedin: `user${index + 1}`
      }
    }));

    const createdProfiles = await Profile.insertMany(profiles);
    console.log(`${createdProfiles.length} profiles created`);

    // Create posts
    const posts = [];
    for (let i = 0; i < 10; i++) {
      const userIndex = i % 5;
      posts.push({
        user: createdUsers[userIndex]._id,
        text: `This is post number ${i + 1} by ${createdUsers[userIndex].name}`,
        name: createdUsers[userIndex].name,
        avatar: createdUsers[userIndex].avatar,
        likes: [
          { user: createdUsers[(userIndex + 1) % 5]._id },
          { user: createdUsers[(userIndex + 2) % 5]._id }
        ],
        comments: [
          {
            user: createdUsers[(userIndex + 1) % 5]._id,
            text: `Great post ${i + 1}!`,
            name: createdUsers[(userIndex + 1) % 5].name,
            avatar: createdUsers[(userIndex + 1) % 5].avatar
          }
        ]
      });
    }

    const createdPosts = await Post.insertMany(posts);
    console.log(`${createdPosts.length} posts created`);
    console.log('Database seeded successfully!');
  } catch (err) {
    console.error('Seeding error:', err);
  }
};

// Instantiate the app
const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json({ extended: false }));

// Routes
app.use(routes);

// Production configuration
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Connect to DB and start server
connectDB().then(() => {
  app.listen(port, () => console.log(`Server is listening on port ${port}`));
});
