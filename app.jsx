const { useState, useEffect, useRef } = React;

// Custom cursor
function Cursor() {
  const cursorRef = useRef(null);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const move = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px';
        cursorRef.current.style.top = e.clientY + 'px';
      }
    };
    const onEnter = () => setHovering(true);
    const onLeave = () => setHovering(false);
    document.addEventListener('mousemove', move);
    document.querySelectorAll('a,button,.project-card,.cert-card,.skill-card').forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });
    return () => document.removeEventListener('mousemove', move);
  }, []);

  return React.createElement('div', { ref: cursorRef, className: `cursor ${hovering ? 'hovering' : ''}` });
}

// Scroll reveal hook
function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
      }),
      { threshold: 0.12 }
    );
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// Nav
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return React.createElement('nav', { className: scrolled ? 'scrolled' : '' },
    React.createElement('a', { href: '#', className: 'nav-logo' }, 'Ekjot', React.createElement('span', null, '.')),
    React.createElement('ul', { className: 'nav-links' },
      ['About', 'Skills', 'Projects', 'Training', 'Education', 'Contact'].map(item =>
        React.createElement('li', { key: item },
          React.createElement('a', { href: `#${item.toLowerCase()}` }, item)
        )
      )
    )
  );
}

// Hero
function Hero() {
  return React.createElement('section', { className: 'hero', id: 'about' },
    React.createElement('div', { className: 'hero-left' },
      React.createElement('p', { className: 'hero-tag' }, 'Available for opportunities'),
      React.createElement('h1', { className: 'hero-name' }, 'Ekjot\nSingh'),
      React.createElement('p', { className: 'hero-title' }, 'Software Developer & Systems Enthusiast'),
      React.createElement('p', { className: 'hero-desc' },
        "I'm a computer science student focused on building clean, reliable systems and solving real problems with code. I enjoy working across the stack, from data structures and algorithms to modern web development."
      ),
      React.createElement('p', { className: 'hero-contact' },
        React.createElement('a', { href: 'mailto:ekjotsinghbhela@gmail.com' }, 'ekjotsinghbhela@gmail.com'),
        '  ·  +91-9478539700'
      ),
      React.createElement('div', { className: 'hero-actions' },

        // React.createElement('a', { href: '#', className: 'btn-primary' }, '↓ Download Resume'),

        React.createElement('a', {
          href: 'assets/Resume.docx',
          className: 'btn-primary',
          download: 'Ekjot_Singh_Resume.docx'
        }, '↓ Download Resume'),

        React.createElement('a', { href: '#contact', className: 'btn-outline' }, 'Get in Touch')
      )
    ),
    React.createElement('div', { className: 'hero-right' },
      // React.createElement('div', { className: 'hero-image' },
        React.createElement('img', {className: 'hero-image', src: 'assets/Photo/Portrait.png', alt: 'Ekjot Singh' })
      )
    )
  // );
}

// Skills
const skillsData = [
  {
    icon: '⌨️',
    title: 'Programming Languages',
    tags: ['Java', 'Python', 'C', 'C++']
  },
  {
    icon: '🌐',
    title: 'Web Development',
    tags: ['HTML5 & CSS3', 'JavaScript ES6+', 'React', 'Modern Web APIs']
  },
  {
    icon: '🔧',
    title: 'Developer Tools',
    tags: ['Git & Version Control', 'Linux Systems', 'VS Code']
  },
  {
    icon: '🧠',
    title: 'CS Fundamentals',
    tags: ['Data Structures', 'Algorithms', 'OOP Architecture']
  }
];

function Skills() {
  return React.createElement('section', { className: 'skills-section', id: 'skills' },
    React.createElement('p', { className: 'section-label reveal' }, 'Technical Arsenal'),
    React.createElement('h2', { className: 'section-title reveal reveal-delay-1' }, 'What I Work With'),
    React.createElement('div', { className: 'skills-grid reveal reveal-delay-2' },
      skillsData.map((skill, i) =>
        React.createElement('div', { className: 'skill-card', key: i },
          React.createElement('span', { className: 'skill-card-icon' }, skill.icon),
          React.createElement('h3', { className: 'skill-card-title' }, skill.title),
          React.createElement('div', { className: 'skill-tags' },
            skill.tags.map(tag =>
              React.createElement('span', { className: 'skill-tag', key: tag }, tag)
            )
          )
        )
      )
    )
  );
}

