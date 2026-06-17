// Estado inicial
const STORAGE_KEY = "bhSystemsDemoState";
const PRODUCT_IMAGE = "assets/cafe-cordillera/cafe-cordillera-empaque.png";

const demoInvoice = {
  number: "CC-2026-031",
  date: "2026-06-15",
  customer: "Xtra Supermercados",
  items: [
    { productId: "empaque-212", quantity: 120, unitPrice: 3.2 },
    { productId: "empaque-425", quantity: 60, unitPrice: 5.8 },
    { productId: "empaque-22", quantity: 200, unitPrice: 0.75 }
  ],
  paymentReceived: 402
};

const initialState = {
  products: [
    {
      id: "empaque-22",
      name: "Empaque 22 g",
      category: "Porción individual · Sobre",
      size: "22 g",
      unit: "unidades",
      price: 0.75,
      bestBefore: "2026-06-28",
      accent: "#C8102E",
      productBg: "#FDF0F1",
      imageScale: "1.18",
      imageX: "-2%",
      state: "Alta rotación",
      statusText: "En orden"
    },
    {
      id: "empaque-212",
      name: "Empaque 212 g",
      category: "Familiar · Bolsa estándar",
      size: "212 g",
      unit: "unidades",
      price: 3.2,
      bestBefore: "2026-07-15",
      accent: "#A00D24",
      productBg: "#FBE8EA",
      imageScale: "1.2",
      imageX: "0%",
      state: "En orden",
      statusText: "Saludable"
    },
    {
      id: "empaque-425",
      name: "Empaque 425 g",
      category: "Premium · Bolsa grande",
      size: "425 g",
      unit: "unidades",
      price: 5.8,
      bestBefore: "2026-07-22",
      accent: "#7D0A1B",
      productBg: "#F8E0E3",
      imageScale: "1.16",
      imageX: "2%",
      state: "Stock bajo — 2 cadenas",
      statusText: "Reponer en 2 puntos"
    }
  ],
  stores: [
    { id: "riba-smith", name: "Riba Smith", type: "Supermercado · múltiples sedes", status: "En orden", rotation: 87, stock: 156, restockDate: "2026-06-21", pendingBalance: 0, bestSeller: "Empaque 212 g", priorityUnits: 4 },
    { id: "super-rey", name: "Super Rey", type: "Supermercado · múltiples sedes", status: "En orden", rotation: 84, stock: 214, restockDate: "2026-06-22", pendingBalance: 0, bestSeller: "Empaque 212 g", priorityUnits: 6 },
    { id: "super-99", name: "Super 99", type: "Supermercado · cobertura nacional", status: "Reposición", rotation: 91, stock: 12, restockDate: "2026-06-17", pendingBalance: 0, bestSeller: "Empaque 425 g", priorityUnits: 0 },
    { id: "xtra", name: "Xtra", type: "Supermercado", status: "Pago pendiente", rotation: 76, stock: 188, restockDate: "2026-06-24", pendingBalance: 480, bestSeller: "Empaque 212 g", priorityUnits: 14 },
    { id: "el-machetazo", name: "El Machetazo", type: "Cadena popular", status: "En orden", rotation: 69, stock: 240, restockDate: "2026-06-26", pendingBalance: 0, bestSeller: "Empaque 22 g", priorityUnits: 18 },
    { id: "romero", name: "Romero", type: "Supermercado", status: "Pago pendiente", rotation: 61, stock: 96, restockDate: "2026-06-28", pendingBalance: 700, bestSeller: "Empaque 212 g", priorityUnits: 8 },
    { id: "el-fuerte", name: "El Fuerte", type: "Supermercado regional", status: "Confirmar entrega", rotation: 73, stock: 148, restockDate: "2026-06-25", pendingBalance: 0, bestSeller: "Empaque 425 g", priorityUnits: 5 },
    { id: "super-carnes", name: "Super Carnes", type: "Supermercado · cobertura regional", status: "Stock bajo", rotation: 79, stock: 38, restockDate: "2026-06-19", pendingBalance: 250, bestSeller: "Empaque 425 g", priorityUnits: 7 }
  ],
  inventory: [
    { id: "inv-riba-22", storeId: "riba-smith", productId: "empaque-22", delivered: 260, sold: 226, returned: 0, adjusted: 0, waste: 0, stock: 34, bestBefore: "2026-07-08", status: "En orden", balance: 0 },
    { id: "inv-riba-212", storeId: "riba-smith", productId: "empaque-212", delivered: 620, sold: 539, returned: 0, adjusted: 0, waste: 0, stock: 81, bestBefore: "2026-07-15", status: "En orden", balance: 0 },
    { id: "inv-riba-425", storeId: "riba-smith", productId: "empaque-425", delivered: 320, sold: 279, returned: 0, adjusted: 0, waste: 0, stock: 41, bestBefore: "2026-07-22", status: "En orden", balance: 0 },
    { id: "inv-rey-212", storeId: "super-rey", productId: "empaque-212", delivered: 834, sold: 620, returned: 0, adjusted: 0, waste: 0, stock: 214, bestBefore: "2026-07-15", status: "En orden", balance: 0 },
    { id: "inv-99-425", storeId: "super-99", productId: "empaque-425", delivered: 260, sold: 248, returned: 0, adjusted: 0, waste: 0, stock: 12, bestBefore: "2026-07-22", status: "Reposición", balance: 0 },
    { id: "inv-xtra-212", storeId: "xtra", productId: "empaque-212", delivered: 570, sold: 382, returned: 0, adjusted: 0, waste: 0, stock: 188, bestBefore: "2026-07-10", status: "Pago pendiente", balance: 480 },
    { id: "inv-machetazo-22", storeId: "el-machetazo", productId: "empaque-22", delivered: 680, sold: 440, returned: 0, adjusted: 0, waste: 0, stock: 240, bestBefore: "2026-06-28", status: "Próximo a vencer", balance: 0 },
    { id: "inv-romero-212", storeId: "romero", productId: "empaque-212", delivered: 406, sold: 310, returned: 0, adjusted: 0, waste: 0, stock: 96, bestBefore: "2026-07-18", status: "Pago pendiente", balance: 700 },
    { id: "inv-fuerte-425", storeId: "el-fuerte", productId: "empaque-425", delivered: 358, sold: 210, returned: 0, adjusted: 0, waste: 0, stock: 148, bestBefore: "2026-07-22", status: "Confirmar entrega", balance: 0 },
    { id: "inv-carnes-22", storeId: "super-carnes", productId: "empaque-22", delivered: 36, sold: 28, returned: 0, adjusted: 0, waste: 0, stock: 8, bestBefore: "2026-07-05", status: "Stock bajo", balance: 0 },
    { id: "inv-carnes-212", storeId: "super-carnes", productId: "empaque-212", delivered: 60, sold: 47, returned: 0, adjusted: 0, waste: 0, stock: 13, bestBefore: "2026-07-12", status: "Pago pendiente", balance: 90 },
    { id: "inv-carnes-425", storeId: "super-carnes", productId: "empaque-425", delivered: 85, sold: 68, returned: 0, adjusted: 0, waste: 0, stock: 17, bestBefore: "2026-07-19", status: "Stock bajo", balance: 160 }
  ],
  movements: [
    { id: "mov-001", type: "Nueva entrega", storeId: "riba-smith", productId: "empaque-212", quantity: 120, amount: 0, note: "Entrega inicial a múltiples sedes.", createdAt: "2026-06-15T09:00:00" },
    { id: "mov-002", type: "Venta reportada", storeId: "xtra", productId: "empaque-212", quantity: 150, amount: 480, note: "Liquidación parcial.", createdAt: "2026-06-15T11:15:00" },
    { id: "mov-003", type: "Pago recibido", storeId: "super-rey", productId: null, quantity: 0, amount: 402, note: "Cobro aplicado.", createdAt: "2026-06-16T10:30:00" }
  ],
  sales: [
    { id: "sale-001", storeId: "xtra", productId: "empaque-212", quantity: 150, amount: 480, createdAt: "2026-06-15T11:15:00" }
  ],
  collections: [
    { id: "col-001", storeId: "super-rey", amount: 402, createdAt: "2026-06-16T10:30:00" }
  ]
};

