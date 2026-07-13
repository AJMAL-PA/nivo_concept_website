import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import FloatingSocial from './components/layout/FloatingSocial';
import ExtraWrap from './components/layout/ExtraWrap';
import Preloader from './components/common/Preloader';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServiceSingle from './pages/ServiceSingle';
import Projects from './pages/Projects';
import ProjectSingle from './pages/ProjectSingle';
import Blog from './pages/Blog';
import BlogSingle from './pages/BlogSingle';
import FAQ from './pages/FAQ';
import Testimonials from './pages/Testimonials';
import Contact from './pages/Contact';
import Consultation from './pages/Consultation';
import Interiors from './pages/services/Interiors';
import Construction from './pages/services/Construction';
import ConsultationService from './pages/services/ConsultationService';
import ArchitecturalDesign from './pages/services/ArchitecturalDesign';
import CommercialProjects from './pages/projects/CommercialProjects';
import ResidentialProjects from './pages/projects/ResidentialProjects';
import Gallery from './pages/Gallery';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    // Destroy and reinit Lenis on route change so smooth scroll resets
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname]);
  return null;
};

const AppLayout = ({ children }) => (
  <>
    <Header />
    <ExtraWrap />
    {children}
    <FloatingSocial />
    <Footer />
  </>
);

const App = () => {
  return (
    <BrowserRouter>
      {/* Single global page-transition overlay — no more per-page white flash */}
      <Preloader />
      <ScrollToTop />
      <AppLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/interiors" element={<Interiors />} />
          <Route path="/services/construction" element={<Construction />} />
          <Route path="/services/consultation-service" element={<ConsultationService />} />
          <Route path="/services/architectural-design" element={<ArchitecturalDesign />} />
          <Route path="/service-single" element={<ServiceSingle />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/commercial" element={<CommercialProjects />} />
          <Route path="/projects/residential" element={<ResidentialProjects />} />
          <Route path="/project-single" element={<ProjectSingle />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog-single" element={<BlogSingle />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/consultation" element={<Consultation />} />
          {/* 404 fallback */}
          <Route path="*" element={<Home />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
};

export default App;
