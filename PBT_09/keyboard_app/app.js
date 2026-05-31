// ============================================
// Keyboard Shortcuts & Accessibility App
// ============================================

// ============ DATA ============
const IMAGES = [
    { id: 1, url: 'https://picsum.photos/seed/city/800/450', title: 'City Skyline' },
    { id: 2, url: 'https://picsum.photos/seed/nature/800/450', title: 'Beautiful Nature' },
    { id: 3, url: 'https://picsum.photos/seed/mountain/800/450', title: 'Mountain View' },
    { id: 4, url: 'https://picsum.photos/seed/ocean/800/450', title: 'Ocean Waves' },
    { id: 5, url: 'https://picsum.photos/seed/forest/800/450', title: 'Forest Path' },
    { id: 6, url: 'https://picsum.photos/seed/desert/800/450', title: 'Desert Sands' },
    { id: 7, url: 'https://picsum.photos/seed/aurora/800/450', title: 'Northern Lights' },
    { id: 8, url: 'https://picsum.photos/seed/sunset/800/450', title: 'Sunset Colors' },
    { id: 9, url: 'https://picsum.photos/seed/lake/800/450', title: 'Lake Reflections' },
    { id: 10, url: 'https://picsum.photos/seed/waterfall/800/450', title: 'Waterfall' },
    { id: 11, url: 'https://picsum.photos/seed/flowers/800/450', title: 'Wild Flowers' },
    { id: 12, url: 'https://picsum.photos/seed/stars/800/450', title: 'Starry Night' }
];

const COMMANDS = [
    { id: 'nav-prev', icon: '◀', name: 'Previous Image', shortcut: '←', action: 'prevImage' },
    { id: 'nav-next', icon: '▶', name: 'Next Image', shortcut: '→', action: 'nextImage' },
    { id: 'play-pause', icon: '⏯', name: 'Play / Pause Slideshow', shortcut: 'Space', action: 'togglePlay' },
    { id: 'open-modal', icon: '🔍', name: 'Open Image Preview', shortcut: 'Enter', action: 'openModal' },
    { id: 'close', icon: '✕', name: 'Close Modal / Palette', shortcut: 'Esc', action: 'close' },
    { id: 'theme-light', icon: '☀', name: 'Light Theme', shortcut: '', action: 'setLightTheme' },
    { id: 'theme-dark', icon: '🌙', name: 'Dark Theme', shortcut: '', action: 'setDarkTheme' }
];

// ============ STATE ============
let currentIndex = 0;
let isPlaying = false;
let playInterval = null;
let isCommandPaletteOpen = false;
let isModalOpen = false;
let highlightedCommandIndex = 0;

// ============ DOM REFS ============
const galleryTrack = document.querySelector('#galleryTrack');
const thumbnailsContainer = document.querySelector('#thumbnails');
const galleryCounter = document.querySelector('#galleryCounter');
const galleryTitle = document.querySelector('#galleryTitle');
const prevBtn = document.querySelector('#prevBtn');
const nextBtn = document.querySelector('#nextBtn');
const playBtn = document.querySelector('#playBtn');
const imageModal = document.querySelector('#imageModal');
const modalImage = document.querySelector('#modalImage');
const modalCaption = document.querySelector('#modalCaption');
const modalClose = document.querySelector('#modalClose');
const commandPalette = document.querySelector('#commandPalette');
const commandInput = document.querySelector('#commandInput');
const commandList = document.querySelector('#commandList');
const galleryViewport = document.querySelector('.gallery-viewport');

// ============ RENDER GALLERY ============
function renderGallery() {
    // Render images in track
    galleryTrack.innerHTML = '';
    IMAGES.forEach(img => {
        const imgEl = document.createElement('img');
        imgEl.src = img.url;
        imgEl.alt = img.title;
        imgEl.loading = 'lazy';
        galleryTrack.appendChild(imgEl);
    });

    // Render thumbnails
    thumbnailsContainer.innerHTML = '';
    IMAGES.forEach((img, index) => {
        const btn = document.createElement('button');
        btn.className = `thumbnail-btn${index === currentIndex ? ' active' : ''}`;
        btn.setAttribute('role', 'tab');
        btn.setAttribute('aria-selected', index === currentIndex ? 'true' : 'false');
        btn.setAttribute('aria-label', `Image ${index + 1}: ${img.title}`);

        const thumbImg = document.createElement('img');
        thumbImg.src = IMAGES[index].url.replace('800/450', '64/48');
        thumbImg.alt = '';
        thumbImg.loading = 'lazy';
        btn.appendChild(thumbImg);

        btn.addEventListener('click', () => goToImage(index));
        btn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                goToImage(index);
            }
        });

        thumbnailsContainer.appendChild(btn);
    });

    updateGallery();
}