let state;
let movementStep = 1;
let movementType = "Nueva entrega";
let memoryStateCache = null;

// Persistencia
function cloneState(source) {
  return typeof structuredClone === "function"
    ? structuredClone(source)
    : JSON.parse(JSON.stringify(source));
}

function getStorage() {
  try {
    if (typeof window !== "undefined" && window.localStorage) return window.localStorage;
  } catch {
    return null;
  }
  return null;
}

function normalizeNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
}

function normalizeState(savedState) {
  const base = cloneState(initialState);
  const incoming = savedState && typeof savedState === "object" ? savedState : {};
  const products = Array.isArray(incoming.products) ? incoming.products : [];
  const stores = Array.isArray(incoming.stores) ? incoming.stores : [];
  const inventory = Array.isArray(incoming.inventory) ? incoming.inventory : [];

  const mergedProducts = base.products.map(product => ({
    ...product,
    ...(products.find(item => item.id === product.id) || {})
  }));
  products.forEach(product => {
    if (product?.id && !mergedProducts.some(item => item.id === product.id)) mergedProducts.push(product);
  });

  const mergedStores = base.stores.map(store => ({
    ...store,
    ...(stores.find(item => item.id === store.id) || {})
  }));
  stores.forEach(store => {
    if (store?.id && !mergedStores.some(item => item.id === store.id)) mergedStores.push(store);
  });

  const mergedInventory = inventory.length ? inventory : base.inventory;
  return {
    products: mergedProducts,
    stores: mergedStores,
    inventory: mergedInventory.map(item => ({
      ...item,
      delivered: normalizeNumber(item.delivered),
      sold: normalizeNumber(item.sold),
      returned: normalizeNumber(item.returned),
      adjusted: normalizeNumber(item.adjusted),
      waste: normalizeNumber(item.waste),
      stock: Math.max(0, normalizeNumber(item.stock)),
      balance: Math.max(0, normalizeNumber(item.balance))
    })),
    movements: Array.isArray(incoming.movements) ? incoming.movements : base.movements,
    sales: Array.isArray(incoming.sales) ? incoming.sales : base.sales,
    collections: Array.isArray(incoming.collections) ? incoming.collections : base.collections
  };
}

function loadState() {
  try {
    const storage = getStorage();
    const stored = storage ? storage.getItem(STORAGE_KEY) : memoryStateCache;
    if (!stored) return normalizeState(initialState);
    const parsed = typeof stored === "string" ? JSON.parse(stored) : stored;
    return normalizeState(parsed);
  } catch {
    return normalizeState(initialState);
  }
}

function saveState() {
  const storage = getStorage();
  if (storage) storage.setItem(STORAGE_KEY, JSON.stringify(state));
  else memoryStateCache = cloneState(state);
}

function resetState() {
  if (!confirm("¿Restablecer la demo a sus datos iniciales?")) return;
  const storage = getStorage();
  if (storage) storage.removeItem(STORAGE_KEY);
  else memoryStateCache = null;
  state = normalizeState(initialState);
  syncStores();
  renderAll();
  showToast("Demo restablecida correctamente.");
}

// Utilidades
const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

function initIcons() {
  if (window.lucide) window.lucide.createIcons();
}

function formatCurrency(value, decimals = null) {
  const amount = Number(value) || 0;
  const resolvedDecimals = decimals ?? (Number.isInteger(amount) ? 0 : 2);
  return `USD ${new Intl.NumberFormat("en-US", {
    minimumFractionDigits: resolvedDecimals,
    maximumFractionDigits: resolvedDecimals
  }).format(amount)}`;
}

function formatMoneyExact(value) {
  return formatCurrency(value, 2);
}

function formatDateSlash(value) {
  if (!value) return "—";
  const [year, month, day] = value.split("-");
  return `${day}/${month}/${year}`;
}

function formatSummaryDate(value) {
  if (!value || value === "No aplica") return "No aplica";
  const [year, month, day] = value.split("-");
  const months = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
  return `${Number(day)} ${months[Number(month) - 1]} ${year}`;
}

