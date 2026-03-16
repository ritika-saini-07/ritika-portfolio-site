import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, useMotionValue, AnimatePresence } from 'framer-motion';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Download, 
  Code2, 
  Database,
  Terminal,
  Award,
  ArrowRight,
  ArrowUpRight,
  Monitor,
  GraduationCap,
  Send,
  ArrowUp,
  Users,
  Palette,
  Zap,
  Briefcase
} from 'lucide-react';

const AnimatedSection = ({ children, className = '', delay = 0, animation = 'fadeUp' }) => {
  const variants = {
    fadeUp: { initial: { opacity: 0, y: 40, filter: 'blur(10px)' }, animate: { opacity: 1, y: 0, filter: 'blur(0px)' } },
    fadeDown: { initial: { opacity: 0, y: -40, filter: 'blur(10px)' }, animate: { opacity: 1, y: 0, filter: 'blur(0px)' } },
    fadeLeft: { initial: { opacity: 0, x: -40, filter: 'blur(10px)' }, animate: { opacity: 1, x: 0, filter: 'blur(0px)' } },
    fadeRight: { initial: { opacity: 0, x: 40, filter: 'blur(10px)' }, animate: { opacity: 1, x: 0, filter: 'blur(0px)' } },
    scaleUp: { initial: { opacity: 0, scale: 0.9, filter: 'blur(10px)' }, animate: { opacity: 1, scale: 1, filter: 'blur(0px)' } }
  };

  const selectedAnim = variants[animation] || variants.fadeUp;

  return (
    <motion.div
      initial={selectedAnim.initial}
      whileInView={selectedAnim.animate}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay, type: "spring", stiffness: 60, damping: 20 }} 
      className={className}
    >
      {children}
    </motion.div>
  );
};

