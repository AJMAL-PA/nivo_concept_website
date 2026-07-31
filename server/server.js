require('dotenv').config();
const express = require('express');
const cors = require('cors');
const contactRoutes = require('./routes/contactRoutes');
const adminRoutes = require('./routes/adminRoutes');
const path = require('path');
const { connectDB, isLocalDB } = require('./config/db');
const Project = require('./models/Project');
const GalleryItem = require('./models/GalleryItem');
const dbMock = require('./utils/db');

const app = express();
const PORT = process.env.PORT || 5001;

// Connect to MongoDB
connectDB().then(() => {
  if (!isLocalDB()) {
    seedData();
  } else {
    dbMock.initializeLocalData();
  }
});

async function seedData() {
  try {
    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      console.log('Seeding projects...');
      const mockProjects = dbMock.getProjects();
      const projectsToSeed = mockProjects.map(({ id, ...rest }) => rest);
      await Project.insertMany(projectsToSeed);
      console.log('Projects seeded successfully.');
    }

    const galleryCount = await GalleryItem.countDocuments();
    if (galleryCount === 0) {
      console.log('Seeding gallery items...');
      const mockGallery = dbMock.getGallery();
      const galleryToSeed = mockGallery.map(({ id, ...rest }) => rest);
      await GalleryItem.insertMany(galleryToSeed);
      console.log('Gallery items seeded successfully.');
    }
  } catch (error) {
    console.error('Error seeding data:', error);
  }
}

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

// Serve static uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api', contactRoutes);
app.use('/api', adminRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Intrio server is running' });
});

app.listen(PORT, () => {
  console.log(`Intrio server running on port ${PORT}`);
});

module.exports = app;
