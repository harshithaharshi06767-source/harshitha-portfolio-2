document.documentElement.classList.add('js');

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile menu
const toggle = document.getElementById('navToggle');
const menu = document.getElementById('menu');
function setMenu(open) {
  menu.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
}
toggle.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));

// Video pop-up
const modal = document.getElementById('videoModal');
const video = document.getElementById('portfolioVideo');
const playBtn = document.getElementById('playBtn');
const closeBtn = document.getElementById('closeBtn');

function openVideo() {
  modal.hidden = false;
  document.body.style.overflow = 'hidden';
  video.play().catch(() => {});
  closeBtn.focus();
}
function closeVideo() {
  video.pause();
  modal.hidden = true;
  document.body.style.overflow = '';
  playBtn.focus();
}
playBtn.addEventListener('click', openVideo);
closeBtn.addEventListener('click', closeVideo);
modal.addEventListener('click', e => { if (e.target === modal) closeVideo(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !modal.hidden) closeVideo(); });

// Reveal sections as they scroll into view
const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(el => io.observe(el));
} else {
  reveals.forEach(el => el.classList.add('visible'));
}

// Highlight the current section in the menu
const links = [...menu.querySelectorAll('a')];
const sections = links.map(a => document.querySelector(a.getAttribute('href')));
function markActive() {
  const y = window.scrollY + 140;
  let current = 0;
  sections.forEach((s, i) => { if (s.offsetTop <= y) current = i; });
  links.forEach((a, i) => a.classList.toggle('active', i === current));
}
window.addEventListener('scroll', markActive, { passive: true });
markActive();
