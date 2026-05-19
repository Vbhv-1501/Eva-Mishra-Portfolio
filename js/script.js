// ========== GSAP Scroll Animations ==========
gsap.registerPlugin(ScrollTrigger);

// Scroll Progress Staff
gsap.to('#scrollProgress', {
  scaleX: 1,
  ease: 'none',
  scrollTrigger: {
    trigger: document.body,
    start: 'top top',
    end: 'bottom bottom',
    scrub: 0.3
  }
});

// ========== Dynamic Background Notes per Section ==========
const musicSymbols = ['♪', '♫', '♩', '♬', '𝄢', '𝄡', '𝄽', '𝄾'];
const noteColors = ['text-blush-300', 'text-mauve-300', 'text-rose-300', 'text-dusty-300', 'text-peach-300'];
const sectionsForNotes = document.querySelectorAll('section');

sectionsForNotes.forEach(section => {
  // Add 7-12 notes per section to fill empty spaces
  const numNotes = Math.floor(Math.random() * 6) + 7;
  for (let i = 0; i < numNotes; i++) {
    const note = document.createElement('div');
    const symbol = musicSymbols[Math.floor(Math.random() * musicSymbols.length)];
    const color = noteColors[Math.floor(Math.random() * noteColors.length)];
    const size = Math.floor(Math.random() * 4) + 2; // 2xl to 5xl
    
    note.className = `gsap-note absolute ${color}/30 text-${size}xl select-none pointer-events-none z-0`;
    note.textContent = symbol;
    
    note.style.top = `${Math.random() * 90 + 5}%`;
    note.style.left = `${Math.random() * 90 + 5}%`;
    
    const speed = (Math.random() * 1.5 + 0.5).toFixed(2);
    note.setAttribute('data-speed', speed);
    
    section.appendChild(note);
  }
});

// Floating Notes Ambient + Parallax
document.querySelectorAll('.gsap-note').forEach(note => {
  const speed = parseFloat(note.getAttribute('data-speed')) || 1;
  
  // Ambient float
  gsap.to(note, {
    y: 'random(-15, 15)',
    x: 'random(-10, 10)',
    rotation: 'random(-10, 10)',
    duration: 'random(4, 7)',
    yoyo: true,
    repeat: -1,
    ease: 'sine.inOut'
  });

  // Scroll parallax
  gsap.to(note, {
    yPercent: -100 * speed, // move opposite to scroll
    ease: 'none',
    scrollTrigger: {
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true
    }
  });
});

// Scroll Reveal with GSAP batch
ScrollTrigger.batch('.reveal', {
  onEnter: batch => {
    gsap.to(batch, {
      opacity: 1,
      y: 0,
      stagger: 0.15,
      duration: 1.2,
      ease: 'power3.out',
      overwrite: 'auto'
    });
  },
  start: 'top 85%'
});

// Image Reveals
ScrollTrigger.batch('.img-reveal', {
  onEnter: batch => {
    batch.forEach(el => el.classList.add('gsap-visible'));
  },
  start: 'top 85%'
});

// ========== Navbar ==========
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll > 80) {
    navbar.style.background = 'rgba(254, 253, 251, 0.92)';
    navbar.style.backdropFilter = 'blur(20px)';
    navbar.style.boxShadow = '0 1px 20px rgba(58, 53, 48, 0.04)';
  } else {
    navbar.style.background = 'transparent';
    navbar.style.backdropFilter = 'none';
    navbar.style.boxShadow = 'none';
  }
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});