function formatShortDate(value) {
  if (!value) return "—";
  const [year, month, day] = value.split("-");
  const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
  return `${Number(day)} ${months[Number(month) - 1]}`;
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function createId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function getProduct(productId) {
  return state.products.find(product => product.id === productId);
}

function getStore(storeId) {
  return state.stores.find(store => store.id === storeId);
}

function getInventoryRow(storeId, productId) {
  return state.inventory.find(item => item.storeId === storeId && item.productId === productId);
}

function ensureInventoryRow(storeId, productId) {
  let row = getInventoryRow(storeId, productId);
  if (row) return row;
  const product = getProduct(productId);
  row = {
    id: createId("inv"),
    storeId,
    productId,
    delivered: 0,
    sold: 0,
    returned: 0,
    adjusted: 0,
    waste: 0,
    stock: 0,
    bestBefore: product?.bestBefore || "2026-07-15",
    status: "En orden",
    balance: 0
  };
  state.inventory.push(row);
  return row;
}

function parseAmount(value) {
  return Number(String(value).replace(/[^\d.-]/g, "")) || 0;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function normalizeSearch(value) {
  return String(value || "").trim().replace(/\s+/g, " ").toLowerCase();
}

function earliestDate(currentDate, newDate) {
  if (!currentDate) return newDate || "";
  if (!newDate) return currentDate;
  return newDate < currentDate ? newDate : currentDate;
}

function daysUntilExpiration(date) {
  if (!date) return Number.POSITIVE_INFINITY;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(`${date}T00:00:00`);
  return Math.ceil((target - today) / 86400000);
}

function isExpiringSoon(item, days = 10) {
  if (!item.bestBefore || Number(item.stock || 0) <= 0) return false;
  return daysUntilExpiration(item.bestBefore) <= days;
}

function stateClass(status) {
  if (["En orden", "Alta rotación", "Saludable"].includes(status)) return "green";
  if (["Pago pendiente", "Próximo a vencer", "Planificar ruta"].includes(status)) return "warning";
  if (["Reposición", "Stock bajo", "Reponer en 2 puntos"].includes(status)) return "orange";
  if (["Confirmar entrega"].includes(status)) return "info";
  return "";
}

function setText(selector, value, scope = document) {
  const element = $(selector, scope);
  if (element) element.textContent = value;
}

// Cálculos
function calculateTotalInventory() {
  return state.inventory.reduce((sum, item) => sum + Number(item.stock || 0), 0);
}

function calculateTotalDelivered() {
  return state.inventory.reduce((sum, item) => sum + Number(item.delivered || 0), 0);
}

function calculateTotalSold() {
  return state.inventory.reduce((sum, item) => sum + Number(item.sold || 0), 0);
}

function calculateTotalInvoiced() {
  return state.inventory.reduce((sum, item) => {
    const product = getProduct(item.productId);
    return sum + Number(item.sold || 0) * Number(product?.price || 0);
  }, 0);
}

function calculatePendingBalance() {
  return state.inventory.reduce((sum, item) => sum + Number(item.balance || 0), 0);
}

function calculateTotalCollected() {
  return Math.max(0, calculateTotalInvoiced() - calculatePendingBalance());
}

function calculateLowStock() {
  return state.stores.filter(store => ["Reposición", "Stock bajo", "Confirmar entrega"].includes(store.status)).length;
}

function calculateExpiringUnits(days = 10) {
  return state.inventory.reduce((sum, item) => {
    return isExpiringSoon(item, days) ? sum + Number(item.stock || 0) : sum;
  }, 0);
}

function calculateStoreExpiringUnits(storeId, days = 10) {
  return state.inventory.reduce((sum, item) => {
    return item.storeId === storeId && isExpiringSoon(item, days) ? sum + Number(item.stock || 0) : sum;
  }, 0);
}

function calculateReturnedUnits() {
  return state.inventory.reduce((sum, item) => sum + Number(item.returned || 0), 0);
}

function calculateWasteUnits() {
  return state.inventory.reduce((sum, item) => sum + Number(item.waste || 0), 0);
}

function calculateWasteRate() {
  const delivered = calculateTotalDelivered();
  return delivered > 0 ? (calculateWasteUnits() / delivered) * 100 : 0;
}

function syncStores() {
  state.stores.forEach(store => {
    const rows = state.inventory.filter(item => item.storeId === store.id);
    const stock = rows.reduce((sum, item) => sum + Number(item.stock || 0), 0);
    const delivered = rows.reduce((sum, item) => sum + Number(item.delivered || 0), 0);
    const sold = rows.reduce((sum, item) => sum + Number(item.sold || 0), 0);
    const pending = rows.reduce((sum, item) => sum + Number(item.balance || 0), 0);
    const top = rows.slice().sort((a, b) => (b.sold || 0) - (a.sold || 0))[0];

    store.stock = stock;
    store.rotation = delivered > 0 ? Math.round((sold / delivered) * 100) : store.rotation;
    store.pendingBalance = pending;
    if (top) store.bestSeller = getProduct(top.productId)?.name || store.bestSeller;
    if (stock < 50) store.status = "Stock bajo";
    else if (pending > 0) store.status = "Pago pendiente";
    else if (store.status !== "Confirmar entrega") store.status = "En orden";
  });
}

function productStats(productId) {
  const rows = state.inventory.filter(item => item.productId === productId);
  return {
    stock: rows.reduce((sum, item) => sum + Number(item.stock || 0), 0),
    sold: rows.reduce((sum, item) => sum + Number(item.sold || 0), 0),
    bestBefore: rows.map(item => item.bestBefore).filter(Boolean).sort()[0] || getProduct(productId)?.bestBefore
  };
}

// Renderizado
function renderDashboard() {
  const totalInventory = calculateTotalInventory();
  const totalSold = calculateTotalSold();
  const pending = calculatePendingBalance();
  const invoiced = calculateTotalInvoiced();
  const collected = calculateTotalCollected();
  const collectionRate = invoiced > 0 ? Math.round((collected / invoiced) * 100) : 0;
  const expiringUnits = calculateExpiringUnits();
  const metrics = $$(".metric-value");

  if (metrics[0]) metrics[0].textContent = totalInventory.toLocaleString("en-US");
  if (metrics[1]) metrics[1].textContent = totalSold.toLocaleString("en-US");
  if (metrics[2]) metrics[2].textContent = expiringUnits.toLocaleString("en-US");
  if (metrics[3]) metrics[3].textContent = String(calculateLowStock());

  const financeCards = $$(".finance-card strong");
  if (financeCards[0]) financeCards[0].textContent = formatCurrency(invoiced);
  if (financeCards[1]) financeCards[1].textContent = formatCurrency(pending);

  const miniStats = $$(".mini-stat strong");
  if (miniStats[0]) miniStats[0].textContent = `${state.stores.length} cadenas`;
  if (miniStats[1]) miniStats[1].textContent = `${state.products.length} tamaños`;
  if (miniStats[2]) miniStats[2].textContent = `${collectionRate}% al día`;

  const pendingState = $$(".finance-card .state")[1];
  if (pendingState) pendingState.textContent = `${state.stores.filter(store => store.pendingBalance > 0).length} cadenas`;

  const alertCards = $$(".alert-card");
  const expiringAlert = alertCards[1]?.querySelector("p");
  if (expiringAlert) expiringAlert.textContent = `${expiringUnits.toLocaleString("en-US")} unidades vencen en los próximos 10 días o ya están vencidas.`;
  const paymentAlert = alertCards[2]?.querySelector("p");
  if (paymentAlert) paymentAlert.textContent = `${formatCurrency(pending)} pendientes en ${state.stores.filter(store => store.pendingBalance > 0).length} cadenas con historial de pago parcial.`;

  const lossValues = $$(".loss-card strong");
  if (lossValues[0]) lossValues[0].textContent = `${Number(calculateWasteRate().toFixed(2))}%`;
  if (lossValues[1]) lossValues[1].textContent = calculateReturnedUnits().toLocaleString("en-US");
  if (lossValues[2]) lossValues[2].textContent = state.stores.filter(store => store.status === "Confirmar entrega").length.toLocaleString("en-US");
}

function renderProducts() {
  const grid = $(".products-grid");
  if (!grid) return;
  grid.innerHTML = state.products.map(product => {
    const stats = productStats(product.id);
    const lowStockStores = state.inventory.filter(item => item.productId === product.id && item.stock < 20).length;
    const statusText = lowStockStores > 0 ? `Reponer en ${lowStockStores} puntos` : product.statusText;
    const stateLabel = lowStockStores > 0 ? `Stock bajo — ${lowStockStores} cadenas` : product.state;
    return `
      <article class="product-card" style="--accent:${product.accent}; --product-bg:${product.productBg};">
        <div class="product-media">
          <span class="flavor-dot"></span>
          <div class="product-image-wrapper stock-product-image" style="--image-scale:${product.imageScale};--image-x:${product.imageX};">
            <img src="${PRODUCT_IMAGE}" alt="${escapeHtml(product.name)} Café Cordillera">
          </div>
        </div>
        <div class="product-body">
          <div class="product-head">
            <div><h3>${escapeHtml(product.name)}</h3><p class="product-category">${escapeHtml(product.category)}</p></div>
            <span class="state ${stateClass(stateLabel)}">${escapeHtml(stateLabel)}</span>
          </div>
          <div class="product-stats">
            <div class="product-stat"><span>Stock actual</span><strong>${stats.stock.toLocaleString("en-US")} unidades</strong></div>
            <div class="product-stat"><span>Vendidas</span><strong>${stats.sold.toLocaleString("en-US")} unidades</strong></div>
            <div class="product-stat"><span>Vence primero</span><strong>${formatDateSlash(stats.bestBefore)}</strong></div>
            <div class="product-stat"><span>Estado</span><strong>${escapeHtml(statusText)}</strong></div>
          </div>
        </div>
      </article>`;
  }).join("");
}

function renderStores() {
  const grid = $(".store-grid");
  if (!grid) return;
  grid.innerHTML = state.stores.map(store => `
    <article class="store-card" style="--accent:#C8102E; --rate:${store.rotation}%;">
      <div class="store-head"><div><h3>${escapeHtml(store.name)}</h3><p>${escapeHtml(store.type)}</p></div><span class="state ${stateClass(store.status)}">${escapeHtml(store.status)}</span></div>
      <div class="rotation"><div class="rotation-line"><span></span></div><span class="state">Rotación ${store.rotation}%</span></div>
      <div class="store-metrics"><div class="store-metric"><span>Stock</span><strong>${store.stock}</strong></div><div class="store-metric"><span>Reposición</span><strong>${formatShortDate(store.restockDate)}</strong></div><div class="store-metric"><span>Saldo</span><strong>${formatCurrency(store.pendingBalance)}</strong></div></div>
      <div class="store-detail"><span><b>Más vendido:</b> ${escapeHtml(store.bestSeller)}</span><span><b>Próximos a vencer:</b> ${calculateStoreExpiringUnits(store.id)} unidades</span></div>
    </article>
  `).join("");
}

function getInventoryFilters() {
  return {
    query: normalizeSearch($("[data-filter-search]")?.value),
    status: $("[data-filter-status]")?.value || "all",
    point: $("[data-filter-point]")?.value || "all"
  };
}

function getFilteredInventoryRows() {
  const filters = getInventoryFilters();
  return state.inventory.filter(item => {
    const store = getStore(item.storeId);
    const product = getProduct(item.productId);
    const haystack = normalizeSearch(`${store?.name || ""} ${product?.name || ""} ${item.status || ""}`);
    const matchesSearch = !filters.query || haystack.includes(filters.query);
    const matchesStatus = filters.status === "all" || item.status === filters.status;
    const matchesPoint = filters.point === "all" || store?.name === filters.point;
    return matchesSearch && matchesStatus && matchesPoint;
  });
}

function renderInventory() {
  const body = $("[data-inventory-body]");
  if (!body) return;
  const rows = getFilteredInventoryRows();

  body.innerHTML = rows.map(item => {
    const product = getProduct(item.productId);
    const store = getStore(item.storeId);
    return `
      <tr data-search-row data-product="${escapeHtml(product.name)}" data-point="${escapeHtml(store.name)}" data-status="${escapeHtml(item.status)}">
        <td data-label="Producto"><div class="product-line"><span class="product-thumb"><span class="product-image-wrapper thumb-product-image" style="--image-scale:1.1;"><img src="${PRODUCT_IMAGE}" alt="${escapeHtml(product.name)} Café Cordillera"></span></span><div><strong>${escapeHtml(product.name)}</strong><span>${escapeHtml(product.category)}</span></div></div></td>
        <td data-label="Cadena">${escapeHtml(store.name)}</td>
        <td data-label="Stock">${item.stock}</td>
        <td data-label="Vencimiento">${formatDateSlash(item.bestBefore)}</td>
        <td data-label="Estado"><span class="state ${stateClass(item.status)}">${escapeHtml(item.status)}</span></td>
        <td data-label="Vendido">${item.sold}</td>
        <td data-label="Saldo">${formatCurrency(item.balance)}</td>
      </tr>`;
  }).join("");
}

function renderCharts() {
  const stats = state.products.map(product => ({ product, ...productStats(product.id) }));
  const maxSold = Math.max(...stats.map(item => item.sold), 1);
  $$(".bar-chart .bar-row").forEach((row, index) => {
    const item = stats[index];
    if (!item) return;
    row.style.setProperty("--value", `${Math.max(4, Math.round((item.sold / maxSold) * 100))}%`);
    const name = $("span", row);
    const value = $("strong", row);
    if (name) name.textContent = item.product.size;
    if (value) value.textContent = item.sold.toLocaleString("en-US");
  });

  const rotationRows = $$(".rotation-row");
  state.stores.slice(0, rotationRows.length).forEach((store, index) => {
    const row = rotationRows[index];
    row.style.setProperty("--value", `${store.rotation}%`);
    const name = $("span", row);
    const value = $("strong", row);
    if (name) name.textContent = store.name;
    if (value) value.textContent = `${store.rotation}%`;
  });
}

function renderMovements() {
  const container = $("[data-movement-history]");
  if (!container) return;
  const recent = state.movements.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 6);
  container.textContent = "";
  recent.forEach(movement => {
    const store = getStore(movement.storeId);
    const product = movement.productId ? getProduct(movement.productId) : null;
    const row = document.createElement("div");
    row.className = "history-row";
    const copy = document.createElement("div");
    const title = document.createElement("strong");
    title.textContent = movement.type;
    const detail = document.createElement("span");
    detail.textContent = `${store?.name || "Sin cadena"}${product ? ` · ${product.name}` : ""} · ${movement.quantity || ""}${movement.quantity ? " unidades" : ""}`;
    copy.append(title, detail);
    const amount = document.createElement("em");
    amount.textContent = movement.amount ? formatCurrency(movement.amount) : formatSummaryDate(movement.createdAt.slice(0, 10));
    row.append(copy, amount);
    container.append(row);
  });
}

function calculateDemoInvoiceSubtotal() {
  return demoInvoice.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
}

function renderDemoInvoice() {
  const subtotal = calculateDemoInvoiceSubtotal();
  const balance = subtotal - demoInvoice.paymentReceived;
  $$(".invoice-paper").forEach(paper => {
    const metaNumber = $(".invoice-meta strong", paper);
    const metaDate = $(".invoice-meta span", paper);
    const customer = $(".invoice-box strong", paper);
    const body = $("tbody", paper);
    const totals = $$(".invoice-total .total-line strong", paper);

    if (metaNumber) metaNumber.textContent = demoInvoice.number;
    if (metaDate) metaDate.textContent = `Fecha: ${formatDateSlash(demoInvoice.date)}`;
    if (customer) customer.textContent = demoInvoice.customer;
    if (body) {
      body.innerHTML = demoInvoice.items.map(item => {
        const product = getProduct(item.productId);
        const amount = item.quantity * item.unitPrice;
        return `
          <tr>
            <td data-label="Descripción">Café Cordillera</td>
            <td data-label="Presentación">${escapeHtml(product?.name || item.productId)}</td>
            <td data-label="Cantidad">${item.quantity}</td>
            <td data-label="Precio">${formatMoneyExact(item.unitPrice)}</td>
            <td data-label="Importe">${formatMoneyExact(amount)}</td>
          </tr>`;
      }).join("");
    }
    if (totals[0]) totals[0].textContent = formatMoneyExact(subtotal);
    if (totals[1]) totals[1].textContent = formatMoneyExact(demoInvoice.paymentReceived);
    if (totals[2]) totals[2].textContent = formatMoneyExact(balance);
  });
}

function csvEscape(value) {
  const text = String(value ?? "");
  return /[",\n\r]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function exportInventoryCSV() {
  const rows = getFilteredInventoryRows();
  if (!rows.length) {
    showToast("No hay datos para exportar con los filtros actuales.");
    return;
  }

  const header = ["Producto", "Cadena", "Stock", "Vencimiento", "Estado", "Vendido", "Saldo pendiente", "Entregado", "Devuelto", "Merma"];
  const csvRows = rows.map(item => {
    const product = getProduct(item.productId);
    const store = getStore(item.storeId);
    return [
      product?.name || item.productId,
      store?.name || item.storeId,
      item.stock,
      formatDateSlash(item.bestBefore),
      item.status,
      item.sold,
      formatMoneyExact(item.balance),
      item.delivered,
      item.returned,
      item.waste
    ];
  });
  const csv = `\uFEFF${[header, ...csvRows].map(row => row.map(csvEscape).join(",")).join("\r\n")}`;
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `inventario-cafe-cordillera-${todayISO()}.csv`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  showToast("Inventario exportado correctamente.");
}

function clearPrintInvoiceState() {
  document.body.classList.remove("printing-invoice");
  $$(".invoice-paper.print-active").forEach(invoice => invoice.classList.remove("print-active"));
}

function printInvoice(button) {
  clearPrintInvoiceState();
  const scope = button?.closest(".modal") || $("#invoice");
  const invoice = scope?.querySelector(".invoice-paper");
  if (!invoice) return;
  document.body.classList.add("printing-invoice");
  invoice.classList.add("print-active");
  window.print();
}

function renderSelectOptions() {
  const productSelect = $("#mov-product");
  const storeSelect = $("#mov-store");
  const pointFilter = $("[data-filter-point]");
  if (productSelect) {
    const current = productSelect.value;
    productSelect.innerHTML = state.products.map(product => `<option value="${escapeHtml(product.id)}">${escapeHtml(product.name)}</option>`).join("");
    productSelect.value = state.products.some(product => product.id === current) ? current : "empaque-212";
  }
  if (storeSelect) {
    const current = storeSelect.value;
    storeSelect.innerHTML = state.stores.map(store => `<option value="${escapeHtml(store.id)}">${escapeHtml(store.name)}</option>`).join("");
    storeSelect.value = state.stores.some(store => store.id === current) ? current : "riba-smith";
  }
  if (pointFilter) {
    const current = pointFilter.value;
    pointFilter.innerHTML = `<option value="all">Todas las cadenas</option>${state.stores.map(store => `<option value="${escapeHtml(store.name)}">${escapeHtml(store.name)}</option>`).join("")}`;
    pointFilter.value = current || "all";
  }
}

function renderAll() {
  syncStores();
  renderSelectOptions();
  renderDashboard();
  renderProducts();
  renderStores();
  renderInventory();
  renderCharts();
  renderMovements();
  renderDemoInvoice();
  updateMovementFormMode();
  updateSummary();
  initIcons();
}

// Navegación
function setActiveNav(hash) {
  $$(".nav-link").forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === hash);
  });
}

