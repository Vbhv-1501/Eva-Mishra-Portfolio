// ========== Scroll Reveal ==========
const revealElements = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
revealElements.forEach(el => observer.observe(el));

// Also observe img-reveal elements directly
document.querySelectorAll('.img-reveal').forEach(el => observer.observe(el));

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

function animateMarquee() {
  if (!isHoveringMarquee) {
    marqueePos -= 0.5;
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
  document.querySelectorAll('#hero .reveal').forEach(el => {
    el.classList.add('visible');
  });
  document.querySelectorAll('#hero .img-reveal').forEach(el => {
    el.classList.add('visible');
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
