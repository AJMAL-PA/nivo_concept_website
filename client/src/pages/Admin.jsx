import React, { useState, useEffect } from 'react';
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
      <main className="admin-login-layout" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-main)' }}>
        <div className="card p-5 shadow-lg border-0" style={{ maxWidth: '420px', width: '100%', borderRadius: '16px', background: 'var(--bg-card)' }}>
          <div className="text-center mb-4">
            <h2 className="fs-32 font-bold uppercase tracking-wider mb-2">NIVO CONCEPTS</h2>
            <p className="text-muted fs-14">Portfolio Control Center</p>
          </div>
          
          {errorMsg && <div className="alert alert-danger py-2 fs-13 mb-3 text-center">{errorMsg}</div>}
          
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label fs-13 font-semibold uppercase tracking-wider mb-2" style={{ display: 'block' }}>Admin Username</label>
              <input 
                type="text" 
                className="form-control text-center font-semibold" 
                placeholder="Username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                style={{ fontSize: '15px' }}
              />
            </div>
            <div className="mb-4">
              <label className="form-label fs-13 font-semibold uppercase tracking-wider mb-2" style={{ display: 'block' }}>Admin Passcode</label>
              <input 
                type="password" 
                className="form-control text-center" 
                placeholder="••••••••" 
                value={passcode} 
                onChange={(e) => setPasscode(e.target.value)} 
                style={{ fontSize: '18px', tracking: '0.2em' }}
              />
            </div>
            <button type="submit" className="btn-main w-100 py-3 font-semibold uppercase tracking-wide">
              Access Panel
            </button>
          </form>
        </div>
      </main>
    );
  }

  // Dashboard / Management Panel View
  return (
    <main style={{ minHeight: '90vh', background: 'var(--bg-main)', paddingTop: '130px', paddingBottom: '80px' }}>
      <div className="container">
        
        {/* Header block */}
        <div className="d-flex justify-content-between align-items-center mb-5 flex-wrap gap-3">
          <div>
            <h1 className="fs-36 mb-0 font-bold uppercase tracking-wider">Admin Panel</h1>
            <p className="text-muted fs-14 mb-0">Manage projects and portfolio items dynamically</p>
          </div>
          <button onClick={handleLogout} className="btn-main px-4 py-2" style={{ fontSize: '13px' }}>
            Logout
          </button>
        </div>

        {/* Notifications */}
        {errorMsg && <div className="alert alert-danger mb-4 py-3 border-0 rounded-3 shadow-sm">{errorMsg}</div>}
        {successMsg && <div className="alert alert-success mb-4 py-3 border-0 rounded-3 shadow-sm">{successMsg}</div>}

        <div className="row g-4">
          
          {/* Navigation Sidebar */}
          <div className="col-lg-3">
            <div className="p-4 rounded-3 border" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
              <h5 className="uppercase tracking-wider font-bold mb-3 fs-13 text-muted">Navigation</h5>
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
              <div className="p-5 rounded-3 border shadow-sm" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
                <h3 className="uppercase tracking-wider font-bold mb-4 fs-20">Portfolio Summary</h3>
                <div className="row g-4">
                  <div className="col-md-6">
                    <div className="p-4 rounded-3 text-center border bg-light-card">
                      <h4 className="text-muted uppercase tracking-wider fs-12 font-bold mb-2">Total Projects</h4>
                      <h2 className="fs-48 font-bold mb-2 text-primary">{projectsList.length}</h2>
                      <button onClick={() => { setActiveTab('projects'); resetProjectForm(); }} className="btn-main py-1.5 px-3 fs-11 uppercase font-semibold">
                        Add Project
                      </button>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="p-4 rounded-3 text-center border bg-light-card">
                      <h4 className="text-muted uppercase tracking-wider fs-12 font-bold mb-2">Gallery Showcase</h4>
                      <h2 className="fs-48 font-bold mb-2 text-primary">{galleryList.length}</h2>
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
                <div className="p-4 rounded-3 border shadow-sm" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
                  <h3 className="uppercase tracking-wider font-bold mb-4 fs-18">
                    {editingProject ? `Edit Project: ${editingProject.title}` : 'Add New Portfolio Project'}
                  </h3>
                  
                  <form onSubmit={handleProjectSubmit}>
                    <div className="row g-3">
                      
                      {/* Title */}
                      <div className="col-md-6">
                        <label className="form-label font-semibold fs-12 uppercase tracking-wide">Project Title *</label>
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
                        <label className="form-label font-semibold fs-12 uppercase tracking-wide">Project Category (Residential or Commercial) *</label>
                        <div className="d-flex gap-4 mt-2">
                          <label className="d-flex align-items-center gap-2 font-semibold fs-14">
                            <input 
                              type="radio" 
                              name="projectCategory" 
                              value="Residential" 
                              checked={projectForm.category === 'Residential'} 
                              onChange={(e) => handleProjectChange('category', e.target.value)}
                            />
                            Residential
                          </label>
                          <label className="d-flex align-items-center gap-2 font-semibold fs-14">
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
                        <label className="form-label font-semibold fs-12 uppercase tracking-wide">Main Cover Image Path / URL</label>
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
                        <label className="form-label font-semibold fs-12 uppercase tracking-wide">Tags (comma-separated, e.g. Luxury, Custom, Glass)</label>
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
                        <label className="form-label font-semibold fs-12 uppercase tracking-wide">Client</label>
                        <input type="text" className="form-control" placeholder="e.g. Private Residence" value={projectForm.client} onChange={(e) => handleProjectChange('client', e.target.value)} />
                      </div>
                      <div className="col-md-3">
                        <label className="form-label font-semibold fs-12 uppercase tracking-wide">Location</label>
                        <input type="text" className="form-control" placeholder="e.g. New York, NY" value={projectForm.location} onChange={(e) => handleProjectChange('location', e.target.value)} />
                      </div>
                      <div className="col-md-3">
                        <label className="form-label font-semibold fs-12 uppercase tracking-wide">Area</label>
                        <input type="text" className="form-control" placeholder="e.g. 5,000 sq ft" value={projectForm.area} onChange={(e) => handleProjectChange('area', e.target.value)} />
                      </div>
                      <div className="col-md-3">
                        <label className="form-label font-semibold fs-12 uppercase tracking-wide">Year</label>
                        <input type="text" className="form-control" placeholder="e.g. 2025" value={projectForm.year} onChange={(e) => handleProjectChange('year', e.target.value)} />
                      </div>

                      <div className="col-md-4">
                        <label className="form-label font-semibold fs-12 uppercase tracking-wide">Style</label>
                        <input type="text" className="form-control" placeholder="e.g. Minimalist Contemporary" value={projectForm.style} onChange={(e) => handleProjectChange('style', e.target.value)} />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label font-semibold fs-12 uppercase tracking-wide">Duration</label>
                        <input type="text" className="form-control" placeholder="e.g. 10 months" value={projectForm.duration} onChange={(e) => handleProjectChange('duration', e.target.value)} />
                      </div>

                      {/* Description */}
                      <div className="col-12">
                        <label className="form-label font-semibold fs-12 uppercase tracking-wide">Project Description Overview</label>
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
                        <label className="form-label font-semibold fs-12 uppercase tracking-wide">Gallery Images (comma-separated URLs)</label>
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
                      <button type="button" onClick={resetProjectForm} className="btn-main bg-dark border px-4 py-2 font-semibold uppercase tracking-wide">
                        Reset Form
                      </button>
                    </div>
                  </form>
                </div>

                {/* List of projects */}
                <div className="p-4 rounded-3 border shadow-sm" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
                  <h3 className="uppercase tracking-wider font-bold mb-4 fs-18">Current Project Portfolio</h3>
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
                              <img src={proj.img} alt={proj.title} style={{ width: '50px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                            </td>
                            <td className="font-semibold">{proj.title}</td>
                            <td>
                              <span className="badge p-2 bg-blur text-uppercase fs-10" style={{ color: 'var(--text-main)' }}>
                                {proj.tags[0] || 'Unassigned'}
                              </span>
                            </td>
                            <td>{proj.year || '-'}</td>
                            <td>
                              <div className="d-flex gap-2">
                                <button onClick={() => startEditProject(proj)} className="btn-table-edit btn-sm px-3 py-1 fs-12 font-bold uppercase text-primary border rounded">
                                  Edit
                                </button>
                                <button onClick={() => handleDeleteProject(proj.id)} className="btn-table-delete btn-sm px-3 py-1 fs-12 font-bold uppercase text-danger border rounded">
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
                <div className="p-4 rounded-3 border shadow-sm" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
                  <h3 className="uppercase tracking-wider font-bold mb-4 fs-18">Add Gallery Image</h3>
                  <form onSubmit={handleGallerySubmit}>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label font-semibold fs-12 uppercase tracking-wide">Image Caption / Title</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          placeholder="e.g. Scandinavian Styled Living Room" 
                          value={galleryForm.title}
                          onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label font-semibold fs-12 uppercase tracking-wide">Category Dropdown *</label>
                        <select 
                          className="form-control" 
                          value={galleryForm.category}
                          onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value })}
                        >
                          <option value="Residential">Residential</option>
                          <option value="Commercial">Commercial</option>
                          <option value="Interiors">Interiors</option>
                          <option value="Architectural">Architectural</option>
                        </select>
                      </div>

                      <div className="col-12">
                        <label className="form-label font-semibold fs-12 uppercase tracking-wide">Image Path / URL *</label>
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
                <div className="p-4 rounded-3 border shadow-sm" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
                  <h3 className="uppercase tracking-wider font-bold mb-4 fs-18">Current Gallery Images</h3>
                  <div className="row g-3">
                    {galleryList.map((item) => (
                      <div key={item.id} className="col-md-4 col-sm-6">
                        <div className="border rounded p-2 text-center" style={{ background: 'var(--bg-card)' }}>
                          <img src={item.img} alt={item.title} style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '4px' }} className="mb-2" />
                          <h5 className="fs-13 font-semibold text-truncate mb-1">{item.title || 'Untitled'}</h5>
                          <span className="badge bg-blur text-uppercase fs-9 py-1 px-2 mb-2" style={{ color: 'var(--text-main)' }}>{item.category}</span>
                          <button onClick={() => handleDeleteGallery(item.id)} className="btn-main bg-dark border-danger text-danger w-100 py-1 fs-11 uppercase font-bold" style={{ borderColor: '#ff4d4f' }}>
                            Delete
                          </button>
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
        .btn-sidebar {
          background: transparent;
          border: none;
          color: var(--text-main);
          width: 100%;
          transition: all 0.25s ease;
        }
        .btn-sidebar:hover {
          background: rgba(195, 175, 155, 0.12);
          color: var(--primary-color);
        }
        .btn-sidebar.active-sidebar-tab {
          background: var(--primary-color) !important;
          color: #12100e !important;
        }
        .bg-light-card {
          background: rgba(195, 175, 155, 0.05);
          border-color: rgba(195, 175, 155, 0.15) !important;
        }
        .form-control {
          background-color: var(--bg-card);
          color: var(--text-main);
          border: 1px solid var(--border-color);
          border-radius: 6px;
          padding: 8px 12px;
          transition: all 0.3s ease;
        }
        .form-control:focus {
          border-color: var(--primary-color);
          box-shadow: 0 0 0 2px rgba(195, 175, 155, 0.2);
          background-color: var(--bg-card);
          color: var(--text-main);
        }
        select.form-control {
          height: auto;
        }
        .table {
          background: transparent;
        }
        .table th {
          border-bottom: 2px solid var(--border-color) !important;
          padding: 12px 8px;
        }
        .table td {
          padding: 12px 8px;
          vertical-align: middle;
          border-bottom: 1px solid var(--border-color) !important;
        }
      `}</style>
    </main>
  );
};

export default Admin;