function setupNavigation() {
  const mobileButton = $(".mobile-menu-toggle");
  const mobileNav = $("#mobile-navigation");

  function setMobileMenu(open) {
    if (!mobileButton || !mobileNav) return;
    mobileNav.classList.toggle("mobile-open", open);
    mobileButton.setAttribute("aria-expanded", String(open));
    mobileButton.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    mobileButton.innerHTML = open ? '<i data-lucide="x"></i>' : '<i data-lucide="menu"></i>';
    initIcons();
  }

  mobileButton?.addEventListener("click", () => {
    setMobileMenu(mobileButton.getAttribute("aria-expanded") !== "true");
  });

  $$(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      setActiveNav(link.getAttribute("href"));
      setMobileMenu(false);
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 600) setMobileMenu(false);
  });

  const sections = $$(".section[id], .hero[id]");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveNav(`#${visible.target.id}`);
    }, { threshold: [0.2, 0.45], rootMargin: "-18% 0px -64% 0px" });
    sections.forEach(section => observer.observe(section));
  }
}

function setupMobileStickyHeader() {
  const sidebar = $(".sidebar");
  const mq = window.matchMedia("(max-width: 600px)");
  if (!sidebar) return;
  const update = () => {
    if (mq.matches) sidebar.classList.toggle("is-scrolled", window.scrollY > 8);
    else sidebar.classList.remove("is-scrolled");
  };
  update();
  window.addEventListener("scroll", update, { passive: true });
  mq.addEventListener?.("change", update);
}

