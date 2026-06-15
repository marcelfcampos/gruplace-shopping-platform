/* ============================================================
   GRUPLACE – main.js
   ============================================================ */

// ── HEADER SCROLL ─────────────────────────────────────────────
window.addEventListener('scroll', () => {
  document.getElementById('header').classList.toggle('scrolled', window.scrollY > 20);
});

// ── MOBILE MENU ───────────────────────────────────────────────
function toggleMenu() {
  document.getElementById('mobileNav').classList.toggle('open');
}

// ── TIMELINE ANIMATION ────────────────────────────────────────
const timelineObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.3 });

document.querySelectorAll('.tl-step').forEach((el, i) => {
  el.style.transitionDelay = (i * 0.12) + 's';
  timelineObs.observe(el);
});

// ── OFFER DATA ────────────────────────────────────────────────
const offers = [
  { cat: 'moda',        emoji: '👗', store: 'Urban Style',   shopping: 'Shopping Villa', disc: '30% OFF', title: 'Jaquetas Premium' },
  { cat: 'moda',        emoji: '👠', store: 'Zara',          shopping: 'Shopping Villa', disc: '25% OFF', title: 'Coleção Outono' },
  { cat: 'moda',        emoji: '👶', store: 'Infância Urbana', shopping: 'Shopping Villa', disc: '40% OFF', title: 'Conjunto Body' },
  { cat: 'tecnologia',  emoji: '💻', store: 'TechZone',      shopping: 'Shopping Villa', disc: '20% OFF', title: 'Notebook Gamer' },
  { cat: 'tecnologia',  emoji: '📱', store: 'Apple Store',   shopping: 'Shopping Villa', disc: 'Novo',    title: 'iPhone disponível' },
  { cat: 'gastronomia', emoji: '🍔', store: 'Food Station',  shopping: 'Shopping Villa', disc: '15% OFF', title: 'Combo Especial' },
  { cat: 'gastronomia', emoji: '☕', store: 'Coffee Shop',   shopping: 'Shopping Villa', disc: '2 por 1', title: 'Café Especial' },
  { cat: 'beleza',      emoji: '💄', store: "L'Oréal Studio",shopping: 'Shopping Villa', disc: '40% OFF', title: 'Kit Skincare' },
  { cat: 'beleza',      emoji: '💅', store: 'Spa Beauty',    shopping: 'Shopping Villa', disc: '30% OFF', title: 'Pacote Completo' },
  { cat: 'esporte',     emoji: '👟', store: 'Nike',          shopping: 'Shopping Villa', disc: '30% OFF', title: 'Tênis Selecionados' },
  { cat: 'esporte',     emoji: '⚽', store: 'Centauro',      shopping: 'Shopping Villa', disc: '20% OFF', title: 'Equipamentos Esporte' },
];

let activeCategory  = 'moda';
let interestedCards = new Set();

const catBgMap = {
  moda:        '#FDF2F8',
  tecnologia:  '#EFF6FF',
  gastronomia: '#FFF7ED',
  beleza:      '#FDF4FF',
  esporte:     '#F0FDF4',
};

function catBg(c) {
  return catBgMap[c] || '#F8FAFC';
}

function renderOffers() {
  const filtered = offers.filter(o => o.cat === activeCategory);
  const grid     = document.getElementById('offerCards');

  grid.innerHTML = filtered.map((o, i) => `
    <div class="offer-card" style="animation-delay:${i * 0.07}s">
      <div class="offer-img" style="background:${catBg(o.cat)}">${o.emoji}</div>
      <div class="offer-body">
        <div class="offer-store">${o.store}</div>
        <div class="offer-shopping">${o.shopping}</div>
        <div class="offer-disc">${o.disc}</div>
        <div class="offer-title">${o.title}</div>
        <button
          class="btn-interest ${interestedCards.has(o.store + o.title) ? 'active' : ''}"
          onclick="toggleInterest(this,'${o.store + o.title}')">
          ${interestedCards.has(o.store + o.title) ? '✓ Interesse Salvo' : '♥ Tenho Interesse'}
        </button>
      </div>
    </div>`).join('');
}

function toggleInterest(btn, key) {
  if (interestedCards.has(key)) {
    interestedCards.delete(key);
    btn.textContent = '♥ Tenho Interesse';
    btn.classList.remove('active');
  } else {
    interestedCards.add(key);
    btn.textContent = '✓ Interesse Salvo';
    btn.classList.add('active');
  }
}

function filterCategory(el, cat) {
  document.querySelectorAll('.tag').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  activeCategory = cat;
  renderOffers();
}

// ── FEATURED OFFERS (NOVO CARDS-GRID) ──────────────────────────
const featuredOffers = [
  { emoji: '👟', store: 'Nike',     shopping: 'Shopping Villa', disc: '35% OFF', title: 'Tênis Running' },
  { emoji: '🍎', store: 'Apple',    shopping: 'Shopping Villa', disc: 'Novo Lançamento', title: 'iPhone' },
  { emoji: '⚽', store: 'Centauro', shopping: 'Shopping Villa', disc: '20% OFF', title: 'Artigos Esportivos' },
  { emoji: '💄', store: 'O Boticário', shopping: 'Shopping Villa', disc: '25% OFF', title: 'Linha de Perfumes' },
];