// Experience & Learning
const expData = [
  {
    title: 'Data Structures & Algorithms',
    items: [
      'Asymptotic Analysis (Big O Notation)',
      'Non-linear structures: Trees, Graphs, Heaps',
      'Dynamic Programming & Greedy Algorithms',
      'Memory efficient data storage patterns'
    ]
  },
  {
    title: 'Operating Systems & Low-Level',
    items: [
      'Process Scheduling & Thread Concurrency',
      'Virtual Memory & Paging Mechanisms',
      'Inter-process Communication (IPC)',
      'File System Architectures & Storage Layers'
    ]
  },
  {
    title: 'Software Development & Systems',
    items: [
      'Object-Oriented Design Principles (SOLID)',
      'Full-stack Lifecycle Management',
      'Automated Testing & Continuous Integration',
      'Scalable System Design and Microservices'
    ]
  },
  {
    title: 'Soft Skills',
    items: ['Fast learner', 'Adaptive', 'Good communication skills', 'Reliable', 'Collaborative']
  }
];

function Experience() {
  return React.createElement('section', { id: 'experience' },
    React.createElement('p', { className: 'section-label reveal' }, 'Experience & Learning'),
    React.createElement('h2', { className: 'section-title reveal reveal-delay-1' }, 'Knowledge & Expertise'),
    React.createElement('div', { className: 'exp-grid' },
      expData.map((exp, i) =>
        React.createElement('div', { className: `exp-card reveal reveal-delay-${i+1}`, key: i },
          React.createElement('h3', { className: 'exp-card-title' }, exp.title),
          React.createElement('ul', null,
            exp.items.map(item => React.createElement('li', { key: item }, item))
          )
        )
      )
    )
  );
}

// Projects
const projectsData = [
  { 
    num: '01', 
    name: 'Book Tracker App', 
    link: 'github.com/Ekj0t/Book-Tracker',
    image: 'assets/Projects/BookTrackerApp.png'
  },
  { 
    num: '02', 
    name: 'PunjabiLang', 
    link: 'github.com/Ekj0t/DesiLang',
    image: 'assets/Projects/PunjabiLang.png'
  },
  { 
    num: '03', 
    name: 'SmallJPG', 
    link: 'github.com/Ekj0t/smallJPG',
    image: 'assets/Projects/smallJPG.png'
  },
  { 
    num: '04', 
    name: '3D Java Renderer', 
    link: 'github.com/Ekj0t/3D-Render-Using-Java',
    image: 'assets/Projects/3D renderer.png'
  },
  { 
    num: '05', 
    name: 'Procedural Planet Generator', 
    link: 'github.com/Ekj0t/Java-Procedural-Planet-Generator',
    image: 'assets/Projects/procedural planet generator.png'
  },
  { 
    num: '06', 
    name: 'N-Body Galaxy Simulation', 
    link: 'github.com/Ekj0t/n-body-galaxy-simulator',
    image: 'assets/Projects/n-body-galaxy-simulator.png'
  }
];