// ========== Mobile Navigation ==========
const menuBtn = document.getElementById('menuBtn');
const mobileNav = document.getElementById('mobileNav');
const closeMenu = document.getElementById('closeMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

menuBtn.addEventListener('click', () => {
  mobileNav.classList.add('open');
  document.body.style.overflow = 'hidden';
});
closeMenu.addEventListener('click', () => {
  mobileNav.classList.remove('open');
  document.body.style.overflow = '';
});
mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ========== Marquee ==========
const marqueeTrack = document.getElementById('marqueeTrack');
let marqueePos = 0;
let isHoveringMarquee = false;
const stripe = marqueeTrack.innerHTML;

marqueeTrack.addEventListener('mouseenter', () => { isHoveringMarquee = true; });
marqueeTrack.addEventListener('mouseleave', () => { isHoveringMarquee = false; });

// Clone for seamless loop
marqueeTrack.innerHTML += stripe;

let baseSpeed = 0.5;
let currentSpeed = baseSpeed;
let targetSpeed = baseSpeed;

// Increase target speed based on scroll velocity
ScrollTrigger.create({
  trigger: document.body,
  start: "top top",
  end: "bottom bottom",
  onUpdate: (self) => {
    const velocity = Math.abs(self.getVelocity());
    targetSpeed = baseSpeed + (velocity / 500);
  }
});

function animateMarquee() {
  if (!isHoveringMarquee) {
    // Smoothly decay targetSpeed back to baseSpeed
    targetSpeed += (baseSpeed - targetSpeed) * 0.05;
    // Smoothly lerp currentSpeed to targetSpeed
    currentSpeed += (targetSpeed - currentSpeed) * 0.1;
    
    marqueePos -= currentSpeed;
    if (marqueePos <= -marqueeTrack.scrollWidth / 2) {
      marqueePos = 0;
    }
    marqueeTrack.style.transform = `translateX(${marqueePos}px)`;
  }
  requestAnimationFrame(animateMarquee);
}
animateMarquee();

// ========== Contact Form ==========
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const originalHTML = submitBtn.innerHTML;
  submitBtn.innerHTML = '<span class="inline-flex items-center gap-2"><svg class="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/></svg>Sending…</span>';
  submitBtn.disabled = true;

  // Structure for Nodemailer backend integration:
  // POST to /api/contact with { name, email, message }
  // Backend uses Nodemailer to send email
  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    message: document.getElementById('message').value,
    timestamp: new Date().toISOString()
  };
  console.log('Form data ready for Nodemailer:', formData);

  setTimeout(() => {
    contactForm.style.display = 'none';
    formSuccess.classList.remove('hidden');
  }, 1500);
});

// ========== Smooth scroll for anchor links ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ========== Trigger initial reveals for hero ==========
setTimeout(() => {
  gsap.to('#hero .reveal', {
    opacity: 1,
    y: 0,
    stagger: 0.15,
    duration: 1.2,
    ease: 'power3.out',
    overwrite: 'auto'
  });
  document.querySelectorAll('#hero .img-reveal').forEach(el => {
    el.classList.add('gsap-visible');
  });
}, 200);

// ========== Blob morphing keyframes (for dark section) ==========
const style = document.createElement('style');
style.textContent = `
  @keyframes morph-1 {
    0%, 100% { border-radius: 60% 40% 70% 30% / 50% 60% 40% 50%; }
    33% { border-radius: 40% 60% 50% 50% / 60% 40% 60% 40%; }
    66% { border-radius: 50% 50% 40% 60% / 40% 50% 60% 50%; }
  }
  @keyframes morph-2 {
    0%, 100% { border-radius: 40% 60% 30% 70% / 60% 40% 50% 60%; }
    33% { border-radius: 60% 40% 70% 30% / 50% 60% 30% 70%; }
    66% { border-radius: 30% 70% 50% 50% / 70% 30% 60% 40%; }
  }
  @keyframes morph-3 {
    0%, 100% { border-radius: 50% 50% 40% 60% / 40% 60% 50% 50%; }
    50% { border-radius: 40% 60% 60% 40% / 60% 40% 40% 60%; }
  }
`;
document.head.appendChild(style);

// ========== Mouse Trail Effect ==========
const cursorSymbols = ['♪', '♫', '♩', '♬', '✧'];
let lastMouseTime = 0;

document.addEventListener('mousemove', (e) => {
  const now = Date.now();
  if (now - lastMouseTime < 60) return; // limit emission rate
  lastMouseTime = now;

  const note = document.createElement('div');
  const symbol = cursorSymbols[Math.floor(Math.random() * cursorSymbols.length)];
  note.textContent = symbol;
  
  // Offset to avoid blocking the pointer itself
  note.className = 'fixed text-rose-400/60 text-lg pointer-events-none z-[9999]';
  note.style.left = `${e.clientX + 10}px`;
  note.style.top = `${e.clientY + 10}px`;
  
  document.body.appendChild(note);

  // Animate and remove
  gsap.to(note, {
    y: '-=50',
    x: 'random(-20, 20)',
    rotation: 'random(-30, 30)',
    opacity: 0,
    duration: 1.2,
    ease: 'power1.out',
    onComplete: () => note.remove()
  });
});
