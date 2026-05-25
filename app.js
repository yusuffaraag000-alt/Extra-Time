// ========== ORIGINAL WATCH DATA (مستمر كما هو) ==========
const WATCHES = [
  {
    id: 3,
    name: "Tissot PRX",
    sub: "STEEL BEAST",
    price: "400",
    badge: "STEEL",
    img: "Tissot PRX.jpg",
  },
  {
    id: 4,
    name: "Tissot Lather",
    sub: "CLASSIC REVIVAL",
    price: "650",
    badge: "CLASSIC",
    img: "Tissot Lather.jpg",
  },
  {
    id: 5,
    name: "Patek Rubber",
    sub: "CAPTAIN LUXURY",
    price: "650",
    badge: "LUXURY",
    img: "Patek Rubber.jpg",
  },
  {
    id: 6,
    name: "Landa Dollar",
    sub: "CLASSIC STEEL",
    price: "450",
    badge: "LIMITED",
    img: "Landa Dollar.jpg",
  },
  {
    id: 7,
    name: "Lacoste",
    sub: "MAESTRO BROWN",
    price: "450",
    badge: "NEW",
    img: "Lacoste.jpg",
  },
  {
    id: 8,
    name: "Catier",
    sub: "CLASSIC EDITION",
    price: "650",
    badge: "350",
    img: "Catier.jpg",
  },
  {
    id: 9,
    name: "Casio",
    sub: "BLACK GOLD",
    price: "450",
    badge: "LTD",
    img: "Casio.jpg",
  },
];

// ========== INTRO WORD SEQUENCE ==========
const wordSequence = [
  { word: "الوقت", bgColor: "#ffffff", textColor: "#0a0a0a" },
  { word: "لِسَّة", bgColor: "#0a0a0a", textColor: "#ffffff" },
  { word: "مخلصش", bgColor: "#ffffff", textColor: "#0a0a0a" },
  { word: "لِسَّة فيه", bgColor: "#0a0a0a", textColor: "#d4af5c" },
];

let wordScreens = [];
let currentIndex = 0;
let journeyStarted = false;
let autoTimer = null;
let isSkipping = false;

// ========== CREATE WORD SCREEN WITH SKIP BUTTON ==========
function createWordScreen(data, idx) {
  const div = document.createElement("div");
  div.className = "word-screen";
  div.style.position = "fixed";
  div.style.inset = "0";
  div.style.zIndex = "1900";
  div.style.display = "flex";
  div.style.alignItems = "center";
  div.style.justifyContent = "center";
  div.style.flexDirection = "column";
  div.style.transition =
    "opacity 0.4s cubic-bezier(0.2, 0.9, 0.4, 1), transform 0.4s cubic-bezier(0.2, 0.9, 0.4, 1)";
  div.style.opacity = "0";
  div.style.visibility = "hidden";
  div.style.transform = "scale(0.96)";
  div.style.backgroundColor = data.bgColor;
  div.style.color = data.textColor;

  const wordEl = document.createElement("div");
  wordEl.className = "word-large";
  wordEl.style.fontFamily = "var(--font-display)";
  wordEl.style.fontSize = "clamp(3.5rem, 15vw, 9rem)";
  wordEl.style.fontWeight = "900";
  wordEl.style.letterSpacing = "-0.02em";
  wordEl.style.textAlign = "center";
  wordEl.style.padding = "1rem";
  wordEl.style.animation =
    "wordFadeIn 0.35s cubic-bezier(0.2, 0.9, 0.4, 1) forwards";
  wordEl.textContent = data.word;

  const skipBtn = document.createElement("button");
  skipBtn.className = "skip-btn";
  skipBtn.textContent = "تخطي ←";
  skipBtn.style.position = "absolute";
  skipBtn.style.bottom = "2rem";
  skipBtn.style.left = "2rem";
  skipBtn.style.background = "rgba(0,0,0,0.6)";
  skipBtn.style.backdropFilter = "blur(8px)";
  skipBtn.style.border = "1px solid rgba(212,175,92,0.4)";
  skipBtn.style.color = "#d4af5c";
  skipBtn.style.padding = "0.5rem 1.2rem";
  skipBtn.style.borderRadius = "40px";
  skipBtn.style.fontFamily = "var(--font-arabic)";
  skipBtn.style.fontSize = "0.8rem";
  skipBtn.style.cursor = "pointer";
  skipBtn.style.zIndex = "2001";
  skipBtn.style.transition = "all 0.3s ease";
  skipBtn.addEventListener("click", skipIntro);

  div.appendChild(wordEl);
  div.appendChild(skipBtn);
  document.body.appendChild(div);
  return div;
}

