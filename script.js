const progress = document.getElementById('scrollProgress');
const glow = document.getElementById('cursorGlow');
const nav = document.getElementById('nav');
const menuToggle = document.getElementById('menuToggle');

window.addEventListener('scroll', () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
}, { passive: true });

window.addEventListener('pointermove', (e) => {
  if (window.innerWidth > 800 && glow) {
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
  }
}, { passive: true });

menuToggle.addEventListener('click', () => nav.classList.toggle('open'));
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => nav.classList.remove('open')));

const roles = ['Salesforce solutions', 'Apex & LWC experiences', 'business process automation', 'connected CRM systems'];
let roleIndex = 0, charIndex = 0, deleting = false;
const typed = document.getElementById('typedRole');
function typeRole() {
  const word = roles[roleIndex];
  typed.textContent = word.substring(0, charIndex);
  if (!deleting && charIndex < word.length) {
    charIndex++; setTimeout(typeRole, 75);
  } else if (deleting && charIndex > 0) {
    charIndex--; setTimeout(typeRole, 34);
  } else {
    deleting = !deleting;
    if (!deleting) roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(typeRole, deleting ? 1500 : 350);
  }
}
setTimeout(typeRole, 500);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const statObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = Number(el.dataset.count);
    const decimals = Number(el.dataset.decimals || 0);
    const start = performance.now();
    const duration = 1400;
    function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * eased).toFixed(decimals) + (decimals ? '+' : '+');
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
    statObserver.unobserve(el);
  });
}, { threshold: 0.7 });
document.querySelectorAll('[data-count]').forEach(el => statObserver.observe(el));

document.getElementById('year').textContent = new Date().getFullYear();