function renderFeaturedOffers() {
  const grid = document.getElementById('featuredOfferCards');
  if (!grid) return;

  grid.innerHTML = featuredOffers.map((o, i) => `
    <div class="offer-card" style="animation-delay:${i * 0.07}s">
      <div class="offer-img" style="background:${catBg(o.cat)}">${o.emoji}</div>
      <div class="offer-body">
        <div class="offer-store">${o.store}</div>
        <div class="offer-shopping">${o.shopping}</div>
        <div class="offer-disc">${o.disc}</div>
        <div class="offer-title">${o.title}</div>
        <button
          class="btn-interest ${interestedCards.has(o.store + o.title) ? 'active' : ''}"
          onclick="toggleInterest(this,'${o.store + o.title}')">
          ${interestedCards.has(o.store + o.title) ? '✓ Interesse Salvo' : '♥ Tenho Interesse'}
        </button>
      </div>
    </div>`).join('');
}

// ── STORES ────────────────────────────────────────────────────
const stores = [
  { name: 'Nike',     emoji: '👟', following: true },
  { name: 'Zara',     emoji: '👗', following: true },
  { name: 'Apple',    emoji: '🍎', following: true },
  { name: 'Centauro', emoji: '⚽', following: true },
];

const promos = {
  Nike:     '30% OFF em tênis selecionados',
  Zara:     'Oferta exclusiva para seguidores',
  Apple:    'Novo iPhone disponível',
  Centauro: '20% OFF em equipamentos',
};

function renderStores() {
  document.getElementById('storesGrid').innerHTML = stores.map((s, i) => `
    <div class="store-pill">
      <div class="store-icon">${s.emoji}</div>
      <span class="store-name">${s.name}</span>
      <button
        class="btn-follow ${s.following ? 'following seg-btn active' : ''}"
        onclick="toggleFollow(${i}, this)">
        ${s.following ? '✓ Seguindo' : '+ Seguir'}
      </button>
    </div>`).join('');

  renderPromos();
}

function toggleFollow(i, btn) {
  stores[i].following = !stores[i].following;
  btn.textContent = stores[i].following ? '✓ Seguindo' : '+ Seguir';
  btn.classList.toggle('following', stores[i].following);
  btn.classList.toggle('seg-btn', stores[i].following);
  btn.classList.toggle('active', stores[i].following);
  renderPromos();
}

function renderPromos() {
  const followed = stores.filter(s => s.following);
  const sec      = document.getElementById('promoSection');

  if (followed.length === 0) { sec.style.display = 'none'; return; }

  sec.style.display = 'block';
  document.getElementById('promoCards').innerHTML = followed.map(s => `
    <div class="promo-card">
      <div class="promo-store">${s.emoji} ${s.name}</div>
      <div class="promo-desc">${promos[s.name] || 'Oferta exclusiva para você'}</div>
    </div>`).join('');
}

// ── NAVEGAÇÃO (SINGLE SOURCE OF TRUTH) ─────────────────────────
const chartsRendered = { lojista: false, shopping: false };
let activeTab = 'consumidor';

function setActiveTab(tab) {
  activeTab = tab;

  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  document.getElementById('tab-' + tab).classList.add('active');

  document.querySelectorAll('.seg-btn').forEach(b => b.classList.remove('active'));
  const segBtn = document.getElementById('segBtn-' + tab);
  if (segBtn) segBtn.classList.add('active');

  if (tab === 'lojista'  && !chartsRendered.lojista)  { renderLojistCharts();   chartsRendered.lojista  = true; }
  if (tab === 'shopping' && !chartsRendered.shopping) { renderShoppingCharts(); chartsRendered.shopping = true; }
  if (tab === 'shopping') { renderShoppingIntelligence(); }

  animateCounters();
}

function goToSolucoes(e) {
  if (e) e.preventDefault();
  document.getElementById('solucoes').scrollIntoView({ behavior: 'smooth' });
}

function showConsumer(e)   { goToSolucoes(e); setActiveTab('consumidor'); }
function showStoreOwner(e) { goToSolucoes(e); setActiveTab('lojista'); }
function showShopping(e)   { goToSolucoes(e); setActiveTab('shopping'); }

// Mantido por compatibilidade, caso algo ainda chame switchTab
function switchTab(tab) { setActiveTab(tab); }


// ── COUNTING ANIMATION ────────────────────────────────────────
function animateCounters() {
  document.querySelectorAll('.counting').forEach(el => {
    const target = parseInt(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    let start    = 0;
    const step   = target / (1200 / 16);

    const timer = setInterval(() => {
      start = Math.min(start + step, target);
      el.textContent = Math.round(start).toLocaleString('pt-BR') + suffix;
      if (start >= target) clearInterval(timer);
    }, 16);
  });
}

// ── LOJISTA CHARTS ────────────────────────────────────────────
function renderLojistCharts() {
  new Chart(document.getElementById('chartGrowth'), {
    type: 'line',
    data: {
      labels: ['Jan','Fev','Mar','Abr','Mai','Jun'],
      datasets: [{
        label: 'Seguidores',
        data: [600, 700, 780, 900, 1050, 1200],
        borderColor: '#2563EB',
        backgroundColor: 'rgba(37,99,235,0.08)',
        fill: true, tension: 0.4,
        pointRadius: 4, pointBackgroundColor: '#2563EB', borderWidth: 2,
      }],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false } },
        y: { grid: { color: 'rgba(0,0,0,0.04)' } },
      },
    },
  });

  new Chart(document.getElementById('chartCamp'), {
    type: 'bar',
    data: {
      labels: ['Cliques','Conversões','Visitas'],
      datasets: [{
        label: 'Resultado',
        data: [320, 240, 540],
        backgroundColor: [
          'rgba(37,99,235,0.8)',
          'rgba(124,58,237,0.8)',
          'rgba(15,118,110,0.8)',
        ],
        borderRadius: 6, borderSkipped: false,
      }],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false } },
        y: { grid: { color: 'rgba(0,0,0,0.04)' } },
      },
    },
  });
}