// ========== SKIP FUNCTION (تخطي سريع) ==========
function skipIntro() {
  if (isSkipping) return;
  isSkipping = true;

  if (autoTimer) clearTimeout(autoTimer);

  // إخفاء جميع شاشات الكلمات فوراً
  wordScreens.forEach((screen) => {
    screen.classList.remove("active");
    screen.style.opacity = "0";
    screen.style.visibility = "hidden";
    setTimeout(() => {
      if (screen.parentNode) screen.remove();
    }, 100);
  });

  // الانتقال مباشرة إلى شاشة البراند ثم المتجر
  showBrandFinalAndStoreDirect();
}

function createBrandFinal() {
  const div = document.createElement("div");
  div.className = "brand-final-screen";
  div.style.position = "fixed";
  div.style.inset = "0";
  div.style.zIndex = "1950";
  div.style.display = "flex";
  div.style.alignItems = "center";
  div.style.justifyContent = "center";
  div.style.flexDirection = "column";
  div.style.transition =
    "opacity 0.5s cubic-bezier(0.2, 0.9, 0.4, 1), transform 0.5s cubic-bezier(0.2, 0.9, 0.4, 1)";
  div.style.opacity = "0";
  div.style.visibility = "hidden";
  div.style.transform = "scale(0.96)";
  div.style.backgroundColor = "#0a0a0a";
  div.style.color = "#d4af5c";
  div.innerHTML = `
        <div style="display:flex; flex-direction:column; align-items:center; line-height:0.85; margin-bottom:1rem;">
          <span style="font-family:var(--font-display); font-size:clamp(3rem,12vw,7rem); font-weight:900; letter-spacing:-0.02em;">EXTRA</span>
          <span style="font-family:var(--font-display); font-size:clamp(3rem,12vw,7rem); font-weight:900; letter-spacing:-0.02em; color:transparent; -webkit-text-stroke:2px #d4af5c; text-shadow:0 0 30px rgba(212,175,92,0.4);">TIME</span>
          <span style="font-family:var(--font-display); font-size:clamp(3rem,12vw,7rem); font-weight:900; letter-spacing:-0.02em;">90</span>
        </div>
        <div style="font-family:var(--font-arabic); font-size:1rem; margin-top:1.5rem; opacity:0.7; letter-spacing:0.1em;">الوقت الإضافي لأصحاب الطموح</div>
      `;
  document.body.appendChild(div);
  return div;
}

let brandScreen = null;

function showBrandFinalAndStoreDirect() {
  if (!brandScreen) {
    brandScreen = createBrandFinal();
  }
  brandScreen.style.opacity = "1";
  brandScreen.style.visibility = "visible";
  brandScreen.style.transform = "scale(1)";

  setTimeout(() => {
    brandScreen.style.opacity = "0";
    brandScreen.style.transform = "scale(0.96)";

    setTimeout(() => {
      const landing = document.getElementById("landing");
      const store = document.getElementById("mainStore");
      landing.style.opacity = "0";
      setTimeout(() => {
        landing.style.display = "none";
        store.classList.remove("hidden");
        store.classList.add("visible");
        document.body.style.overflow = "auto";
        window.scrollTo(0, 0);
        if (brandScreen && brandScreen.parentNode) brandScreen.remove();
        wordScreens.forEach((s) => {
          if (s.parentNode) s.remove();
        });
      }, 150);
    }, 400);
  }, 1500);
}

