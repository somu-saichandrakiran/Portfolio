/* ===== Portfolio JS ===== */

// ── Custom Cursor ──────────────────────────────────────────────
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  cursorFollower.style.left = followerX + 'px';
  cursorFollower.style.top = followerY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

// Scale cursor on hover
document.querySelectorAll('a, button, .project-card, .timeline-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(2.5)';
    cursorFollower.style.width = '60px';
    cursorFollower.style.height = '60px';
    cursorFollower.style.opacity = '0.25';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(1)';
    cursorFollower.style.width = '36px';
    cursorFollower.style.height = '36px';
    cursorFollower.style.opacity = '0.5';
  });
});

// ── Navigation ─────────────────────────────────────────────────
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
  updateActiveNavLink();
});

// Active nav link on scroll
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
}

// ── Hamburger / Mobile Menu ─────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
let menuOpen = false;

hamburger.addEventListener('click', () => {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle('open', menuOpen);

  const spans = hamburger.querySelectorAll('span');
  if (menuOpen) {
    spans[0].style.transform = 'translateY(6.5px) rotate(45deg)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'translateY(-6.5px) rotate(-45deg)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

// Close menu on link click
document.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => {
    menuOpen = false;
    mobileMenu.classList.remove('open');
    const spans = hamburger.querySelectorAll('span');
    spans.forEach(s => s.style = '');
  });
});

// ── Smooth Scroll ──────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── Scroll Reveal ──────────────────────────────────────────────
const revealEls = document.querySelectorAll('.reveal-up');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -60px 0px'
});

revealEls.forEach(el => revealObserver.observe(el));

// Initial hero reveal
window.addEventListener('load', () => {
  const heroEls = document.querySelectorAll('.hero .reveal-up');
  heroEls.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add('visible');
    }, 100 + i * 130);
  });
});

// ── Education Bar Animation ─────────────────────────────────────
const eduBar = document.querySelector('.edu-bar');

if (eduBar) {
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const targetWidth = entry.target.dataset.width + '%';
        entry.target.style.width = targetWidth;
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  barObserver.observe(eduBar);
}

// ── Project Card Tilt Effect ────────────────────────────────────
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `translateY(-4px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'all 0.4s ease';
    setTimeout(() => { card.style.transition = ''; }, 400);
  });
});

// ── Timeline Card stagger ───────────────────────────────────────
const timelineCards = document.querySelectorAll('.timeline-item');
timelineCards.forEach((item, i) => {
  item.style.transitionDelay = `${i * 0.15}s`;
});

// ── Typing Effect for Hero Role ─────────────────────────────────
function typeEffect(element, text, speed = 60) {
  element.textContent = '';
  let i = 0;

  function type() {
    if (i < text.length) {
      element.textContent += text[i];
      i++;
      setTimeout(type, speed);
    }
  }

  setTimeout(type, 900);
}

const heroRole = document.querySelector('.hero-role');
if (heroRole) {
  const originalText = heroRole.textContent;
  typeEffect(heroRole, originalText, 45);
}

// ── Stat Counter Animation ──────────────────────────────────────
function animateCounter(el, target, suffix = '', decimals = 0, duration = 1500) {
  let start = null;
  const from = 0;

  function step(ts) {
    if (!start) start = ts;
    const progress = Math.min((ts - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = from + (target - from) * eased;
    el.textContent = current.toFixed(decimals) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

const statCards = document.querySelectorAll('.stat-card');
const statsData = [
  { value: 8.7, suffix: '', decimals: 1 },
  { value: 4, suffix: '+', decimals: 0 },
  { value: 95, suffix: '%', decimals: 0 }
];

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const cards = document.querySelectorAll('.stat-card');
      cards.forEach((card, i) => {
        const numEl = card.querySelector('.stat-num');
        if (numEl && statsData[i]) {
          const d = statsData[i];
          setTimeout(() => {
            animateCounter(numEl, d.value, d.suffix, d.decimals);
          }, i * 200);
        }
      });
      statObserver.disconnect();
    }
  });
}, { threshold: 0.3 });

if (statCards.length > 0) statObserver.observe(statCards[0]);

// ── Active Nav Style ────────────────────────────────────────────
const style = document.createElement('style');
style.textContent = `
  .nav-link.active {
    color: var(--accent) !important;
  }
  .nav-link.active::after {
    width: 100% !important;
  }
`;
document.head.appendChild(style);

// ── Scroll-linked subtle parallax for hero bg text ─────────────
const heroBgText = document.querySelector('.hero-bg-text');
if (heroBgText) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    heroBgText.style.transform = `translateY(calc(-50% + ${scrolled * 0.2}px))`;
  }, { passive: true });
}

console.log('%c SSCK Portfolio 🚀 ', 'background: #c8f55a; color: #0a0a0f; font-size: 14px; font-weight: bold; padding: 8px 16px; border-radius: 4px;');