// ── SHOPPING CHARTS ───────────────────────────────────────────
function renderShoppingCharts() {
  new Chart(document.getElementById('chartCat'), {
    type: 'bar',
    data: {
      labels: ['Moda','Tecnologia','Gastro.','Beleza','Esporte'],
      datasets: [{
        label: 'Engajamento %',
        data: [84, 76, 68, 80, 86],
        backgroundColor: [
          'rgba(37,99,235,0.8)',
          'rgba(124,58,237,0.8)',
          'rgba(234,88,12,0.8)',
          'rgba(219,39,119,0.8)',
          'rgba(5,150,105,0.8)',
        ],
        borderRadius: 6, borderSkipped: false,
      }],
    },
    options: {
      indexAxis: 'y',
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { min: 0, max: 100, grid: { color: 'rgba(0,0,0,0.04)' } },
        y: { grid: { display: false } },
      },
    },
  });

  new Chart(document.getElementById('chartUsers'), {
    type: 'line',
    data: {
      labels: ['Jan','Fev','Mar','Abr','Mai','Jun'],
      datasets: [{
        label: 'Usuários',
        data: [900, 1100, 1250, 1400, 1650, 1842],
        borderColor: '#7C3AED',
        backgroundColor: 'rgba(124,58,237,0.08)',
        fill: true, tension: 0.4,
        pointRadius: 4, pointBackgroundColor: '#7C3AED', borderWidth: 2,
      }],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false } },
        y: { grid: { color: 'rgba(0,0,0,0.04)' } },
      },
    },
  });
}

// ── BENEFITS SCROLL ANIMATION ─────────────────────────────────
const benefitsObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity   = 1;
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.benefit-card').forEach((el, i) => {
  el.style.opacity    = 0;
  el.style.transform  = 'translateY(24px)';
  el.style.transition = `opacity 0.5s ${i * 0.12}s, transform 0.5s ${i * 0.12}s`;
  benefitsObs.observe(el);
});

// ── INIT ──────────────────────────────────────────────────────
renderOffers();
renderFeaturedOffers();
renderStores();
renderProducts();
renderCampaigns();
initAuth();

// ============================================================
//  AUTENTICAÇÃO (LOGIN / CADASTRO)
// ============================================================
const AUTH_KEY = 'gruplace_user';
const USERS_KEY = 'gruplace_users';

function loadUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) { return []; }
}

function saveUsers(list) {
  localStorage.setItem(USERS_KEY, JSON.stringify(list));
}

function getCurrentUser() {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) { return null; }
}

function setCurrentUser(user) {
  if (user) localStorage.setItem(AUTH_KEY, JSON.stringify(user));
  else localStorage.removeItem(AUTH_KEY);
}

const accountTypeLabel = {
  consumidor: 'Consumidor', lojista: 'Lojista', shopping: 'Shopping',
};

function initAuth() {
  const user = getCurrentUser();
  updateAuthUI(user);

  // Fecha dropdown ao clicar fora
  document.addEventListener('click', (e) => {
    const dropdown = document.getElementById('accountDropdownDesktop');
    const btn = document.querySelector('#accountMenuDesktop .btn-account');
    if (dropdown && dropdown.classList.contains('open')) {
      if (!dropdown.contains(e.target) && e.target !== btn && !btn.contains(e.target)) {
        dropdown.classList.remove('open');
      }
    }
  });
}

function updateAuthUI(user) {
  const loginBtnDesktop   = document.getElementById('loginBtnDesktop');
  const accountMenuDesktop = document.getElementById('accountMenuDesktop');
  const loginBtnMobile   = document.getElementById('loginBtnMobile');
  const accountMenuMobile = document.getElementById('accountMenuMobile');

  if (user) {
    loginBtnDesktop.style.display = 'none';
    accountMenuDesktop.style.display = 'block';
    document.getElementById('accountAvatarDesktop').textContent = user.name.charAt(0).toUpperCase();
    document.getElementById('accountNameDesktop').textContent = `Olá, ${user.name.split(' ')[0]}`;

    loginBtnMobile.style.display = 'none';
    accountMenuMobile.classList.add('show');
    document.getElementById('accountNameMobile').textContent = `Olá, ${user.name.split(' ')[0]} (${accountTypeLabel[user.type] || ''})`;
  } else {
    loginBtnDesktop.style.display = 'inline-block';
    accountMenuDesktop.style.display = 'none';

    loginBtnMobile.style.display = 'block';
    accountMenuMobile.classList.remove('show');
  }
}

function toggleAccountDropdown(e) {
  e.preventDefault();
  e.stopPropagation();
  document.getElementById('accountDropdownDesktop').classList.toggle('open');
}

function openAuthModal(which, e) {
  if (e) e.preventDefault();
  closeAuthModals();
  const overlay = document.getElementById(which === 'register' ? 'registerModalOverlay' : 'loginModalOverlay');
  overlay.classList.add('open');
  return false;
}

function closeAuthModals(e) {
  if (e && e.target !== e.currentTarget) return;
  document.getElementById('loginModalOverlay').classList.remove('open');
  document.getElementById('registerModalOverlay').classList.remove('open');
}

function selectAccountType(el) {
  document.querySelectorAll('#registerAccountType .tag').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
}

function submitLogin(e) {
  e.preventDefault();
  const email    = document.getElementById('loginEmail').value.trim().toLowerCase();
  const password = document.getElementById('loginPassword').value;

  const users = loadUsers();
  const found = users.find(u => u.email === email && u.password === password);

  if (!found) {
    alert('E-mail ou senha incorretos. Verifique seus dados ou crie uma conta.');
    return;
  }

  const session = { name: found.name, email: found.email, type: found.type };
  setCurrentUser(session);
  updateAuthUI(session);
  closeAuthModals();
  document.getElementById('loginForm').reset();
}

