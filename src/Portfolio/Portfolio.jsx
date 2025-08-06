import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import styles from './Portfolio.module.css';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import { SiLeetcode } from "react-icons/si";
import { useState } from 'react';
import img1 from '../Img/mern.png';
import img2 from '../Img/mern.png';
import img3 from '../Img/mern.png';
import img4 from '../Img/mern.png';
import { IoLogoJavascript } from "react-icons/io5";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const Portfolio = () => {
  const projectRefs = useRef([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [animatingProject, setAnimatingProject] = useState(null);
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const skillRefs = useRef([]);
  const sectionRefs = useRef([]);
  const floatingShapes = useRef([]);
  const magneticItems = useRef([]);

  const openProject = (project, index) => {
    setAnimatingProject(index);
    setTimeout(() => {
      setSelectedProject(project);
      setAnimatingProject(null);
    }, 300);
  };


  const projectData = [
    {
      title: "Project 1",
      tags: ["React", "CSS", "Firebase"],
      image: img1,
      description: "A modern web application built with React and Firebase for real-time data management.",
    },
    {
      title: "Project 2",
      tags: ["Node.js", "MongoDB", "Express"],
      image: img2,
      description: "A robust backend API solution with Node.js, Express, and MongoDB for scalable data operations.",
    },
    {
      title: "Project 3",
      tags: ["TypeScript", "GraphQL", "Apollo"],
      image: img3,
      description: "An advanced data-driven application leveraging TypeScript, GraphQL, and Apollo for efficient data querying.",
    },
    {
      title: "Project 4",
      tags: ["Python", "Flask", "PostgreSQL"],
      image: img4,
      description: "A powerful web application built with Python Flask framework and PostgreSQL database for complex data relationships.",
    },
  ];



  const closeProject = () => {
    setSelectedProject(null);
  };
  // Initialize animations
  useEffect(() => {
    // Register ScrollTrigger refresh on images load
    window.addEventListener('load', () => ScrollTrigger.refresh());

    // Hero animation
    gsap.from(heroRef.current, {
      opacity: 0,
      y: 100,
      duration: 1.5,
      ease: "power4.out"
    });

    // Floating shapes animation
    floatingShapes.current.forEach((shape, i) => {
      const duration = 15 + i * 3;
      gsap.to(shape, {
        motionPath: {
          path: [
            { x: 0, y: 0 },
            { x: gsap.utils.random(-100, 100), y: gsap.utils.random(-100, 100) },
            { x: gsap.utils.random(-200, 200), y: gsap.utils.random(-200, 200) },
            { x: 0, y: 0 }
          ],
          curviness: 1.5
        },
        duration: duration,
        repeat: -1,
        ease: "sine.inOut"
      });
    });

    // Magnetic button effect
    magneticItems.current.forEach(el => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        gsap.to(el, {
          x: (x - centerX) * 0.2,
          y: (y - centerY) * 0.2,
          duration: 0.5,
          ease: "power2.out"
        });
      });

      el.addEventListener('mouseleave', () => {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.7,
          ease: "elastic.out(1, 0.5)"
        });
      });
    });

    // Section animations
    sectionRefs.current.forEach((section, index) => {
      gsap.from(section, {
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          end: "bottom 25%",
          toggleActions: "play none none none"
        },
        opacity: 0,
        y: 50,
        duration: 1,
        delay: index * 0.1,
        ease: "back.out(1.7)"
      });
    });

    // Project cards animation
    projectRefs.current.forEach((project, index) => {
      gsap.from(project, {
        scrollTrigger: {
          trigger: project,
          start: "top 80%",
          toggleActions: "play none none none"
        },
        opacity: 0,
        y: 100,
        duration: 0.8,
        delay: index * 0.15,
        ease: "power3.out"
      });

      // 3D tilt effect
      project.addEventListener('mousemove', (e) => {
        const rect = project.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const angleX = (y - centerY) / 20;
        const angleY = (centerX - x) / 20;

        gsap.to(project, {
          rotationX: angleX,
          rotationY: angleY,
          transformPerspective: 1000,
          duration: 0.5
        });
      });

      project.addEventListener('mouseleave', () => {
        gsap.to(project, {
          rotationX: 0,
          rotationY: 0,
          duration: 0.7,
          ease: "elastic.out(1, 0.5)"
        });
      });
    });

    // Skills animation
    skillRefs.current.forEach((skill, index) => {
      gsap.from(skill, {
        scrollTrigger: {
          trigger: skill,
          start: "top 90%",
          toggleActions: "play none none none"
        },
        scale: 0,
        opacity: 0,
        duration: 0.5,
        delay: index * 0.05,
        ease: "elastic.out(1, 0.5)"
      });
    });

    // Continuous horizontal scroll section
    const horizontalSections = gsap.utils.toArray(".horizontal-section");
    horizontalSections.forEach((section, i) => {
      const pinWrap = section.querySelector(".horizontal-container");
      const wrapWidth = pinWrap.scrollWidth;

      gsap.to(pinWrap, {
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          end: () => `+=${wrapWidth}`,
          invalidateOnRefresh: true
        },
        x: -wrapWidth + window.innerWidth,
        ease: "none"
      });
    });

    // Background color change on scroll
    gsap.to(containerRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=2000",
        scrub: true
      },
      backgroundColor: "#0a0a0a",
      ease: "none"
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className={styles.container} ref={containerRef}>
      {/* Floating background shapes */}
      <div className={styles.floatingShape1} ref={el => floatingShapes.current[0] = el}></div>
      <div className={styles.floatingShape2} ref={el => floatingShapes.current[1] = el}></div>
      <div className={styles.floatingShape3} ref={el => floatingShapes.current[2] = el}></div>

      {/* Hero Section */}
      <section className={`${styles.hero} ${styles.section}`} ref={el => {
        heroRef.current = el;
        sectionRefs.current[0] = el;
      }}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            <span className={styles.titleLine}>Vaishak Rajesh</span>
            {/* <span className={styles.titleLine}>Experiences </span> */}
          </h1>
          <p className={styles.heroSubtitle}> BCA Graduate | Full Stack Developer | Coding Enthusiast | MERN Stack Developer</p>
          <p className={styles.heroSubtitle}>
            <a
              href="https://www.linkedin.com/in/vaishak-rajesh-98573a2a5"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.icon}
            >
              <LinkedInIcon sx={{ fontSize: 50 }} />
            </a>

            <a
              href="https://github.com/vaishakrajesh"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.icon}
            >
              <GitHubIcon sx={{ fontSize: 50 }} />
            </a>
            <a
              href="https://leetcode.com/vaishak_rajesh"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.icon}
            >
              <SiLeetcode />
            </a>
          </p>
          <p className={styles.heroSubtitle}>Scroll to explore my work</p>
          <div className={styles.scrollIndicator}></div>
        </div>
      </section>

      {/* Projects Section */}
      <section className={`${styles.projects} ${styles.section}`} ref={el => sectionRefs.current[1] = el}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Projects</h2>
          <div className={styles.titleUnderline}></div>
        </div>
        {/* Projects Grid */}
        <div className={styles.projectsGrid}>
          {projectData.map((project, i) => (
            <div
              key={i}
              className={`${styles.projectCard} ${animatingProject === i ? styles.animating : ''}`}
              ref={el => projectRefs.current[i] = el}
              onClick={() => openProject(project, i)}
            >
              <div className={styles.projectImageWrapper}>
                <img
                  src={project.image}
                  alt={project.title}
                  className={styles.projectImage}
                />
                <div className={styles.projectOverlay}>
                  <div className={styles.expandIndicator}>
                    <span>View Details</span>
                  </div>
                </div>
              </div>
              <div className={styles.projectInfo}>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <div className={styles.projectTags}>
                  {project.tags.map((tag, j) => (
                    <span key={j} className={styles.tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedProject && (
          <div className={styles.modalOverlay} onClick={closeProject}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <button className={styles.closeButton} onClick={closeProject}>
                ×
              </button>
              <div className={styles.modalHeader}>
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className={styles.modalImage}
                />
                <div className={styles.modalInfo}>
                  <h2>{selectedProject.title}</h2>
                  <p>{selectedProject.description}</p>
                  <div className={styles.modalTags}>
                    {selectedProject.tags.map((tag, j) => (
                      <span key={j} className={styles.modalTag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section >

      {/* Horizontal Scroll Section */}
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Education</h2>
        <div className={styles.titleUnderline}></div>
      </div>
      < section className={`${styles.horizontalSection} horizontal-section ${styles.section}`} ref={el => sectionRefs.current[2] = el} >
        <div className={`${styles.horizontalContainer} horizontal-container`}>
          <div className={styles.horizontalItem}>
            {/* <div className={styles.horizontalImage}></div> */}
            <div className={styles.horizontalContent}>
              <h3>Bachelor of Computer Applications</h3>
              <p>St. Mary’s College of Commerce and Management Studies Thuruthiply</p>
              <p>2022-2025</p>
            </div>
          </div>
          <div className={styles.horizontalItem}>
            {/* <div className={styles.horizontalImage}></div> */}
            <div className={styles.horizontalContent}>
              <h3>Plus Two </h3>
              <p>St Joseph Higher Secondary School Kizhakkambalam</p>
              <p>2020-2022</p>
            </div>
          </div>
          <div className={styles.horizontalItem}>
            {/* <div className={styles.horizontalImage}></div> */}
            <div className={styles.horizontalContent}>
              <h3>SSLC</h3>
              <p>St. Mary's Higher Secondary School morakkala</p>
              <p>2020</p>
            </div>
          </div>
        </div>
      </section >

      {/* Skills Section */}
      < section className={`${styles.skills} ${styles.section}`} ref={el => sectionRefs.current[3] = el} >
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Technical Skills</h2>
          <div className={styles.titleUnderline}></div>
        </div>

        {/* <div className={styles.skillsGrid}>
          <div
            // key={i}
            className={styles.skillCard}
          // ref={el => skillRefs.current[i] = el}
          >
            <div className={styles.skillIcon}></div>
            <div className={styles.skillName}></div>
            <div className={styles.skillLevel}>
              <div className={styles.levelBar}></div>
            </div>
          </div>
          <div
            // key={i}
            className={styles.skillCard}
          // ref={el => skillRefs.current[i] = el}
          >
            <div className={styles.skillIcon}></div>
            <div className={styles.skillName}></div>
            <div className={styles.skillLevel}>
              <div className={styles.levelBar}></div>
            </div>
          </div>
        </div> */}
        <div className={styles.skillCard}>
          <div className={styles.skillCard}>
            <div className={styles.skillIcon}>
              <svg viewBox="0 0 24 24" fill="#F7DF1E">
                <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z" />
              </svg>
            </div>
            <div className={styles.skillName}>JavaScript</div>
            <div className={styles.skillLevel}>
              <div className={styles.levelBar}></div>
            </div>
          </div>

          <div className={styles.skillCard}>
            <div className={styles.skillIcon}>
              <svg viewBox="0 0 24 24" fill="#3776ab">
                <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z" />
              </svg>
            </div>
            <div className={styles.skillName}>Python</div>
            <div className={styles.skillLevel}>
              <div className={styles.levelBar}></div>
            </div>
          </div>

          <div className={styles.skillCard}>
            <div className={styles.skillIcon}>
              <svg viewBox="0 0 100 100" fill="none">
                <rect x="10" y="10" width="80" height="80" rx="8" fill="#00599C" />
                <text x="50" y="45" text-anchor="middle" fill="white" font-family="Arial" font-size="24" font-weight="bold">C</text>
                <text x="50" y="70" text-anchor="middle" fill="white" font-family="Arial" font-size="20" font-weight="bold">++</text>
              </svg>
            </div>
            <div className={styles.skillName}>C++</div>
            <div className={styles.skillLevel}>
              <div className={styles.levelBar}></div>
            </div>
          </div>

          <div className={styles.skillCard}>
            <div className={styles.skillIcon}>
              <svg viewBox="0 0 100 100" fill="none">
                <circle cx="50" cy="50" r="40" fill="#00599C" />
                <text x="50" y="62" text-anchor="middle" fill="white" font-family="Arial" font-size="48" font-weight="bold">C</text>
              </svg>
            </div>
            <div className={styles.skillName}>C</div>
            <div className={styles.skillLevel}>
              <div className={styles.levelBar}></div>
            </div>
          </div>

          <div className={styles.skillCard}>
            <div className={styles.skillIcon}>
              <svg viewBox="0 0 24 24" fill="#61DAFB">
                <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.277zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.36-.034-.47 0-.92.014-1.36.034.44-.572.895-1.096 1.36-1.564zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.87.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.36.034.47 0 .92-.014 1.36-.034-.44.572-.895 1.095-1.36 1.565-.465-.47-.92-.993-1.36-1.565z" />
              </svg>
            </div>
            <div className={styles.skillName}>React.js</div>
            <div className={styles.skillLevel}>
              <div className={styles.levelBar}></div>
            </div>
          </div>

          <div className={styles.skillCard}>
            <div className={styles.skillIcon}>
              <svg viewBox="0 0 24 24" fill="#ED8B00">
                <path d="M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149M8.276 15.933s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218M13.116 11.475c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0-.001-8.216 2.051-4.292 6.573M19.33 20.504s.679.559-.747.991c-2.712.822-11.288 1.069-13.669.033-.856-.373.75-.89 1.254-.998.527-.114.828-.093.828-.093-.953-.671-6.156 1.317-2.643 1.887 9.58 1.553 17.462-.7 14.977-1.82M9.292 13.21s-4.362 1.036-1.544 1.412c1.189.159 3.561.123 5.77-.062 1.806-.152 3.618-.477 3.618-.477s-.637.272-1.098.587c-4.429 1.165-12.986.623-10.522-.568 2.082-1.006 3.776-.892 3.776-.892M17.116 17.584c4.503-2.34 2.421-4.589.968-4.285-.355.074-.515.138-.515.138s.132-.207.385-.297c2.875-1.011 5.086 2.981-.928 4.562 0-.001.07-.062.09-.118M14.401 0s2.494 2.494-2.365 6.33c-3.896 3.077-.888 4.832-.001 6.836-2.274-2.053-3.943-3.858-2.824-5.539 1.644-2.469 6.197-3.665 5.19-7.627M9.734 23.924c4.322.277 10.959-.153 11.116-2.198 0 0-.302.775-3.572 1.391-3.688.694-8.239.613-10.937.168 0-.001.553.457 3.393.639" />
              </svg>
            </div>
            <div className={styles.skillName}>Java</div>
            <div className={styles.skillLevel}>
              <div className={styles.levelBar}></div>
            </div>
          </div>
        </div>
      </section >

      {/* Contact CTA */}
      < section className={`${styles.contact} ${styles.section}`} ref={el => sectionRefs.current[4] = el} >
        <div className={styles.contactContent}>
          <h2 className={styles.contactTitle}>Let's Create Something Amazing</h2>
          <button
            className={styles.contactButton}
            ref={el => magneticItems.current[0] = el}
          >
            <span>Get In Touch</span>
            <div className={styles.buttonHover}></div>
          </button>
        </div>
      </section >
    </div >
  );
};

export default Portfolio;