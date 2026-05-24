/* ============================================================
   EXTRA TIME 90 — app.js
   ============================================================ */

// ─── DATA ──────────────────────────────────────────────────────────────────

const WATCHES = [
  // {
  //   id: 1,
  //   name: 'ساعة "الوقت الضايع" Chrono',
  //   sub: 'CHRONOGRAPH SERIES',
  //   price: '4,200',
  //   badge: 'BESTSELLER',
  //   img: 'Acoust.jpg',
  // },
  // {
  //   id: 2,
  //   name: 'ساعة "دقيقة ٩٠" الذهبية',
  //   sub: 'GOLD EDITION',
  //   price: '8,500',
  //   badge: 'GOLD',
  //   img: 'Tissot.jpg',
  // },
  {
    id: 3,
    name: 'Tissot PRX',
    sub: 'STEEL BEAST',
    price: '400',
    badge: 'STEEL',
    img: 'Tissot PRX.jpg',
  },
  {
    id: 4,
    name: 'Tissot Lather',
    sub: 'CLASSIC REVIVAL',
    price: '650',
    badge: 'CLASSIC',
    img: 'Tissot Lather.jpg',
  },
  {
    id: 5,
    name: 'Patek Rubber',
    sub: 'CAPTAIN LUXURY',
    price: '650',
    badge: 'LUXURY',
    img: 'Patek Rubber.jpg',
  },
  {
    id: 6,
    name: ' Landa Dollar',
    sub: 'CLASSIC STEEL ',
    price: '450',
    badge: 'LIMITED',
    img: 'Landa Dollar.jpg',
  },
  {
    id: 7,
    name: ' Lacoste ',
    sub: 'MAESTRO BROWN',
    price: '450',
    badge: 'NEW',
    img: 'Lacoste.jpg',
  },
  {
    id: 8,
    name: ' Catier  ',
    sub: ' CLASSIC EDITION',
    price: '650',
    badge: '350',
    img: 'Catier.jpg',
  },
  {
    id: 9,
    name: ' Casio  ',
    sub: 'BLACK GOLD',
    price: '450',
    badge: 'LTD',
    img: 'Casio.jpg',
  },
  // {
  //   id: 10,
  //   name: 'ساعة "الجنرال" النحاسية',
  //   sub: 'THE GENERAL BRONZE',
  //   price: '5,600',
  //   badge: 'BRONZE',
  //   img: 'photo_2026-05-24_20-55-25.jpg',
  // },
  // {
  //   id: 11,
  //   name: 'ساعة "سوبر ساب" الكاجوال',
  //   sub: 'SUPER SUB CASUAL',
  //   price: '2,800',
  //   badge: 'CASUAL',
  //   img: 'photo_2026-05-24_20-55-17.jpg',
  // },
];

// ─── PARTICLES ─────────────────────────────────────────────────────────────

function spawnParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  for (let i = 0; i < 35; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      top: ${70 + Math.random() * 30}%;
      --dur: ${5 + Math.random() * 8}s;
      --delay: ${Math.random() * 8}s;
      opacity: 0;
      width: ${1 + Math.random() * 2}px;
      height: ${1 + Math.random() * 2}px;
    `;
    container.appendChild(p);
  }
}

// ─── MORPH TRANSITION ──────────────────────────────────────────────────────

function initMorphTransition() {
  const btn = document.getElementById('enterBtn');
  const overlay = document.getElementById('morphOverlay');
  const landing = document.getElementById('landing');
  const store = document.getElementById('mainStore');

  if (!btn) return;

  btn.addEventListener('click', () => {
    // Ripple the button first
    btn.style.pointerEvents = 'none';

    // Trigger morph
    // Match overlay size to actual button dimensions
    const btnRect = btn.getBoundingClientRect();
    overlay.style.width  = btnRect.width  + 'px';
    overlay.style.height = btnRect.height + 'px';
    overlay.style.top    = (btnRect.top  + btnRect.height / 2) + 'px';
    overlay.style.left   = (btnRect.left + btnRect.width  / 2) + 'px';
    overlay.style.transform = 'translate(-50%, -50%) scale(0)';
    // Force reflow
    overlay.getBoundingClientRect();
    overlay.classList.add('active');

    // After morph covers screen, swap pages
    setTimeout(() => {
      landing.style.display = 'none';
      store.classList.remove('hidden');
      store.classList.add('visible');
      document.body.style.overflow = 'auto';
    }, 550);

    // Fade out overlay
    setTimeout(() => {
      overlay.style.transition = 'opacity 0.6s ease';
      overlay.style.opacity = '0';
    }, 700);

    setTimeout(() => {
      overlay.style.display = 'none';
    }, 1400);
  });
}

// ─── PRODUCT CARDS ─────────────────────────────────────────────────────────

function renderProducts() {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;

  WATCHES.forEach((w, idx) => {
    const card = document.createElement('div');
    card.className = 'watch-card';
    card.style.animationDelay = `${idx * 0.06}s`;
    card.innerHTML = `
      <div class="card-img-wrap">
        <img src="${w.img}" alt="${w.name}" loading="lazy" />
        <div class="card-badge">${w.badge}</div>
      </div>
      <div class="card-body">
        <div class="card-name">${w.name}</div>
        <div class="card-sub">${w.sub}</div>
        <div class="card-footer">
          <div class="card-price">${w.price} <span>جنيه</span></div>
          <button class="card-btn" data-name="${w.name}">اطلب دلوقتي</button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });

  // Delegate click
  grid.addEventListener('click', (e) => {
    const btn = e.target.closest('.card-btn');
    if (btn) openModal(btn.dataset.name);
  });
}

