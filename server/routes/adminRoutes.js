const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const cloudinary = require('../config/cloudinary');
const Project = require('../models/Project');
const GalleryItem = require('../models/GalleryItem');

// Multer Upload Configuration - In-Memory Storage
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: Infinity }, // No limit for image uploads
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|webp|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only images are allowed (jpeg, jpg, png, webp, gif)'));
  }
});

// Helper function to stream file buffer to Cloudinary
const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: 'nivo_website' },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    uploadStream.end(fileBuffer);
  });
};

// USERNAME & PASSCODE Authentication Middleware
const authenticateAdmin = (req, res, next) => {
  const adminUsername = req.headers['x-admin-username'];
  const adminPasscode = req.headers['x-admin-passcode'];
  
  const expectedUsername = process.env.ADMIN_USERNAME || 'nivoadmin';
  const expectedPasscode = process.env.ADMIN_PASSCODE || 'admin123';
  
  if (adminUsername === expectedUsername && adminPasscode === expectedPasscode) {
    return next();
  }
  return res.status(401).json({ error: 'Unauthorized: Invalid admin credentials' });
};

// POST Verify Admin Credentials
router.post('/admin/verify', authenticateAdmin, (req, res) => {
  res.json({ success: true, message: 'Admin credentials valid' });
});

/* --- Image Upload Endpoint --- */
router.post('/upload', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image file uploaded' });
  }
  
  try {
    const result = await uploadToCloudinary(req.file.buffer);
    res.json({ url: result.secure_url });
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    res.status(500).json({ error: 'Failed to upload image to Cloudinary' });
  }
});

/* --- Projects Endpoints --- */
// GET all projects
router.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET single project details
router.get('/projects/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST new project
router.post('/projects', authenticateAdmin, async (req, res) => {
  const { title, img, tags, description, client, location, area, style, duration, year, images } = req.body;
  
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  try {
    const newProject = new Project({
      title,
      img: img || '/images/projects-wide/1.webp',
      tags: Array.isArray(tags) ? tags : [],
      description: description || '',
      client: client || '',
      location: location || '',
      area: area || '',
      style: style || '',
      duration: duration || '',
      year: year || '',
      images: Array.isArray(images) ? images : []
    });

    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT update project
router.put('/projects/:id', authenticateAdmin, async (req, res) => {
  const { title, img, tags, description, client, location, area, style, duration, year, images } = req.body;

  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    if (title !== undefined) project.title = title;
    if (img !== undefined) project.img = img;
    if (tags !== undefined) project.tags = tags;
    if (description !== undefined) project.description = description;
    if (client !== undefined) project.client = client;
    if (location !== undefined) project.location = location;
    if (area !== undefined) project.area = area;
    if (style !== undefined) project.style = style;
    if (duration !== undefined) project.duration = duration;
    if (year !== undefined) project.year = year;
    if (images !== undefined) project.images = images;

    await project.save();
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE project
router.delete('/projects/:id', authenticateAdmin, async (req, res) => {
  try {
    const result = await Project.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* --- Gallery Endpoints --- */
// GET all gallery items
router.get('/gallery', async (req, res) => {
  try {
    const gallery = await GalleryItem.find().sort({ createdAt: -1 });
    res.json(gallery);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST new gallery item
router.post('/gallery', authenticateAdmin, async (req, res) => {
  const { title, img, category } = req.body;
  
  if (!img || !category) {
    return res.status(400).json({ error: 'Image URL/Path and Category are required' });
  }

  try {
    const newItem = new GalleryItem({
      title: title || '',
      img,
      category
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE gallery item
router.delete('/gallery/:id', authenticateAdmin, async (req, res) => {
  try {
    const result = await GalleryItem.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ error: 'Gallery item not found' });
    }
    res.json({ message: 'Gallery item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