// ============ GALLERY NAVIGATION ============
function updateGallery() {
    const offset = -currentIndex * 100;
    galleryTrack.style.transform = `translateX(${offset}%)`;
    galleryCounter.textContent = `${currentIndex + 1} / ${IMAGES.length}`;
    galleryTitle.textContent = IMAGES[currentIndex].title;

    // Update thumbnails
    document.querySelectorAll('.thumbnail-btn').forEach((btn, i) => {
        btn.classList.toggle('active', i === currentIndex);
        btn.setAttribute('aria-selected', i === currentIndex ? 'true' : 'false');
    });

    // Update aria-label on viewport
    galleryViewport.setAttribute('aria-label',
        `Showing image ${currentIndex + 1}: ${IMAGES[currentIndex].title}`);
}

function goToImage(index) {
    if (index < 0) index = IMAGES.length - 1;
    if (index >= IMAGES.length) index = 0;
    currentIndex = index;
    updateGallery();

    // Scroll thumbnail into view
    const thumbBtns = document.querySelectorAll('.thumbnail-btn');
    if (thumbBtns[index]) {
        thumbBtns[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
}

function nextImage() {
    goToImage(currentIndex + 1);
}

function prevImage() {
    goToImage(currentIndex - 1);
}

// ============ SLIDESHOW ============
function togglePlay() {
    isPlaying = !isPlaying;
    if (isPlaying) {
        playBtn.textContent = '⏸ Pause';
        playBtn.classList.add('playing');
        playBtn.setAttribute('aria-label', 'Pause slideshow');
        playInterval = setInterval(nextImage, 2500);
    } else {
        clearInterval(playInterval);
        playInterval = null;
        playBtn.textContent = '▶ Play';
        playBtn.classList.remove('playing');
        playBtn.setAttribute('aria-label', 'Play slideshow');
    }
}

// ============ MODAL ============
function openModal() {
    isModalOpen = true;
    modalImage.src = IMAGES[currentIndex].url.replace('800/450', '1200/675');
    modalImage.alt = IMAGES[currentIndex].title;
    modalCaption.textContent = IMAGES[currentIndex].title;
    imageModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    modalClose.focus();
}

function closeModal() {
    isModalOpen = false;
    imageModal.classList.add('hidden');
    document.body.style.overflow = '';
    galleryViewport.focus();
}

// ============ COMMAND PALETTE ============
function openCommandPalette() {
    isCommandPaletteOpen = true;
    commandPalette.classList.remove('hidden');
    commandInput.value = '';
    highlightedCommandIndex = 0;
    renderCommands(COMMANDS);
    commandInput.focus();
    document.body.style.overflow = 'hidden';
}

function closeCommandPalette() {
    isCommandPaletteOpen = false;
    commandPalette.classList.add('hidden');
    document.body.style.overflow = '';
    galleryViewport.focus();
}

function renderCommands(filteredCommands) {
    commandList.innerHTML = '';

    if (filteredCommands.length === 0) {
        const empty = document.createElement('div');
        empty.className = 'command-empty';
        empty.textContent = 'No commands found';
        commandList.appendChild(empty);
        return;
    }

    filteredCommands.forEach((cmd, index) => {
        const item = document.createElement('div');
        item.className = `command-item${index === highlightedCommandIndex ? ' highlighted' : ''}`;
        item.setAttribute('role', 'option');
        item.setAttribute('aria-selected', index === highlightedCommandIndex ? 'true' : 'false');
        item.dataset.action = cmd.action;

        const icon = document.createElement('span');
        icon.className = 'cmd-icon';
        icon.textContent = cmd.icon;

        const name = document.createElement('span');
        name.className = 'cmd-name';
        name.textContent = cmd.name;

        const shortcut = document.createElement('span');
        shortcut.className = 'cmd-shortcut';
        shortcut.textContent = cmd.shortcut || '';

        item.appendChild(icon);
        item.appendChild(name);
        item.appendChild(shortcut);

        item.addEventListener('click', () => executeCommand(cmd.action));
        item.addEventListener('mouseenter', () => {
            highlightedCommandIndex = index;
            updateHighlight();
        });

        commandList.appendChild(item);
    });
}

function updateHighlight() {
    const items = commandList.querySelectorAll('.command-item');
    items.forEach((item, i) => {
        item.classList.toggle('highlighted', i === highlightedCommandIndex);
        item.setAttribute('aria-selected', i === highlightedCommandIndex ? 'true' : 'false');
    });
}

function filterCommands(query) {
    const lower = query.toLowerCase().trim();
    if (!lower) return COMMANDS;
    return COMMANDS.filter(cmd =>
        cmd.name.toLowerCase().includes(lower) ||
        cmd.shortcut.toLowerCase().includes(lower) ||
        cmd.id.includes(lower)
    );
}

function executeCommand(action) {
    closeCommandPalette();
    switch (action) {
        case 'prevImage': prevImage(); break;
        case 'nextImage': nextImage(); break;
        case 'togglePlay': togglePlay(); break;
        case 'openModal': openModal(); break;
        case 'close': closeModals(); break;
        case 'setLightTheme': document.body.style.background = '#f0f0f0'; document.body.style.color = '#333'; break;
        case 'setDarkTheme': document.body.style.background = ''; document.body.style.color = ''; break;
    }
}

function closeModals() {
    if (isModalOpen) closeModal();
    if (isCommandPaletteOpen) closeCommandPalette();
}

// ============ EVENT LISTENERS ============

// Gallery navigation buttons
prevBtn.addEventListener('click', prevImage);
nextBtn.addEventListener('click', nextImage);
playBtn.addEventListener('click', togglePlay);

// Modal
modalClose.addEventListener('click', closeModal);
imageModal.addEventListener('click', (e) => {
    if (e.target === imageModal) closeModal();
});

// Command palette
commandInput.addEventListener('input', () => {
    highlightedCommandIndex = 0;
    const filtered = filterCommands(commandInput.value);
    renderCommands(filtered);
});

commandInput.addEventListener('keydown', (e) => {
    const items = commandList.querySelectorAll('.command-item');
    const maxIndex = items.length - 1;

    switch (e.key) {
        case 'ArrowDown':
            e.preventDefault();
            highlightedCommandIndex = Math.min(highlightedCommandIndex + 1, maxIndex);
            updateHighlight();
            break;
        case 'ArrowUp':
            e.preventDefault();
            highlightedCommandIndex = Math.max(highlightedCommandIndex - 1, 0);
            updateHighlight();
            break;
        case 'Enter':
            e.preventDefault();
            if (items[highlightedCommandIndex]) {
                const action = items[highlightedCommandIndex].dataset.action;
                executeCommand(action);
            }
            break;
    }
});

// ============ KEYBOARD SHORTCUTS (Global) ============
document.addEventListener('keydown', (e) => {
    const target = e.target.tagName;

    // Don't handle if user is typing in an input
    if (target === 'INPUT' || target === 'TEXTAREA' || target === 'SELECT') {
        // Allow Escape from command palette input
        if (e.key === 'Escape' && isCommandPaletteOpen) {
            e.preventDefault();
            closeCommandPalette();
        }
        return;
    }

    switch (e.key) {
        case 'ArrowLeft':
            e.preventDefault();
            prevImage();
            break;

        case 'ArrowRight':
            e.preventDefault();
            nextImage();
            break;

        case ' ':
            // Space: toggle play (but not when button is focused - let it click naturally)
            if (document.activeElement !== playBtn) {
                e.preventDefault();
                togglePlay();
            }
            break;

        case 'Escape':
            closeModals();
            break;

        default:
            // Number 1-9 to jump to image
            const num = parseInt(e.key);
            if (num >= 1 && num <= 9) {
                const index = num - 1;
                if (index < IMAGES.length) {
                    goToImage(index);
                }
            }
            // 0 = image 10, but only if we have > 10 images
            if (e.key === '0' && IMAGES.length > 10) {
                goToImage(9);
            }
            break;
    }
});

// Ctrl+K to open command palette
document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isCommandPaletteOpen) {
            closeCommandPalette();
        } else {
            openCommandPalette();
        }
    }
});

// ============ FOCUS MANAGEMENT ============
// Trap focus in modal
imageModal.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        e.preventDefault();
        closeModal();
    }
    if (e.key === 'Tab') {
        // Trap focus inside modal
        const focusable = modalClose;
        if (e.shiftKey && document.activeElement === focusable) {
            e.preventDefault();
            // Could cycle to last element, but we only have close button
        }
    }
});

// Trap focus in command palette
commandPalette.addEventListener('keydown', (e) => {
    if (e.key === 'Tab' && e.shiftKey) {
        e.preventDefault();
        commandInput.focus();
    }
});

// ============ INIT ============
renderGallery();
galleryViewport.focus();