// ─── MODAL ─────────────────────────────────────────────────────────────────

function initModal() {
  const overlay = document.getElementById('modalOverlay');
  const closeBtn = document.getElementById('modalClose');

  if (!overlay) return;

  closeBtn.addEventListener('click', closeModal);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

function openModal(watchName) {
  const overlay = document.getElementById('modalOverlay');
  const nameEl = document.getElementById('modalWatchName');

  // Set the watch name in the modal
  nameEl.textContent = watchName ? `"${watchName}"` : '';
  
  // Open the modal
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const overlay = document.getElementById('modalOverlay');
  overlay.classList.remove('open');
  document.body.style.overflow = 'auto';
}

// ─── SCROLL REVEALS ────────────────────────────────────────────────────────

function initScrollReveal() {
  const targets = document.querySelectorAll('[data-reveal]');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
  );

  targets.forEach((t) => observer.observe(t));
}

// Auto-reveal story sections too
function initStoryReveal() {
  const stories = document.querySelectorAll('.story-section');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  stories.forEach((s) => {
    s.style.opacity = '0';
    s.style.transform = 'translateY(50px)';
    s.style.transition = 'opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1)';
    observer.observe(s);
  });
}

// ─── CARD TILT EFFECT ──────────────────────────────────────────────────────

function initCardTilt() {
  document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.watch-card');
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 0.8) {
        card.style.transform = `translateY(-8px) scale(1.01) rotateX(${-dy * 4}deg) rotateY(${dx * 4}deg)`;
      } else {
        card.style.transform = '';
      }
    });
  });
}

// ─── NAVBAR SCROLL ─────────────────────────────────────────────────────────

function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  let lastY = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y > 80) {
      navbar.style.padding = '0.7rem 4rem';
      navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.5)';
    } else {
      navbar.style.padding = '1.2rem 4rem';
      navbar.style.boxShadow = 'none';
    }
    lastY = y;
  }, { passive: true });
}

// ─── CURSOR GLOW ───────────────────────────────────────────────────────────

function initCursorGlow() {
  if (window.matchMedia('(pointer: coarse)').matches) return; // skip mobile

  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 70%);
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    transition: opacity 0.3s;
    mix-blend-mode: screen;
  `;
  document.body.appendChild(glow);

  document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  }, { passive: true });
}

// ─── INIT ──────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  spawnParticles();
  initMorphTransition();
  renderProducts();
  initModal();
  initScrollReveal();
  initNavbar();
  initCursorGlow();

  // Story reveals only after store is visible (watch for store becoming visible)
  const storeObserver = new MutationObserver(() => {
    const store = document.getElementById('mainStore');
    if (store && !store.classList.contains('hidden')) {
      initStoryReveal();
      initCardTilt();
      storeObserver.disconnect();
    }
  });

  storeObserver.observe(document.getElementById('mainStore'), {
    attributes: true,
    attributeFilter: ['class'],
  });
});