const AmbientBackground = () => {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -3, overflow: 'hidden', pointerEvents: 'none', background: 'var(--bg)' }}>
      {/* Elegant large soft orb gradients */}
      <motion.div
        animate={{ x: [0, 50, -50, 0], y: [0, 80, -80, 0], scale: [1, 1.1, 0.9, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: 'absolute', top: '-10%', left: '-10%', width: '60vw', height: '60vw', background: 'radial-gradient(circle, rgba(177, 140, 240, 0.2) 0%, transparent 60%)', borderRadius: '50%', filter: 'blur(80px)' }}
      />
      <motion.div
        animate={{ x: [0, -80, 50, 0], y: [0, -50, 80, 0], scale: [1, 0.9, 1.1, 1] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: '70vw', height: '70vw', background: 'radial-gradient(circle, rgba(160, 90, 255, 0.15) 0%, transparent 60%)', borderRadius: '50%', filter: 'blur(100px)' }}
      />
      <motion.div
        animate={{ x: [0, 40, -40, 0], y: [0, -60, 40, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: 'absolute', top: '30%', left: '30%', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(177, 140, 240, 0.1) 0%, transparent 60%)', borderRadius: '50%', filter: 'blur(90px)' }}
      />
            {/* Static Twinkling Stars - Increased Density */}
      {[...Array(100)].map((_, i) => (
        <motion.div
           key={`star-${i}`}
           animate={{ 
             opacity: [0.2, (i % 3 === 0 ? 0.9 : 0.6), 0.2], 
             scale: [1, (i % 4 === 0 ? 1.3 : 1.1), 1] 
           }}
           transition={{ 
             duration: 3 + Math.random() * 5, 
             repeat: Infinity, 
             ease: "easeInOut", 
             delay: Math.random() * 5 
           }}
           style={{
             position: 'absolute',
             top: `${Math.random() * 100}%`,
             left: `${Math.random() * 100}%`,
             width: `${Math.random() * 2 + 0.5}px`,
             height: `${Math.random() * 2 + 0.5}px`,
             background: i % 7 === 0 ? 'var(--pink)' : i % 10 === 0 ? 'var(--purple)' : '#fff',
             borderRadius: '50%',
             boxShadow: i % 7 === 0 ? '0 0 8px var(--pink)' : i % 10 === 0 ? '0 0 8px var(--purple)' : '0 0 4px #fff'
           }}
        />
      ))}

      {/* Floating Sparkles & Dust - Increased Density */}
      {[...Array(80)].map((_, i) => (
         <motion.div
           key={`particle-${i}`}
           animate={{ 
             y: ['110vh', '-10vh'], 
             x: [0, (i % 2 === 0 ? 70 : -70), 0], 
             opacity: [0, 0.8, 0],
             scale: [0.4, 1.2, 0.4] 
           }}
           transition={{ 
             duration: 8 + (Math.random() * 15), 
             repeat: Infinity, 
             ease: "linear",
             delay: (i * 0.2)
           }}
           style={{ 
             position: 'absolute', 
             left: `${Math.random() * 100}%`, 
             width: `${Math.random() * 3 + 1}px`, 
             height: `${Math.random() * 3 + 1}px`, 
             background: i % 4 === 0 ? 'var(--purple)' : 'rgba(255, 255, 255, 0.4)', 
             borderRadius: '50%', 
             boxShadow: i % 4 === 0 ? '0 0 12px var(--purple)' : 'none'
           }}
         />
      ))}
    </div>
  );
};

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  useEffect(() => {
    const handleMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName.toLowerCase() === 'a' || 
        target.tagName.toLowerCase() === 'button' || 
        target.closest('a') || 
        target.closest('button') ||
        target.closest('.project-row') ||
        target.closest('.card') ||
        target.closest('.btn') ||
        target.closest('.timeline-item')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className={`custom-cursor ${isHovering ? 'hovering' : ''}`}
      style={{ left: cursorX, top: cursorY }}
    />
  );
};

const TypewriterText = ({ words, prefix = "" }) => {
  const [currentWord, setCurrentWord] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typingSpeed = isDeleting ? 40 : 80;
    const delay = isDeleting && currentWord === '' ? 500 : (!isDeleting && currentWord === words[wordIndex] ? 2000 : typingSpeed);

    const timer = setTimeout(() => {
      if (isDeleting) {
        setCurrentWord(prev => prev.slice(0, -1));
        if (currentWord === '') {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      } else {
        setCurrentWord(words[wordIndex].slice(0, currentWord.length + 1));
        if (currentWord === words[wordIndex]) {
           setIsDeleting(true);
        }
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [currentWord, isDeleting, wordIndex, words]);

  return (
    <span className="typewriter">
      {prefix}{currentWord}
      <span className="cursor">|</span>
    </span>
  );
};

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [navHidden, setNavHidden] = useState(false);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [introFinished, setIntroFinished] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIntroFinished(true);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150) {
      setNavHidden(true); // scrolling down
    } else {
      setNavHidden(false); // scrolling up
    }
    
    // Show back to top button
    if (latest > 600) {
      setShowTopBtn(true);
    } else {
      setShowTopBtn(false);
    }
  });

  const scrollTo = (id) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({ top: element.offsetTop - 100, behavior: 'smooth' });
    }
  };

  const updateTabOnScroll = () => {
    const sections = ['home', 'about', 'skills', 'training', 'projects', 'contact'];
    const scrollPos = window.scrollY + 200;

    sections.forEach(sec => {
      const element = document.getElementById(sec);
      if (element && element.offsetTop <= scrollPos && (element.offsetTop + element.offsetHeight) > scrollPos) {
        setActiveTab(sec);
      }
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', updateTabOnScroll);
    return () => window.removeEventListener('scroll', updateTabOnScroll);
  }, []);

  const projects = [
    {
      title: "Freelance Job Platform",
      desc: "A backend REST API built using Spring Boot that manages freelancers, clients, projects, skills, and portfolios.",
      tags: ["Spring Boot", "Java", "REST APIs", "MySQL"],
      link: "https://github.com/ritika-saini-07/freelance-job-platform",
      image: "/Freelance.png",
      date: "Oct 2025"
    },
    {
      title: "SkinBuddy AI",
      desc: "AI-powered chatbot capable of actively analyzing user skin concerns and generating personalized skincare logic.",
      tags: ["Python", "NLP Libraries", "Bootstrap", "Tailwind"],
      link: "https://github.com/arunavtiwary/GlowScript",
      image: "/SkinBuddy.png",
      date: "Aug 2025"
    },
    {
      title: "AI Disk Scheduler",
      desc: "Designed an AI-driven simulator to evaluate traditional scheduling algorithms using Python and TensorFlow.",
      tags: ["TensorFlow", "Scikit-Learn", "OpenAI", "Python"],
      link: "https://github.com/ritika-saini-07/Disc-Scheduling-",
      image: "/Disc.png",
      date: "June 2025"
    },
    {
      title: "Art & Asset Prototype",
      desc: "An end-to-end e-commerce platform enabling artistic users to list, browse, and purchase creative goods.",
      tags: ["Python", "JavaScript", "RESTful APIs", "HTML"],
      link: "https://www.figma.com/design/fX98cdmGDGNKZ4ozHyv8xw/Untitled?node-id=116-495&t=jwavsbsfhhaBLzS0-1",
      image: "/Art&Asset.png",
      date: "Jan 2025"
    }
  ];

  const abilitiesData = [
    { 
      title: "Core Languages", 
      icon: <Terminal strokeWidth={2} size={28} />, 
      items: ["C/C++", "Java", "Python", "JavaScript", "Shell Scripting"],
      desc: "Strong foundational programming with expertise in logic building and system-level script execution."
    },
    { 
      title: "Frameworks & Libraries", 
      icon: <Monitor strokeWidth={2} size={28} />, 
      items: ["React", "Node.js", "Express.js", "Spring"],
      desc: "Structuring complete, fluid web environments from RESTful backends to beautifully designed responsive interfaces."
    },
    { 
      title: "Technologies & Design", 
      icon: <Palette strokeWidth={2} size={28} />, 
      items: ["HTML/CSS", "MySQL", "MongoDB", "Figma", "UI/UX Design"],
      desc: "Constructing reliable databases and designing highly intuitive, user-centric prototypes."
    }
  ];
  
  const softSkills = ["Problem-Solving", "Strategic Thinking", "Creativity", "Adaptability", "Resilience", "Empathy", "Teamwork"];

  const certs = [
    { name: "Advanced Prompt Engineering", issuer: "Infosys", date: "August 2025", image: "/Prompt.png" },
    { name: "Generative AI Fundamentals", issuer: "Infosys", date: "August 2025", image: "/Build_Gen.png" },
    { name: "Build Generative AI Apps and Solutions", issuer: "Udemy", date: "August 2025", image: "/udemy_cert.png" },
    { name: "Full Stack Development with AI", issuer: "Programming Pathshala", date: "July 2025", image: "/pathshala_cert.png" },
    { name: "Language Principles & Finite Automata Theory", issuer: "Infosys", date: "July 2025", image: "/infosys_cert.png" }
  ];

  const education = [
    {
      date: "Aug 2023 - Present",
      title: "B.Tech in Computer Science & Engineering",
      desc: "Lovely Professional University (Phagwara, Punjab). CGPA: 7.43."
    },
    {
      date: "Apr 2022 - Mar 2023",
      title: "Intermediate Education",
      desc: "Ganga International School (New Delhi)."
    },
    {
      date: "Apr 2020 - Mar 2021",
      title: "Matriculation",
      desc: "Ganga International School (New Delhi)."
    }
  ];

  const trainings = [
    {
      title: "Full Stack Development with AI",
      organization: "Programming Pathshala",
      duration: "May 2025 - July 2025",
      details: "Intensive training on MERN stack integrated with AI tools, focusing on scalable architecture and prompt engineering.",
      icon: <Monitor size={20} />
    }
  ];

  const extraActivities = [
    {
      title: "NGO Volunteer",
      desc: "Actively contributed to animal welfare and social causes through Doon Animal Welfare and Nawa Shaan.",
      icon: <Users size={24} className="text-pink" />,
      tag: "Social Impact"
    },
    {
      title: "IIT Roorkee Workshop",
      desc: "Selected for and actively participated in a comprehensive Design Thinking workshop at IIT Roorkee.",
      icon: <Monitor size={24} className="text-pink" />,
      tag: "Design Strategy"
    },
    {
      title: "IGEN Cybersecurity",
      desc: "Engaged in critical cybersecurity discussions and networking as a delegate at the IGEN Conference.",
      icon: <Terminal size={24} className="text-pink" />,
      tag: "Security Focus"
    },
    {
      title: "Hackathons",
      desc: "Proven resilience in multiple 24-hour high-pressure coding competitions and technical challenges.",
      icon: <Code2 size={24} className="text-pink" />,
      tag: "Competitive Coding"
    }
  ];

  return (
    <>
      <CustomCursor />
      <AmbientBackground />
      <div className="bg-grid" />

      {/* Dynamic Nav: Hides on scroll down */}
      <motion.nav 
        className="nav-wrapper"
        animate={{ y: navHidden ? -100 : 0, opacity: navHidden ? 0 : 1 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <div className="navbar">
          {['home', 'about', 'skills', 'training', 'projects', 'contact'].map(item => (
            <a 
              key={item}
              onClick={() => scrollTo(item)} 
              className={`nav-link ${activeTab === item ? 'active' : ''}`}
            >
              {item === 'training' ? 'Training' : item}
            </a>
          ))}
        </div>
      </motion.nav>
      <main>
        <section 
          className="hero container" 
          id="home"
          style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}
        >
          <motion.div 
            layout 
            className="hero-layout" 
            style={{ 
              display: 'flex', 
              flexDirection: introFinished ? 'row-reverse' : 'column', 
              alignItems: 'center', 
              gap: introFinished ? 'clamp(40px, 8vw, 150px)' : '40px',
              width: '100%',
              justifyContent: 'center'
            }}
            transition={{ duration: 3.5, ease: [0.16, 1, 0.3, 1] }}
          >
             <motion.div 
               layout
               className="hero-custom-image-wrapper" 
               style={{ 
                 margin: 0,
                 width: introFinished ? '380px' : '340px',
                 height: introFinished ? '380px' : '340px'
               }}
               whileHover={introFinished ? { scale: 1.05, rotateY: 5, rotateX: 5 } : {}}
               transition={{ 
                 duration: 3.5, 
                 ease: [0.16, 1, 0.3, 1],
                 type: 'layout'
               }}
             >
               <img src="/Ritika.jpeg" alt="Ritika Saini" className="hero-image" />
             </motion.div>

             <div className="hero-content" style={{ textAlign: introFinished ? 'left' : 'center', flex: introFinished ? 1 : 'unset', maxWidth: introFinished ? '650px' : 'unset' }}>
                <motion.div 
                  layout
                  className={introFinished ? "" : "text-gradient-pink-white"}
                  style={{ 
                    fontFamily: 'var(--font-sans)', 
                    fontSize: introFinished ? '1.4rem' : '3.2rem', 
                    marginBottom: '16px', 
                    fontWeight: 'bold', 
                    letterSpacing: '0.8px',
                    color: introFinished ? 'var(--pink)' : 'unset'
                  }}
                  transition={{ 
                    duration: 3.5, 
                    ease: [0.16, 1, 0.3, 1],
                    type: 'layout'
                  }}
                >
                  Hey, I am Ritika Saini
                </motion.div>
                
                {introFinished && (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <AnimatedSection delay={1.2} animation="fadeLeft">
                      <h1 className="hero-title" style={{ fontWeight: 700 }}>
                         I build <span style={{ color: 'var(--pink)', fontStyle: 'normal', fontWeight: 700 }}>thoughtful digital experiences</span> through creativity and code.
                      </h1>
                    </AnimatedSection>

                    <AnimatedSection delay={1.5} animation="fadeLeft">
                      <p className="hero-desc" style={{ maxWidth: '500px', fontSize: '1rem', marginBottom: '40px', lineHeight: '1.6', color: 'var(--text-muted)' }}>
                        Computer Science student passionate about building useful digital products and exploring modern technologies.
                      </p>
                    </AnimatedSection>

                    <AnimatedSection delay={1.8} animation="fadeUp">
                      <div className="btn-group" style={{ display: 'flex', gap: '20px' }}>
                         <a href="#projects" onClick={(e) => { e.preventDefault(); scrollTo('projects'); }} className="btn btn-primary" style={{ borderRadius: '100px', padding: '12px 28px', fontSize: '0.95rem' }}>
                            View Projects <ArrowRight strokeWidth={2} size={16}/>
                         </a>
                         <a href="/Ritika_CV.pdf" target="_blank" className="btn btn-outline" style={{ borderRadius: '100px', padding: '12px 28px', fontSize: '0.95rem' }}>
                            Download CV <Download strokeWidth={2} size={16}/>
                         </a>
                      </div>
                    </AnimatedSection>
                  </div>
                )}
             </div>
          </motion.div>
        </section>

        {/* Curved Wave Divider */}
        {introFinished && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
            style={{ width: '100%', overflow: 'hidden', lineHeight: 0, marginTop: '-60px' }}
          >
            <svg viewBox="0 0 1440 320" style={{ display: 'block', width: '100%', height: '140px' }} preserveAspectRatio="none">
              <defs>
                <linearGradient id="curve-glow" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="transparent" />
                  <stop offset="50%" stopColor="var(--pink)" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
                <filter id="glow-filter" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
              <path 
                fill="var(--surface)" 
                d="M0,128L80,149.3C160,171,320,213,480,202.7C640,192,800,128,960,117.3C1120,107,1280,149,1360,170.7L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
              ></path>
              <path 
                d="M0,128L80,149.3C160,171,320,213,480,202.7C640,192,800,128,960,117.3C1120,107,1280,149,1360,170.7L1440,192" 
                fill="none" 
                stroke="url(#curve-glow)" 
                strokeWidth="4" 
                filter="url(#glow-filter)"
                opacity="0.6"
              ></path>
            </svg>
          </motion.div>
        )}

        {/* Mid-transition Typewriter Section */}
        {introFinished && (
          <div style={{ padding: '0 0 80px 0', background: 'var(--surface)', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
            <AnimatedSection animation="fadeUp" delay={0.4}>
              <div className="typewriter-container" style={{ margin: 0, textAlign: 'center', minHeight: 'auto' }}>
                 <TypewriterText prefix="I am " words={["a Full Stack Developer.", "a UI/UX Enthusiast.", "a Problem Solver."]} />
              </div>
            </AnimatedSection>
          </div>
        )}

        {/* About & Education Journey */}
        <div style={{ background: 'var(--surface)', paddingBottom: '40px' }}>
          <section id="about" className="section container" style={{ paddingTop: '0', paddingBottom: '20px' }}>
             <AnimatedSection animation="fadeUp">
                <h2 className="section-title"><span className="text-gradient">About Me</span></h2>
             </AnimatedSection>
             
              <div className="about-grid" style={{ marginTop: "32px" }}>
               <AnimatedSection animation="fadeLeft" delay={0.2}>
                  <div style={{ marginBottom: '32px' }}>
                    <h3 style={{ fontSize: '1.4rem', color: "var(--pink)", marginBottom: '16px', fontWeight: '600', letterSpacing: '0.5px' }}>My Background</h3>
                    <p className="about-text" style={{marginTop: "0"}}>
                       I'm Ritika, an adaptable Full Stack Developer and UI/UX enthusiast currently pursuing my B.Tech in Computer Science and Engineering at Lovely Professional University, Punjab.
                    </p>
                  </div>

                  <div style={{ marginBottom: '32px' }}>
                    <h3 style={{ fontSize: '1.4rem', color: "var(--pink)", marginBottom: '16px', fontWeight: '600', letterSpacing: '0.5px' }}>Full Stack Philosophy</h3>
                    <p className="about-text">
                       My technical arsenal spans across C++, Java, and Python, with a deep focus on building scalable web solutions using React, Node.js, and Spring. I bridge the gap between complex backend logic and intuitive, user-centric design.
                    </p>
                  </div>

                  <div>
                    <h3 style={{ fontSize: '1.4rem', color: "var(--pink)", marginBottom: '16px', fontWeight: '600', letterSpacing: '0.5px' }}>Beyond the Screen</h3>
                    <p className="about-text">
                       Beyond coding, I'm an active contributor to social causes through NGO volunteering and a regular at tech conferences like IGEN Cybersecurity. I thrive in high-pressure environments, having competed in 24-hour hackathons and design workshops at IIT Roorkee.
                    </p>
                  </div>
               </AnimatedSection>
               
               {/* Education Timeline with Scroll-Triggered Slow Drop */}
               <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <AnimatedSection animation="fadeDown" delay={0.2} viewport={{ once: true, margin: "-100px" }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                       <GraduationCap size={24} className="text-pink" />
                       <h3 style={{ fontSize: '1.4rem', color: "var(--pink)", fontWeight: '600', letterSpacing: '0.5px' }}>Education Journey</h3>
                    </div>
                  </AnimatedSection>

                  <div className="timeline" style={{ marginTop: '16px' }}>
                    {education.map((item, index) => (
                       <AnimatedSection 
                         key={index} 
                         animation="fadeDown" 
                         delay={0.4 + (index * 0.4)}
                         viewport={{ once: true, margin: "-100px" }}
                       >
                         <motion.div 
                           className="timeline-item"
                           whileHover={{ x: 8 }}
                           transition={{ type: "spring", stiffness: 300, damping: 20 }}
                         >
                            <div className="timeline-date">{item.date}</div>
                            <h4 className="timeline-title">{item.title}</h4>
                            <p className="timeline-desc">{item.desc}</p>
                         </motion.div>
                       </AnimatedSection>
                    ))}
                  </div>
               </div>
             </div>
          </section>
        </div>

        {/* Skills */}
        <section id="skills" className="section container">
          <AnimatedSection animation="fadeUp">
            <h2 className="section-title"><span className="text-gradient">Technical Arsenal</span></h2>
            <p className="section-subtitle">Deep breakdown of my technical stack and implementation strategies.</p>
          </AnimatedSection>
            
          <div className="grid-cards">
            {abilitiesData.map((data, i) => (
               <AnimatedSection delay={i * 0.15} key={i} animation="scaleUp">
                  <div className="card">
                     <div className="card-icon">{data.icon}</div>
                     <h3 className="card-title">{data.title}</h3>
                     <p className="card-desc" style={{ marginBottom: 0 }}>{data.desc}</p>
                     <div className="pill-list">
                        {data.items.map((item, idx) => (
                           <span key={idx} className="pill">{item}</span>
                        ))}
                     </div>
                  </div>
               </AnimatedSection>
            ))}
          </div>

          <div style={{ marginTop: '80px', overflow: 'hidden' }}>
            <AnimatedSection animation="fadeUp">
              <h3 style={{ fontSize: '1.5rem', color: "var(--text-muted)", marginBottom: "24px", textAlign: "center" }}>Soft Skills & Professional Traits</h3>
            </AnimatedSection>
            <div className="marquee">
               <div className="marquee-track">
                  {/* Duplicated for seamless loop */}
                  {[...softSkills, ...softSkills].map((skill, i) => (
                     <div key={i} className="marquee-item">
                        <Users size={16} className="text-pink" /> 
                        <span>{skill}</span>
                     </div>
                  ))}
               </div>
            </div>
          </div>
        </section>

        {/* Certifications & Licenses */}
        <section className="section container">
          <AnimatedSection animation="fadeUp">
            <h2 className="section-title">
               <Award className="text-pink" style={{ marginRight: '4px' }} size={36} /> 
               <span className="text-gradient">Certificates</span>
            </h2>
            <p className="section-subtitle">Official continuous learning and skill verifications.</p>
            <div className="scroll-indicator">
              <span>Scroll to explore</span>
              <ArrowRight size={14} />
            </div>
          </AnimatedSection>

          <div className="horizontal-scroll">
             {certs.map((cert, idx) => (
                <AnimatedSection delay={idx * 0.15} key={idx} animation="fadeLeft">
                  <div className="cert-card">
                    <div className="cert-image-container">
                      <img src={cert.image} alt={cert.name} className="cert-img" />
                    </div>
                    <div className="cert-info">
                      <div className="cert-header">
                        <Award size={20} className="text-pink" />
                        <h4 className="cert-title">{cert.name}</h4>
                      </div>
                      <span className="text-muted" style={{ fontSize: "0.9rem" }}>{cert.issuer} &bull; {cert.date}</span>
                    </div>
                  </div>
                </AnimatedSection>
             ))}
          </div>
        </section>

        {/* Training Section */}
        <section id="training" className="section container">
          <AnimatedSection animation="fadeUp">
            <h2 className="section-title">
               <Briefcase className="text-pink" style={{ marginRight: '8px' }} size={36} /> 
               <span className="text-gradient">Professional Training</span>
            </h2>
            <p className="section-subtitle">Structured programs and deep-dives into modern technology stacks.</p>
          </AnimatedSection>
          
          <div className="activity-list">
             {trainings.map((train, idx) => (
                <AnimatedSection delay={idx * 0.1} key={idx} animation="fadeLeft">
                   <div className="activity-tab" style={{ cursor: 'default' }}>
                      <div className="activity-icon-wrapper">
                         {train.icon}
                      </div>
                      <div className="activity-text-content">
                         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                            <h4 className="activity-tab-title">{train.title}</h4>
                            <span className="timeline-date" style={{ margin: 0, fontSize: '0.8rem' }}>{train.duration}</span>
                         </div>
                         <p className="activity-tab-desc" style={{ marginBottom: '8px', color: 'var(--pink)', fontWeight: '500' }}>{train.organization}</p>
                         <p className="activity-tab-desc">{train.details}</p>
                      </div>
                   </div>
                </AnimatedSection>
             ))}
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="section container">
          <AnimatedSection animation="fadeUp">
            <h2 className="section-title"><span className="text-gradient">Projects</span></h2>
            <p className="section-subtitle">A collection of algorithms and systems brought seamlessly into user interfaces.</p>
            <div className="scroll-indicator">
              <span>Scroll to explore</span>
              <ArrowRight size={14} />
            </div>
          </AnimatedSection>
            
          <div className="horizontal-scroll">
            {projects.map((proj, i) => (
               <AnimatedSection delay={i * 0.15} key={i} animation="fadeLeft">
                  <a href={proj.link} target="_blank" rel="noreferrer" className="project-row">
                    <img src={proj.image} alt={proj.title} className="project-thumbnail" />
                    <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                         <h3 className="project-title" style={{ margin: 0 }}>{proj.title}</h3>
                         <div className="project-arrow">
                           <ArrowUpRight strokeWidth={2} size={20} />
                         </div>
                      </div>
                      <span className="text-pink" style={{ fontSize: "0.85rem", fontWeight: "600", marginBottom: "8px" }}>{proj.date}</span>
                      <p className="project-desc" style={{ flexGrow: 1 }}>{proj.desc}</p>
                      <div className="pill-list">
                         {proj.tags.map(t => <span key={t} className="pill">{t}</span>)}
                      </div>
                    </div>
                  </a>
               </AnimatedSection>
            ))}
          </div>
        </section>

        {/* Extra Activities Section */}
        <section className="section container">
          <AnimatedSection animation="fadeUp">
            <h2 className="section-title">
               <Zap className="text-pink" style={{ marginRight: '8px' }} size={36} /> 
               <span className="text-gradient">What more I did?</span>
            </h2>
            <p className="section-subtitle" style={{ marginBottom: "40px" }}>Beyond the code: community, learning, and challenges.</p>
          </AnimatedSection>

          <div className="activity-list">
             {extraActivities.map((act, idx) => (
                <AnimatedSection delay={idx * 0.1} key={idx} animation="fadeLeft">
                  <div className="activity-tab">
                    <div className="activity-icon-wrapper">
                      {act.icon}
                    </div>
                    <div className="activity-text-content">
                      <h4 className="activity-tab-title">{act.title}</h4>
                      <p className="activity-tab-desc">{act.desc}</p>
                    </div>
                    <div className="activity-tag">
                      {act.tag}
                    </div>
                  </div>
                </AnimatedSection>
             ))}
          </div>
        </section>

      </main>

      {/* Contact Section With Form */}
      <section id="contact" className="section container">
        <AnimatedSection animation="fadeUp">
          <span className="text-pink" style={{ textTransform: "uppercase", letterSpacing: "2px", fontWeight: "600", fontSize: "0.9rem" }}>Get In Touch</span>
          <h2 className="section-title" style={{ marginTop: "16px" }}>Let's build together.</h2>
          <p className="section-subtitle">Reach out if you are looking for a developer, have a project, or just want to connect.</p>
        </AnimatedSection>
        
        <div className="contact-grid">
           <AnimatedSection animation="fadeLeft" delay={0.2}>
             <div style={{ padding: "40px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "24px" }}>
                <form onSubmit={(e) => e.preventDefault()}>
                   <div className="form-group">
                      <input type="text" className="form-input" placeholder="Your Name" required />
                   </div>
                   <div className="form-group">
                      <input type="email" className="form-input" placeholder="Your Email" required />
                   </div>
                   <div className="form-group">
                      <textarea className="form-input form-textarea" placeholder="Your Message" required></textarea>
                   </div>
                   <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                      Send Message <Send size={18} />
                   </button>
                </form>
             </div>
           </AnimatedSection>

           <AnimatedSection animation="fadeRight" delay={0.3} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h3 style={{ fontSize: '2rem', marginBottom: '24px' }}>Prefer direct contact?</h3>
              <p className="about-text">I am highly responsive to email and LinkedIn messages. Feel free to reach out directly using the options below.</p>
              
              <div style={{ margin: "32px 0", display: "flex", gap: "20px", flexWrap: "wrap" }}>
                  <a href="mailto:ritikasaini@gmail.com" className="btn btn-outline" style={{ borderRadius: "100px" }}>
                    ritikasaini@gmail.com <ArrowUpRight size={18} />
                 </a>
                 <a href="/Ritika_CV.pdf" target="_blank" className="btn btn-primary" style={{ borderRadius: "100px" }}>
                    Download CV <Download size={18} />
                 </a>
              </div>

              <div className="social-links" style={{ justifyContent: "flex-start", marginTop: 0 }}>
                 <a href="https://github.com/ritika-saini-07" target="_blank" rel="noreferrer" className="social-circle">
                    <Github size={24} />
                 </a>
                 <a href="https://www.linkedin.com/in/ritika-saini-07" target="_blank" rel="noreferrer" className="social-circle">
                    <Linkedin size={24} />
                 </a>
              </div>
           </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer container" style={{ padding: "40px 0" }}>
        <AnimatedSection animation="fadeUp">
          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
             &copy; {new Date().getFullYear()} Ritika Saini. Built with React. Form functions are simulated mockups.
          </p>
        </AnimatedSection>
      </footer>

      {/* Back To Top FAB */}
      <motion.button 
        className="fab"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: showTopBtn ? 1 : 0, scale: showTopBtn ? 1 : 0, y: showTopBtn ? 0 : 50 }}
        transition={{ duration: 0.3 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        style={{ pointerEvents: showTopBtn ? 'auto' : 'none' }}
      >
        <ArrowUp size={24} />
      </motion.button>
    </>
  );
};

export default App;
