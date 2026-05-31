// ============================================
// Interactive Product Catalog
// Vanilla JavaScript - 100% DOM rendered
// ============================================

// ============ PRODUCTS DATA ============
const products = [
    { id: 1, name: "iPhone 16 Pro", price: 29990000, category: "phone", image: "https://placehold.co/200x200/4361ee/ffffff?text=iPhone+16", rating: 4.7, inStock: true, description: "Apple A18 Pro chip, 48MP camera system, Titanium design. Trải nghiệm điện thoại thông minh đỉnh cao với hiệu năng vượt trội." },
    { id: 2, name: "Samsung Galaxy S25", price: 21990000, category: "phone", image: "https://placehold.co/200x200/f72585/ffffff?text=Galaxy+S25", rating: 4.5, inStock: true, description: "Snapdragon 8 Gen 4, AI features, Dynamic AMOLED 120Hz. Flagship Android với camera AI thông minh." },
    { id: 3, name: "Google Pixel 9 Pro", price: 24990000, category: "phone", image: "https://placehold.co/200x200/4cc9f0/ffffff?text=Pixel+9", rating: 4.6, inStock: true, description: "Tensor G4 chip, Best-in-class camera, Pure Android experience." },
    { id: 4, name: "MacBook Air M4", price: 28990000, category: "laptop", image: "https://placehold.co/200x200/7209b7/ffffff?text=MacBook+Air", rating: 4.8, inStock: true, description: "Apple M4 chip, 15.3-inch Liquid Retina, 18h battery. Siêu nhẹ chỉ 1.2kg." },
    { id: 5, name: "Dell XPS 16", price: 35990000, category: "laptop", image: "https://placehold.co/200x200/3a0ca3/ffffff?text=Dell+XPS+16", rating: 4.4, inStock: true, description: "Intel Core Ultra 9, OLED 4K, 32GB RAM. Laptop Windows cao cấp cho designer." },
    { id: 6, name: "ThinkPad X1 Carbon", price: 32990000, category: "laptop", image: "https://placehold.co/200x200/4361ee/ffffff?text=ThinkPad+X1", rating: 4.3, inStock: false, description: "Intel Core i7, 16GB RAM, 14-inch 2.8K OLED. Bền bỉ chuẩn quân đội." },
    { id: 7, name: "AirPods Pro 3", price: 6490000, category: "audio", image: "https://placehold.co/200x200/f72585/ffffff?text=AirPods+Pro", rating: 4.6, inStock: true, description: "H2 chip, Adaptive Audio, ANC cải tiến. Âm thanh spatial với head tracking." },
    { id: 8, name: "Sony WH-1000XM6", price: 7990000, category: "audio", image: "https://placehold.co/200x200/4cc9f0/ffffff?text=Sony+XM6", rating: 4.7, inStock: true, description: "Industry-leading ANC, 40h battery, LDAC. Best-in-class noise cancelling." },
    { id: 9, name: "Galaxy Buds3 Pro", price: 4990000, category: "audio", image: "https://placehold.co/200x200/7209b7/ffffff?text=Galaxy+Buds", rating: 4.3, inStock: true, description: "2-way speakers, Adaptive ANC, Galaxy AI features." },
    { id: 10, name: "Apple Watch Ultra 3", price: 18990000, category: "watch", image: "https://placehold.co/200x200/3a0ca3/ffffff?text=Watch+Ultra", rating: 4.8, inStock: true, description: "49mm titanium, 36h battery, Precision dual-frequency GPS. Cho dân thể thao." },
    { id: 11, name: "Samsung Watch 7", price: 8990000, category: "watch", image: "https://placehold.co/200x200/4361ee/ffffff?text=Watch+7", rating: 4.4, inStock: true, description: "Wear OS 5, BioActive Sensor, 3nm chip. Theo dõi sức khỏe toàn diện." },
    { id: 12, name: "Garmin Fenix 8", price: 15990000, category: "watch", image: "https://placehold.co/200x200/f72585/ffffff?text=Fenix+8", rating: 4.6, inStock: true, description: "Solar charging, Topo maps, 30-day battery. Đồng hồ địa hình chuyên nghiệp." },
    { id: 13, name: "Xiaomi 15 Pro", price: 16990000, category: "phone", image: "https://placehold.co/200x200/4cc9f0/ffffff?text=Mi+15+Pro", rating: 4.2, inStock: true, description: "Snapdragon 8 Gen 4, Leica cameras, 120W charging." },
    { id: 14, name: "JBL Clip 5", price: 1490000, category: "audio", image: "https://placehold.co/200x200/7209b7/ffffff?text=JBL+Clip+5", rating: 4.1, inStock: true, description: "Portable Bluetooth speaker, IP67, 15h playtime. Loa mini mang đi khắp nơi." },
    { id: 15, name: "ASUS ZenBook Pro", price: 27990000, category: "laptop", image: "https://placehold.co/200x200/3a0ca3/ffffff?text=ZenBook+Pro", rating: 4.5, inStock: true, description: "Intel Core Ultra 7, RTX 4070, 32GB RAM, OLED 3.2K. Laptop đồ họa mạnh mẽ." },
    { id: 16, name: "Huawei Watch GT 5", price: 6990000, category: "watch", image: "https://placehold.co/200x200/4361ee/ffffff?text=Watch+GT+5", rating: 4.3, inStock: false, description: "HarmonyOS, 14-day battery, TruSeen 5.5+ health tracking." },
];