function showBrandFinalAndStore() {
  if (!brandScreen) {
    brandScreen = createBrandFinal();
  }
  brandScreen.style.opacity = "1";
  brandScreen.style.visibility = "visible";
  brandScreen.style.transform = "scale(1)";

  setTimeout(() => {
    brandScreen.style.opacity = "0";
    brandScreen.style.transform = "scale(0.96)";

    setTimeout(() => {
      const landing = document.getElementById("landing");
      const store = document.getElementById("mainStore");
      landing.style.opacity = "0";
      setTimeout(() => {
        landing.style.display = "none";
        store.classList.remove("hidden");
        store.classList.add("visible");
        document.body.style.overflow = "auto";
        window.scrollTo(0, 0);
        wordScreens.forEach((s) => {
          if (s.parentNode) s.remove();
        });
        if (brandScreen && brandScreen.parentNode) brandScreen.remove();
      }, 150);
    }, 400);
  }, 1500);
}

function showWord(index) {
  if (index >= wordSequence.length) {
    showBrandFinalAndStore();
    return;
  }
  const screen = wordScreens[index];
  if (!screen) return;
  screen.style.opacity = "1";
  screen.style.visibility = "visible";
  screen.style.transform = "scale(1)";

  if (autoTimer) clearTimeout(autoTimer);
  // تسريع التتابع: 0.9 ثانية فقط بدلاً من 1.3
  autoTimer = setTimeout(() => {
    nextWord();
  }, 900);
}

function nextWord() {
  const current = wordScreens[currentIndex];
  if (current) {
    current.style.opacity = "0";
    current.style.transform = "scale(0.96)";
    current.style.visibility = "hidden";
  }
  setTimeout(() => {
    if (current && current.parentNode) current.style.display = "none";
    currentIndex++;
    if (currentIndex < wordSequence.length) {
      showWord(currentIndex);
    } else {
      showBrandFinalAndStore();
    }
  }, 300);
}

function startJourney() {
  if (journeyStarted) return;
  journeyStarted = true;
  wordSequence.forEach((data, i) => {
    wordScreens.push(createWordScreen(data, i));
  });
  currentIndex = 0;
  showWord(0);
}

// ========== ORIGINAL FUNCTIONS (لم يتم التعديل عليها) ==========
function renderProducts() {
  const grid = document.getElementById("productsGrid");
  if (!grid) return;
  grid.innerHTML = "";
  WATCHES.forEach((w, i) => {
    const card = document.createElement("div");
    card.className = "watch-card";
    card.style.animationDelay = `${i * 0.05}s`;
    card.innerHTML = `<div class="card-img-wrap"><img src="${w.img}" alt="${w.name}" loading="lazy"><div class="card-badge">${w.badge}</div></div><div class="card-body"><div class="card-name">${w.name}</div><div class="card-sub">${w.sub}</div><div class="card-footer"><div class="card-price">${w.price} <span>جنيه</span></div><button class="card-btn" data-name="${w.name}">اطلب دلوقتي</button></div></div>`;
    grid.appendChild(card);
  });
  grid.addEventListener("click", (e) => {
    const btn = e.target.closest(".card-btn");
    if (btn) openModal(btn.dataset.name);
  });
}

function openModal(watchName) {
  const overlay = document.getElementById("modalOverlay");
  const nameSpan = document.getElementById("modalWatchName");
  if (nameSpan) nameSpan.textContent = watchName ? `"${watchName}"` : "";
  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  const overlay = document.getElementById("modalOverlay");
  overlay.classList.remove("open");
  document.body.style.overflow = "auto";
}