function submitRegister(e) {
  e.preventDefault();

  const name     = document.getElementById('registerName').value.trim();
  const email    = document.getElementById('registerEmail').value.trim().toLowerCase();
  const password = document.getElementById('registerPassword').value;
  const confirm  = document.getElementById('registerPasswordConfirm').value;
  const typeEl   = document.querySelector('#registerAccountType .tag.active');
  const type     = typeEl ? typeEl.dataset.type : 'consumidor';

  if (password !== confirm) {
    alert('As senhas não coincidem.');
    return;
  }

  const users = loadUsers();
  if (users.some(u => u.email === email)) {
    alert('Já existe uma conta com este e-mail.');
    return;
  }

  const newUser = { name, email, password, type };
  users.push(newUser);
  saveUsers(users);

  const session = { name, email, type };
  setCurrentUser(session);
  updateAuthUI(session);
  closeAuthModals();
  document.getElementById('registerForm').reset();

  // Se for lojista, leva direto para o dashboard correspondente
  if (type === 'lojista') showStoreOwner();
  else if (type === 'shopping') showShopping();
}

function forgotPassword() {
  alert('Em breve: recuperação de senha por e-mail. (Integração com Supabase/Firebase Auth planejada)');
  return false;
}

function logoutUser() {
  setCurrentUser(null);
  updateAuthUI(null);
  document.getElementById('accountDropdownDesktop').classList.remove('open');
  return false;
}

function accountAction(action) {
  const user = getCurrentUser();
  if (!user) return false;

  document.getElementById('accountDropdownDesktop').classList.remove('open');

  switch (action) {
    case 'campaigns':
      showStoreOwner();
      break;
    case 'inventory':
      showStoreOwner();
      break;
    case 'profile':
    case 'settings':
      alert('Seção em desenvolvimento.');
      break;
  }
  return false;
}

// ============================================================
//  ESTOQUE / PRODUTOS (LOJISTA)
// ============================================================
const PRODUCTS_KEY = 'gruplace_products';
let productImageData = null;
let editingProductId = null;

function loadProducts() {
  try {
    const raw = localStorage.getItem(PRODUCTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) { return []; }
}

function saveProducts(list) {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(list));
  refreshShoppingIntelligenceIfVisible();
}

function getProductStatus(p) {
  if (p.qty === 0) return 'esgotado';
  if (p.qty <= p.minQty) return 'baixo';
  return 'normal';
}

const productStatusLabel = { normal: 'Normal', baixo: 'Baixo', esgotado: 'Esgotado' };

function renderProducts() {
  const list = loadProducts();
  const tbody = document.getElementById('productsTableBody');
  const empty = document.getElementById('productsEmpty');
  const table = document.getElementById('productsTable');

  if (!tbody) return;

  if (list.length === 0) {
    tbody.innerHTML = '';
    table.style.display = 'none';
    empty.classList.add('show');
  } else {
    table.style.display = '';
    empty.classList.remove('show');

    tbody.innerHTML = list.map(p => {
      const status = getProductStatus(p);
      const thumb = p.image
        ? `<img class="product-thumb" src="${p.image}" alt="">`
        : `<div class="product-thumb">${campaignCatEmoji[p.category] || '📦'}</div>`;
      return `
        <tr>
          <td>
            <div class="product-name-cell">
              ${thumb}
              <div>
                <div style="font-weight:700;">${p.name}</div>
                <div style="font-size:11px;color:var(--ink-muted);">${p.sku || ''}</div>
              </div>
            </div>
          </td>
          <td>${campaignCatLabel[p.category] || p.category}</td>
          <td>R$ ${Number(p.price).toFixed(2).replace('.', ',')}</td>
          <td>${p.qty}</td>
          <td><span class="product-status ${status}">${productStatusLabel[status]}</span></td>
          <td>
            <div class="product-actions">
              <button onclick="editProduct('${p.id}')">✎ Editar</button>
              <button class="danger" onclick="deleteProduct('${p.id}')">🗑 Excluir</button>
            </div>
          </td>
        </tr>`;
    }).join('');
  }

  updateInventoryKpis(list);
}

function updateInventoryKpis(list) {
  list = list || loadProducts();
  const total      = list.length;
  const inStock    = list.filter(p => p.qty > 0).length;
  const lowStock   = list.filter(p => p.qty > 0 && p.qty <= p.minQty).length;
  const outOfStock = list.filter(p => p.qty === 0).length;

  document.getElementById('kpiTotalProducts').textContent = total;
  document.getElementById('kpiInStock').textContent       = inStock;
  document.getElementById('kpiLowStock').textContent      = lowStock;
  document.getElementById('kpiOutOfStock').textContent    = outOfStock;
}

function openProductForm() {
  document.getElementById('productModalOverlay').classList.add('open');
}

function closeProductForm(e) {
  if (e && e.target !== e.currentTarget) return;
  document.getElementById('productModalOverlay').classList.remove('open');
  resetProductForm();
}

function resetProductForm() {
  editingProductId = null;
  productImageData = null;
  document.getElementById('productForm').reset();
  document.getElementById('productId').value = '';
  document.getElementById('productFormTitle').textContent = 'Novo Produto';
  document.getElementById('productImagePreview').style.display = 'none';
  document.getElementById('productImagePreview').src = '';
  document.querySelectorAll('#productCategoryTags .tag').forEach((t, i) => {
    t.classList.toggle('active', i === 0);
  });
}

