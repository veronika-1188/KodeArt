const routeCard = document.getElementById('routeCard');
const cardHeader = document.getElementById('cardHeader');
const cardHeader2 = document.getElementById('cardHeader2');

cardHeader.addEventListener('click', () => {
    routeCard.classList.toggle('expanded');
});
cardHeader2.addEventListener('click', () => {
    routeCard.classList.toggle('expanded');
});

document.querySelector('.start-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    window.location.href = 'second.html';
});

// ===== Переключение транспорта =====
const transportBtns = document.querySelectorAll('.transport-btn');

transportBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        transportBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});

// ===== Зум карты =====
const mapContainer = document.getElementById('mapContainer');
const mapWidget = document.getElementById('mapWidget');

let scale = 1;
const MIN_SCALE = 1;
const MAX_SCALE = 5;
const ZOOM_STEP = 0.2;

let posX = 0;
let posY = 0;

function applyTransform() {
    mapWidget.style.transform = `translate(${posX}px, ${posY}px) scale(${scale})`;
}

function resetTransform() {
    scale = 1;
    posX = 0;
    posY = 0;
    applyTransform();
}

mapContainer.addEventListener('wheel', (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP;
    scale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, scale + delta));
    if (scale === 1) { posX = 0; posY = 0; }
    applyTransform();
}, { passive: false });

let isDragging = false;
let startX = 0;
let startY = 0;

mapContainer.addEventListener('mousedown', (e) => {
    if (scale <= 1) return;
    isDragging = true;
    startX = e.clientX - posX;
    startY = e.clientY - posY;
    mapContainer.classList.add('grabbing');
});

document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    posX = e.clientX - startX;
    posY = e.clientY - startY;
    applyTransform();
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    mapContainer.classList.remove('grabbing');
});

let initialDistance = 0;
let initialScale = 1;
let touchStartX = 0;
let touchStartY = 0;
let lastTapTime = 0;

function getDistance(t1, t2) {
    const dx = t1.clientX - t2.clientX;
    const dy = t1.clientY - t2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
}

mapContainer.addEventListener('touchstart', (e) => {
    if (e.touches.length === 2) {
        initialDistance = getDistance(e.touches[0], e.touches[1]);
        initialScale = scale;
    } else if (e.touches.length === 1) {
        const now = Date.now();
        if (now - lastTapTime < 300) {
            if (scale > 1) resetTransform();
            else { scale = 2.5; applyTransform(); }
            e.preventDefault();
            lastTapTime = 0;
            return;
        }
        lastTapTime = now;

        if (scale > 1) {
            touchStartX = e.touches[0].clientX - posX;
            touchStartY = e.touches[0].clientY - posY;
        }
    }
}, { passive: false });

mapContainer.addEventListener('touchmove', (e) => {
    if (e.touches.length === 2) {
        e.preventDefault();
        const currentDistance = getDistance(e.touches[0], e.touches[1]);
        const ratio = currentDistance / initialDistance;
        scale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, initialScale * ratio));
        applyTransform();
    } else if (e.touches.length === 1 && scale > 1) {
        e.preventDefault();
        posX = e.touches[0].clientX - touchStartX;
        posY = e.touches[0].clientY - touchStartY;
        applyTransform();
    }
}, { passive: false });

mapContainer.addEventListener('touchend', () => {
    if (scale <= 1) { posX = 0; posY = 0; applyTransform(); }
});

mapContainer.addEventListener('dblclick', () => {
    if (scale > 1) resetTransform();
    else { scale = 2.5; applyTransform(); }
});