function createRipple(event, element) {
  const ripple = document.createElement("span");
  ripple.classList.add("ripple-effect");
  const rect = element.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  ripple.style.width = ripple.style.height = size + "px";
  ripple.style.left = event.clientX - rect.left - size / 2 + "px";
  ripple.style.top = event.clientY - rect.top - size / 2 + "px";
  element.style.position = "relative";
  element.style.overflow = "hidden";
  element.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);
}

function initMorphTransition() {
  const btn = document.getElementById("enterBtn");
  const overlay = document.getElementById("morphOverlay");
  const landing = document.getElementById("landing");
  if (!btn) return;

  btn.addEventListener("click", (e) => {
    createRipple(e, btn);
    btn.style.pointerEvents = "none";

    const rect = btn.getBoundingClientRect();
    overlay.style.width = rect.width + "px";
    overlay.style.height = rect.height + "px";
    overlay.style.top = rect.top + rect.height / 2 + "px";
    overlay.style.left = rect.left + rect.width / 2 + "px";
    overlay.style.transform = "translate(-50%, -50%) scale(0)";
    overlay.offsetHeight;
    overlay.classList.add("active");

    setTimeout(() => {
      landing.style.opacity = "0";
      setTimeout(() => {
        landing.style.display = "none";
        startJourney();
      }, 150);
    }, 400);

    setTimeout(() => {
      overlay.style.transition = "opacity 0.6s ease";
      overlay.style.opacity = "0";
    }, 700);

    setTimeout(() => {
      overlay.style.display = "none";
      overlay.style.opacity = "1";
      overlay.style.transition = "";
    }, 1200);
  });
}

function spawnParticles() {
  const container = document.getElementById("particles");
  if (!container) return;
  for (let i = 0; i < 45; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    p.style.left = Math.random() * 100 + "%";
    p.style.top = 60 + Math.random() * 40 + "%";
    p.style.setProperty("--dur", 4 + Math.random() * 9 + "s");
    p.style.setProperty("--delay", Math.random() * 8 + "s");
    container.appendChild(p);
  }
}

function initReveal() {
  const reveals = document.querySelectorAll("[data-reveal]");
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("revealed");
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1 },
  );
  reveals.forEach((r) => obs.observe(r));

  const storySections = document.querySelectorAll(".story-section");
  storySections.forEach((sec) => {
    sec.style.opacity = "0";
    sec.style.transform = "translateY(30px)";
    sec.style.transition =
      "opacity 0.8s var(--ease-luxury), transform 0.8s var(--ease-luxury)";
    const obs2 = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.style.opacity = "1";
            e.target.style.transform = "translateY(0)";
            obs2.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 },
    );
    obs2.observe(sec);
  });
}

function initNavbarScroll() {
  const nav = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 60) nav.classList.add("nav-scrolled");
    else nav.classList.remove("nav-scrolled");
  });
}

function initCardAnimations() {
  const cards = document.querySelectorAll(".watch-card");
  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transition = "all 0.5s var(--ease-bounce)";
    });
  });
}

// ========== INITIALIZATION ==========
document.addEventListener("DOMContentLoaded", () => {
  spawnParticles();
  initMorphTransition();
  renderProducts();
  initReveal();
  initNavbarScroll();
  initCardAnimations();

  const modalClose = document.getElementById("modalClose");
  const modalOverlay = document.getElementById("modalOverlay");
  if (modalClose) modalClose.addEventListener("click", closeModal);
  if (modalOverlay)
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  if (window.matchMedia("(pointer: fine)").matches) {
    const glowDiv = document.createElement("div");
    glowDiv.style.cssText =
      "position:fixed; width:320px; height:320px; border-radius:50%; background:radial-gradient(circle, rgba(212,175,92,0.04) 0%, transparent 70%); pointer-events:none; z-index:9999; transform:translate(-50%,-50%); transition: opacity 0.2s;";
    document.body.appendChild(glowDiv);
    document.addEventListener("mousemove", (e) => {
      glowDiv.style.left = e.clientX + "px";
      glowDiv.style.top = e.clientY + "px";
    });
  }
});