function selectProductCategory(el) {
  document.querySelectorAll('#productCategoryTags .tag').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
}

function previewProductImage(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (ev) => {
    productImageData = ev.target.result;
    const img = document.getElementById('productImagePreview');
    img.src = productImageData;
    img.style.display = 'block';
  };
  reader.readAsDataURL(file);
}

function getSelectedProductCategory() {
  const active = document.querySelector('#productCategoryTags .tag.active');
  return active ? active.dataset.cat : 'moda';
}

function submitProduct(e) {
  e.preventDefault();

  const list = loadProducts();
  const data = {
    id:       editingProductId || ('prod_' + Date.now()),
    name:     document.getElementById('productName').value.trim(),
    category: getSelectedProductCategory(),
    sku:      document.getElementById('productSku').value.trim(),
    price:    parseFloat(document.getElementById('productPrice').value) || 0,
    qty:      parseInt(document.getElementById('productQty').value, 10) || 0,
    minQty:   parseInt(document.getElementById('productMinQty').value, 10) || 0,
    desc:     document.getElementById('productDesc').value.trim(),
    image:    productImageData,
  };

  if (!data.name || !data.sku) {
    alert('Por favor, preencha todos os campos obrigatórios.');
    return;
  }

  if (editingProductId) {
    const idx = list.findIndex(p => p.id === editingProductId);
    if (idx !== -1) {
      if (!data.image) data.image = list[idx].image || null;
      list[idx] = data;
    }
  } else {
    list.unshift(data);
  }

  saveProducts(list);
  renderProducts();
  closeProductForm();

  // Atualiza status de estoque exibido no form de campanha, se aberto
  if (document.getElementById('campaignProduct').value === data.id) {
    onCampaignProductChange();
  }
  if (document.getElementById('campaignModalOverlay').classList.contains('open')) {
    populateCampaignProductSelect(document.getElementById('campaignProduct').value);
  }
}

function editProduct(id) {
  const list = loadProducts();
  const p = list.find(x => x.id === id);
  if (!p) return;

  editingProductId = id;
  productImageData = p.image || null;

  document.getElementById('productFormTitle').textContent = 'Editar Produto';
  document.getElementById('productId').value = p.id;
  document.getElementById('productName').value = p.name;
  document.getElementById('productSku').value = p.sku || '';
  document.getElementById('productPrice').value = p.price;
  document.getElementById('productQty').value = p.qty;
  document.getElementById('productMinQty').value = p.minQty;
  document.getElementById('productDesc').value = p.desc || '';

  document.querySelectorAll('#productCategoryTags .tag').forEach(t => {
    t.classList.toggle('active', t.dataset.cat === p.category);
  });

  const img = document.getElementById('productImagePreview');
  if (p.image) { img.src = p.image; img.style.display = 'block'; }
  else { img.style.display = 'none'; img.src = ''; }

  openProductForm();
}

function deleteProduct(id) {
  if (!confirm('Deseja excluir este produto?')) return;
  const list = loadProducts().filter(p => p.id !== id);
  saveProducts(list);
  renderProducts();

  // Remove vínculo em campanhas que referenciavam este produto
  const campaigns = loadCampaigns().map(c => {
    if (c.productId === id) c.productId = null;
    return c;
  });
  saveCampaigns(campaigns);
  renderCampaigns();
}

// ============================================================
//  DADOS PARA DASHBOARD SHOPPING (uso futuro)
// ============================================================
function getShoppingInsights() {
  const products  = loadProducts();
  const campaigns = loadCampaigns();
  const productById = {};
  products.forEach(p => { productById[p.id] = p; });

  // 1. Categorias com maior disponibilidade (estoque total por categoria)
  const categoryAvailabilityMap = {};
  products.forEach(p => {
    categoryAvailabilityMap[p.category] = (categoryAvailabilityMap[p.category] || 0) + p.qty;
  });
  const categoryAvailability = Object.entries(categoryAvailabilityMap)
    .map(([category, qty]) => ({ category, label: campaignCatLabel[category] || category, qty }))
    .sort((a, b) => b.qty - a.qty);

  // 2. Produtos mais anunciados (mais presentes em campanhas)
  const advertisedCount = {};
  campaigns.forEach(c => {
    if (!c.productId) return;
    advertisedCount[c.productId] = (advertisedCount[c.productId] || 0) + 1;
  });
  const mostAdvertisedProducts = Object.entries(advertisedCount)
    .map(([productId, count]) => ({
      productId, count,
      name: productById[productId] ? productById[productId].name : 'Produto removido',
    }))
    .sort((a, b) => b.count - a.count);

  // 3. Produtos mais procurados (baseado no interesse dos consumidores - aba Consumidor)
  const soughtCount = {};
  interestedCards.forEach(key => {
    soughtCount[key] = (soughtCount[key] || 0) + 1;
  });
  const mostSoughtProducts = offers
    .filter(o => interestedCards.has(o.store + o.title))
    .map(o => ({ store: o.store, title: o.title, category: o.cat }));

  // 4. Tendência de ruptura de estoque (produtos esgotados ou com estoque baixo)
  const stockRuptureRisk = products
    .map(p => ({
      productId: p.id, name: p.name, category: p.category,
      qty: p.qty, minQty: p.minQty, status: getProductStatus(p),
    }))
    .filter(p => p.status !== 'normal')
    .sort((a, b) => a.qty - b.qty);

  // 5. Ranking de lojas com maior giro (mais campanhas ativas)
  const storeTurnover = {};
  campaigns.forEach(c => {
    storeTurnover[c.store] = (storeTurnover[c.store] || 0) + 1;
  });
  const storeRanking = Object.entries(storeTurnover)
    .map(([store, campaignCount]) => ({ store, campaignCount }))
    .sort((a, b) => b.campaignCount - a.campaignCount);

  return {
    categoryAvailability,        // [{ category, label, qty }] ordenado desc
    mostAdvertisedProducts,       // [{ productId, name, count }] ordenado desc
    mostSoughtProducts,           // [{ store, title, category }]
    stockRuptureRisk,             // [{ productId, name, category, qty, minQty, status }] ordenado asc
    storeRanking,                 // [{ store, campaignCount }] ordenado desc
    totalActiveCampaigns: campaigns.length,
    totalProducts: products.length,
  };
}

