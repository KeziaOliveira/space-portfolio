import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { projects } from '../../data/content';
import './Projects.css';

// Import the video as a fallback/mock
import demoVideo from '../../assets/videos/ecommerce-recording.mp4';

const ProjectCard = ({ project, index, setActiveProject }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    // Adjusted margin to trigger when the title is aligned with the mockup's center
    // Mockup is at top: 30vh, and centered in the remaining height (65vh).
    // This puts the trigger point at approximately 62.5% from the top of the viewport.
    margin: "-62.5% 0px -37% 0px", 
    once: false
  });

  useEffect(() => {
    if (isInView) {
      setActiveProject(index);
    }
  }, [isInView, index, setActiveProject]);

  return (
    <motion.div
      ref={ref}
      className={`project-content-block ${isInView ? 'is-active' : ''}`}
      initial={{ opacity: 0.2 }}
      animate={{ opacity: isInView ? 1 : 0.2 }}
      transition={{ duration: 0.4 }}
    >
      <div className="project-header">
        <span className="project-number">0{index + 1}</span>
        <h3 className="project-title">{project.title}</h3>
      </div>
      
      <p className="project-description">{project.description}</p>
      
      <div className="project-tags">
        {project.tags.map(tag => (
          <span key={tag} className="project-tag">{tag}</span>
        ))}
      </div>

      <div className="project-impact">
        <span className="impact-label">Impacto Principal</span>
        <p className="impact-text">
          {project.impact || "Otimização de fluxos e melhoria na experiência do usuário final."}
        </p>
      </div>

      <div className="project-progress-container">
        <motion.div 
          className="project-progress-bar"
          initial={{ width: 0 }}
          animate={{ width: isInView ? '100%' : '0%' }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
};

const VisualLayer = ({ project, index, activeProject, mousePos }) => {
  const isActive = activeProject === index;
  
  // Define gradients for placeholders based on index
  const gradients = [
    'radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.4) 0%, transparent 70%)',
    'radial-gradient(circle at 80% 70%, rgba(168, 85, 247, 0.4) 0%, transparent 70%)',
    'radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.4) 0%, transparent 70%)',
    'radial-gradient(circle at 30% 80%, rgba(236, 72, 153, 0.4) 0%, transparent 70%)',
  ];

  return (
    <motion.div
      className="visual-layer"
      initial={false}
      animate={{ 
        opacity: isActive ? 1 : 0,
        scale: isActive ? 1 : 0.85,
        y: isActive ? 0 : 60, // Stronger "lift"
        x: isActive ? 0 : 40, // Stronger "approach" (moves from right to left)
        zIndex: isActive ? 10 : 0,
        filter: isActive ? 'blur(0px)' : 'blur(8px)',
      }}
      transition={{ 
        type: "spring",
        stiffness: 120, // Snappier spring
        damping: 22,
        mass: 1,
      }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: isActive ? 'auto' : 'none',
      }}
    >
      <motion.div 
        className="mockup-frame"
        style={{
          rotateX: isActive ? mousePos.y * -0.03 : 0,
          rotateY: isActive ? mousePos.x * 0.03 : 0,
        }}
      >
        <div className="mockup-header">
          <div className="mockup-dots">
            <span></span><span></span><span></span>
          </div>
          <div className="mockup-address">{project.title.toLowerCase().replace(/\s+/g, '')}.dev</div>
        </div>
        
        <div className="mockup-screen">
          {index === 0 ? (
            <video 
              src={demoVideo} 
              autoPlay 
              muted 
              loop 
              playsInline
              className="project-video"
            />
          ) : (
            <div className="project-placeholder">
              <div className="placeholder-content">
                <motion.div 
                  className="placeholder-logo"
                  animate={{ scale: isActive ? [1, 1.05, 1] : 1 }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  {project.title[0]}
                </motion.div>
                <p>Visualizing {project.title}...</p>
              </div>
              <div 
                className="ambient-glow" 
                style={{ background: gradients[index % gradients.length] }}
              />
            </div>
          )}
        </div>

        {/* Floating UI Cards - Only show on active project for performance */}
        {isActive && (
          <>
            <motion.div 
              className="floating-card info-card"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <div className="card-icon">⚡</div>
              <div className="card-text">High Performance</div>
            </motion.div>

            <motion.div 
              className="floating-card stats-card"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <div className="card-icon">📊</div>
              <div className="card-text">Optimized UX</div>
            </motion.div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

export default function Projects() {
  const [activeProject, setActiveProject] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 20;
      const y = (clientY / window.innerHeight - 0.5) * 20;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="projetos" className="projects-showcase" ref={containerRef}>
      <div className="showcase-layout">
        {/* Left Side: Scrolling Content */}
        <div className="content-side">
          <div className="content-intro">
            <span className="section-label">Showcase</span>
            <h2 className="section-title">Trabalhos Selecionados</h2>
          </div>
          
          <div className="projects-list">
            {projects.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={index}
                setActiveProject={setActiveProject}
              />
            ))}
          </div>
          
          <div className="content-spacer" />
        </div>

        {/* Right Side: Sticky Visuals */}
        <div className="visual-side">
          <div className="sticky-wrapper">
            <div className="visual-showcase-container">
              {projects.map((project, index) => (
                <VisualLayer 
                  key={project.id}
                  project={project}
                  index={index}
                  activeProject={activeProject}
                  mousePos={mousePos}
                />
              ))}
              
              {/* Global Background Ambient Effects */}
              <div className="visual-background">
                <div className="glow-sphere purple" style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }} />
                <div className="glow-sphere blue" style={{ transform: `translate(${-mousePos.x}px, ${-mousePos.y}px)` }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