function Projects() {
  return React.createElement('section', { className: 'projects-section', id: 'projects' },
    React.createElement('p', { className: 'section-label reveal' }, 'Selected Work'),
    React.createElement('h2', { className: 'section-title reveal reveal-delay-1' }, 'Projects'),
    React.createElement('div', { className: 'projects-grid reveal reveal-delay-2' },
      projectsData.map((p, i) =>
        React.createElement('div', { className: 'project-card', key: i },

          React.createElement('div', { className: 'project-image-wrapper' },
            React.createElement('img', {
              src: p.image,
              className: 'project-image',
              alt: p.name
            })
          ),

          React.createElement('div', { className: 'project-content' },
            React.createElement('div', { className: 'project-num' }, p.num),
            React.createElement('h3', { className: 'project-name' }, p.name),
            React.createElement('a', {
              className: 'project-link',
              href: `https://${p.link}`,
              target: '_blank'
            }, p.link)
          )
        )
      )
    ),
    React.createElement('div', { className: 'projects-cta reveal reveal-delay-3' },
      React.createElement('a', {
        href: 'https://github.com/Ekj0t',
        target: '_blank',
        rel: 'noopener noreferrer',
        className: 'btn-outline',
        style: { borderColor: 'rgba(255,255,255,0.2)', color: 'var(--cream)' }
      }, '→ Explore all work on GitHub')
    )
  );
}

// Training & Certs
const certsData = [
  {
    icon: '🤖',
    name: 'ChatGPT-4 Prompt Engineering: ChatGPT, Generative AI & LLM',
    issuer: 'Infosys',
    image: 'assets/Certificates/ChatGPT-4 Prompt Engineering ChatGPT, Generative AI & LLM.jpeg'

  },
  {
    icon: '⚡',
    name: 'Build Generative AI Apps and Solutions with No-Code Tools',
    issuer: 'Infosys',
    image: 'assets/Certificates/Build Generative AI Apps and Solutions with No-Code Tools.jpeg'

  },
  {
    icon: '📘',
    name: 'Unlocking DSA with C',
    issuer: 'CSE Pathsala',
    image: 'assets/Certificates/unlocking DSA with C.png'

  }
];

