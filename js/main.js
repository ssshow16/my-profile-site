// ────────────────────────────────────────────
//  Section loader
// ────────────────────────────────────────────
const SECTIONS = ['hero', 'about', 'skills', 'projects', 'contact'];

async function loadSections() {
  const app = document.getElementById('app');
  for (const name of SECTIONS) {
    const res  = await fetch(`sections/${name}.html`);
    const html = await res.text();
    app.insertAdjacentHTML('beforeend', html);
  }
  initAll();
}

function initAll() {
  initNavScroll();
  initMobileMenu();
  initSmoothScroll();
  initTyping();
  initFadeIn();
  // skill bars animate when they enter view — handled inside initFadeIn
}

// ────────────────────────────────────────────
//  Navigation: scroll-state & active link
// ────────────────────────────────────────────
function initNavScroll() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
    updateActiveNavLink();
  }, { passive: true });
}

function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY  = window.scrollY + 100;
  sections.forEach(sec => {
    const top    = sec.offsetTop;
    const height = sec.offsetHeight;
    const link   = document.querySelector(`.nav-link[href="#${sec.id}"]`);
    if (link) link.classList.toggle('active', scrollY >= top && scrollY < top + height);
  });
}

function initMobileMenu() {
  const btn  = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  btn?.addEventListener('click', () => menu.classList.toggle('hidden'));
  menu?.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => menu.classList.add('hidden'))
  );
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      target?.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

// ────────────────────────────────────────────
//  Typing effect
// ────────────────────────────────────────────
const TYPING_TEXTS = [
  'AI 기반 개발자',
  'AI Application Developer',
  'LLM 솔루션 빌더',
];

function initTyping() {
  const el = document.getElementById('typing-text');
  if (!el) return;

  let textIdx = 0, charIdx = 0, deleting = false;

  function tick() {
    const current = TYPING_TEXTS[textIdx];

    if (!deleting) {
      el.textContent = current.slice(0, ++charIdx);
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(tick, 1800);
        return;
      }
      setTimeout(tick, 80);
    } else {
      el.textContent = current.slice(0, --charIdx);
      if (charIdx === 0) {
        deleting = false;
        textIdx  = (textIdx + 1) % TYPING_TEXTS.length;
        setTimeout(tick, 400);
        return;
      }
      setTimeout(tick, 45);
    }
  }
  tick();
}

// ────────────────────────────────────────────
//  Scroll fade-in (+ skill bar trigger)
// ────────────────────────────────────────────
function initFadeIn() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Trigger skill bars inside this section
        entry.target.querySelectorAll('.skill-bar-fill[data-level]').forEach(bar => {
          bar.style.width = bar.dataset.level + '%';
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.fade-in-section').forEach(el => observer.observe(el));
}

// ────────────────────────────────────────────
//  Boot
// ────────────────────────────────────────────
loadSections();