// ============================================================
//  INTELIGÊNCIA DO SHOPPING – Renderização
// ============================================================

const siCatEmoji = {
  moda: '👗', tecnologia: '📱', gastronomia: '🍔', beleza: '💄', esporte: '👟',
};

const siBarColors = [
  '#2563EB', '#7C3AED', '#0F766E', '#DB2777', '#D97706',
];

// Produtos simulados para "Mais Procurados" (até integração real de views)
const siSimulatedSought = [
  { title: 'Tênis Casual',    views: 420, cat: 'esporte' },
  { title: 'Jaqueta Inverno', views: 380, cat: 'moda'    },
  { title: 'Smartwatch',      views: 320, cat: 'tecnologia' },
  { title: 'Kit Skincare',    views: 275, cat: 'beleza'  },
  { title: 'Camiseta Polo',   views: 230, cat: 'moda'    },
];

function renderShoppingIntelligence() {
  const insights = getShoppingInsights();

  siRenderCategoryAvailability(insights.categoryAvailability);
  siRenderMostAdvertised(insights.mostAdvertisedProducts);
  siRenderMostSought(insights.mostSoughtProducts);
  siRenderRupture(insights.stockRuptureRisk);
  siRenderStoreRanking(insights.storeRanking);
}

function siRenderCategoryAvailability(data) {
  const el = document.getElementById('siCategoryAvailability');
  if (!el) return;

  if (!data || data.length === 0) {
    el.innerHTML = '<div class="si-empty-msg">Cadastre produtos no módulo Lojista para visualizar dados.</div>';
    return;
  }

  const max = data[0].qty || 1;
  el.innerHTML = data.slice(0, 6).map((item, i) => {
    const pct = Math.round((item.qty / max) * 100);
    const emoji = siCatEmoji[item.category] || '📦';
    const color = siBarColors[i % siBarColors.length];
    return `
      <div class="si-rank-item" style="animation-delay:${i * 0.07}s">
        <div class="si-rank-medal">${emoji}</div>
        <div class="si-rank-info">
          <div class="si-rank-name">${item.label}</div>
          <div class="si-rank-bar-wrap">
            <div class="si-rank-bar" style="width:${pct}%;background:${color};"></div>
          </div>
        </div>
        <div class="si-rank-val">${item.qty.toLocaleString('pt-BR')}</div>
      </div>`;
  }).join('');
}

function siRenderMostAdvertised(data) {
  const el = document.getElementById('siMostAdvertised');
  if (!el) return;

  if (!data || data.length === 0) {
    el.innerHTML = '<div class="si-empty-msg">Crie campanhas vinculadas a produtos para ver este ranking.</div>';
    return;
  }

  const medals = ['🥇', '🥈', '🥉'];
  const max = data[0].count || 1;
  el.innerHTML = data.slice(0, 5).map((item, i) => {
    const pct = Math.round((item.count / max) * 100);
    const color = siBarColors[i % siBarColors.length];
    return `
      <div class="si-rank-item" style="animation-delay:${i * 0.07}s">
        <div class="si-rank-medal">${medals[i] || `${i + 1}º`}</div>
        <div class="si-rank-info">
          <div class="si-rank-name">${item.name}</div>
          <div class="si-rank-bar-wrap">
            <div class="si-rank-bar" style="width:${pct}%;background:${color};"></div>
          </div>
        </div>
        <div class="si-rank-val">${item.count} camp.</div>
      </div>`;
  }).join('');
}

function siRenderMostSought(realData) {
  const el = document.getElementById('siMostSought');
  if (!el) return;

  // Mescla dados reais (interesse marcado) com simulados para preencher
  const realItems = (realData || []).map(o => ({
    title: o.title, views: 400 + Math.floor(Math.random() * 100), real: true,
  }));

  // Combina: reais primeiro, depois simulados que não conflitem
  const realTitles = new Set(realItems.map(i => i.title));
  const simItems   = siSimulatedSought.filter(s => !realTitles.has(s.title));
  const combined   = [...realItems, ...simItems].slice(0, 5);

  if (combined.length === 0) {
    el.innerHTML = '<div class="si-empty-msg">Dados de visualização em breve.</div>';
    return;
  }

  el.innerHTML = combined.map((item, i) => `
    <div class="si-sought-item" style="animation-delay:${i * 0.07}s">
      <div class="si-sought-rank">${i + 1}º</div>
      <div class="si-sought-name">${item.title}</div>
      <div class="si-sought-views">👁 ${item.views.toLocaleString('pt-BR')} views</div>
    </div>`).join('');
}

