import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Moon, Sun, ArrowRight, ExternalLink } from 'react-feather';
import Style from './App.module.css';

// Theme context
const ThemeContext = React.createContext();

const App = () => {
  const [theme, setTheme] = useState('light');
  const [menuOpen, setMenuOpen] = useState(false);

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // Set initial theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  // Close mobile menu when resizing
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Section component with animation
  const Section = ({ id, children, dark = false }) => {
    const [ref, inView] = useInView({
      threshold: 0.1,
      triggerOnce: true
    });

    return (
      <section
        id={id}
        ref={ref}
        className={`${Style.section} ${dark ? Style.darkSection : ''}`}
      >
        <motion.div
          className={Style.sectionContent}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {children}
        </motion.div>
      </section>
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={Style.portfolioApp}>
        {/* Header */}
        <header className={Style.header}>
          <nav className={Style.navbar}>
            <motion.div
              className={Style.logo}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              VR
            </motion.div>

            {/* Desktop Navigation */}
            <ul className={Style.navLinks}>
              {['About', 'Work', 'Articles'].map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <a
                    href={`#${item.toLowerCase()}`}
                    className={Style.navLink}
                  >
                    {item}
                  </a>
                </motion.li>
              ))}

              {/* Theme Toggle */}
              <motion.li
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <button
                  onClick={toggleTheme}
                  className={Style.themeToggle}
                  aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                >
                  {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                </button>
              </motion.li>
            </ul>

            {/* Mobile Menu Button */}
            <button
              className={Style.menuButton}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <div className={`${Style.hamburger} ${menuOpen ? Style.open : ''}`} />
            </button>
          </nav>

          {/* Mobile Menu */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                className={Style.mobileMenu}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {['About', 'Work', 'Articles', 'Contact'].map((item, index) => (
                  <a
                    key={index}
                    href={`#${item.toLowerCase()}`}
                    className={Style.mobileNavLink}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
                <button
                  onClick={toggleTheme}
                  className={Style.mobileThemeToggle}
                >
                  {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        <main>
          {/* Hero Section */}
          <Section id="hero">
            <div className={Style.heroContent}>
              <motion.h1
                className={Style.heroTitle}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className={Style.heroGreeting}>Hello, I'm</span>
                <span className={Style.heroName}>Vaishak Rajesh</span>
              </motion.h1>

              <motion.h2
                className={Style.heroSubtitle}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Full Stack Web Developer | MERN Stack | Cross-Platform
              </motion.h2>

              <motion.p
                className={Style.heroDescription}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                I am a full stack web developer with in-depth experience in the<span className={Style.highlight}> MERN stack (MongoDB, Express, React, Node.js)</span>, specializing in the end-to-end development of scalable web applications. I also develop cross-platform applications using tools like React Native , enabling consistent performance across web and mobile platforms.
              </motion.p>

              <motion.div
                className={Style.heroButtons}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <motion.button
                  className={Style.primaryButton}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  View Projects
                </motion.button>
                <motion.button
                  className={Style.secondaryButton}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Download CV
                </motion.button>
              </motion.div>
            </div>
          </Section>

          {/* About Section */}
          <Section id="about">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <h2 className={Style.sectionTitle}>
                <span className={Style.sectionNumber}>01</span>
                About Me
              </h2>

              <div className={Style.aboutGrid}>
                <div className={Style.aboutText}>
                  <p>
                    With over 5 years of experience in frontend development, I specialize in building
                    responsive, accessible web applications using React, TypeScript, and modern CSS.
                  </p>
                  <p>
                    My approach combines technical excellence with thoughtful design, resulting in
                    products that are both beautiful and functional. I believe in the power of
                    minimalism and focus on creating intuitive user experiences.
                  </p>

                  <div className={Style.aboutDetails}>
                    <div className={Style.detailItem}>
                      <h3>Education</h3>
                      <p>B.Sc. Computer Science<br />Stanford University, 2018</p>
                    </div>
                    <div className={Style.detailItem}>
                      <h3>Experience</h3>
                      <p>Senior Frontend Dev<br />Acme Corp (2021-Present)</p>
                    </div>
                  </div>
                </div>

                <motion.div
                  className={Style.aboutImage}
                  whileInView={{ opacity: 1, x: 0 }}
                  initial={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className={Style.imageWrapper}></div>
                </motion.div>
              </div>
            </motion.div>
          </Section>

          {/* Work Section */}
          <Section id="work" dark>
            <h2 className={Style.sectionTitle}>
              <span className={Style.sectionNumber}>02</span>
              Selected Work
            </h2>

            <div className={Style.workGrid}>
              {[
                {
                  title: "Nova Design System",
                  description: "A comprehensive design system for enterprise applications",
                  tags: ["React", "Storybook", "Design Tokens"],
                  link: "#"
                },
                {
                  title: "E-commerce Platform",
                  description: "High-performance online store with 99.9% uptime",
                  tags: ["Next.js", "Node.js", "GraphQL"],
                  link: "#"
                },
                {
                  title: "Analytics Dashboard",
                  description: "Real-time data visualization for business intelligence",
                  tags: ["D3.js", "TypeScript", "WebSockets"],
                  link: "#"
                }
              ].map((project, index) => (
                <motion.div
                  key={index}
                  className={Style.workCard}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <div className={Style.workCardHeader}>
                    <span className={Style.projectNumber}>0{index + 1}</span>
                    <h3>{project.title}</h3>
                  </div>
                  <p className={Style.projectDescription}>{project.description}</p>
                  <div className={Style.projectTags}>
                    {project.tags.map((tag, i) => (
                      <span key={i} className={Style.tag}>{tag}</span>
                    ))}
                  </div>
                  <a href={project.link} className={Style.projectLink}>
                    View Case Study <ArrowRight size={14} />
                  </a>
                </motion.div>
              ))}
            </div>
          </Section>

          {/* Articles Section */}
          <Section id="articles">
            <h2 className={Style.sectionTitle}>
              <span className={Style.sectionNumber}>03</span>
              Recent Articles
            </h2>

            <div className={Style.articlesGrid}>
              {[
                {
                  title: "The Future of React in 2024",
                  excerpt: "Exploring upcoming features and architectural patterns",
                  date: "May 15, 2024",
                  readTime: "8 min read"
                },
                {
                  title: "CSS Container Queries in Production",
                  excerpt: "A practical guide to implementing this powerful new feature",
                  date: "April 2, 2024",
                  readTime: "6 min read"
                },
                {
                  title: "Optimizing Web Performance",
                  excerpt: "Advanced techniques for sub-100ms interactions",
                  date: "March 10, 2024",
                  readTime: "10 min read"
                }
              ].map((article, index) => (
                <motion.article
                  key={index}
                  className={Style.articleCard}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <h3>{article.title}</h3>
                  <p className={Style.articleExcerpt}>{article.excerpt}</p>
                  <div className={Style.articleMeta}>
                    <span>{article.date}</span>
                    <span>{article.readTime}</span>
                  </div>
                </motion.article>
              ))}
            </div>
          </Section>

          {/* Contact Section */}
          {/* <Section id="contact" dark>
            <h2 className={Style.sectionTitle}>
              <span className={Style.sectionNumber}>04</span>
              Get In Touch
            </h2>
            
            <div className={Style.contactGrid}>
              <div className={Style.contactText}>
                <p>
                  Interested in working together or have a project in mind? 
                  I'm currently available for select freelance opportunities.
                </p>
                
                <div className={Style.contactInfo}>
                  <a href="mailto:hello@johndoe.com">hello@johndoe.com</a>
                  <a href="tel:+1234567890">+1 (234) 567-890</a>
                </div>
                
                <div className={Style.socialLinks}>
                  {['GitHub', 'Twitter', 'LinkedIn', 'Dribbble'].map((social, index) => (
                    <a 
                      key={index} 
                      href="#" 
                      className={Style.socialLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {social} <ExternalLink size={14} />
                    </a>
                  ))}
                </div>
              </div>
              
              <form className={Style.contactForm}>
                <div className={Style.formGroup}>
                  <label htmlFor="name">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className={Style.formInput} 
                    required 
                  />
                </div>
                
                <div className={Style.formGroup}>
                  <label htmlFor="email">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className={Style.formInput} 
                    required 
                  />
                </div>
                
                <div className={Style.formGroup}>
                  <label htmlFor="message">Message</label>
                  <textarea 
                    id="message" 
                    className={Style.formTextarea} 
                    rows="5"
                    required
                  ></textarea>
                </div>
                
                <motion.button 
                  type="submit" 
                  className={Style.submitButton}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Message
                </motion.button>
              </form>
            </div> */}
        </main>

        {/* Footer */}
        <footer className={Style.footer}>
          <div className={Style.footerContent}>
            <div className={Style.footerLogo}>VR</div>
            <p className={Style.footerText}>
              Designed and built by Vaishak Rajesh<br />
            </p>
          </div>
        </footer>
      </div>
    </ThemeContext.Provider>
  );
};

export default App;