// ============ STATE ============
let currentCategory = 'all';
let currentSearch = '';
let currentSort = 'default';
let cartCount = 0;

// ============ DOM REFERENCES ============
const grid = document.querySelector('#productsGrid');
const searchInput = document.querySelector('#searchInput');
const sortSelect = document.querySelector('#sortSelect');
const categoryBar = document.querySelector('#categoryBar');
const modalOverlay = document.querySelector('#productModal');
const modalBody = document.querySelector('#modalBody');
const modalClose = document.querySelector('#modalClose');
const cartBadge = document.querySelector('#cartBadge');
const darkModeToggle = document.querySelector('#darkModeToggle');

// ============ UTILITY FUNCTIONS ============
function formatPrice(price) {
    return price.toLocaleString('vi-VN') + '₫';
}

function getStars(rating) {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5 ? 1 : 0;
    const empty = 5 - full - half;
    return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
}

// ============ RENDER PRODUCTS ============
function renderProducts() {
    // Filter
    let filtered = [...products];

    if (currentCategory !== 'all') {
        filtered = filtered.filter(p => p.category === currentCategory);
    }

    if (currentSearch.trim()) {
        const search = currentSearch.toLowerCase().trim();
        filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(search) ||
            p.category.toLowerCase().includes(search) ||
            p.description.toLowerCase().includes(search)
        );
    }

    // Sort
    switch (currentSort) {
        case 'price-asc':
            filtered.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            filtered.sort((a, b) => b.price - a.price);
            break;
        case 'name-asc':
            filtered.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'rating-desc':
            filtered.sort((a, b) => b.rating - a.rating);
            break;
        default:
            break;
    }

    // Clear grid
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }

    if (filtered.length === 0) {
        const empty = document.createElement('div');
        empty.style.cssText = 'grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: var(--text-secondary);';
        empty.innerHTML = '<div style="font-size: 48px; margin-bottom: 16px;">🔍</div><p style="font-size: 18px;">No products found</p>';
        grid.appendChild(empty);
        return;
    }

    // Use DocumentFragment for performance
    const fragment = document.createDocumentFragment();
    filtered.forEach(product => {
        const card = createProductCard(product);
        fragment.appendChild(card);
    });
    grid.appendChild(fragment);
}

// ============ CREATE PRODUCT CARD ============
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.id = product.id;

    // Image
    const img = document.createElement('img');
    img.className = 'product-image';
    img.src = product.image;
    img.alt = product.name;
    img.loading = 'lazy';

    // Info
    const info = document.createElement('div');
    info.className = 'product-info';

    const category = document.createElement('div');
    category.className = 'product-category';
    category.textContent = product.category;

    const name = document.createElement('div');
    name.className = 'product-name';
    name.textContent = product.name;

    const ratingDiv = document.createElement('div');
    ratingDiv.className = 'product-rating';
    ratingDiv.innerHTML = `
        <span class="stars">${getStars(product.rating)}</span>
        <span class="rating-value">${product.rating}</span>
    `;

    const priceRow = document.createElement('div');
    priceRow.className = 'product-price-row';

    const price = document.createElement('span');
    price.className = 'product-price';
    price.textContent = formatPrice(product.price);

    const stock = document.createElement('span');
    stock.className = `product-stock ${product.inStock ? 'in-stock' : 'out-of-stock'}`;
    stock.textContent = product.inStock ? 'In Stock' : 'Out of Stock';

    priceRow.appendChild(price);
    priceRow.appendChild(stock);

    info.appendChild(category);
    info.appendChild(name);
    info.appendChild(ratingDiv);
    info.appendChild(priceRow);

    // Add to cart button (separate to prevent card click modal)
    const addBtn = document.createElement('button');
    addBtn.className = 'add-to-cart-btn';
    addBtn.textContent = '🛒 Add to Cart';
    addBtn.disabled = !product.inStock;

    addBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        addToCart(product);
    });

    card.appendChild(img);
    card.appendChild(info);
    card.appendChild(addBtn);

    // Card click → Modal
    card.addEventListener('click', function(e) {
        // Don't open modal if clicking add-to-cart button
        if (e.target.closest('.add-to-cart-btn')) return;
        openModal(product);
    });

    return card;
}