function siRenderRupture(data) {
  const kpisEl = document.getElementById('siRuptureKpis');
  const listEl = document.getElementById('siRuptureList');
  if (!kpisEl || !listEl) return;

  const lowStock   = (data || []).filter(p => p.status === 'baixo');
  const outOfStock = (data || []).filter(p => p.status === 'esgotado');
  const total      = (data || []).length;

  // KPI badges
  if (total === 0) {
    kpisEl.innerHTML = '<span class="si-rupture-badge warn">✅ Todos os estoques regulares</span>';
  } else {
    kpisEl.innerHTML = `
      ${total > 0     ? `<span class="si-rupture-badge warn">⚠ ${total} com risco de ruptura</span>` : ''}
      ${lowStock.length > 0   ? `<span class="si-rupture-badge critical">⚠ ${lowStock.length} com estoque crítico</span>` : ''}
      ${outOfStock.length > 0 ? `<span class="si-rupture-badge out">🚫 ${outOfStock.length} esgotados</span>` : ''}
    `;
  }

  // Lista de produtos em risco
  if (!data || data.length === 0) {
    listEl.innerHTML = '<div class="si-empty-msg">Nenhum produto em situação crítica no momento.</div>';
    return;
  }

  const emoji = siCatEmoji;
  listEl.innerHTML = data.slice(0, 6).map((p, i) => `
    <div class="si-rupture-item ${p.status}" style="animation-delay:${i * 0.07}s">
      <span style="font-size:16px;">${emoji[p.category] || '📦'}</span>
      <span class="si-rupture-name">${p.name}</span>
      <span class="si-rupture-qty">${p.qty === 0 ? 'Esgotado' : `${p.qty} un.`}</span>
    </div>`).join('');
}

function siRenderStoreRanking(data) {
  const el = document.getElementById('siStoreRanking');
  if (!el) return;

  if (!data || data.length === 0) {
    el.innerHTML = '<div class="si-empty-msg">Nenhuma loja com campanhas ativas ainda.</div>';
    return;
  }

  const medals = ['🥇', '🥈', '🥉'];
  el.innerHTML = data.slice(0, 6).map((item, i) => `
    <div class="si-store-rank-card" style="animation-delay:${i * 0.07}s">
      <div class="si-store-medal">${medals[i] || `${i + 1}º`}</div>
      <div class="si-store-info">
        <div class="si-store-name">${item.store}</div>
        <div class="si-store-meta">${item.campaignCount} campanha${item.campaignCount !== 1 ? 's' : ''} ativa${item.campaignCount !== 1 ? 's' : ''}</div>
      </div>
      <div class="si-store-score">#${i + 1}</div>
    </div>`).join('');
}

// Gatilho automático: re-renderiza sempre que a aba Shopping está ativa
function refreshShoppingIntelligenceIfVisible() {
  if (activeTab === 'shopping') {
    renderShoppingIntelligence();
  }
}


const CAMPAIGNS_KEY = 'gruplace_campaigns';
let campaignImageData = null;
let editingCampaignId = null;

const campaignCatEmoji = {
  moda: '👗', tecnologia: '📱', gastronomia: '🍔', beleza: '💄', esporte: '👟',
};
const campaignCatLabel = {
  moda: 'Moda', tecnologia: 'Tecnologia', gastronomia: 'Gastronomia', beleza: 'Beleza', esporte: 'Esportes',
};

