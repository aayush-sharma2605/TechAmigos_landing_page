// Smooth scroll (existing)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(anchor.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// SplitText-style animation
window.addEventListener('DOMContentLoaded', () => {
  const textElement = document.getElementById('animated-text');
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
});

// Fade-in sections when scrolling (existing)
const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.2 });

sections.forEach(section => {
  section.classList.add('hidden');
  observer.observe(section);
});


// Theme Toggle Button
const toggle = document.getElementById("theme-toggle");

// Load saved theme from localStorage
if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light-mode");
}

toggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");

  // Save preference
  if (document.body.classList.contains("light-mode")) {
    localStorage.setItem("theme", "light");
  } else {
    localStorage.setItem("theme", "dark");
  }
});