// Entregas / Ventas / Cobros
function getMovementElements() {
  return {
    modal: $("[data-movement-modal]"),
    product: $("#mov-product"),
    store: $("#mov-store"),
    units: $("#mov-units"),
    date: $("#mov-date"),
    expire: $("#mov-expire"),
    amount: $("#mov-amount"),
    note: $("#mov-note"),
    save: $("[data-save-movement]"),
    next: $("[data-next-step]"),
    prev: $("[data-prev-step]")
  };
}

function openMovementModal() {
  const elements = getMovementElements();
  movementType = "Nueva entrega";
  movementStep = 1;
  resetMovementForm();
  elements.modal?.classList.add("open");
  setMovementStep(1);
  setTimeout(() => $(".movement-option.active")?.focus(), 30);
}

function closeMovementModal() {
  getMovementElements().modal?.classList.remove("open");
}

function resetMovementForm() {
  const elements = getMovementElements();
  if (elements.product) elements.product.value = "empaque-212";
  if (elements.store) elements.store.value = "riba-smith";
  if (elements.units) elements.units.value = "10";
  if (elements.date) elements.date.value = todayISO();
  if (elements.expire) elements.expire.value = getProduct("empaque-212")?.bestBefore || "2026-07-15";
  if (elements.amount) elements.amount.value = "No aplica";
  if (elements.note) elements.note.value = "";
  clearValidation();
  updateMovementTypeButtons();
  updateMovementFormMode();
  updateSummary();
}

