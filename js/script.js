// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Update current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Initialize reveal animations
    initRevealAnimations();
    
    // Initialize custom cursor
    initCustomCursor();
    
    // Initialize 3D scene
    initScene3D();
    
    // Handle smooth scrolling for anchor links
    initSmoothScrolling();
    
    // Handle header scroll effect
    initHeaderScroll();
    
    // Handle mobile menu toggle
    initMobileMenu();
    
    // Handle contact form submission
    initContactForm();
    
    // Initialize hero title animation
    initHeroTitleAnimation();
    
    // Initialize skill bars animation
    initSkillBarsAnimation();
  });
  
  // Animate hero title letters
  function initHeroTitleAnimation() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    const text = heroTitle.innerHTML;
    const words = text.split(' ');
    
    // Reset the title content
    heroTitle.innerHTML = '';
    
    // Process each word
    words.forEach(word => {
      const wordSpan = document.createElement('span');
      wordSpan.style.display = 'inline-block';
      wordSpan.style.marginRight = '0.3em';
      
      // Process each letter in the word
      Array.from(word).forEach((letter, i) => {
        const letterSpan = document.createElement('span');
        letterSpan.textContent = letter;
        letterSpan.style.display = 'inline-block';
        letterSpan.style.opacity = '0';
        letterSpan.style.transform = 'translateY(20px)';
        letterSpan.style.transition = `opacity 0.3s ease, transform 0.3s ease`;
        letterSpan.style.transitionDelay = `${i * 0.03}s`;
        
        setTimeout(() => {
          letterSpan.style.opacity = '1';
          letterSpan.style.transform = 'translateY(0)';
        }, 100);
        
        wordSpan.appendChild(letterSpan);
      });
      
      heroTitle.appendChild(wordSpan);
    });
  }
  
  // Reveal animations on scroll
  function initRevealAnimations() {
    const revealElements = document.querySelectorAll('.reveal');
    
    function revealOnScroll() {
      for (let i = 0; i < revealElements.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = revealElements[i].getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
          revealElements[i].classList.add("active");
        }
      }
    }
  
    window.addEventListener("scroll", revealOnScroll);
    // Initial check for elements in view on page load
    revealOnScroll();
  }
  
  // Custom cursor
  function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    const cursorFollower = document.querySelector('.custom-cursor-follower');
    
    if (!cursor || !cursorFollower) return;
    
    // Track cursor position
    document.addEventListener('mousemove', e => {
      cursor.style.opacity = '1';
      cursorFollower.style.opacity = '0.5';
      
      // Position cursor and follower
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
      cursorFollower.style.left = `${e.clientX}px`;
      cursorFollower.style.top = `${e.clientY}px`;
    });
    
    // Handle cursor on clickable elements
    const clickables = document.querySelectorAll('a, button, input, textarea, .project-card');
    
    clickables.forEach(element => {
      element.addEventListener('mouseenter', () => {
        cursorFollower.style.width = '60px';
        cursorFollower.style.height = '60px';
        cursorFollower.style.backgroundColor = 'rgba(217, 70, 239, 0.1)';
      });
      
      element.addEventListener('mouseleave', () => {
        cursorFollower.style.width = '40px';
        cursorFollower.style.height = '40px';
        cursorFollower.style.backgroundColor = 'transparent';
      });
    });
    
    // Handle click animation
    document.addEventListener('mousedown', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
    });
    
    document.addEventListener('mouseup', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    });
    
    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
      cursor.style.opacity = '0';
      cursorFollower.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
      cursor.style.opacity = '1';
      cursorFollower.style.opacity = '0.5';
    });
  }
  
  // 3D Scene with Three.js
  function initScene3D() {
    const container = document.getElementById('scene-container');
    if (!container || typeof THREE === 'undefined') return;
    
    // Create the scene
    const scene = new THREE.Scene();
    
    // Setup camera
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    
    // Setup renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    
    // Create the torus knot geometry
    const geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
    
    // Create material with custom shader - This is a simplified version since we can't use ShaderMaterial directly here
    const material = new THREE.MeshPhongMaterial({
      color: 0x9b87f5,
      emissive: 0xd946ef,
      emissiveIntensity: 0.3,
      specular: 0xffffff,
      shininess: 50,
    });
    
    // Alternative approach with basic colorful materials
    const torusKnot = new THREE.Mesh(geometry, material);
    scene.add(torusKnot);
    
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 1);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    const pointLight = new THREE.PointLight(0xd946ef, 1, 100);
    pointLight.position.set(0, 0, 2);
    scene.add(pointLight);
    
    // Track mouse position for interactive rotation
    const mousePosition = { x: 0, y: 0 };
    
    document.addEventListener('mousemove', (e) => {
      mousePosition.x = (e.clientX / window.innerWidth) * 2 - 1;
      mousePosition.y = -(e.clientY / window.innerHeight) * 2 + 1;
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
      if (!container) return;
      
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    });
    
    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      
      // Automatic rotation
      torusKnot.rotation.x += 0.005;
      torusKnot.rotation.y += 0.005;
      
      // Interactive rotation based on mouse position
      torusKnot.rotation.x += (mousePosition.y * 0.05 - torusKnot.rotation.x) * 0.05;
      torusKnot.rotation.y += (mousePosition.x * 0.05 - torusKnot.rotation.y) * 0.05;
      
      renderer.render(scene, camera);
    }
    
    animate();
  }
  
  // Smooth scrolling for anchor links
  function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80, // Offset for header
            behavior: 'smooth'
          });
        }
        
        // Close mobile menu if open
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu && mobileMenu.classList.contains('active')) {
          mobileMenu.classList.remove('active');
        }
      });
    });
  }
  
  // Header scroll effect
  function initHeaderScroll() {
    const header = document.getElementById('header');
    
    function toggleHeaderClass() {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
    
    window.addEventListener('scroll', toggleHeaderClass);
    toggleHeaderClass(); // Initial check
  }
  
  // Mobile menu toggle
  function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (!mobileMenuBtn || !mobileMenu) return;
    
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
      
      // Update button icon to X or Hamburger
      const btnIcon = mobileMenuBtn.querySelector('svg');
      if (btnIcon) {
        if (mobileMenu.classList.contains('active')) {
          btnIcon.innerHTML = `
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          `;
        } else {
          btnIcon.innerHTML = `
            <line x1="4" y1="12" x2="20" y2="12"></line>
            <line x1="4" y1="6" x2="20" y2="6"></line>
            <line x1="4" y1="18" x2="20" y2="18"></line>
          `;
        }
      }
    });
  }
  
  // Contact form submission
  function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Here you would normally send the data to a server
        console.log('Form submitted:', { name, email, subject, message });
        
        // Show success message (in a real app, use a proper notification system)
        alert(`Thanks for your message, ${name}! I'll get back to you soon.`);
        
        // Reset form
        contactForm.reset();
      });
    }
  }
  
  // Initialize skill bars animation
  function initSkillBarsAnimation() {
    const skillBars = document.querySelectorAll('.skill-bar');
    
    function animateSkillBars() {
      skillBars.forEach(bar => {
        const percentage = bar.getAttribute('data-percentage');
        bar.style.width = `${percentage}%`;
      });
    }
    
    // Use Intersection Observer to trigger the animation when the skills section is in view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateSkillBars();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    const skillsCard = document.querySelector('.skills-card');
    if (skillsCard) {
      observer.observe(skillsCard);
    }
  }
  