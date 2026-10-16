import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { AnimatedHeading } from '../../components/AnimatedText/AnimatedText';
import './Projects.css';

import goldVideo from '../../assets/videos/projects_videos/Gold_video.mp4';
import glensoVideo from '../../assets/videos/projects_videos/Glenso_video.mp4';
import petrocapixabaVideo from '../../assets/videos/projects_videos/Petrocapixaba_Video.mp4';
import scoreVideo from '../../assets/videos/projects_videos/Scoreboard_video.mp4';

const projectVideos = [glensoVideo, petrocapixabaVideo, scoreVideo, goldVideo];

const ProjectCard = ({ project, index, setActiveProject, isMobile }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    margin: "-57.5% 0px -42.5% 0px",
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

      {isMobile && projectVideos[index] && (
        <div className="project-card-media">
          <video
            src={projectVideos[index]}
            autoPlay
            muted
            loop
            playsInline
            className="project-card-video"
          />
        </div>
      )}

      <p className="project-description">{project.description}</p>

      <div className="project-tags">
        {project.tags.map(tag => (
          <span key={tag} className="project-tag">{tag}</span>
        ))}
      </div>

      {/* <div className="project-impact">
        <span className="impact-label">Impacto Principal</span>
        <p className="impact-text">
          {project.impact || "Otimização de fluxos e melhoria na experiência do usuário final."}
        </p>
      </div> */}

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

  return (
    <motion.div
      className="visual-layer"
      initial={false}
      animate={{
        opacity: isActive ? 1 : 0,
        scale: isActive ? 1 : 0.85,
        y: isActive ? 0 : 60,
        x: isActive ? 0 : 40,
        zIndex: isActive ? 10 : 0,
        filter: 'none',
      }}
      transition={{
        type: "spring",
        stiffness: 120,
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
        className={`mockup-frame ${project.link ? 'mockup-frame--linkable' : ''}`}
        style={{
          rotateX: isActive ? mousePos.y * -0.03 : 0,
          rotateY: isActive ? mousePos.x * 0.03 : 0,
        }}
        onClick={() => {
          if (project.link) window.open(project.link, '_blank', 'noopener,noreferrer');
        }}
        role={project.link ? 'link' : undefined}
        aria-label={project.link ? `${project.title} (${project.link})` : undefined}
      >
        <div className="mockup-screen">
          {project.link && <span className="mockup-link-hint" aria-hidden="true">↗</span>}
          {projectVideos[index] ? (
            <video
              src={projectVideos[index]}
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
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function Projects() {
  const { t } = useLanguage();
  const [activeProject, setActiveProject] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 1024px)').matches
  );
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 1024px)');
    setIsMobile(mql.matches);
    const onChange = (e) => setIsMobile(e.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return (
    <section id="projetos" className="projects-showcase" ref={containerRef}>
      <div className="showcase-layout">
        <div className="content-side">
          <div className="content-intro">
            <span className="section-label">{t.ui.projects.label}</span>
            <AnimatedHeading as="h2" className="section-title">{t.ui.projects.title}</AnimatedHeading>
          </div>

          <div className="projects-list">
            {t.projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                setActiveProject={setActiveProject}
                isMobile={isMobile}
              />
            ))}
          </div>

          <div className="content-spacer" />
        </div>

        {!isMobile && (
          <div className="visual-side">
            <div className="sticky-wrapper">
              <div className="visual-showcase-container">
                {t.projects.map((project, index) => (
                  <VisualLayer
                    key={project.id}
                    project={project}
                    index={index}
                    activeProject={activeProject}
                    mousePos={mousePos}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