function setMovementType(type) {
  movementType = type;
  updateMovementTypeButtons();
  clearValidation();
  updateMovementFormMode();
  updateSummary();
}

function updateMovementTypeButtons() {
  $$(".movement-option").forEach(button => {
    button.classList.toggle("active", button.dataset.movementType === movementType);
  });
}

function setMovementStep(step) {
  movementStep = Math.max(1, Math.min(3, step));
  $$("[data-step]").forEach(panel => panel.classList.toggle("active", Number(panel.dataset.step) === movementStep));
  $$("[data-step-dot]").forEach(dot => dot.classList.toggle("active", Number(dot.dataset.stepDot) === movementStep));
  const { prev, next, save } = getMovementElements();
  if (prev) prev.hidden = movementStep === 1;
  if (next) next.hidden = movementStep === 3;
  if (save) save.hidden = movementStep !== 3;
  updateSummary();
}

function updateMovementFormMode() {
  const elements = getMovementElements();
  const isPayment = movementType === "Pago recibido";
  const isSale = movementType === "Venta reportada";
  const isWaste = movementType === "Merma o vencimiento";
  const productField = elements.product?.closest(".field");
  const unitsField = elements.units?.closest(".field");
  const expireField = elements.expire?.closest(".field");
  const amountField = elements.amount?.closest(".field");
  const noteLabel = elements.note?.closest(".field")?.querySelector("label");

  if (productField) productField.style.display = isPayment ? "none" : "";
  if (unitsField) unitsField.style.display = isPayment ? "none" : "";
  if (expireField) expireField.style.display = isPayment || isSale || movementType === "Devolución" ? "none" : "";
  if (amountField) amountField.style.display = ["Devolución", "Merma o vencimiento"].includes(movementType) ? "none" : "";
  if (noteLabel) noteLabel.textContent = isWaste ? "Nota obligatoria" : "Nota opcional";
  if (elements.amount) {
    elements.amount.readOnly = !isPayment;
    if (!isPayment) elements.amount.value = isSale ? formatMoneyExact(calculateDraftSaleAmount()) : "No aplica";
  }
  if (elements.expire) elements.expire.required = false;
  updateFieldHints();
}

function calculateDraftSaleAmount() {
  const elements = getMovementElements();
  const product = getProduct(elements.product?.value);
  const quantity = Number(elements.units?.value || 0);
  return quantity * Number(product?.price || 0);
}

function updateFieldHints() {
  const elements = getMovementElements();
  removeHint("mov-units-hint");
  removeHint("mov-amount-hint");
  const storeId = elements.store?.value;
  const productId = elements.product?.value;
  if (["Venta reportada", "Devolución", "Merma o vencimiento"].includes(movementType) && storeId && productId) {
    const available = getInventoryRow(storeId, productId)?.stock || 0;
    addHint(elements.units, "mov-units-hint", `Disponible en este punto: ${available} unidades.`);
  }
  if (movementType === "Pago recibido" && storeId) {
    const pending = getStore(storeId)?.pendingBalance || 0;
    addHint(elements.amount, "mov-amount-hint", `Saldo pendiente actual: ${formatMoneyExact(pending)}.`);
  }
}

