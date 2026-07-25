const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');
const PROJECTS_FILE = path.join(DATA_DIR, 'projects.json');
const GALLERY_FILE = path.join(DATA_DIR, 'gallery.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const defaultProjects = [];

const defaultGallery = [];

// Read File Helper
const readFile = (filePath, defaultData) => {
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2), 'utf8');
      return defaultData;
    }
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error(`Error reading database file at ${filePath}:`, err);
    return defaultData;
  }
};

// Write File Helper
const writeFile = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error(`Error writing database file at ${filePath}:`, err);
    return false;
  }
};

// Database functions
const getProjects = () => readFile(PROJECTS_FILE, defaultProjects);
const saveProjects = (projects) => writeFile(PROJECTS_FILE, projects);

const getGallery = () => readFile(GALLERY_FILE, defaultGallery);
const saveGallery = (gallery) => writeFile(GALLERY_FILE, gallery);

module.exports = {
  getProjects,
  saveProjects,
  getGallery,
  saveGallery
};
