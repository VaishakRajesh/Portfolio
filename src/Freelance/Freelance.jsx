import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import styles from './Freelance.module.css';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const Freelance = () => {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const projectRefs = useRef([]);
  const skillRefs = useRef([]);
  const sectionRefs = useRef([]);
  const floatingShapes = useRef([]);
  const magneticItems = useRef([]);

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
            <span className={styles.titleLine}>Creating Digital</span>
            <span className={styles.titleLine}>Experiences</span>
          </h1>
          <p className={styles.heroSubtitle}>Scroll to explore my work</p>
          <div className={styles.scrollIndicator}></div>
        </div>
      </section>

      {/* Projects Section */}
      <section className={`${styles.projects} ${styles.section}`} ref={el => sectionRefs.current[1] = el}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Featured Projects</h2>
          <div className={styles.titleUnderline}></div>
        </div>

        <div className={styles.projectsGrid}>
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className={styles.projectCard}
              ref={el => projectRefs.current[i] = el}
            >
              <div className={styles.projectImageWrapper}>
                <div className={styles.projectImage}></div>
                <div className={styles.projectOverlay}></div>
              </div>
              <div className={styles.projectInfo}>
                <h3 className={styles.projectTitle}>Project {i + 1}</h3>
                <div className={styles.projectTags}>
                  {[...Array(3)].map((_, j) => (
                    <span key={j} className={styles.tag}></span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Horizontal Scroll Section */}
      <section className={`${styles.horizontalSection} horizontal-section ${styles.section}`} ref={el => sectionRefs.current[2] = el}>
        <div className={`${styles.horizontalContainer} horizontal-container`}>
          <div className={styles.horizontalItem}>
            <div className={styles.horizontalImage}></div>
            <div className={styles.horizontalContent}>
              <h3>Case Study 1</h3>
              <p>Detailed project analysis and results</p>
            </div>
          </div>
          <div className={styles.horizontalItem}>
            <div className={styles.horizontalImage}></div>
            <div className={styles.horizontalContent}>
              <h3>Case Study 3</h3>
              <p>Detailed project analysis and results</p>
            </div>
          </div>
          <div className={styles.horizontalItem}>
            <div className={styles.horizontalImage}></div>
            <div className={styles.horizontalContent}>
              <h3>Case Study 7</h3>
              <p>Detailed project analysis and results</p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className={`${styles.skills} ${styles.section}`} ref={el => sectionRefs.current[3] = el}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Technical Skills</h2>
          <div className={styles.titleUnderline}></div>
        </div>

        <div className={styles.skillsGrid}>
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className={styles.skillCard}
              ref={el => skillRefs.current[i] = el}
            >
              <div className={styles.skillIcon}></div>
              <div className={styles.skillName}></div>
              <div className={styles.skillLevel}>
                <div className={styles.levelBar}></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className={`${styles.contact} ${styles.section}`} ref={el => sectionRefs.current[4] = el}>
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
      </section>
    </div>
  );
};

export default Freelance;