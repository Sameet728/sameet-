// Main JavaScript File

document.addEventListener('DOMContentLoaded', function() {
  // Debug logs to help troubleshoot
  console.log("DOM loaded, initializing scripts");
  
  // Theme Toggle
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  
  if (themeToggle) {
    console.log("Theme toggle found");
    themeToggle.addEventListener('click', function() {
      console.log("Theme toggle clicked");
      body.classList.toggle('dark-mode');
      body.classList.toggle('light-mode');
      
      // Store user preference
      if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        console.log("Dark mode activated");
      } else {
        localStorage.setItem('theme', 'light');
        console.log("Light mode activated");
      }
    });
  } else {
    console.error("Theme toggle element not found!");
  }
  
  // Load saved theme
  const savedTheme = localStorage.getItem('theme');
  console.log("Saved theme:", savedTheme);
  if (savedTheme === 'dark') {
    body.classList.remove('light-mode');
    body.classList.add('dark-mode');
    console.log("Applied saved dark theme");
  } else {
    // Ensure light mode is applied if no theme or light theme is saved
    body.classList.remove('dark-mode');
    body.classList.add('light-mode');
    console.log("Applied light theme (default or saved)");
  }
  
  // Navbar scroll effect
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  if (navbar) {
    console.log("Navbar found");
    // Apply initial state
    if (window.scrollY > 50) {
      navbar.classList.add('navbar-scroll');
      navbar.classList.add('white-shadow');
    }
    
    window.addEventListener('scroll', function() {
      // Debug scroll position
      if (window.scrollY % 100 === 0) {
        console.log("Scroll position:", window.scrollY);
      }
      
      if (window.scrollY > 50) {
        navbar.classList.add('navbar-scroll');
        navbar.classList.add('white-shadow');
        navLinks.forEach(link => {
          link.style.color = 'var(--text-color)';
        });
        console.log("Added navbar-scroll and white-shadow classes");
      } else {
        navbar.classList.remove('navbar-scroll');
        navbar.classList.remove('white-shadow');
        navLinks.forEach(link => {
          link.style.color = 'var(--text-light)';
        });
        console.log("Removed navbar-scroll and white-shadow classes");
      }
      
      // Scroll reveal animation
      const scrollRevealElements = document.querySelectorAll('.section-container');
      scrollRevealElements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 100) {
          element.classList.add('scroll-reveal', 'active');
        }
      });
      
      // Timeline animation - ensure education section is properly animated
      const timelineItems = document.querySelectorAll('.timeline-item');
      timelineItems.forEach(item => {
        const itemPosition = item.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (itemPosition < windowHeight - 100) {
          item.classList.add('active');
          console.log("Timeline item activated");
        }
      });
      
      // Update active nav link based on scroll position
      updateActiveNavLink();
    });
  } else {
    console.error("Navbar element not found!");
  }
  
  // Mobile Menu Toggle
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav-links');
  const navLinksItems = document.querySelectorAll('.nav-links li');
  
  if (burger && nav) {
    console.log("Mobile menu elements found");
    burger.addEventListener('click', function() {
      nav.classList.toggle('nav-active');
      burger.classList.toggle('toggle');
      console.log("Mobile menu toggled");
      
      // Animate links
      navLinksItems.forEach((link, index) => {
        if (link.style.animation) {
          link.style.animation = '';
        } else {
          link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
      });
    });
  } else {
    console.error("Mobile menu elements not found!");
  }
  
  // Close mobile menu when clicking on links
  navLinksItems.forEach(item => {
    item.addEventListener('click', function() {
      if (nav && nav.classList.contains('nav-active') && burger) {
        nav.classList.remove('nav-active');
        burger.classList.remove('toggle');
        
        navLinksItems.forEach(link => {
          link.style.animation = '';
        });
        console.log("Mobile menu closed by link click");
      }
    });
  });
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      console.log("Scrolling to:", targetId);
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: 'smooth'
        });
        console.log("Scrolled to element");
      } else {
        console.error("Target element not found:", targetId);
      }
      
      // Update active link
      document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
      });
      this.classList.add('active');
    });
  });
  
  // Form submission (prevent default for demo)
  const contactForm = document.querySelector('.contact-form form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Thank you for your message! This would send an email in a real application.');
      contactForm.reset();
    });
  }

  // Update active nav link based on scroll position
  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
      if (!section.id) return;  // Skip sections without IDs
      
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = '#' + section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === current) {
        link.classList.add('active');
        console.log("Active nav link updated:", current);
      }
    });
  }
  
  // Check if education section exists
  const educationSection = document.getElementById('education');
  if (educationSection) {
    console.log("Education section found");
  } else {
    console.error("Education section not found!");
  }
  
  // Initialize animations for elements that are already visible on load
  setTimeout(() => {
    // Trigger scroll event to initialize animations
    console.log("Triggering initial scroll event");
    window.dispatchEvent(new Event('scroll'));
  }, 300);
  
  // Force a second scroll event after a longer delay to ensure all elements are processed
  setTimeout(() => {
    console.log("Triggering second scroll event");
    window.dispatchEvent(new Event('scroll'));
  }, 1000);
  
  console.log("Script initialization complete");
});
