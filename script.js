// Sidebar elements
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebar-overlay');
const navLinks = document.querySelectorAll('.sidebar .nav-links a');

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Active link highlighting on scroll
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.sidebar .nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute('id');
    }
  });

  navItems.forEach(item => {
    item.classList.remove('active');
    if (item.getAttribute('href').substring(1) === current) {
      item.classList.add('active');
    }
  });
});

// SplitText-style animation
window.addEventListener('DOMContentLoaded', () => {
  const textElement = document.getElementById('animated-text');
  if (textElement) {
    const text = textElement.textContent;
    textElement.textContent = '';

    // Wrap each letter in a span
    text.split('').forEach(char => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char; // keep spaces
      textElement.appendChild(span);
    });

    // Animate each letter using GSAP
    gsap.fromTo(
      '#animated-text span',
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: 'power3.out',
        onComplete: () => console.log('All letters have animated!')
      }
    );
  }
});

// Modern scroll animations using GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Hero parallax effect
gsap.to('#hero', {
  backgroundPosition: '50% 100%',
  ease: 'none',
  scrollTrigger: {
    trigger: '#hero',
    start: 'top top',
    end: 'bottom top',
    scrub: true
  }
});

// Animate hero content
gsap.from('.hero-content h2', {
  opacity: 0,
  y: 50,
  duration: 1,
  ease: 'power3.out'
});

gsap.from('.hero-content p', {
  opacity: 0,
  y: 30,
  duration: 1,
  delay: 0.3,
  ease: 'power3.out'
});

// Section animations
sections.forEach((section, index) => {
  const direction = index % 2 === 0 ? -100 : 100; // Alternate left/right

  gsap.from(section, {
    opacity: 0,
    x: direction,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: section,
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse'
    }
  });

  // Animate h2 in each section
  const h2 = section.querySelector('h2');
  if (h2) {
    gsap.from(h2, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: h2,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    });
  }
});

// Card animations
const cards = document.querySelectorAll('.event-card, .member-card');
cards.forEach((card, index) => {
  gsap.from(card, {
    opacity: 0,
    y: 50,
    scale: 0.9,
    duration: 0.8,
    delay: index * 0.1,
    ease: 'back.out(1.7)',
    scrollTrigger: {
      trigger: card,
      start: 'top 90%',
      toggleActions: 'play none none reverse'
    }
  });
});

// Smooth scroll behavior
document.documentElement.style.scrollBehavior = 'smooth';

// Spark effect on click (site-wide)
const sparkColor = '#fff';
const sparkSize = 10;
const sparkRadius = 15;
const sparkCount = 8;
const duration = 400;
const easing = 'ease-out';
const extraScale = 1.0;

const canvas = document.getElementById('sparkCanvas');
const ctx = canvas.getContext('2d');
let sparks = [];

const resizeCanvas = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const easeFunc = t => {
  switch (easing) {
    case 'linear': return t;
    case 'ease-in': return t * t;
    case 'ease-in-out': return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    default: return t * (2 - t); // ease-out
  }
};

const draw = timestamp => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  sparks = sparks.filter(spark => {
    const elapsed = timestamp - spark.startTime;
    if (elapsed >= duration) return false;

    const progress = elapsed / duration;
    const eased = easeFunc(progress);
    const distance = eased * sparkRadius * extraScale;
    const lineLength = sparkSize * (1 - eased);

    const x1 = spark.x + distance * Math.cos(spark.angle);
    const y1 = spark.y + distance * Math.sin(spark.angle);
    const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
    const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

    ctx.strokeStyle = sparkColor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    return true;
  });

  requestAnimationFrame(draw);
};
requestAnimationFrame(draw);

const menuBtn = document.getElementById('menuBtn');

menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle('open');
  sidebar.classList.toggle('open');
  sidebarOverlay.classList.toggle('active');
});

// Close sidebar when clicking overlay
sidebarOverlay.addEventListener('click', () => {
  menuBtn.classList.remove('open');
  sidebar.classList.remove('open');
  sidebarOverlay.classList.remove('active');
});

// Close sidebar when clicking nav links (mobile)
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth < 768) {
      menuBtn.classList.remove('open');
      sidebar.classList.remove('open');
      sidebarOverlay.classList.remove('active');
    }
  });
});

// Event Slider Functionality
// Initialize slider variables
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevArrow = document.querySelector('.prev');
const nextArrow = document.querySelector('.next');
const totalSlides = slides.length;

// Function to show a specific slide
function showSlide(index) {
  // Remove active class from all slides and dots
  slides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));

  // Add active class to current slide and dot
  slides[index].classList.add('active');
  dots[index].classList.add('active');

  currentSlide = index;
}

// Function to go to next slide
function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  showSlide(currentSlide);
}

// Function to go to previous slide
function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  showSlide(currentSlide);
}

// Auto-cycle through slides every 5 seconds
let autoSlideInterval = setInterval(nextSlide, 5000);

// Event listeners for navigation arrows
prevArrow.addEventListener('click', () => {
  prevSlide();
  resetAutoSlide();
});

nextArrow.addEventListener('click', () => {
  nextSlide();
  resetAutoSlide();
});

// Event listeners for dots
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    showSlide(index);
    resetAutoSlide();
  });
});

// Function to reset auto-slide timer
function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  autoSlideInterval = setInterval(nextSlide, 5000);
}

// Initialize slider on page load
document.addEventListener('DOMContentLoaded', () => {
  showSlide(currentSlide);
});

// Spark effect on click (site-wide)
document.body.addEventListener('click', e => {
  const x = e.clientX;
  const y = e.clientY;
  const now = performance.now();

  const newSparks = Array.from({ length: sparkCount }, (_, i) => ({
    x,
    y,
    angle: (2 * Math.PI * i) / sparkCount,
    startTime: now
  }));

  sparks.push(...newSparks);
});

