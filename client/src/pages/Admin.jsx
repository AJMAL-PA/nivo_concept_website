import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  verifyAdmin,
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
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showGalleryModal, setShowGalleryModal] = useState(false);

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
  const handleLogin = async (e) => {
    e.preventDefault();
    const u = username.trim();
    const p = passcode.trim();
    if (!u || !p) {
      setErrorMsg('Please enter both a username and passcode');
      return;
    }
    setLoading(true);
    setErrorMsg('');
    try {
      await verifyAdmin(u, p);
      localStorage.setItem('nivo_admin_username', u);
      localStorage.setItem('nivo_admin_passcode', p);
      setIsAuthenticated(true);
      loadData();
    } catch (err) {
      console.error('Login error:', err);
      setIsAuthenticated(false);
      localStorage.removeItem('nivo_admin_username');
      localStorage.removeItem('nivo_admin_passcode');
      if (err.response && err.response.status === 401) {
        setErrorMsg('Invalid admin credentials. (Default: username: nivoadmin, passcode: admin123)');
      } else {
        setErrorMsg('Authentication failed. Ensure the server is running on port 5000.');
      }
    } finally {
      setLoading(false);
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
      setErrorMsg('Failed to load portfolio database. Verify server status.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkAuthOnLoad = async () => {
      const savedUser = localStorage.getItem('nivo_admin_username');
      const savedPass = localStorage.getItem('nivo_admin_passcode');
      if (savedUser && savedPass) {
        try {
          await verifyAdmin(savedUser, savedPass);
          setIsAuthenticated(true);
          loadData();
        } catch (err) {
          console.error('Stored auth invalid:', err);
          localStorage.removeItem('nivo_admin_username');
          localStorage.removeItem('nivo_admin_passcode');
          setIsAuthenticated(false);
          setErrorMsg('Saved credentials invalid or expired. Please sign in again.');
        }
      }
    };
    checkAuthOnLoad();
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
        const targetId = editingProject._id || editingProject.id;
        await updateProject(targetId, payload, username, passcode);
        setSuccessMsg('Project updated successfully!');
      } else {
        await createProject(payload, username, passcode);
        setSuccessMsg('Project added successfully!');
      }
      resetProjectForm();
      setShowProjectModal(false);
      loadData();
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 401) {
        setErrorMsg('Unauthorized: Invalid admin credentials. Please sign out and sign in with valid credentials (nivoadmin / admin123).');
      } else {
        setErrorMsg('Action failed. Verify server status and credentials.');
      }
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
    setShowProjectModal(true);
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
  const handleDeleteProject = async (idOrProj) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    const targetId = typeof idOrProj === 'string' ? idOrProj : (idOrProj._id || idOrProj.id);
    setLoading(true);
    try {
      await deleteProject(targetId, username, passcode);
      setSuccessMsg('Project deleted successfully!');
      loadData();
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 401) {
        setErrorMsg('Unauthorized: Invalid admin credentials. Please sign out and sign in with valid credentials.');
      } else {
        setErrorMsg('Failed to delete project.');
      }
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
      setShowGalleryModal(false);
      loadData();
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 401) {
        setErrorMsg('Unauthorized: Invalid admin credentials. Please sign out and sign in with valid credentials.');
      } else {
        setErrorMsg('Failed to add gallery item.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Delete Gallery Item
  const handleDeleteGallery = async (idOrItem) => {
    if (!window.confirm('Are you sure you want to delete this gallery item?')) return;
    const targetId = typeof idOrItem === 'string' ? idOrItem : (idOrItem._id || idOrItem.id);
    setLoading(true);
    try {
      await deleteGalleryItem(targetId, username, passcode);
      setSuccessMsg('Gallery item deleted successfully!');
      loadData();
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 401) {
        setErrorMsg('Unauthorized: Invalid admin credentials. Please sign out and sign in with valid credentials.');
      } else {
        setErrorMsg('Failed to delete gallery item.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Login view
  if (!isAuthenticated) {
    return (
      <main className="admin-login-layout d-flex align-items-center justify-content-center" style={{ minHeight: '100vh', background: 'var(--bg-main)', padding: '20px' }}>
        <div className="cyber-panel p-5" style={{ maxWidth: '440px', width: '100%', border: '1px solid var(--border-color)' }}>
          <div className="text-center mb-4">
            <div className="d-flex align-items-center justify-content-center mb-3">
              <span className="pulse-orb me-2"></span>
              <span style={{ fontSize: '11px', fontFamily: 'inherit', letterSpacing: '0.1em', color: 'var(--primary-color)' }}>ADMIN PORTAL</span>
            </div>
            <h2 className="fs-28 font-bold uppercase tracking-widest mb-1 text-main" style={{ letterSpacing: '0.1em' }}>Nivo Concepts</h2>
            <p className="fs-12 text-uppercase font-bold tracking-wider mb-0 text-muted">Management Console</p>
          </div>
          
          {errorMsg && (
            <div className="alert alert-danger py-2 fs-12 mb-3 text-center border-0 rounded-0" style={{ background: 'rgba(255, 77, 79, 0.1)', color: '#ff4d4f', borderLeft: '3px solid #ff4d4f' }}>
              Error: {errorMsg}
            </div>
          )}
          
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label fs-11 font-bold uppercase tracking-wider mb-2 text-muted" style={{ display: 'block' }}>Username</label>
              <input 
                type="text" 
                className="form-control text-center" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                required
              />
            </div>
            <div className="mb-4">
              <label className="form-label fs-11 font-bold uppercase tracking-wider mb-2 text-muted" style={{ display: 'block' }}>Password</label>
              <input 
                type="password" 
                className="form-control text-center" 
                value={passcode} 
                onChange={(e) => setPasscode(e.target.value)} 
                required
              />
            </div>
            <button type="submit" className="btn-main w-100 py-3 mt-2" disabled={loading}>
              {loading ? 'Verifying...' : 'Sign In'}
            </button>
          </form>
          <div className="mt-4 text-center">
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              Default credentials: <strong>nivoadmin</strong> / <strong>admin123</strong>
            </span>
          </div>
        </div>
      </main>
    );
  }

  // Dashboard / Management Panel View
  return (
    <main className="admin-login-layout" style={{ minHeight: '100vh', background: 'var(--bg-main)', padding: '40px 0' }}>
      <div className="container px-md-5">
        
        {/* Header block */}
        <div className="d-flex justify-content-between align-items-center mb-5 flex-wrap gap-3 border-bottom pb-4" style={{ borderColor: 'var(--border-color)' }}>
          <div>
            <div className="mb-3">
              <img src="/images/nivo_concepts_logo.png" alt="Nivo Concepts" className="logo-dark-mode-hidden" style={{ height: '35px', width: 'auto' }} />
              <img src="/images/Group 3.png" alt="Nivo Concepts" className="logo-light-mode-hidden" style={{ height: '35px', width: 'auto' }} />
            </div>
            <h1 className="fs-24 mb-0 font-bold uppercase tracking-widest text-main">Admin Dashboard</h1>
          </div>
          <div className="d-flex align-items-center gap-3">
            <Link to="/" className="btn-cyber-outline px-4 py-2" style={{ fontSize: '11px', textDecoration: 'none' }}>
              Live Site
            </Link>
            <button onClick={handleLogout} className="btn-cyber-outline px-4 py-2" style={{ fontSize: '11px', color: '#ff4d4f', borderColor: 'rgba(255,77,79,0.3)' }}>
              Sign Out
            </button>
          </div>
        </div>

        {/* Notifications */}
        {errorMsg && (
          <div className="alert alert-danger mb-4 py-3 border-0 rounded-0 shadow-sm" style={{ background: 'rgba(255, 77, 79, 0.1)', color: '#ff4d4f', borderLeft: '4px solid #ff4d4f' }}>
            Warning: {errorMsg}
          </div>
        )}
        {successMsg && (
          <div className="alert alert-success mb-4 py-3 border-0 rounded-0 shadow-sm" style={{ background: 'rgba(15, 230, 110, 0.1)', color: '#0fe670', borderLeft: '4px solid #0fe670' }}>
            Success: {successMsg}
          </div>
        )}

        <div className="row g-4">
          
          {/* Navigation Sidebar */}
          <div className="col-lg-3">
            <div className="cyber-panel p-4">
              <h5 className="uppercase tracking-widest font-bold mb-3 fs-11 text-muted"> INDEX SYSTEM</h5>
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
                <h3 className="uppercase tracking-wider font-bold mb-4 fs-20 text-main">Database Summary</h3>
                <div className="row g-4">
                  <div className="col-md-6">
                    <div className="cyber-metric-card text-center">
                      <h4 className="text-muted uppercase tracking-wider fs-12 font-bold mb-2">Total Projects</h4>
                      <h2 className="fs-48 font-bold mb-3" style={{ color: 'var(--primary-color)' }}>{projectsList.length}</h2>
                      <button onClick={() => { setActiveTab('projects'); resetProjectForm(); }} className="btn-main py-1.5 px-3 fs-11 uppercase font-semibold">
                        Add Project
                      </button>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="cyber-metric-card text-center">
                      <h4 className="text-muted uppercase tracking-wider fs-12 font-bold mb-2">Gallery Showcase</h4>
                      <h2 className="fs-48 font-bold mb-3" style={{ color: 'var(--primary-color)' }}>{galleryList.length}</h2>
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
                
                 {/* List of projects */}
                <div className="cyber-panel p-4">
                  <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
                    <h3 className="uppercase tracking-wider font-bold mb-0 fs-18 text-main">Current Project Portfolio</h3>
                    <button 
                      onClick={() => { resetProjectForm(); setShowProjectModal(true); }} 
                      className="btn-main px-4 py-2 font-semibold uppercase tracking-wide fs-12"
                    >
                      Add Project
                    </button>
                  </div>
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
                             <td className="font-semibold text-main">{proj.title}</td>
                             <td>
                               <span className="badge py-1.5 px-2.5 cyber-tag text-uppercase fs-9">
                                 {proj.tags[0] || 'Unassigned'}
                               </span>
                             </td>
                             <td>{proj.year || '-'}</td>
                             <td>
                               <div className="d-flex gap-2">
                                 <button onClick={() => startEditProject(proj)} className="btn btn-cyber-outline btn-sm px-3 py-1 fs-11 uppercase font-bold" style={{ borderRadius: '4px' }}>
                                   Edit
                                 </button>
                                 <button onClick={() => handleDeleteProject(proj.id)} className="btn btn-outline-danger btn-sm px-3 py-1 fs-11 uppercase font-bold" style={{ borderColor: 'rgba(255, 77, 79, 0.4)', color: '#ff4d4f', borderRadius: '4px' }}>
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
                 
                 {/* List of Photos */}
                 <div className="cyber-panel p-4">
                   <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
                     <h3 className="uppercase tracking-wider font-bold mb-0 fs-18 text-main">Current Gallery Images</h3>
                     <button 
                       onClick={() => { setGalleryForm({ title: '', img: '', category: 'Interiors' }); setShowGalleryModal(true); }} 
                       className="btn-main px-4 py-2 font-semibold uppercase tracking-wide fs-12"
                     >
                       Add Image
                     </button>
                   </div>
                   <div className="row g-3">
                     {galleryList.map((item) => (
                       <div key={item.id} className="col-md-4 col-sm-6 d-flex">
                         <div className="cyber-metric-card p-3 text-center d-flex flex-column align-items-center justify-content-between h-100 w-100">
                           <div className="w-100">
                             <img src={item.img} alt={item.title} style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '8px' }} className="mb-3" />
                             <h5 className="fs-13 font-semibold text-truncate mb-2 text-main">{item.title || 'Untitled'}</h5>
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
                                 borderRadius: '4px',
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

      {/* Add/Edit Project Modal */}
      {showProjectModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-container cyber-panel">
            <div className="admin-modal-header d-flex justify-content-between align-items-center mb-4">
              <h3 className="uppercase tracking-wider font-bold fs-18 text-main mb-0">
                {editingProject ? `Edit Project: ${editingProject.title}` : 'Add New Portfolio Project'}
              </h3>
              <button type="button" className="btn-close-modal" onClick={() => { setShowProjectModal(false); resetProjectForm(); }}>
                &times;
              </button>
            </div>
            <div className="admin-modal-body">
              <form onSubmit={handleProjectSubmit}>
                <div className="row g-3">
                  
                  {/* Title */}
                  <div className="col-md-6">
                    <label className="form-label font-semibold fs-12 uppercase tracking-wide">Project Title *</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      required 
                      value={projectForm.title} 
                      onChange={(e) => handleProjectChange('title', e.target.value)}
                    />
                  </div>

                  {/* Main Category */}
                  <div className="col-md-6">
                    <label className="form-label font-semibold fs-12 uppercase tracking-wide">Project Category *</label>
                    <div className="d-flex gap-4 mt-2">
                      <label className="d-flex align-items-center gap-2 font-semibold fs-14 text-main cursor-pointer">
                        <input 
                          type="radio" 
                          name="projectCategory" 
                          value="Residential" 
                          checked={projectForm.category === 'Residential'} 
                          onChange={(e) => handleProjectChange('category', e.target.value)}
                        />
                        Residential
                      </label>
                      <label className="d-flex align-items-center gap-2 font-semibold fs-14 text-main cursor-pointer">
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
                    <div style={{ position: 'relative' }}>
                      <input 
                        type="text" 
                        className="form-control" 
                        style={{ paddingRight: '45px' }}
                        value={projectForm.img} 
                        onChange={(e) => handleProjectChange('img', e.target.value)}
                      />
                      <label 
                        className="btn-main p-0 d-inline-flex align-items-center justify-content-center cursor-pointer" 
                        style={{ 
                          position: 'absolute', 
                          right: '6px', 
                          top: '50%', 
                          transform: 'translateY(-50%)', 
                          borderRadius: '50%', 
                          width: '32px', 
                          height: '32px',
                          zIndex: 5,
                          marginBottom: 0
                        }} 
                        title="Upload Main Image"
                      >
                        <i className="fa fa-upload fs-12"></i>
                        <input type="file" onChange={(e) => handleFileUpload(e, 'project-main')} style={{ display: 'none' }} accept="image/*" />
                      </label>
                    </div>
                    <span className="text-muted fs-10 d-block mt-1">Recommended: Landscape (16:10 or 16:9), e.g., 1280x800 px or 1920x1080 px.</span>
                  </div>

                  {/* Other Tags */}
                  <div className="col-md-6">
                    <label className="form-label font-semibold fs-12 uppercase tracking-wide">Tags (comma-separated)</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={projectForm.tags} 
                      onChange={(e) => handleProjectChange('tags', e.target.value)}
                    />
                  </div>

                  {/* Overview details */}
                  <div className="col-md-3">
                    <label className="form-label font-semibold fs-12 uppercase tracking-wide">Client</label>
                    <input type="text" className="form-control" value={projectForm.client} onChange={(e) => handleProjectChange('client', e.target.value)} />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label font-semibold fs-12 uppercase tracking-wide">Location</label>
                    <input type="text" className="form-control" value={projectForm.location} onChange={(e) => handleProjectChange('location', e.target.value)} />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label font-semibold fs-12 uppercase tracking-wide">Area</label>
                    <input type="text" className="form-control" value={projectForm.area} onChange={(e) => handleProjectChange('area', e.target.value)} />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label font-semibold fs-12 uppercase tracking-wide">Year</label>
                    <input type="text" className="form-control" value={projectForm.year} onChange={(e) => handleProjectChange('year', e.target.value)} />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label font-semibold fs-12 uppercase tracking-wide">Style</label>
                    <input type="text" className="form-control" value={projectForm.style} onChange={(e) => handleProjectChange('style', e.target.value)} />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label font-semibold fs-12 uppercase tracking-wide">Duration</label>
                    <input type="text" className="form-control" value={projectForm.duration} onChange={(e) => handleProjectChange('duration', e.target.value)} />
                  </div>

                  {/* Description */}
                  <div className="col-12">
                    <label className="form-label font-semibold fs-12 uppercase tracking-wide">Project Description Overview</label>
                    <textarea 
                      rows="3" 
                      className="form-control" 
                      value={projectForm.description} 
                      onChange={(e) => handleProjectChange('description', e.target.value)}
                    />
                  </div>

                  {/* Detail Gallery Images */}
                  <div className="col-12">
                    <label className="form-label font-semibold fs-12 uppercase tracking-wide">Gallery Images (comma-separated URLs)</label>
                    <div style={{ position: 'relative' }}>
                      <input 
                        type="text" 
                        className="form-control" 
                        style={{ paddingRight: '45px' }}
                        value={projectForm.images} 
                        onChange={(e) => handleProjectChange('images', e.target.value)}
                      />
                      <label 
                        className="btn-main p-0 d-inline-flex align-items-center justify-content-center cursor-pointer" 
                        style={{ 
                          position: 'absolute', 
                          right: '6px', 
                          top: '50%', 
                          transform: 'translateY(-50%)', 
                          borderRadius: '50%', 
                          width: '32px', 
                          height: '32px',
                          zIndex: 5,
                          marginBottom: 0
                        }} 
                        title="Upload Add-on Image"
                      >
                        <i className="fa fa-upload fs-12"></i>
                        <input type="file" onChange={(e) => handleFileUpload(e, 'project-extra')} style={{ display: 'none' }} accept="image/*" />
                      </label>
                    </div>
                    <span className="text-muted fs-10 d-block mt-1">Recommended: Landscape or square format (4:3, 3:2, or 1:1), e.g., 800x600 px or 800x800 px.</span>
                  </div>

                </div>

                <div className="mt-4 d-flex gap-2">
                  <button type="submit" className="btn-main px-4 py-2 font-semibold uppercase tracking-wide" disabled={loading}>
                    {editingProject ? 'Save Updates' : 'Add Project'}
                  </button>
                  <button type="button" onClick={() => { setShowProjectModal(false); resetProjectForm(); }} className="btn-cyber-outline px-4 py-2 font-semibold uppercase tracking-wide">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Add Gallery Image Modal */}
      {showGalleryModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-container cyber-panel">
            <div className="admin-modal-header d-flex justify-content-between align-items-center mb-4">
              <h3 className="uppercase tracking-wider font-bold fs-18 text-main mb-0">
                Add Gallery Image
              </h3>
              <button type="button" className="btn-close-modal" onClick={() => { setShowGalleryModal(false); setGalleryForm({ title: '', img: '', category: 'Interiors' }); }}>
                &times;
              </button>
            </div>
            <div className="admin-modal-body">
              <form onSubmit={handleGallerySubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label font-semibold fs-12 uppercase tracking-wide">Image Caption / Title</label>
                    <input 
                      type="text" 
                      className="form-control" 
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
                      style={{ height: '45px' }}
                    >
                      <option value="Residential">Residential</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Interiors">Interiors</option>
                      <option value="Architectural">Architectural</option>
                    </select>
                  </div>

                  <div className="col-12">
                    <label className="form-label font-semibold fs-12 uppercase tracking-wide">Image Path / URL *</label>
                    <div style={{ position: 'relative' }}>
                      <input 
                        type="text" 
                        className="form-control" 
                        style={{ paddingRight: '45px' }}
                        required 
                        value={galleryForm.img}
                        onChange={(e) => setGalleryForm({ ...galleryForm, img: e.target.value })}
                      />
                      <label 
                        className="btn-main p-0 d-inline-flex align-items-center justify-content-center cursor-pointer" 
                        style={{ 
                          position: 'absolute', 
                          right: '6px', 
                          top: '50%', 
                          transform: 'translateY(-50%)', 
                          borderRadius: '50%', 
                          width: '32px', 
                          height: '32px',
                          zIndex: 5,
                          marginBottom: 0
                        }} 
                        title="Upload Gallery Image"
                      >
                        <i className="fa fa-upload fs-12"></i>
                        <input type="file" onChange={(e) => handleFileUpload(e, 'gallery')} style={{ display: 'none' }} accept="image/*" />
                      </label>
                    </div>
                    <span className="text-muted fs-10 d-block mt-1">Recommended: Landscape orientation (4:3 or 3:2), e.g., 800x600 px.</span>
                  </div>
                </div>

                <div className="mt-4 d-flex gap-2">
                  <button type="submit" className="btn-main px-4 py-2 font-semibold uppercase tracking-wide" disabled={loading}>
                    Add Image
                  </button>
                  <button type="button" onClick={() => { setShowGalleryModal(false); setGalleryForm({ title: '', img: '', category: 'Interiors' }); }} className="btn-cyber-outline px-4 py-2 font-semibold uppercase tracking-wide">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Styled Dashboard Components */}
      <style>{`
        body {
          background-color: var(--bg-main) !important;
          color: var(--text-main) !important;
        }

        .cyber-panel {
          background: var(--bg-card) !important;
          border: 1px solid var(--border-color) !important;
          border-radius: 16px !important;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.03) !important;
          position: relative;
          transition: all 0.3s ease;
        }

        [data-theme="dark"] .cyber-panel {
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3) !important;
          border-color: rgba(255, 255, 255, 0.08) !important;
        }

        /* Disable bracket corner decorations */
        .cyber-panel::before, .cyber-panel::after {
          content: none !important;
        }

        .pulse-orb {
          width: 8px;
          height: 8px;
          background-color: #25D366;
          border-radius: 50%;
          box-shadow: 0 0 8px rgba(37, 211, 102, 0.5);
          display: inline-block;
          animation: pulse 1.5s infinite alternate;
        }

        @keyframes pulse {
          0% { transform: scale(0.9); opacity: 0.6; }
          100% { transform: scale(1.2); opacity: 1; }
        }

        .form-control {
          background-color: var(--bg-secondary) !important;
          color: var(--text-main) !important;
          border: 1px solid var(--border-color) !important;
          border-radius: 8px !important;
          font-family: inherit;
          padding: 10px 14px;
          transition: all 0.3s ease;
        }
        .form-control:focus {
          border-color: var(--primary-color) !important;
          box-shadow: 0 0 8px rgba(195, 175, 155, 0.25) !important;
          background-color: var(--bg-card) !important;
        }

        .form-label {
          color: var(--text-main) !important;
          font-size: 11px !important;
          font-weight: 700 !important;
          letter-spacing: 0.05em !important;
          text-transform: uppercase;
          margin-bottom: 6px;
        }

        .btn-sidebar {
          background: transparent;
          border: 1px solid transparent;
          color: var(--text-muted) !important;
          width: 100%;
          border-radius: 8px !important;
          padding: 12px 16px;
          font-family: inherit;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          transition: all 0.3s ease;
          position: relative;
        }
        .btn-sidebar:hover {
          color: var(--text-main) !important;
          background: var(--bg-secondary) !important;
        }
        .btn-sidebar.active-sidebar-tab {
          background: var(--primary-color) !important;
          color: #ffffff !important;
          box-shadow: 0 4px 15px rgba(195, 175, 155, 0.25) !important;
        }

        .table {
          color: var(--text-main) !important;
        }
        .table th {
          border-bottom: 2px solid var(--border-color) !important;
          color: var(--primary-color) !important;
          font-family: inherit;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-size: 11px;
          padding: 12px 8px;
        }
        .table td {
          border-bottom: 1px solid var(--border-color) !important;
          vertical-align: middle;
          padding: 14px 8px;
          color: var(--text-main) !important;
        }

        .btn-main {
          background: var(--primary-color) !important;
          color: #ffffff !important;
          border: 1px solid var(--primary-color) !important;
          font-weight: 700 !important;
          text-transform: uppercase !important;
          letter-spacing: 0.05em !important;
          transition: all 0.3s ease !important;
          border-radius: 8px !important;
        }
        .btn-main:hover {
          background: #d6c3b0 !important;
          border-color: #d6c3b0 !important;
          color: #ffffff !important;
          box-shadow: 0 4px 15px rgba(195, 175, 155, 0.25) !important;
        }

        .btn-cyber-outline {
          background: transparent;
          color: var(--text-main) !important;
          border: 1px solid var(--border-color) !important;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          transition: all 0.3s ease;
          border-radius: 8px !important;
        }
        .btn-cyber-outline:hover {
          border-color: var(--text-main) !important;
          background: var(--bg-secondary) !important;
        }

        .cyber-tag {
          background: var(--bg-secondary) !important;
          border: 1px solid var(--border-color) !important;
          color: var(--primary-color) !important;
          border-radius: 6px !important;
        }

        .cyber-metric-card {
          background: var(--bg-secondary) !important;
          border: 1px solid var(--border-color) !important;
          border-radius: 12px !important;
          padding: 24px;
          transition: all 0.3s ease;
        }
        .cyber-metric-card:hover {
          border-color: var(--primary-color) !important;
          box-shadow: 0 4px 20px rgba(195, 175, 155, 0.05) !important;
        }

        /* Modal Styles */
        .admin-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.65);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 99999;
          padding: 20px;
        }

        .admin-modal-container {
          max-width: 800px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          background: var(--bg-card) !important;
          border: 1px solid var(--border-color) !important;
          border-radius: 16px !important;
          padding: 30px !important;
          box-shadow: 0 15px 50px rgba(0, 0, 0, 0.15) !important;
          position: relative;
        }

        [data-theme="dark"] .admin-modal-container {
          box-shadow: 0 15px 50px rgba(0, 0, 0, 0.5) !important;
          border-color: rgba(255, 255, 255, 0.08) !important;
        }

        .btn-close-modal {
          background: transparent;
          border: none;
          color: var(--text-main);
          font-size: 28px;
          line-height: 1;
          cursor: pointer;
          transition: color 0.2s ease;
          padding: 0;
        }
        .btn-close-modal:hover {
          color: var(--primary-color);
        }

        /* Adaptive Logo Styling */
        .logo-light-mode-hidden {
          display: none;
        }
        .logo-dark-mode-hidden {
          display: block;
        }
        [data-theme="dark"] .logo-light-mode-hidden {
          display: block;
        }
        [data-theme="dark"] .logo-dark-mode-hidden {
          display: none;
        }
      `}</style>
    </main>
  );
}

export default Admin;