function Training() {
  return React.createElement('section', { className: 'training-section', id: 'training' },
    React.createElement('p', { className: 'section-label reveal' }, 'Training & Certificates'),
    React.createElement('h2', { className: 'section-title reveal reveal-delay-1' }, 'Learning Journey'),

    React.createElement('div', { className: 'training-block reveal reveal-delay-2' },
      React.createElement('div', { className: 'training-block-header' },
        React.createElement('div', null,
          React.createElement('div', { style: { fontFamily: "'DM Mono', monospace", fontSize: '0.7rem', color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' } }, 'Training Experience'),
          React.createElement('h3', { className: 'training-block-title' }, 'Summer PEP Training — DSA')
        ),
        React.createElement('span', { className: 'training-block-date' }, 'June 2025 — July 2025')
      ),
      React.createElement('ul', null,
        [
          'Completed university-led Personality Enhancement Program focused on Data Structures & Algorithms and core problem-solving skills.',
          'Strengthened logical thinking through guided practice in arrays, linked lists, recursion, trees, and sorting and searching concepts.',
          'Improved confidence, communication, and analytical approach by participating in team discussions and structured coding exercises.'
        ].map((item, i) => React.createElement('li', { key: i }, item))
      )
    ),

    React.createElement('h3', { className: 'certs-title reveal' }, 'Certificates'),
    React.createElement('div', { className: 'certs-grid' },
      certsData.map((cert, i) =>
        React.createElement('div', { className: `cert-card reveal reveal-delay-${i+1}`, key: i },
          React.createElement('div', { className: 'cert-image-wrapper' },
            React.createElement('img', {
              src: cert.image,
              className: 'cert-image',
              alt: cert.name
            })
          ),

          React.createElement('p', { className: 'cert-name' }, cert.name),
          React.createElement('p', { className: 'cert-issuer' }, cert.issuer)
        )
      )
    )
  );
}

function Education() {
  const educationData = [
    {
      institute: 'Lovely Professional University',
      details: 'Bachelor of Technology - Computer Science and Engineering',
      extra: 'CGPA: 7.4',
      location: 'Punjab, India',
      duration: 'August 2023 - Present'
    },
    {
      institute: 'Guru Nanak Mission Public School',
      details: 'Intermediate',
      extra: 'Percentage: 81%',
      location: 'Bhogpur, Jalandhar',
      duration: 'April 2022 - March 2023'
    },
    {
      institute: 'Guru Nanak Mission Public School',
      details: 'Matriculation',
      extra: 'Percentage: 84%',
      location: 'Bhogpur, Jalandhar',
      duration: 'April 2020 - March 2021'
    }
  ];

  return React.createElement('section', { id: 'education', className: 'education-section' },

    React.createElement('p', { className: 'section-label reveal' }, 'Education'),
    React.createElement('h2', { className: 'section-title reveal reveal-delay-1' }, 'Academic Background'),

    React.createElement('div', { className: 'education-list' },
      educationData.map((edu, i) =>
        React.createElement('div', { className: `education-item reveal reveal-delay-${i+1}`, key: i },

          React.createElement('div', { className: 'education-left' },
            React.createElement('h3', { className: 'education-institute' }, edu.institute),
            React.createElement('p', { className: 'education-details' },
              edu.details, '; ',
              React.createElement('strong', null, edu.extra)
            )
          ),

          React.createElement('div', { className: 'education-right' },
            React.createElement('p', { className: 'education-location' }, edu.location),
            React.createElement('p', { className: 'education-duration' }, edu.duration)
          )

        )
      )
    )
  );
}


// Contact
function Contact() {
  return React.createElement('section', { className: 'contact-section', id: 'contact' },
    React.createElement('div', { className: 'contact-inner' },
      React.createElement('div', null,
        React.createElement('p', { className: 'section-label reveal' }, "Let's Connect"),
        React.createElement('h2', { className: 'contact-tagline reveal reveal-delay-1' },
          'Ready to build something ', React.createElement('em', null, 'great'), ' together?'
        ),
        React.createElement('p', { className: 'contact-text reveal reveal-delay-2' },
          "I'm always open to discussing new projects, creative ideas, or opportunities. Whether you want to collaborate or just say hello — my inbox is always open."
        ),
        React.createElement('div', { className: 'contact-links reveal reveal-delay-3' },
          React.createElement('a', { href: 'mailto:ekjotsinghbhela@gmail.com', className: 'btn-primary' }, '✉ Email Me'),
          React.createElement('a', { href: 'https://github.com/Ekj0t', target: '_blank', className: 'btn-outline' }, '↗ GitHub'),
          React.createElement('a', { href: 'https://www.linkedin.com/in/ekjot-singh-206b39268/', target: '_blank', className: 'btn-outline' }, '↗ LinkedIn')
        )
      ),
      React.createElement('div', { className: 'contact-right reveal reveal-delay-2' },
        [
          { icon: '📧', label: 'Email', value: React.createElement('a', { href: 'mailto:ekjotsinghbhela@gmail.com' }, 'ekjotsinghbhela@gmail.com') },
          { icon: '📱', label: 'Mobile', value: '+91-9478539700' },
          { icon: '💻', label: 'GitHub', value: React.createElement('a', { href: 'https://github.com/Ekj0t', target: '_blank' }, 'github.com/Ekj0t') },
          { icon: '🎓', label: 'Education', value: 'Computer Science Student' }
        ].map((item, i) =>
          React.createElement('div', { className: 'contact-info-item', key: i },
            React.createElement('div', { className: 'contact-info-icon' }, item.icon),
            React.createElement('div', null,
              React.createElement('p', { className: 'contact-info-label' }, item.label),
              React.createElement('p', { className: 'contact-info-value' }, item.value)
            )
          )
        )
      )
    )
  );
}

// Footer
function Footer() {
  return React.createElement('footer', null,
    React.createElement('div', { className: 'footer-brand' }, 'Ekjot', React.createElement('span', null, '.')),
    React.createElement('p', { className: 'footer-copy' }, '© 2026 Ekjot Singh · All Systems Go · Built with Care')
  );
}

// App
function App() {
  useReveal();

  return React.createElement(React.Fragment, null,
    React.createElement(Cursor),
    React.createElement(Nav),
    React.createElement(Hero),
    React.createElement(Skills),
    React.createElement(Experience),
    React.createElement(Projects),
    React.createElement(Training),
    React.createElement(Education),
    React.createElement(Contact),
    React.createElement(Footer)
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(App));
