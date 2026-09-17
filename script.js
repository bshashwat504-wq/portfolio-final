/**
 * JECRC UNIVERSITY B.TECH CSE PORTFOLIO INTERACTIVITY SCRIPT
 * Features: Typewriter, Interactive Terminal, Dynamic Project Filters & Modal,
 * Contact Validation, Theme Switcher, and Scrollspy.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Set Current Year in Footer
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  /* -------------------------------------------------------------------
     1. Typewriter Animation in Hero Section
     ------------------------------------------------------------------- */
  const typingTextElement = document.getElementById('typing-text');
  const phrases = [
    'B.Tech CSE Student @ JECRC University',
    'Full-Stack Web Developer',
    'Problem Solver & DSA Enthusiast',
    'AI & Modern Web Explorer',
    'Building Scalable Software Solutions'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeEffect() {
    if (!typingTextElement) return;

    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typingTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 40;
    } else {
      typingTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 90;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      // Pause at full word
      typingSpeed = 1800;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 400;
    }

    setTimeout(typeEffect, typingSpeed);
  }

  typeEffect();

  /* -------------------------------------------------------------------
     2. Sticky Header & Scrollspy (Active Nav Link)
     ------------------------------------------------------------------- */
  const header = document.getElementById('header');
  const backToTopBtn = document.getElementById('back-to-top');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    // Header background blur on scroll
    if (header) {
      if (scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Back to top button visibility
    if (backToTopBtn) {
      if (scrollY > 450) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }

    // Scrollspy
    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* -------------------------------------------------------------------
     3. Mobile Navigation Drawer
     ------------------------------------------------------------------- */
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const icon = mobileToggle.querySelector('i');
      if (navMenu.classList.contains('open')) {
        icon.classList.remove('fa-bars-staggered');
        icon.classList.add('fa-xmark');
      } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars-staggered');
      }
    });

    // Close menu when clicking nav links
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars-staggered');
        }
      });
    });
  }

  /* -------------------------------------------------------------------
     4. Theme Toggle (Dark / Light)
     ------------------------------------------------------------------- */
  const themeToggle = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('jecrc_portfolio_theme') || 'dark';

  if (savedTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    if (themeToggle) {
      themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      if (currentTheme === 'light') {
        document.documentElement.removeAttribute('data-theme');
        themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
        localStorage.setItem('jecrc_portfolio_theme', 'dark');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
        localStorage.setItem('jecrc_portfolio_theme', 'light');
      }
    });
  }

  /* -------------------------------------------------------------------
     5. Skills Category Filter
     ------------------------------------------------------------------- */
  const skillFilterBtns = document.querySelectorAll('[data-skill-filter]');
  const skillCards = document.querySelectorAll('.skill-card');

  skillFilterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      skillFilterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-skill-filter');

      skillCards.forEach((card) => {
        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  /* -------------------------------------------------------------------
     6. Projects Category Filter
     ------------------------------------------------------------------- */
  const projectFilterBtns = document.querySelectorAll('[data-project-filter]');
  const projectCards = document.querySelectorAll('.project-card');

  projectFilterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      projectFilterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-project-filter');

      projectCards.forEach((card) => {
        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  /* -------------------------------------------------------------------
     7. Projects Modal Details Data & Engine
     ------------------------------------------------------------------- */
  const projectData = {
    'project-1': {
      title: 'JECRC Smart Campus Portal',
      category: 'Full Stack Web Platform',
      description: 'A comprehensive campus management web application architected to streamline academic workflows for students and faculty at JECRC University.',
      features: [
        'Secure role-based authentication (Students, Faculty, Admin).',
        'Real-time attendance tracker with automated threshold alerts.',
        'Classroom timetable & room scheduling engine.',
        'Digital homework & assignment submission with deadline notifications.'
      ],
      stack: ['Node.js', 'Express.js', 'MySQL', 'Vanilla JavaScript', 'CSS3 Glassmorphism'],
      demoUrl: '#hero',
      githubUrl: 'https://github.com'
    },
    'project-2': {
      title: 'Interactive Pathfinding & DSA Visualizer',
      category: 'Algorithms & Graph Theory',
      description: 'An interactive browser application demonstrating how various graph search and pathfinding algorithms compute optimal routes across custom obstacle grids.',
      features: [
        'Visual execution of Dijkstra\'s Algorithm, A* (A-Star), Breadth-First Search (BFS), and Depth-First Search (DFS).',
        'Custom wall drawing and weighted node placement.',
        'Recursive division maze generation algorithm.',
        'Adjustable animation speed and step-by-step diagnostic analytics.'
      ],
      stack: ['JavaScript (ES6+)', 'HTML5 Canvas API', 'CSS Grid', 'Graph Data Structures'],
      demoUrl: '#hero',
      githubUrl: 'https://github.com'
    },
    'project-3': {
      title: 'AI-Powered Code Reviewer & Assistant',
      category: 'Artificial Intelligence & Developer Tools',
      description: 'A smart developer assistant that reviews code snippets in C++, Python, and JavaScript, finding security vulnerabilities, memory inefficiencies, and style issues.',
      features: [
        'Automated time and space complexity calculation (Big-O analysis).',
        'Context-aware code refactoring suggestions.',
        'Detection of memory leaks and unbounded recursion.',
        'Syntax-highlighted diff rendering between original and suggested code.'
      ],
      stack: ['Python', 'FastAPI', 'OpenAI API / LLM', 'HTML/CSS', 'Prism.js'],
      demoUrl: '#hero',
      githubUrl: 'https://github.com'
    },
    'project-4': {
      title: 'Campus E-Book & Resource Exchange',
      category: 'Peer-to-Peer Full Stack Marketplace',
      description: 'A dedicated marketplace allowing JECRC students to buy, sell, exchange, or donate engineering textbooks, lecture notes, and lab instruments.',
      features: [
        'University email verification for student authenticity.',
        'In-app instant buyer-seller chat messaging.',
        'Department & semester-wise categorisation and search filters.',
        'User ratings and feedback badges.'
      ],
      stack: ['MongoDB', 'Express.js', 'Node.js', 'JWT Authentication', 'Vanilla JS'],
      demoUrl: '#hero',
      githubUrl: 'https://github.com'
    },
    'project-5': {
      title: 'CPU Scheduling & Memory Simulator',
      category: 'Operating Systems & Systems Simulation',
      description: 'An educational simulator designed for computer science students to visualize operating system kernel processes and memory management techniques.',
      features: [
        'Simulation of CPU Scheduling: FCFS, SJF (Preemptive/Non-preemptive), Round Robin, and Priority.',
        'Interactive dynamic Gantt Chart with Turnaround & Waiting time analytics.',
        'Memory Page Replacement visualizer: FIFO, LRU, and Optimal.',
        'Export simulation performance metrics to CSV.'
      ],
      stack: ['C++', 'JavaScript', 'Chart.js', 'WebAssembly / Canvas'],
      demoUrl: '#hero',
      githubUrl: 'https://github.com'
    },
    'project-6': {
      title: 'Crypto & Stock Analytics Dashboard',
      category: 'Financial Web App',
      description: 'A fast, real-time analytics web dashboard providing market insights, candlestick charts, and currency conversions using live streaming APIs.',
      features: [
        'Real-time ticker updates using WebSockets.',
        'Interactive candlestick and line graphs with technical indicators.',
        'Personal portfolio profit/loss calculator.',
        'Dark obsidian glassmorphic UI.'
      ],
      stack: ['JavaScript', 'WebSockets', 'CoinGecko REST API', 'ChartJS', 'CSS3'],
      demoUrl: '#hero',
      githubUrl: 'https://github.com'
    }
  };

  const modalOverlay = document.getElementById('project-modal');
  const modalContent = document.getElementById('modal-content');
  const modalClose = document.getElementById('modal-close');
  const detailButtons = document.querySelectorAll('.btn-project-detail');

  function openProjectModal(projectId) {
    const data = projectData[projectId];
    if (!data || !modalContent || !modalOverlay) return;

    modalContent.innerHTML = `
      <span class="modal-header-tag"><i class="fa-solid fa-cube"></i> ${data.category}</span>
      <h2 class="modal-title">${data.title}</h2>
      <p class="modal-body">${data.description}</p>
      
      <h4 style="color: var(--text-heading); font-size: 1.05rem; margin-top: 1rem;">Key Highlights & Architecture:</h4>
      <ul class="modal-features">
        ${data.features.map(f => `<li>${f}</li>`).join('')}
      </ul>

      <h4 style="color: var(--text-heading); font-size: 1.05rem; margin-top: 1.25rem;">Technologies Used:</h4>
      <div class="project-tech-stack" style="margin-top: 0.5rem;">
        ${data.stack.map(s => `<span class="tech-badge">${s}</span>`).join('')}
      </div>

      <div class="modal-footer-btns">
        <a href="${data.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
          <i class="fa-brands fa-github"></i> GitHub Source
        </a>
        <a href="${data.demoUrl}" class="btn btn-primary" onclick="document.getElementById('project-modal').classList.remove('active');">
          <i class="fa-solid fa-arrow-up-right-from-square"></i> Live Preview
        </a>
      </div>
    `;

    modalOverlay.classList.add('active');
    modalOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('active');
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  detailButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const modalId = btn.getAttribute('data-modal');
      openProjectModal(modalId);
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', closeProjectModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeProjectModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
      closeProjectModal();
    }
  });

  /* -------------------------------------------------------------------
     8. Interactive Developer Terminal
     ------------------------------------------------------------------- */
  const terminalInput = document.getElementById('terminal-input');
  const terminalOutput = document.getElementById('terminal-output');
  const terminalClearBtn = document.getElementById('terminal-clear-btn');
  const terminalSubmitBtn = document.getElementById('terminal-submit-btn');
  const terminalChips = document.querySelectorAll('.terminal-quick-chips .chip');

  const terminalCommands = {
    help: `Available commands:
  • <span class="term-highlight">about</span>      - Overview of who I am & my mindset
  • <span class="term-highlight">education</span>  - B.Tech CSE details at JECRC University
  • <span class="term-highlight">skills</span>     - Programming languages & tech stack
  • <span class="term-highlight">projects</span>   - Overview of key engineering projects
  • <span class="term-highlight">hackathons</span> - SIH & university tech accolades
  • <span class="term-highlight">contact</span>    - Email and social connections
  • <span class="term-highlight">date</span>       - Print current system date & time
  • <span class="term-highlight">sudo</span>       - Superuser access
  • <span class="term-highlight">clear</span>      - Clean up terminal output`,

    about: `Hi! I am a passionate Computer Science & Engineering undergraduate at JECRC University, Jaipur.
I love writing algorithms, building full-stack web applications, and participating in hackathons.`,

    education: `🎓 <strong>Degree:</strong> Bachelor of Technology (B.Tech) - Computer Science & Engineering
🏛️ <strong>Institution:</strong> JECRC University, Jaipur, Rajasthan
📅 <strong>Duration:</strong> 2022 - 2026 (Undergraduate)
⭐ <strong>CGPA:</strong> 8.5 / 10.0
📚 <strong>Key Subjects:</strong> DSA, Operating Systems, DBMS, Networks, OOPs (C++/Java), Web Tech`,

    skills: `💻 <strong>Languages:</strong> C++, JavaScript (ES6+), Python, Java, C, SQL
🌐 <strong>Web Dev:</strong> HTML5, CSS3, Flexbox/Grid, React.js, Node.js, Express.js
🗄️ <strong>Databases:</strong> MySQL, MongoDB
⚙️ <strong>Tools & Core:</strong> Git, GitHub, Linux/Bash, Postman, DSA, OOPs, Computer Networks`,

    projects: `🚀 <strong>Featured Portfolio Projects:</strong>
  1. [FullStack] JECRC Smart Campus Portal (Node/Express/MySQL)
  2. [DSA] Interactive Pathfinding & Graph Visualizer (JS/Canvas)
  3. [AI] Code Reviewer & Assistant (FastAPI/Python/LLM)
  4. [Web] Campus E-Book & Resource Exchange (MERN stack)
  5. [Systems] CPU Scheduling & Memory Simulator (C++/JS/Canvas)`,

    hackathons: `🏆 <strong>Hackathons & Milestones:</strong>
  • Smart India Hackathon (SIH) - Internal Finalist @ JECRC
  • JU Rhythm / Tech-Fest Speed Coding Winner
  • 300+ Solved Questions on LeetCode & GeeksforGeeks
  • Technical Club Workshop Speaker on Web Development`,

    contact: `📬 <strong>Let's Connect:</strong>
  • Email: cse.student@jecrcu.edu.in
  • Campus: JECRC University, Jaipur, Rajasthan, India
  • GitHub: https://github.com
  • LinkedIn: https://linkedin.com`,

    date: `🕒 Current Time: ${new Date().toLocaleString()}`,

    sudo: `🔒 [sudo] password for jecrc-cse: **********
Permission granted! You are now authorized to hire this engineer immediately! 🎉`
  };

  function appendTerminalLine(content, isCommand = false) {
    if (!terminalOutput) return;

    const line = document.createElement('div');
    line.className = 'terminal-line';

    if (isCommand) {
      line.innerHTML = `<span class="terminal-prompt">jecrc-cse@student:~$</span> <span class="term-user-cmd">${content}</span>`;
    } else {
      line.innerHTML = `<div class="term-output">${content}</div>`;
    }

    terminalOutput.appendChild(line);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }

  function executeTerminalCommand(rawCmd) {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    appendTerminalLine(rawCmd, true);

    if (cmd === 'clear') {
      terminalOutput.innerHTML = '';
    } else if (terminalCommands[cmd]) {
      appendTerminalLine(terminalCommands[cmd]);
    } else {
      appendTerminalLine(`<span class="term-error">zsh: command not found: "${rawCmd}". Type '<span class="term-highlight">help</span>' for a list of valid commands.</span>`);
    }

    if (terminalInput) {
      terminalInput.value = '';
    }
  }

  if (terminalInput) {
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        executeTerminalCommand(terminalInput.value);
      }
    });
  }

  if (terminalSubmitBtn && terminalInput) {
    terminalSubmitBtn.addEventListener('click', () => {
      executeTerminalCommand(terminalInput.value);
    });
  }

  if (terminalClearBtn && terminalOutput) {
    terminalClearBtn.addEventListener('click', () => {
      terminalOutput.innerHTML = '';
      appendTerminalLine(`Terminal cleared. Type <span class="term-highlight">help</span> for commands.`);
    });
  }

  terminalChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const command = chip.getAttribute('data-cmd');
      if (command) {
        executeTerminalCommand(command);
      }
    });
  });

  /* -------------------------------------------------------------------
     9. Interactive Contact Form & Toast Alert
     ------------------------------------------------------------------- */
  const contactForm = document.getElementById('contact-form');
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');
  const submitBtn = document.getElementById('submit-btn');

  function showToast(message, isSuccess = true) {
    if (!toast || !toastMessage) return;

    toastMessage.textContent = message;
    const icon = toast.querySelector('.toast-icon i');

    if (isSuccess) {
      toast.style.borderColor = 'var(--accent-green)';
      if (icon) icon.className = 'fa-solid fa-circle-check';
    } else {
      toast.style.borderColor = '#ff5f56';
      if (icon) icon.className = 'fa-solid fa-circle-exclamation';
    }

    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !subject || !message) {
        showToast('Please fill in all required fields!', false);
        return;
      }

      // Basic email regex test
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        showToast('Please provide a valid email address!', false);
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
      }

      // Simulate sending
      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<span>Send Message</span> <i class="fa-solid fa-paper-plane"></i>';
        }
        contactForm.reset();
        showToast(`Thank you ${name}! Your message has been received.`);
      }, 1000);
    });
  }
});
