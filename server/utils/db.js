const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');
const PROJECTS_FILE = path.join(DATA_DIR, 'projects.json');
const GALLERY_FILE = path.join(DATA_DIR, 'gallery.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const defaultProjects = [
  {
    id: "1",
    title: "Luxurious Oceanside Villa Build",
    img: "/images/projects-wide/4.webp",
    tags: ["Residential", "Turnkey Construction", "Luxury"],
    description: "This project involved constructing a state-of-the-art modern villa facing the ocean, incorporating concrete columns, double-height glass panels, and bespoke structural styling.",
    client: "Oceanside Estates",
    location: "Miami, FL",
    area: "6,500 sq ft",
    style: "Modern Coastal Minimalist",
    duration: "14 months",
    year: "2025",
    images: ["/images/projects-wide/1.webp", "/images/projects-wide/2.webp", "/images/projects-wide/3.webp"]
  },
  {
    id: "2",
    title: "Contemporary Corporate Headquarters",
    img: "/images/projects-wide/1.webp",
    tags: ["Commercial", "Steel Frame", "Office Space"],
    description: "A premium corporate building utilizing high-strength steel framing, double-glazed glass facades, and modular layout coordination.",
    client: "Apex Industries",
    location: "Chicago, IL",
    area: "45,000 sq ft",
    style: "Industrial Contemporary",
    duration: "18 months",
    year: "2024",
    images: ["/images/projects-wide/2.webp", "/images/projects-wide/3.webp", "/images/projects-wide/4.webp"]
  },
  {
    id: "3",
    title: "Premium Retail Plaza Development",
    img: "/images/projects-wide/2.webp",
    tags: ["Commercial", "Glass Architecture", "Retail"],
    description: "Development of a premium high-end shopping plaza with glass skylights, structural steel, and custom interior walkthrough design.",
    client: "Plaza Group LLC",
    location: "Los Angeles, CA",
    area: "32,000 sq ft",
    style: "Urban Glass & Steel",
    duration: "12 months",
    year: "2025",
    images: ["/images/projects-wide/3.webp", "/images/projects-wide/4.webp", "/images/projects-wide/5.webp"]
  },
  {
    id: "4",
    title: "Modern Hillside Family Estate",
    img: "/images/projects-wide/5.webp",
    tags: ["Residential", "Custom Home", "Concrete"],
    description: "A gorgeous family home integrated into a steep hillside site, using cantilevered concrete structures and natural timber materials.",
    client: "Private Residence",
    location: "Seattle, WA",
    area: "5,200 sq ft",
    style: "Organic Modern",
    duration: "11 months",
    year: "2025",
    images: ["/images/projects-wide/4.webp", "/images/projects-wide/5.webp", "/images/projects-wide/6.webp"]
  },
  {
    id: "5",
    title: "Turnkey Double-Story Penthouse Fit-Out",
    img: "/images/projects-wide/3.webp",
    tags: ["Residential", "Interior Design", "Penthouse"],
    description: "Bespoke double-story penthouse layout featuring marble wall tiles, customized brass accents, and custom furniture.",
    client: "Private Client",
    location: "New York, NY",
    area: "4,500 sq ft",
    style: "Ultra Luxury Modernist",
    duration: "6 months",
    year: "2024",
    images: ["/images/projects-wide/5.webp", "/images/projects-wide/6.webp", "/images/projects-wide/1.webp"]
  },
  {
    id: "6",
    title: "High-End Restaurant Design & Build",
    img: "/images/projects-wide/6.webp",
    tags: ["Commercial", "Hospitality", "Interior"],
    description: "Sophisticated dining room and kitchen fit-out using rich wood detailing, mood lighting panels, and high-spec industrial ventilation systems.",
    client: "Gourmet Group",
    location: "San Francisco, CA",
    area: "3,800 sq ft",
    style: "Industrial Chic & Wood Curation",
    duration: "8 months",
    year: "2025",
    images: ["/images/projects-wide/6.webp", "/images/projects-wide/1.webp", "/images/projects-wide/2.webp"]
  }
];

const defaultGallery = [
  { id: "1", img: "/images/projects-wide/1.webp", title: "Contemporary Office Architecture", category: "Commercial" },
  { id: "2", img: "/images/projects-wide/2.webp", title: "Luxury Penthouse Fit-Out", category: "Interiors" },
  { id: "3", img: "/images/projects-wide/3.webp", title: "Scandinavian Styled Kitchen", category: "Interiors" },
  { id: "4", img: "/images/projects-wide/4.webp", title: "Oceanside Villa Exterior", category: "Residential" },
  { id: "5", img: "/images/projects-wide/5.webp", title: "Modern Hillside Estate", category: "Residential" },
  { id: "6", img: "/images/projects-wide/6.webp", title: "Premium Restaurant Fit-Out", category: "Commercial" },
  { id: "7", img: "/images/services/1.webp", title: "Minimalist Master Suite", category: "Interiors" },
  { id: "8", img: "/images/services/2.webp", title: "Glass Office Headquarters", category: "Commercial" },
  { id: "9", img: "/images/services/3.webp", title: "Modern Villa Blueprint Rendering", category: "Architectural" }
];

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
