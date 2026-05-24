import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Typewriter } from "react-simple-typewriter";
import emailjs from "@emailjs/browser";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import Tilt from "react-parallax-tilt";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const count = 15;

  const projects = [
    {
      title: "African Glam",
      description: "A modern fashion website with clean UI and smooth interactions.",
      tech: ["HTML", "CSS", "JavaScript"],
      link: "#",
      color: "#ff6b9d",
    },
    {
      title: "Anime Website",
      description: "Anime discovery platform with cards, sections and animations.",
      tech: ["React", "CSS"],
      link: "#",
      color: "#a78bfa",
    },
    {
      title: "Netflix Clone",
      description: "Netflix-style UI with authentication and dashboard.",
      tech: ["Node.js", "Express"],
      link: "#",
      color: "#f87171",
    },
    {
      title: "E-commerce Store",
      description: "Full-stack online store with product listings and cart.",
      tech: ["React", "Node.js"],
      link: "#",
      color: "#00f0ff",
    },
  ];

  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        e.target,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        setLoading(false);
        setSent(true);
        e.target.reset();

        setTimeout(() => {
          setSent(false);
        }, 3000);
      })
      .catch(() => {
        setLoading(false);
        setError("Failed to send message. Please try again.");
      });
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({
        x: (e.clientX / window.innerWidth - 0.5) * 40,
        y: (e.clientY / window.innerHeight - 0.5) * 40,
      });
      setCursor({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: "transparent" },
          fpsLimit: 60,
          particles: {
            number: { value: 40 },
            size: { value: 2 },
            move: { speed: 1, enable: true },
          },
        }}
      />

      <div
        className="cursor-glow"
        style={{
          left: cursor.x - 100,
          top: cursor.y - 100,
        }}
      ></div>

      <div>
        <div
          className="glow"
          style={{
            transform: `translate(${position.x}px, ${position.y}px)`,
          }}
        ></div>

        <motion.nav
          className="navbar"
          initial={{ y: -80 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="logo">Toluwa</h3>

          <div className={`nav-links ${menuOpen ? "active" : ""}`}>
            {/* <a href="#home" onClick={() => setMenuOpen(false)}>home</a> */}
            <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
            <a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
          </div>

          <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </div>
        </motion.nav>

        <section className="section hero">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.3,
                },
              },
            }}
          >
            <motion.h1
              variants={{
                hidden: { opacity: 0, y: -40 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              Hi, I'm <span className="highlight">Toluwa</span>
            </motion.h1>

            <motion.h2>
              <Typewriter
                words={[
                  "Frontend Developer",
                  "Backend Developer",
                  "Full-Stack Developer",
                  "React Specialist",
                  "UI/UX Focused",
                  "Freelance Ready"
                ]}
                loop={true}
                cursor
                cursorStyle="|"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1500}
              />
            </motion.h2>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              I build modern, responsive and animated web experiences.
            </motion.p>
          </motion.div>
          <motion.a
  href="https://wa.me/2349135452576?text=Hello%20I%20would%20like%20to%20hire%20you"
  download
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.95 }}
  className="cv-btn"
>
  Hire me
</motion.a>

        </section>
        <motion.section
      id="about"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="about-section"
    >

      <h2>Full-Stack Developer</h2>

      <p className="about-intro">
        I build complete web solutions — from stunning frontend interfaces 
        to powerful backend systems. I focus on performance, scalability, 
        and modern user experiences that help businesses grow online.
      </p>

      {/* SKILL CARDS */}
      <div className="about-grid">

        <div className="about-card">
          <h3>🎨 Frontend</h3>
          <p>
            React, Modern CSS, Animations, Responsive UI,
            Performance Optimization
          </p>
          <div className="skill">
            <p>Frontend</p>
            <div className="bar"><span style={{width:"90%"}}></span></div>
          </div>
        </div>

        <div className="about-card">
          <h3>⚙ Backend</h3>
          <p>
            Node.js, Express, API Development,
            Authentication, Database Integration
          </p>
          <div className="skill">
            <p>Backend</p>
            <div className="bar"><span style={{width:"85%"}}></span></div>
          </div>
        </div>

        <div className="about-card">
          <h3>🌐 Full-Stack</h3>
          <p>
            End-to-End Web Applications,
            Deployment, Git Version Control,
            Real-world Project Architecture
          </p>
          <div className="skill">
            <p>Full-Stack Architecture</p>
            <div className="bar"><span style={{width:"88%"}}></span></div>
          </div>
        </div>
        {/* <div className="skills"></div> */}
      </div>

      {/* STATS */}
      <div className="stats">
        <div>
          <h3>{count}+</h3>
          <p>Projects Built</p>
        </div>

        <div>
          <h3>100%</h3>
          <p>Responsive Designs</p>
        </div>

        <div>
          <h3>Fast</h3>
          <p>Performance Focused</p>
        </div>
      </div>
      <h5>I help startups, brands, and entrepreneurs build high-performance web applications from concept to deployment using modern frontend and scalable backend technologies.</h5>
      <a href="#contact" className="about-btn">
        Let’s Build Something Powerful
      </a>
      <motion.a
  href="https://wa.me/2349135452576?text=Hello%20I%20would%20like%20to%20hire%20you"
  download
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.95 }}
  className="cv-btn"