function addHint(field, id, text) {
  if (!field || $(`#${id}`)) return;
  const hint = document.createElement("p");
  hint.id = id;
  hint.className = "field-hint";
  hint.textContent = text;
  field.insertAdjacentElement("afterend", hint);
}

function removeHint(id) {
  $(`#${id}`)?.remove();
}

function updateSummary() {
  const elements = getMovementElements();
  const product = getProduct(elements.product?.value);
  const store = getStore(elements.store?.value);
  const isPayment = movementType === "Pago recibido";
  const amount = isPayment ? parseAmount(elements.amount?.value) : movementType === "Venta reportada" ? calculateDraftSaleAmount() : 0;

  setText("[data-summary-type]", movementType);
  setText("[data-summary-product]", isPayment ? "No aplica" : product?.name || "—");
  setText("[data-summary-store]", store?.name || "—");
  setText("[data-summary-units]", isPayment ? "No aplica" : elements.units?.value || "—");
  setText("[data-summary-date]", formatSummaryDate(elements.date?.value));
  setText("[data-summary-expire]", isPayment ? "No aplica" : formatSummaryDate(elements.expire?.value));
  setText("[data-summary-amount]", amount > 0 ? formatMoneyExact(amount) : "No aplica");
}

function registerDelivery(payload) {
  const row = ensureInventoryRow(payload.storeId, payload.productId);
  row.delivered += payload.quantity;
  row.stock += payload.quantity;
  // Aproximación temporal hasta manejar inventario por lotes: conservar el vencimiento más próximo.
  row.bestBefore = earliestDate(row.bestBefore, payload.expire);
  row.status = row.stock < 20 ? "Stock bajo" : "En orden";
  state.movements.push({
    id: createId("mov"),
    type: "Nueva entrega",
    storeId: payload.storeId,
    productId: payload.productId,
    quantity: payload.quantity,
    amount: 0,
    note: payload.note,
    createdAt: payload.createdAt
  });
  return "Entrega registrada correctamente.";
}

function registerSale(payload) {
  const row = getInventoryRow(payload.storeId, payload.productId);
  const product = getProduct(payload.productId);
  const amount = Number((payload.quantity * Number(product.price || 0)).toFixed(2));
  row.stock -= payload.quantity;
  row.sold += payload.quantity;
  row.balance = Number((row.balance + amount).toFixed(2));
  row.status = row.stock < 20 ? "Stock bajo" : row.balance > 0 ? "Pago pendiente" : "En orden";
  const sale = {
    id: createId("sale"),
    storeId: payload.storeId,
    productId: payload.productId,
    quantity: payload.quantity,
    amount,
    createdAt: payload.createdAt
  };
  state.sales.push(sale);
  state.movements.push({
    id: createId("mov"),
    type: "Venta reportada",
    storeId: payload.storeId,
    productId: payload.productId,
    quantity: payload.quantity,
    amount,
    note: payload.note,
    createdAt: payload.createdAt
  });
  return "Venta registrada correctamente.";
}

function registerReturn(payload) {
  const row = getInventoryRow(payload.storeId, payload.productId);
  row.stock -= payload.quantity;
  row.returned += payload.quantity;
  row.status = row.stock < 20 ? "Stock bajo" : row.balance > 0 ? "Pago pendiente" : "En orden";
  state.movements.push({
    id: createId("mov"),
    type: "Devolución",
    storeId: payload.storeId,
    productId: payload.productId,
    quantity: payload.quantity,
    amount: 0,
    note: payload.note,
    createdAt: payload.createdAt
  });
  return "Devolución registrada correctamente.";
}

function registerWaste(payload) {
  const row = getInventoryRow(payload.storeId, payload.productId);
  row.stock -= payload.quantity;
  row.waste += payload.quantity;
  row.status = row.stock < 20 ? "Stock bajo" : row.balance > 0 ? "Pago pendiente" : "En orden";
  state.movements.push({
    id: createId("mov"),
    type: "Merma o vencimiento",
    storeId: payload.storeId,
    productId: payload.productId,
    quantity: payload.quantity,
    amount: 0,
    note: payload.note,
    createdAt: payload.createdAt
  });
  return "Merma registrada correctamente.";
}

function registerCollection(payload) {
  let remaining = payload.amount;
  const rows = state.inventory
    .filter(item => item.storeId === payload.storeId && item.balance > 0)
    .sort((a, b) => b.balance - a.balance);

  rows.forEach(row => {
    if (remaining <= 0) return;
    const applied = Math.min(row.balance, remaining);
    row.balance = Number((row.balance - applied).toFixed(2));
    remaining = Number((remaining - applied).toFixed(2));
    if (row.balance <= 0 && row.stock >= 20) row.status = "En orden";
  });

  state.collections.push({
    id: createId("collection"),
    storeId: payload.storeId,
    amount: payload.amount,
    createdAt: payload.createdAt
  });
  state.movements.push({
    id: createId("mov"),
    type: "Pago recibido",
    storeId: payload.storeId,
    productId: null,
    quantity: 0,
    amount: payload.amount,
    note: payload.note,
    createdAt: payload.createdAt
  });
  return "Cobro registrado correctamente.";
}

// Validaciones
function clearValidation() {
  $$(".field-error").forEach(error => error.remove());
  $$(".is-invalid").forEach(field => field.classList.remove("is-invalid"));
}

function showFieldError(field, message) {
  if (!field) return;
  field.classList.add("is-invalid");
  const error = document.createElement("p");
  error.className = "field-error";
  error.textContent = message;
  field.insertAdjacentElement("afterend", error);
}

