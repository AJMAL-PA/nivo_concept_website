const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const db = require('../utils/db');

// Multer Upload Configuration - Save directly to client public folder
const UPLOADS_DIR = path.join(__dirname, '..', '..', 'client', 'public', 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
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

/* --- Image Upload Endpoint --- */
router.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image file uploaded' });
  }
  const fileUrl = `/uploads/${req.file.filename}`;
  res.json({ url: fileUrl });
});

/* --- Projects Endpoints --- */
// GET all projects
router.get('/projects', (req, res) => {
  res.json(db.getProjects());
});

// GET single project details
router.get('/projects/:id', (req, res) => {
  const projects = db.getProjects();
  const project = projects.find(p => p.id === req.params.id);
  if (!project) {
    return res.status(404).json({ error: 'Project not found' });
  }
  res.json(project);
});

// POST new project
router.post('/projects', authenticateAdmin, (req, res) => {
  const { title, img, tags, description, client, location, area, style, duration, year, images } = req.body;
  
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const projects = db.getProjects();
  const newProject = {
    id: Date.now().toString(),
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
  };

  projects.push(newProject);
  db.saveProjects(projects);
  res.status(201).json(newProject);
});

// PUT update project
router.put('/projects/:id', authenticateAdmin, (req, res) => {
  const { title, img, tags, description, client, location, area, style, duration, year, images } = req.body;
  const projects = db.getProjects();
  const index = projects.findIndex(p => p.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: 'Project not found' });
  }

  const updatedProject = {
    ...projects[index],
    title: title !== undefined ? title : projects[index].title,
    img: img !== undefined ? img : projects[index].img,
    tags: tags !== undefined ? tags : projects[index].tags,
    description: description !== undefined ? description : projects[index].description,
    client: client !== undefined ? client : projects[index].client,
    location: location !== undefined ? location : projects[index].location,
    area: area !== undefined ? area : projects[index].area,
    style: style !== undefined ? style : projects[index].style,
    duration: duration !== undefined ? duration : projects[index].duration,
    year: year !== undefined ? year : projects[index].year,
    images: images !== undefined ? images : projects[index].images
  };

  projects[index] = updatedProject;
  db.saveProjects(projects);
  res.json(updatedProject);
});

// DELETE project
router.delete('/projects/:id', authenticateAdmin, (req, res) => {
  const projects = db.getProjects();
  const filtered = projects.filter(p => p.id !== req.params.id);
  
  if (projects.length === filtered.length) {
    return res.status(404).json({ error: 'Project not found' });
  }

  db.saveProjects(filtered);
  res.json({ message: 'Project deleted successfully' });
});


/* --- Gallery Endpoints --- */
// GET all gallery items
router.get('/gallery', (req, res) => {
  res.json(db.getGallery());
});

// POST new gallery item
router.post('/gallery', authenticateAdmin, (req, res) => {
  const { title, img, category } = req.body;
  
  if (!img || !category) {
    return res.status(400).json({ error: 'Image URL/Path and Category are required' });
  }

  const gallery = db.getGallery();
  const newItem = {
    id: Date.now().toString(),
    title: title || '',
    img,
    category
  };

  gallery.push(newItem);
  db.saveGallery(gallery);
  res.status(201).json(newItem);
});

// DELETE gallery item
router.delete('/gallery/:id', authenticateAdmin, (req, res) => {
  const gallery = db.getGallery();
  const filtered = gallery.filter(item => item.id !== req.params.id);

  if (gallery.length === filtered.length) {
    return res.status(404).json({ error: 'Gallery item not found' });
  }

  db.saveGallery(filtered);
  res.json({ message: 'Gallery item deleted successfully' });
});

module.exports = router;