function loadCampaigns() {
  try {
    const raw = localStorage.getItem(CAMPAIGNS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveCampaigns(list) {
  localStorage.setItem(CAMPAIGNS_KEY, JSON.stringify(list));
  refreshShoppingIntelligenceIfVisible();
}

function formatDate(d) {
  if (!d) return '';
  const [y, m, day] = d.split('-');
  return `${day}/${m}/${y}`;
}

function renderCampaigns() {
  const list = loadCampaigns();
  const grid  = document.getElementById('campaignsGrid');
  const empty = document.getElementById('campaignsEmpty');

  if (!grid) return;

  if (list.length === 0) {
    grid.innerHTML = '';
    empty.classList.add('show');
    return;
  }
  empty.classList.remove('show');

  grid.innerHTML = list.map(c => {
    const product = c.productId ? loadProducts().find(p => p.id === c.productId) : null;
    return `
    <div class="campaign-card">
      <div class="campaign-card-img" ${c.image ? `style="background-image:url('${c.image}');background-size:cover;background-position:center;"` : ''}>
        ${c.image ? '' : (campaignCatEmoji[c.category] || '🎁')}
      </div>
      <div class="campaign-card-body">
        <div class="campaign-card-status">Ativa</div>
        <div class="campaign-card-store">${c.store} · ${campaignCatLabel[c.category] || ''}</div>
        <div class="campaign-card-title">${c.name}</div>
        ${product ? `<div class="campaign-card-period">Produto: ${product.name}</div>` : ''}
        <div class="campaign-card-disc">${c.discount}</div>
        <div class="campaign-card-desc">${c.desc}</div>
        <div class="campaign-card-period">${formatDate(c.start)} – ${formatDate(c.end)}</div>
        <div class="campaign-card-actions">
          <button onclick="editCampaign('${c.id}')">✎ Editar</button>
          <button class="danger" onclick="deleteCampaign('${c.id}')">🗑 Excluir</button>
        </div>
      </div>
    </div>`;
  }).join('');
}

function openCampaignForm() {
  document.getElementById('campaignModalOverlay').classList.add('open');
}

function closeCampaignForm(e) {
  document.getElementById('campaignModalOverlay').classList.remove('open');
  resetCampaignForm();
}

function resetCampaignForm() {
  editingCampaignId = null;
  campaignImageData = null;
  document.getElementById('campaignForm').reset();
  document.getElementById('campaignId').value = '';
  document.getElementById('campaignFormTitle').textContent = 'Nova Campanha';
  document.getElementById('campaignImagePreview').style.display = 'none';
  document.getElementById('campaignImagePreview').src = '';
  document.querySelectorAll('#campaignCategoryTags .tag').forEach((t, i) => {
    t.classList.toggle('active', i === 0);
  });
  populateCampaignProductSelect();
  const stockInfo = document.getElementById('campaignStockInfo');
  stockInfo.style.display = 'none';
  stockInfo.textContent = '';
}

function populateCampaignProductSelect(selectedId) {
  const select = document.getElementById('campaignProduct');
  const products = loadProducts();
  select.innerHTML = '<option value="">Selecione um produto...</option>' +
    products.map(p => `<option value="${p.id}" ${p.id === selectedId ? 'selected' : ''}>${p.name} (${campaignCatLabel[p.category] || p.category})</option>`).join('');
}

function onCampaignProductChange() {
  const select = document.getElementById('campaignProduct');
  const stockInfo = document.getElementById('campaignStockInfo');
  const productId = select.value;

  if (!productId) {
    stockInfo.style.display = 'none';
    stockInfo.textContent = '';
    return;
  }

  const product = loadProducts().find(p => p.id === productId);
  if (!product) return;

  stockInfo.style.display = 'block';

  if (product.qty === 0) {
    stockInfo.className = 'campaign-stock-info out';
    stockInfo.textContent = 'Produto esgotado. Não é possível publicar esta campanha.';
  } else if (product.qty <= product.minQty) {
    stockInfo.className = 'campaign-stock-info low';
    stockInfo.textContent = `⚠ Produto com estoque baixo. Disponível: ${product.qty} unidades`;
  } else {
    stockInfo.className = 'campaign-stock-info ok';
    stockInfo.textContent = `Disponível: ${product.qty} unidades`;
  }
}

function selectCampaignCategory(el) {
  document.querySelectorAll('#campaignCategoryTags .tag').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
}

function previewCampaignImage(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (ev) => {
    campaignImageData = ev.target.result;
    const img = document.getElementById('campaignImagePreview');
    img.src = campaignImageData;
    img.style.display = 'block';
  };
  reader.readAsDataURL(file);
}

function getSelectedCampaignCategory() {
  const active = document.querySelector('#campaignCategoryTags .tag.active');
  return active ? active.dataset.cat : 'moda';
}

function submitCampaign(e) {
  e.preventDefault();

  const productId = document.getElementById('campaignProduct').value;
  if (!productId) {
    alert('Selecione um produto relacionado.');
    return;
  }

  const product = loadProducts().find(p => p.id === productId);
  if (!product) {
    alert('Produto não encontrado.');
    return;
  }

  if (product.qty === 0) {
    alert('Produto esgotado. Não é possível publicar esta campanha.');
    return;
  }

  const list = loadCampaigns();
  const data = {
    id:        editingCampaignId || ('camp_' + Date.now()),
    name:      document.getElementById('campaignName').value.trim(),
    store:     document.getElementById('campaignStore').value.trim(),
    category:  getSelectedCampaignCategory(),
    productId: productId,
    desc:      document.getElementById('campaignDesc').value.trim(),
    discount:  document.getElementById('campaignDiscount').value.trim(),
    start:     document.getElementById('campaignStart').value,
    end:       document.getElementById('campaignEnd').value,
    image:     campaignImageData,
  };

  if (!data.name || !data.store || !data.desc || !data.discount || !data.start || !data.end) {
    alert('Por favor, preencha todos os campos obrigatórios.');
    return;
  }

  if (editingCampaignId) {
    const idx = list.findIndex(c => c.id === editingCampaignId);
    if (idx !== -1) {
      if (!data.image) data.image = list[idx].image || null;
      list[idx] = data;
    }
  } else {
    list.unshift(data);
  }

  saveCampaigns(list);
  renderCampaigns();
  closeCampaignForm();
}

function editCampaign(id) {
  const list = loadCampaigns();
  const c = list.find(x => x.id === id);
  if (!c) return;

  editingCampaignId = id;
  campaignImageData = c.image || null;

  document.getElementById('campaignFormTitle').textContent = 'Editar Campanha';
  document.getElementById('campaignId').value = c.id;
  document.getElementById('campaignName').value = c.name;
  document.getElementById('campaignStore').value = c.store;
  document.getElementById('campaignDesc').value = c.desc;
  document.getElementById('campaignDiscount').value = c.discount;
  document.getElementById('campaignStart').value = c.start;
  document.getElementById('campaignEnd').value = c.end;

  document.querySelectorAll('#campaignCategoryTags .tag').forEach(t => {
    t.classList.toggle('active', t.dataset.cat === c.category);
  });

  populateCampaignProductSelect(c.productId || '');
  onCampaignProductChange();

  const img = document.getElementById('campaignImagePreview');
  if (c.image) { img.src = c.image; img.style.display = 'block'; }
  else { img.style.display = 'none'; img.src = ''; }

  openCampaignForm();
}

function deleteCampaign(id) {
  if (!confirm('Tem certeza que deseja excluir esta campanha?')) return;
  const list = loadCampaigns().filter(c => c.id !== id);
  saveCampaigns(list);
  renderCampaigns();
}

/* ═══════════════════════════════════════════════════════════════
   EQUIPE E PRÓXIMOS PASSOS — animação de entrada (scroll reveal)
   ═══════════════════════════════════════════════════════════════ */
(function () {
  function initTeamSectionReveal() {
    var targets = document.querySelectorAll('.team-card, .roadmap-card');
    if (!targets.length) return;

    if (!('IntersectionObserver' in window)) {
      targets.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, index) {
        if (entry.isIntersecting) {
          setTimeout(function () {
            entry.target.classList.add('is-visible');
          }, index * 80);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    targets.forEach(function (el) { observer.observe(el); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTeamSectionReveal);
  } else {
    initTeamSectionReveal();
  }
})();