// ============ CART ============
function addToCart(product) {
    if (!product.inStock) return;
    cartCount++;
    cartBadge.textContent = cartCount;
    cartBadge.classList.remove('hidden');
    cartBadge.classList.remove('bounce');
    // Force reflow for animation restart
    void cartBadge.offsetWidth;
    cartBadge.classList.add('bounce');
}

// ============ MODAL ============
function openModal(product) {
    modalBody.innerHTML = '';

    const img = document.createElement('img');
    img.className = 'modal-product-image';
    img.src = product.image;
    img.alt = product.name;

    const category = document.createElement('div');
    category.className = 'modal-product-category';
    category.textContent = product.category;

    const name = document.createElement('h2');
    name.className = 'modal-product-name';
    name.textContent = product.name;

    const price = document.createElement('div');
    price.className = 'modal-product-price';
    price.textContent = formatPrice(product.price);

    const rating = document.createElement('div');
    rating.className = 'modal-product-rating';
    rating.innerHTML = `
        <span class="stars" style="font-size: 20px;">${getStars(product.rating)}</span>
        <span style="font-size: 18px; font-weight: 600;">${product.rating}</span>
    `;

    const stock = document.createElement('div');
    stock.className = 'modal-product-stock';
    const stockSpan = document.createElement('span');
    stockSpan.className = `product-stock ${product.inStock ? 'in-stock' : 'out-of-stock'}`;
    stockSpan.style.fontSize = '14px';
    stockSpan.textContent = product.inStock ? '✅ In Stock' : '❌ Out of Stock';
    stock.appendChild(stockSpan);

    const desc = document.createElement('p');
    desc.className = 'modal-product-description';
    desc.textContent = product.description;

    const addBtn = document.createElement('button');
    addBtn.className = 'modal-add-to-cart';
    addBtn.textContent = '🛒 Add to Cart';
    addBtn.disabled = !product.inStock;
    addBtn.addEventListener('click', function() {
        addToCart(product);
    });

    modalBody.appendChild(img);
    modalBody.appendChild(category);
    modalBody.appendChild(name);
    modalBody.appendChild(price);
    modalBody.appendChild(rating);
    modalBody.appendChild(stock);
    modalBody.appendChild(desc);
    modalBody.appendChild(addBtn);

    modalOverlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    // Focus trap: close button
    setTimeout(() => modalClose.focus(), 100);
}

function closeModal() {
    modalOverlay.classList.add('hidden');
    document.body.style.overflow = '';
}

// ============ CATEGORY FILTER ============
function filterByCategory(category) {
    currentCategory = category;
    // Update active button
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.category === category);
    });
    renderProducts();
}

// ============ SEARCH ============
function searchProducts(query) {
    currentSearch = query;
    renderProducts();
}

// ============ SORT ============
function sortProducts(sortValue) {
    currentSort = sortValue;
    renderProducts();
}

// ============ DARK MODE ============
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    darkModeToggle.textContent = isDark ? '☀️' : '🌙';
}

// ============ EVENT LISTENERS ============

// Search - realtime
searchInput.addEventListener('input', function() {
    searchProducts(this.value);
});

// Sort
sortSelect.addEventListener('change', function() {
    sortProducts(this.value);
});

// Category filter - Event Delegation
categoryBar.addEventListener('click', function(e) {
    const btn = e.target.closest('.category-btn');
    if (!btn) return;
    filterByCategory(btn.dataset.category);
});

// Modal close
modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', function(e) {
    if (e.target === this) closeModal();
});

// Escape to close modal
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        if (!modalOverlay.classList.contains('hidden')) {
            closeModal();
        }
    }
});

// Dark mode toggle
darkModeToggle.addEventListener('click', toggleDarkMode);

// ============ INIT ============
renderProducts();