function validateMovement() {
  clearValidation();
  const elements = getMovementElements();
  const storeId = elements.store?.value;
  const productId = elements.product?.value;
  const quantity = Number(elements.units?.value || 0);
  const amount = parseAmount(elements.amount?.value);
  let valid = true;

  if (!storeId) {
    showFieldError(elements.store, "Selecciona un punto de venta.");
    valid = false;
  }

  if (movementType !== "Pago recibido" && !productId) {
    showFieldError(elements.product, "Selecciona un producto.");
    valid = false;
  }

  if (["Nueva entrega", "Venta reportada", "Devolución", "Merma o vencimiento"].includes(movementType)) {
    if (!Number.isFinite(quantity) || quantity <= 0) {
      showFieldError(elements.units, "Ingresa una cantidad mayor que cero.");
      valid = false;
    }
  }

  if (["Venta reportada", "Devolución", "Merma o vencimiento"].includes(movementType) && valid) {
    const available = getInventoryRow(storeId, productId)?.stock || 0;
    if (quantity > available) {
      const verb = movementType === "Venta reportada" ? "vender" : movementType === "Devolución" ? "devolver" : "registrar como merma";
      showFieldError(elements.units, `No puedes ${verb} más que el inventario disponible (${available}).`);
      valid = false;
    }
  }

  if (movementType === "Merma o vencimiento" && !elements.note?.value.trim()) {
    showFieldError(elements.note, "Indica el motivo de la merma o vencimiento.");
    valid = false;
  }

  if (movementType === "Pago recibido") {
    const pending = getStore(storeId)?.pendingBalance || 0;
    if (!Number.isFinite(amount) || amount <= 0) {
      showFieldError(elements.amount, "Ingresa un monto mayor que cero.");
      valid = false;
    } else if (amount > pending) {
      showFieldError(elements.amount, `El cobro no puede superar el saldo pendiente (${formatMoneyExact(pending)}).`);
      valid = false;
    }
  }

  return valid;
}

// Modales
function setupModals() {
  const movementModal = $("[data-movement-modal]");
  const invoiceModal = $("[data-invoice-modal]");

  document.addEventListener("click", event => {
    const disabled = event.target.closest("[aria-disabled='true'], button:disabled");
    if (disabled) {
      event.preventDefault();
      return;
    }

    if (event.target.closest("[data-open-movement]")) openMovementModal();
    if (event.target.closest("[data-close-modal]") || event.target === movementModal) closeMovementModal();

    const typeButton = event.target.closest("[data-movement-type]");
    if (typeButton && !typeButton.disabled) setMovementType(typeButton.dataset.movementType);

    if (event.target.closest("[data-prev-step]")) setMovementStep(movementStep - 1);
    if (event.target.closest("[data-next-step]")) {
      if (movementStep === 2 && !validateMovement()) return;
      setMovementStep(movementStep + 1);
    }
    if (event.target.closest("[data-save-movement]")) saveMovement();

    if (event.target.closest("[data-open-invoice]")) invoiceModal?.classList.add("open");
    if (event.target.closest("[data-close-invoice]") || event.target === invoiceModal) invoiceModal?.classList.remove("open");
    if (event.target.closest("[data-export-csv]")) exportInventoryCSV();
    if (event.target.closest("[data-print-invoice]")) printInvoice(event.target.closest("[data-print-invoice]"));
    if (event.target.closest("[data-reset-demo]")) resetState();
  });

  document.addEventListener("keydown", event => {
    if (event.key !== "Escape") return;
    closeMovementModal();
    invoiceModal?.classList.remove("open");
  });
}

function saveMovement() {
  if (!validateMovement()) {
    setMovementStep(2);
    return;
  }

  const elements = getMovementElements();
  const saveButton = elements.save;
  const payload = {
    storeId: elements.store.value,
    productId: elements.product.value,
    quantity: Number(elements.units.value || 0),
    amount: parseAmount(elements.amount.value),
    date: elements.date.value,
    expire: elements.expire.value,
    note: elements.note?.value || "",
    createdAt: `${elements.date.value || todayISO()}T${new Date().toTimeString().slice(0, 8)}`
  };

  saveButton.disabled = true;
  setTimeout(() => {
    let message;
    switch (movementType) {
      case "Nueva entrega":
        message = registerDelivery(payload);
        break;
      case "Venta reportada":
        message = registerSale(payload);
        break;
      case "Devolución":
        message = registerReturn(payload);
        break;
      case "Merma o vencimiento":
        message = registerWaste(payload);
        break;
      case "Pago recibido":
        message = registerCollection(payload);
        break;
      default:
        saveButton.disabled = false;
        throw new Error("Tipo de movimiento no soportado");
    }
    syncStores();
    saveState();
    renderAll();
    closeMovementModal();
    saveButton.disabled = false;
    resetMovementForm();
    showToast(message);
  }, 220);
}

// Notificaciones
function showToast(message) {
  let toast = $(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2600);
}

// Eventos
function setupFormEvents() {
  const elements = getMovementElements();
  [elements.product, elements.store, elements.units, elements.date, elements.expire, elements.amount, elements.note].forEach(field => {
    field?.addEventListener("input", () => {
      if (field === elements.product && elements.expire) elements.expire.value = getProduct(field.value)?.bestBefore || elements.expire.value;
      updateMovementFormMode();
      updateSummary();
    });
    field?.addEventListener("change", () => {
      updateMovementFormMode();
      updateSummary();
    });
  });

  $("[data-filter-search]")?.addEventListener("input", renderInventory);
  $("[data-filter-status]")?.addEventListener("change", renderInventory);
  $("[data-filter-point]")?.addEventListener("change", renderInventory);
}

function disableUnavailableButtons() {
  const tooltip = "Disponible en la versión completa";
  ["[data-run-import]", "[data-pick-file]"].forEach(selector => {
    $$(selector).forEach(button => {
      button.disabled = true;
      button.setAttribute("aria-disabled", "true");
      button.setAttribute("title", tooltip);
    });
  });
  $("[data-dropzone]")?.setAttribute("aria-disabled", "true");
}

function setupUnsupportedDropzone() {
  const dropzone = $("[data-dropzone]");
  if (!dropzone) return;
  ["dragover", "drop"].forEach(eventName => {
    dropzone.addEventListener(eventName, event => {
      event.preventDefault();
      showToast("Importación disponible en la implementación completa.");
    });
  });
}

// Inicialización
function initApp() {
  state = loadState();
  syncStores();
  disableUnavailableButtons();
  setupNavigation();
  setupMobileStickyHeader();
  setupModals();
  setupFormEvents();
  setupUnsupportedDropzone();
  renderAll();
  setMovementStep(1);
  window.addEventListener("afterprint", clearPrintInvoiceState);
}

document.addEventListener("DOMContentLoaded", initApp);