>
  Hire me
</motion.a>
    </motion.section>
        <motion.section
          className="section"
          id="projects"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <h2>Projects</h2>
          <p className="section-subtitle">A selection of things I've built</p>

           <Swiper
             modules={[Autoplay]}
             autoplay={{ delay: 3500 }}
             spaceBetween={30}
             slidesPerView={1}
             loop={true}
             breakpoints={{
               768: { slidesPerView: 2 },
               1024: { slidesPerView: 3 },
             }}
           >
            {projects.map((project, index) => (
              <SwiperSlide key={index}>
                <Tilt
                  glareEnable={true}
                  glareMaxOpacity={0.3}
                  scale={1.05}
                  transitionSpeed={1500}
                >
                  <div className="project-card" style={{ "--card-color": project.color }}>
                    <div className="project-card-top">
                      <span className="project-number">0{index + 1}</span>
                      <h3>{project.title}</h3>
                    </div>
                    <p>{project.description}</p>
                    <div className="tech-tags">
                      {project.tech.map((t, i) => (
                        <span key={i} className="tech-tag">{t}</span>
                      ))}
                    </div>
                    <a href={project.link} className="btn small project-btn">
                      View Project <span className="btn-arrow">→</span>
                    </a>
                  </div>
                </Tilt>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.section>
        
        <motion.section
      id="services"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="services-section"
    >
      <h2>Services</h2>
      <p className="services-intro">
        I provide complete web solutions from design to deployment.
      </p>

      <div className="services-grid">

        <div className="service-card">
          <h3>🚀 Starter Website</h3>
          <p>Perfect for small businesses and personal brands.</p>
          <ul>
            <li>Responsive Design</li>
            <li>Modern UI</li>
            <li>Contact Form</li>
          </ul>
          <h4>$150+</h4>
        </div>

        <div className="service-card featured">
          <h3>🔥 Full-Stack Web App</h3>
          <p>Frontend + Backend with database integration.</p>
          <ul>
            <li>React Frontend</li>
            <li>Node/Express Backend</li>
            <li>Authentication</li>
            <li>Deployment</li>
          </ul>
          <h4>$500+</h4>
        </div>

        <div className="service-card">
          <h3>⚡ UI Redesign</h3>
          <p>Upgrade your existing website performance & look.</p>
          <ul>
            <li>Performance Optimization</li>
            <li>Modern Redesign</li>
            <li>Mobile Optimization</li>
          </ul>
          <h4>$200+</h4>
        </div>

      </div>
        </motion.section>

        <motion.section
          className="section"
          id="contact"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2>Contact Me</h2>

          <form className="contact-form" onSubmit={sendEmail}>
            {sent && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="success-message"
              >
                Message sent successfully!
              </motion.div>
            )}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="error-message"
              >
                {error}
              </motion.div>
            )}
            <input type="text" name="user_name" placeholder="Your Name" required />
            <input type="email" name="user_email" placeholder="Your Email" required />
            <textarea name="message" placeholder="Your Message" required />
            <button type="submit" className="btn" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </motion.section>

        <motion.section
      id="testimonials"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="testimonials-section"
    >
      <h2>What Clients Say</h2>

      <div className="testimonials-grid">

        <div className="testimonial-card">
          <p>
            "Professional, fast, and extremely talented. Delivered beyond expectations."
          </p>
          <h4>- Startup Founder</h4>
        </div>

        <div className="testimonial-card">
          <p>
            "Our website performance improved drastically after redesign."
          </p>
          <h4>- Business Owner</h4>
        </div>

        <div className="testimonial-card">
          <p>
            "Clean code, smooth animations, and excellent communication."
          </p>
          <h4>- Agency Partner</h4>
        </div>

      </div>
    </motion.section>
    
    <footer className="footer">
        <p>&copy; 2026 Toluwa. All rights reserved.</p>
      <div className="social-links">
        <a href="https://twitter.com/itzToluwa" target="_blank" rel="noopener noreferrer">
          Twitter
        </a>
        <a href="https://linkedin.com/in/itzToluwa" target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
        <a href="https://github.com/itzToluwa" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
      </div>
    </footer>
      </div>
    </>
  );
}

export default App;
