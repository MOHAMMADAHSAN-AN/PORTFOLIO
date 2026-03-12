/* ─── NAVBAR: active state ─── */
(function () {
  const cur = document.body.dataset.page;
  document.querySelectorAll('.nav-links a[data-page]').forEach(a => {
    if (a.dataset.page === cur) a.classList.add('active');
  });

  // hamburger
  const hb = document.querySelector('.hamburger');
  const nl = document.querySelector('.nav-links');
  if (hb && nl) hb.addEventListener('click', () => nl.classList.toggle('open'));
})();

/* ─── SCROLL REVEAL ─── */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal,.reveal-l,.reveal-r').forEach(el => revealObserver.observe(el));

/* ─── AMBIENT CURSOR GLOW ─── */
const aura = document.createElement('div');
Object.assign(aura.style, {
  position: 'fixed', width: '500px', height: '500px', borderRadius: '50%',
  background: 'radial-gradient(circle,rgba(212,168,67,.04) 0%,transparent 70%)',
  pointerEvents: 'none', zIndex: '1', transform: 'translate(-50%,-50%)',
  transition: 'opacity .4s', willChange: 'left,top'
});
document.body.appendChild(aura);
let mx = 0, my = 0, ax = 0, ay = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
(function raf() {
  ax += (mx - ax) * .08; ay += (my - ay) * .08;
  aura.style.left = ax + 'px'; aura.style.top = ay + 'px';
  requestAnimationFrame(raf);
})();

/* ─── SKILL BAR ANIMATE ON SCROLL ─── */
const barObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.bar-fill[data-w]').forEach(bar => {
        bar.style.setProperty('--w', bar.dataset.w + '%');
        bar.style.width = bar.dataset.w + '%';
      });
    }
  });
}, { threshold: .3 });
document.querySelectorAll('.skills-group').forEach(g => barObserver.observe(g));

/* ─── COUNTER ANIMATION ─── */
function countUp(el, to, dur = 1400) {
  const start = performance.now();
  function tick(now) {
    const p = Math.min((now - start) / dur, 1);
    el.textContent = Math.floor(p * to) + (p < 1 ? '' : '+');
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = to + '+';
  }
  requestAnimationFrame(tick);
}
const statObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('[data-count]').forEach(el => {
        countUp(el, +el.dataset.count);
      });
      statObserver.unobserve(e.target);
    }
  });
}, { threshold: .6 });
document.querySelectorAll('.stats-row').forEach(r => statObserver.observe(r));

/* ─── TYPING HEADLINE ─── */
function typeWrite(el, text, speed = 55, cb) {
  el.textContent = ''; let i = 0;
  const t = setInterval(() => {
    el.textContent += text[i++];
    if (i >= text.length) { clearInterval(t); if (cb) cb(); }
  }, speed);
}

/* ─── CODE ACCORDION ─── */
document.querySelectorAll('.code-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const panel = btn.nextElementSibling;
    const isOpen = panel.style.display === 'block';
    panel.style.display = isOpen ? 'none' : 'block';
    btn.classList.toggle('open', !isOpen);
    btn.querySelector('.toggle-icon').textContent = isOpen ? '▸' : '▾';
  });
});

/* ─── SMOOTH ANCHOR SCROLL ─── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});
