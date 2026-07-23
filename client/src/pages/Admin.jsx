import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  fetchProjects, 
  createProject, 
  updateProject, 
  deleteProject, 
  fetchGallery, 
  createGalleryItem, 
  deleteGalleryItem, 
  uploadImage 
} from '../services/api';

const Admin = () => {
  const [username, setUsername] = useState(() => localStorage.getItem('nivo_admin_username') || '');
  const [passcode, setPasscode] = useState(() => localStorage.getItem('nivo_admin_passcode') || '');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('projects'); // 'projects', 'gallery', 'dashboard'

  // Data states
  const [projectsList, setProjectsList] = useState([]);
  const [galleryList, setGalleryList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Form states - Projects
  const [editingProject, setEditingProject] = useState(null); // null means adding
  const [projectForm, setProjectForm] = useState({
    title: '',
    img: '',
    category: 'Residential', // default option
    tags: '',
    description: '',
    client: '',
    location: '',
    area: '',
    style: '',
    duration: '',
    year: new Date().getFullYear().toString(),
    images: ''
  });

  // Form states - Gallery
  const [galleryForm, setGalleryForm] = useState({
    title: '',
    img: '',
    category: 'Interiors'
  });

  // Verify authentication credentials
  const handleLogin = (e) => {
    e.preventDefault();
    if (username.trim() && passcode.trim()) {
      localStorage.setItem('nivo_admin_username', username);
      localStorage.setItem('nivo_admin_passcode', passcode);
      setIsAuthenticated(true);
      setErrorMsg('');
      loadData();
    } else {
      setErrorMsg('Please enter both a username and passcode');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('nivo_admin_username');
    localStorage.removeItem('nivo_admin_passcode');
    setUsername('');
    setPasscode('');
    setIsAuthenticated(false);
  };

  // Load projects and gallery items
  const loadData = async () => {
    setLoading(true);
    try {
      const projRes = await fetchProjects();
      const gallRes = await fetchGallery();
      setProjectsList(projRes.data);
      setGalleryList(gallRes.data);
      setErrorMsg('');
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to load portfolio database. Verify credentials and server status.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (username && passcode) {
      setIsAuthenticated(true);
      loadData();
    }
  }, []);

  // Handle generic input change
  const handleProjectChange = (field, value) => {
    setProjectForm({ ...projectForm, [field]: value });
  };

  // Handle file uploads
  const handleFileUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    setErrorMsg('');
    try {
      const res = await uploadImage(file);
      const uploadedUrl = res.data.url; // e.g. /uploads/filename.png
      
      if (type === 'project-main') {
        setProjectForm(prev => ({ ...prev, img: uploadedUrl }));
      } else if (type === 'project-extra') {
        setProjectForm(prev => {
          const current = prev.images.trim() ? prev.images.split(',').map(s => s.trim()) : [];
          current.push(uploadedUrl);
          return { ...prev, images: current.join(', ') };
        });
      } else if (type === 'gallery') {
        setGalleryForm(prev => ({ ...prev, img: uploadedUrl }));
      }
      setSuccessMsg('Image uploaded successfully!');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      console.error(err);
      setErrorMsg('Image upload failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Project Submit Form
  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    if (!projectForm.title.trim()) {
      setErrorMsg('Project title is required');
      return;
    }

    setLoading(true);
    setErrorMsg('');
    
    // Process tags & sub images
    const tagArray = [
      projectForm.category, // First tag is the main type (Residential/Commercial)
      ...projectForm.tags.split(',').map(t => t.trim()).filter(Boolean)
    ];

    const imageArray = projectForm.images.split(',').map(i => i.trim()).filter(Boolean);

    const payload = {
      title: projectForm.title,
      img: projectForm.img || '/images/projects-wide/1.webp',
      tags: tagArray,
      description: projectForm.description,
      client: projectForm.client,
      location: projectForm.location,
      area: projectForm.area,
      style: projectForm.style,
      duration: projectForm.duration,
      year: projectForm.year,
      images: imageArray
    };

    try {
      if (editingProject) {
        await updateProject(editingProject.id, payload, username, passcode);
        setSuccessMsg('Project updated successfully!');
      } else {
        await createProject(payload, username, passcode);
        setSuccessMsg('Project added successfully!');
      }
      resetProjectForm();
      loadData();
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      console.error(err);
      setErrorMsg('Action failed. Verify admin passcode permissions.');
    } finally {
      setLoading(false);
    }
  };

  // Edit Project Mode
  const startEditProject = (proj) => {
    setEditingProject(proj);
    // Extract secondary tags (excluding main Residential/Commercial type tag)
    const secondaryTags = proj.tags.slice(1).join(', ');
    const category = proj.tags[0] === 'Commercial' ? 'Commercial' : 'Residential';

    setProjectForm({
      title: proj.title,
      img: proj.img,
      category,
      tags: secondaryTags,
      description: proj.description || '',
      client: proj.client || '',
      location: proj.location || '',
      area: proj.area || '',
      style: proj.style || '',
      duration: proj.duration || '',
      year: proj.year || '',
      images: Array.isArray(proj.images) ? proj.images.join(', ') : ''
    });
    setActiveTab('projects');
  };

  // Reset form
  const resetProjectForm = () => {
    setEditingProject(null);
    setProjectForm({
      title: '',
      img: '',
      category: 'Residential',
      tags: '',
      description: '',
      client: '',
      location: '',
      area: '',
      style: '',
      duration: '',
      year: new Date().getFullYear().toString(),
      images: ''
    });
  };

  // Delete Project
  const handleDeleteProject = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    setLoading(true);
    try {
      await deleteProject(id, username, passcode);
      setSuccessMsg('Project deleted successfully!');
      loadData();
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to delete project.');
    } finally {
      setLoading(false);
    }
  };

  // Gallery Submit
  const handleGallerySubmit = async (e) => {
    e.preventDefault();
    if (!galleryForm.img.trim()) {
      setErrorMsg('Image path or upload is required');
      return;
    }

    setLoading(true);
    setErrorMsg('');
    try {
      await createGalleryItem(galleryForm, username, passcode);
      setSuccessMsg('Gallery item added successfully!');
      setGalleryForm({ title: '', img: '', category: 'Interiors' });
      loadData();
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to add gallery item.');
    } finally {
      setLoading(false);
    }
  };

  // Delete Gallery Item
  const handleDeleteGallery = async (id) => {
    if (!window.confirm('Are you sure you want to delete this gallery item?')) return;
    setLoading(true);
    try {
      await deleteGalleryItem(id, username, passcode);
      setSuccessMsg('Gallery item deleted successfully!');
      loadData();
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to delete gallery item.');
    } finally {
      setLoading(false);
    }
  };

  // Login view
  if (!isAuthenticated) {
    return (
      <main className="admin-login-layout d-flex align-items-center justify-content-center" style={{ minHeight: '100vh', background: '#080706', padding: '20px' }}>
        <div className="cyber-panel p-5" style={{ maxWidth: '440px', width: '100%', border: '1px solid rgba(195, 175, 155, 0.2)' }}>
          <div className="text-center mb-4">
            <div className="d-flex align-items-center justify-content-center mb-3">
              <span className="pulse-orb me-2"></span>
              <span style={{ fontSize: '11px', fontFamily: 'monospace', letterSpacing: '0.2em', color: '#0df' }}>SYSTEM ONLINE</span>
            </div>
            <h2 className="fs-28 font-bold uppercase tracking-widest mb-1 text-white" style={{ letterSpacing: '0.15em' }}>NIVO [CORE]</h2>
            <p className="fs-12 text-uppercase font-bold tracking-wider mb-0" style={{ color: '#C3AF9B' }}>Decentralized Control Interface</p>
          </div>
          
          {errorMsg && (
            <div className="alert alert-danger py-2 fs-12 mb-3 text-center border-0 rounded-0" style={{ background: 'rgba(255, 77, 79, 0.1)', color: '#ff4d4f', borderLeft: '3px solid #ff4d4f' }}>
              [ERROR] {errorMsg}
            </div>
          )}
          
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label fs-11 font-bold uppercase tracking-wider mb-2 text-muted" style={{ display: 'block' }}>// Operator Username</label>
              <input 
                type="text" 
                className="form-control text-center" 
                placeholder="OPERATOR_ID" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                required
              />
            </div>
            <div className="mb-4">
              <label className="form-label fs-11 font-bold uppercase tracking-wider mb-2 text-muted" style={{ display: 'block' }}>// Access Decryptor Passcode</label>
              <input 
                type="password" 
                className="form-control text-center" 
                placeholder="••••••••" 
                value={passcode} 
                onChange={(e) => setPasscode(e.target.value)} 
                required
              />
            </div>
            <button type="submit" className="btn-main w-100 py-3 mt-2">
              Authenticate Operator
            </button>
          </form>
          <div className="mt-4 text-center">
            <span style={{ fontSize: '9px', fontFamily: 'monospace', color: 'rgba(255,255,255,0.25)' }}>SECURE QUANTUM LINK v2.4.9</span>
          </div>
        </div>
      </main>
    );
  }

  // Dashboard / Management Panel View
  return (
    <main className="admin-login-layout" style={{ minHeight: '100vh', background: '#080706', padding: '40px 0' }}>
      <div className="container px-md-5">
        
        {/* Header block */}
        <div className="d-flex justify-content-between align-items-center mb-5 flex-wrap gap-3 border-bottom pb-4" style={{ borderColor: 'rgba(195, 175, 155, 0.15)' }}>
          <div>
            <div className="d-flex align-items-center gap-2 mb-1">
              <span className="pulse-orb"></span>
              <span style={{ fontSize: '11px', fontFamily: 'monospace', color: '#0df', letterSpacing: '0.15em' }}>SESSION ACTIVE [OP: {username}]</span>
            </div>
            <h1 className="fs-32 mb-0 font-bold uppercase tracking-widest text-white">[ ADMIN PANEL ]</h1>
          </div>
          <Link to="/" className="btn-cyber-outline px-4 py-2" style={{ fontSize: '11px', textDecoration: 'none' }}>
            Live Site
          </Link>
        </div>

        {/* Notifications */}
        {errorMsg && (
          <div className="alert alert-danger mb-4 py-3 border-0 rounded-0 shadow-sm" style={{ background: 'rgba(255, 77, 79, 0.1)', color: '#ff4d4f', borderLeft: '4px solid #ff4d4f' }}>
            [SYSTEM WARNING] {errorMsg}
          </div>
        )}
        {successMsg && (
          <div className="alert alert-success mb-4 py-3 border-0 rounded-0 shadow-sm" style={{ background: 'rgba(15, 230, 110, 0.1)', color: '#0fe670', borderLeft: '4px solid #0fe670' }}>
            [SYSTEM REPORT] {successMsg}
          </div>
        )}

        <div className="row g-4">
          
          {/* Navigation Sidebar */}
          <div className="col-lg-3">
            <div className="cyber-panel p-4">
              <h5 className="uppercase tracking-widest font-bold mb-3 fs-11 text-muted">// INDEX SYSTEM</h5>
              <div className="d-flex flex-column gap-2">
                <button 
                  onClick={() => setActiveTab('dashboard')} 
                  className={`btn-sidebar text-start px-3 py-2.5 rounded-2 font-semibold uppercase tracking-wider fs-12 ${activeTab === 'dashboard' ? 'active-sidebar-tab' : ''}`}
                >
                  Dashboard
                </button>
                <button 
                  onClick={() => setActiveTab('projects')} 
                  className={`btn-sidebar text-start px-3 py-2.5 rounded-2 font-semibold uppercase tracking-wider fs-12 ${activeTab === 'projects' ? 'active-sidebar-tab' : ''}`}
                >
                  Manage Projects ({projectsList.length})
                </button>
                <button 
                  onClick={() => setActiveTab('gallery')} 
                  className={`btn-sidebar text-start px-3 py-2.5 rounded-2 font-semibold uppercase tracking-wider fs-12 ${activeTab === 'gallery' ? 'active-sidebar-tab' : ''}`}
                >
                  Manage Gallery ({galleryList.length})
                </button>
              </div>
            </div>
          </div>

          {/* Active Area Panel */}
          <div className="col-lg-9">
            
            {/* Tab 1: Dashboard Panel */}
            {activeTab === 'dashboard' && (
              <div className="cyber-panel p-5">
                <h3 className="uppercase tracking-wider font-bold mb-4 fs-20 text-white">// DATABASE SUMMARY</h3>
                <div className="row g-4">
                  <div className="col-md-6">
                    <div className="cyber-metric-card text-center">
                      <h4 className="text-muted uppercase tracking-wider fs-12 font-bold mb-2">Total Projects</h4>
                      <h2 className="fs-48 font-bold mb-3" style={{ color: '#C3AF9B', fontFamily: 'monospace' }}>{projectsList.length}</h2>
                      <button onClick={() => { setActiveTab('projects'); resetProjectForm(); }} className="btn-main py-1.5 px-3 fs-11 uppercase font-semibold">
                        Add Project
                      </button>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="cyber-metric-card text-center">
                      <h4 className="text-muted uppercase tracking-wider fs-12 font-bold mb-2">Gallery Showcase</h4>
                      <h2 className="fs-48 font-bold mb-3" style={{ color: '#C3AF9B', fontFamily: 'monospace' }}>{galleryList.length}</h2>
                      <button onClick={() => setActiveTab('gallery')} className="btn-main py-1.5 px-3 fs-11 uppercase font-semibold">
                        Add Photo
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Projects Management Panel */}
            {activeTab === 'projects' && (
              <div className="d-flex flex-column gap-4">
                
                {/* Form to Add/Edit Projects */}
                <div className="cyber-panel p-4">
                  <h3 className="uppercase tracking-wider font-bold mb-4 fs-18 text-white">
                    {editingProject ? `Edit Project: ${editingProject.title}` : 'Add New Portfolio Project'}
                  </h3>
                  
                  <form onSubmit={handleProjectSubmit}>
                    <div className="row g-3">
                      
                      {/* Title */}
                      <div className="col-md-6">
                        <label className="form-label font-semibold fs-12 uppercase tracking-wide">// Project Title *</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          required 
                          placeholder="e.g. Luxurious Hilltop Mansion" 
                          value={projectForm.title} 
                          onChange={(e) => handleProjectChange('title', e.target.value)}
                        />
                      </div>

                      {/* Main Category */}
                      <div className="col-md-6">
                        <label className="form-label font-semibold fs-12 uppercase tracking-wide">// Project Category *</label>
                        <div className="d-flex gap-4 mt-2">
                          <label className="d-flex align-items-center gap-2 font-semibold fs-14 text-white cursor-pointer">
                            <input 
                              type="radio" 
                              name="projectCategory" 
                              value="Residential" 
                              checked={projectForm.category === 'Residential'} 
                              onChange={(e) => handleProjectChange('category', e.target.value)}
                            />
                            Residential
                          </label>
                          <label className="d-flex align-items-center gap-2 font-semibold fs-14 text-white cursor-pointer">
                            <input 
                              type="radio" 
                              name="projectCategory" 
                              value="Commercial" 
                              checked={projectForm.category === 'Commercial'} 
                              onChange={(e) => handleProjectChange('category', e.target.value)}
                            />
                            Commercial
                          </label>
                        </div>
                      </div>

                      {/* Main Cover Image */}
                      <div className="col-md-6">
                        <label className="form-label font-semibold fs-12 uppercase tracking-wide">// Main Cover Image Path / URL</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          placeholder="e.g. /uploads/image.png or URL" 
                          value={projectForm.img} 
                          onChange={(e) => handleProjectChange('img', e.target.value)}
                        />
                        <div className="mt-2">
                          <label className="btn-main py-1 px-3 fs-10 uppercase font-semibold cursor-pointer">
                            Upload File
                            <input type="file" onChange={(e) => handleFileUpload(e, 'project-main')} style={{ display: 'none' }} accept="image/*" />
                          </label>
                        </div>
                      </div>

                      {/* Other Tags */}
                      <div className="col-md-6">
                        <label className="form-label font-semibold fs-12 uppercase tracking-wide">// Tags (comma-separated)</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          placeholder="e.g. Steel Frame, Kitchen, Penthouse" 
                          value={projectForm.tags} 
                          onChange={(e) => handleProjectChange('tags', e.target.value)}
                        />
                      </div>

                      {/* Overview details */}
                      <div className="col-md-3">
                        <label className="form-label font-semibold fs-12 uppercase tracking-wide">// Client</label>
                        <input type="text" className="form-control" placeholder="e.g. Private Residence" value={projectForm.client} onChange={(e) => handleProjectChange('client', e.target.value)} />
                      </div>
                      <div className="col-md-3">
                        <label className="form-label font-semibold fs-12 uppercase tracking-wide">// Location</label>
                        <input type="text" className="form-control" placeholder="e.g. Calicut, Kerala" value={projectForm.location} onChange={(e) => handleProjectChange('location', e.target.value)} />
                      </div>
                      <div className="col-md-3">
                        <label className="form-label font-semibold fs-12 uppercase tracking-wide">// Area</label>
                        <input type="text" className="form-control" placeholder="e.g. 5,000 sq ft" value={projectForm.area} onChange={(e) => handleProjectChange('area', e.target.value)} />
                      </div>
                      <div className="col-md-3">
                        <label className="form-label font-semibold fs-12 uppercase tracking-wide">// Year</label>
                        <input type="text" className="form-control" placeholder="e.g. 2025" value={projectForm.year} onChange={(e) => handleProjectChange('year', e.target.value)} />
                      </div>

                      <div className="col-md-4">
                        <label className="form-label font-semibold fs-12 uppercase tracking-wide">// Style</label>
                        <input type="text" className="form-control" placeholder="e.g. Minimalist Contemporary" value={projectForm.style} onChange={(e) => handleProjectChange('style', e.target.value)} />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label font-semibold fs-12 uppercase tracking-wide">// Duration</label>
                        <input type="text" className="form-control" placeholder="e.g. 10 months" value={projectForm.duration} onChange={(e) => handleProjectChange('duration', e.target.value)} />
                      </div>

                      {/* Description */}
                      <div className="col-12">
                        <label className="form-label font-semibold fs-12 uppercase tracking-wide">// Project Description Overview</label>
                        <textarea 
                          rows="3" 
                          className="form-control" 
                          placeholder="Provide a comprehensive project overview..." 
                          value={projectForm.description} 
                          onChange={(e) => handleProjectChange('description', e.target.value)}
                        />
                      </div>

                      {/* Detail Gallery Images */}
                      <div className="col-12">
                        <label className="form-label font-semibold fs-12 uppercase tracking-wide">// Gallery Images (comma-separated URLs)</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          placeholder="/uploads/1.png, /uploads/2.png" 
                          value={projectForm.images} 
                          onChange={(e) => handleProjectChange('images', e.target.value)}
                        />
                        <div className="mt-2">
                          <label className="btn-main py-1 px-3 fs-10 uppercase font-semibold cursor-pointer">
                            Upload Add-on Image
                            <input type="file" onChange={(e) => handleFileUpload(e, 'project-extra')} style={{ display: 'none' }} accept="image/*" />
                          </label>
                        </div>
                      </div>

                    </div>

                    <div className="mt-4 d-flex gap-2">
                      <button type="submit" className="btn-main px-4 py-2 font-semibold uppercase tracking-wide" disabled={loading}>
                        {editingProject ? 'Save Updates' : 'Add Project'}
                      </button>
                      <button type="button" onClick={resetProjectForm} className="btn-cyber-outline px-4 py-2 font-semibold uppercase tracking-wide">
                        Reset Form
                      </button>
                    </div>
                  </form>
                </div>

                {/* List of projects */}
                <div className="cyber-panel p-4">
                  <h3 className="uppercase tracking-wider font-bold mb-4 fs-18 text-white">// CURRENT PROJECT PORTFOLIO</h3>
                  <div className="table-responsive">
                    <table className="table table-align-middle" style={{ color: 'inherit' }}>
                      <thead>
                        <tr className="uppercase tracking-wider font-bold fs-11 text-muted">
                          <th>Cover</th>
                          <th>Title</th>
                          <th>Category</th>
                          <th>Year</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {projectsList.map((proj) => (
                          <tr key={proj.id} className="fs-14 border-bottom">
                            <td>
                              <img src={proj.img} alt={proj.title} style={{ width: '50px', height: '40px', objectFit: 'cover', borderRadius: '2px' }} />
                            </td>
                            <td className="font-semibold text-white">{proj.title}</td>
                            <td>
                              <span className="badge py-1.5 px-2.5 cyber-tag text-uppercase fs-9">
                                {proj.tags[0] || 'Unassigned'}
                              </span>
                            </td>
                            <td>{proj.year || '-'}</td>
                            <td>
                              <div className="d-flex gap-2">
                                <button onClick={() => startEditProject(proj)} className="btn btn-outline-light btn-sm px-3 py-1 fs-11 uppercase font-bold" style={{ borderColor: 'rgba(255,255,255,0.25)', borderRadius: '2px', color: '#fff' }}>
                                  Edit
                                </button>
                                <button onClick={() => handleDeleteProject(proj.id)} className="btn btn-outline-danger btn-sm px-3 py-1 fs-11 uppercase font-bold" style={{ borderColor: 'rgba(255, 77, 79, 0.4)', color: '#ff4d4f', borderRadius: '2px' }}>
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}

            {/* Tab 3: Gallery Management Panel */}
            {activeTab === 'gallery' && (
              <div className="d-flex flex-column gap-4">
                
                {/* Form to Add Photo */}
                <div className="cyber-panel p-4">
                  <h3 className="uppercase tracking-wider font-bold mb-4 fs-18 text-white">// ADD GALLERY IMAGE</h3>
                  <form onSubmit={handleGallerySubmit}>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label font-semibold fs-12 uppercase tracking-wide">// Image Caption / Title</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          placeholder="e.g. Scandinavian Styled Living Room" 
                          value={galleryForm.title}
                          onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label font-semibold fs-12 uppercase tracking-wide">// Category Dropdown *</label>
                        <select 
                          className="form-control" 
                          value={galleryForm.category}
                          onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value })}
                          style={{ height: '45px' }}
                        >
                          <option value="Residential">Residential</option>
                          <option value="Commercial">Commercial</option>
                          <option value="Interiors">Interiors</option>
                          <option value="Architectural">Architectural</option>
                        </select>
                      </div>

                      <div className="col-12">
                        <label className="form-label font-semibold fs-12 uppercase tracking-wide">// Image Path / URL *</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          required 
                          placeholder="e.g. /uploads/gallery.png or URL" 
                          value={galleryForm.img}
                          onChange={(e) => setGalleryForm({ ...galleryForm, img: e.target.value })}
                        />
                        <div className="mt-2">
                          <label className="btn-main py-1 px-3 fs-10 uppercase font-semibold cursor-pointer">
                            Upload File
                            <input type="file" onChange={(e) => handleFileUpload(e, 'gallery')} style={{ display: 'none' }} accept="image/*" />
                          </label>
                        </div>
                      </div>
                    </div>

                    <button type="submit" className="btn-main mt-4 px-4 py-2 font-semibold uppercase tracking-wide" disabled={loading}>
                      Add Image
                    </button>
                  </form>
                </div>

                {/* List of Photos */}
                <div className="cyber-panel p-4">
                  <h3 className="uppercase tracking-wider font-bold mb-4 fs-18 text-white">// CURRENT GALLERY IMAGES</h3>
                  <div className="row g-3">
                    {galleryList.map((item) => (
                      <div key={item.id} className="col-md-4 col-sm-6 d-flex">
                        <div className="cyber-metric-card p-3 text-center d-flex flex-column align-items-center justify-content-between h-100 w-100">
                          <div className="w-100">
                            <img src={item.img} alt={item.title} style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '2px' }} className="mb-3" />
                            <h5 className="fs-13 font-semibold text-truncate mb-2 text-white">{item.title || 'Untitled'}</h5>
                          </div>
                          <div className="w-100">
                            <div className="mb-3">
                              <span className="badge py-1.5 px-2.5 cyber-tag text-uppercase fs-9" style={{ display: 'inline-block' }}>{item.category}</span>
                            </div>
                            <button 
                              onClick={() => handleDeleteGallery(item.id)} 
                              className="btn btn-outline-danger btn-sm" 
                              style={{ 
                                borderColor: 'rgba(255, 77, 79, 0.4)', 
                                color: '#ff4d4f', 
                                borderRadius: '2px',
                                display: 'block',
                                width: '100%',
                                boxSizing: 'border-box',
                                float: 'none',
                                position: 'relative',
                                margin: '0',
                                padding: '6px 12px'
                              }}
                            >
                              Delete Item
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

          </div>

        </div>

      </div>

      {/* Styled Dashboard Components */}
      <style>{`
        body {
          background-color: #080706 !important;
        }

        .cyber-panel {
          background: rgba(22, 19, 17, 0.4) !important;
          backdrop-filter: blur(16px);
          border: 1px solid rgba(195, 175, 155, 0.12) !important;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(195, 175, 155, 0.03);
          position: relative;
          border-radius: 4px;
        }

        /* Bracket corner decorations */
        .cyber-panel::before, .cyber-panel::after {
          content: '';
          position: absolute;
          width: 8px;
          height: 8px;
          border-color: #C3AF9B;
          border-style: solid;
          pointer-events: none;
        }
        .cyber-panel::before {
          top: -1px;
          left: -1px;
          border-width: 1px 0 0 1px;
        }
        .cyber-panel::after {
          bottom: -1px;
          right: -1px;
          border-width: 0 1px 1px 0;
        }

        .pulse-orb {
          width: 8px;
          height: 8px;
          background-color: #0df;
          border-radius: 50%;
          box-shadow: 0 0 10px #0df;
          display: inline-block;
          animation: pulse 1.5s infinite alternate;
        }

        @keyframes pulse {
          0% { transform: scale(0.9); opacity: 0.5; }
          100% { transform: scale(1.3); opacity: 1; }
        }

        .form-control {
          background-color: rgba(10, 8, 7, 0.8) !important;
          color: #e6e4e2 !important;
          border: 1px solid rgba(195, 175, 155, 0.25) !important;
          border-radius: 2px !important;
          font-family: 'Outfit', monospace;
          padding: 10px 14px;
          transition: all 0.3s ease;
        }
        .form-control:focus {
          border-color: #C3AF9B !important;
          box-shadow: 0 0 8px rgba(195, 175, 155, 0.3) !important;
          background-color: rgba(10, 8, 7, 0.9) !important;
        }

        .btn-sidebar {
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(195, 175, 155, 0.08);
          color: #a5a29f;
          width: 100%;
          border-radius: 2px;
          padding: 12px 16px;
          font-family: 'Outfit', sans-serif;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          transition: all 0.3s ease;
          position: relative;
        }
        .btn-sidebar:hover {
          color: #ffffff;
          border-color: rgba(195, 175, 155, 0.25);
          background: rgba(195, 175, 155, 0.05);
        }
        .btn-sidebar.active-sidebar-tab {
          border-color: #C3AF9B !important;
          color: #C3AF9B !important;
          background: rgba(195, 175, 155, 0.08) !important;
          box-shadow: inset -4px 0 0 #C3AF9B !important;
        }

        .table {
          color: #e6e4e2 !important;
        }
        .table th {
          border-bottom: 2px solid rgba(195, 175, 155, 0.2) !important;
          color: #C3AF9B !important;
          font-family: 'Outfit', sans-serif;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-size: 11px;
          padding: 12px 8px;
        }
        .table td {
          border-bottom: 1px solid rgba(195, 175, 155, 0.1) !important;
          vertical-align: middle;
          padding: 14px 8px;
        }

        .btn-main {
          background: #C3AF9B !important;
          color: #0e0d0c !important;
          border: 1px solid #C3AF9B !important;
          font-weight: 700 !important;
          text-transform: uppercase !important;
          letter-spacing: 0.1em !important;
          transition: all 0.3s ease !important;
          border-radius: 2px !important;
        }
        .btn-main:hover {
          background: transparent !important;
          color: #C3AF9B !important;
          box-shadow: 0 0 12px rgba(195, 175, 155, 0.4) !important;
        }

        .btn-cyber-outline {
          background: transparent;
          color: #e6e4e2;
          border: 1px solid rgba(255, 255, 255, 0.15);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          transition: all 0.3s ease;
          border-radius: 2px;
        }
        .btn-cyber-outline:hover {
          border-color: #e6e4e2;
          background: rgba(255, 255, 255, 0.05);
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.08);
        }

        .cyber-tag {
          background: rgba(195, 175, 155, 0.08);
          border: 1px solid rgba(195, 175, 155, 0.18);
          color: #C3AF9B;
          font-family: monospace;
          border-radius: 2px;
        }

        .cyber-metric-card {
          background: rgba(0, 0, 0, 0.25);
          border: 1px solid rgba(195, 175, 155, 0.08);
          border-radius: 2px;
          padding: 24px;
          transition: all 0.3s ease;
        }
        .cyber-metric-card:hover {
          border-color: #C3AF9B;
          box-shadow: 0 4px 20px rgba(195, 175, 155, 0.03);
        }
      `}</style>
    </main>
  );
}

export default Admin;
