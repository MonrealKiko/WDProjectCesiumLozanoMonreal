const map = document.querySelector(".draggable-map");
const wrapper = document.querySelector(".map-wrapper");

let isDragging = false;
let startX = 0, startY = 0;
let currentX = 0, currentY = 0;

let scale = 1;
const minScale = 0.5;
const maxScale = 5.0;

// Update transform
function updateTransform() {
    map.style.transform = `translate(${currentX}px, ${currentY}px) scale(${scale})`;
}

// --- Dragging ---
map.addEventListener("mousedown", (e) => {
    if (e.button !== 0) return; // left click only
    e.preventDefault();
    isDragging = true;
    startX = e.clientX - currentX;
    startY = e.clientY - currentY;
    map.style.cursor = "grabbing";
});

document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    currentX = e.clientX - startX;
    currentY = e.clientY - startY;
    updateTransform();
});

document.addEventListener("mouseup", () => {
    isDragging = false;
    map.style.cursor = "grab";
});

// --- Zooming ---
map.addEventListener("wheel", (e) => {
    e.preventDefault();

    const zoomIntensity = 0.0004;
    const delta = -e.deltaY * zoomIntensity;
    const newScale = Math.min(maxScale, Math.max(minScale, scale + delta));
    if (newScale === scale) return;

    // Zoom relative to cursor
    const wrapperRect = wrapper.getBoundingClientRect();
    const mouseX = e.clientX - wrapperRect.left;
    const mouseY = e.clientY - wrapperRect.top;
    const zoomRatio = newScale / scale;

    currentX = mouseX - (mouseX - currentX) * zoomRatio;
    currentY = mouseY - (mouseY - currentY) * zoomRatio;

    scale = newScale;
    updateTransform();
});

// Make sure map regions don't block dragging
document.querySelectorAll(".map-region").forEach(region => {
    region.addEventListener("mousedown", e => e.stopPropagation());
});

const wrapperWidth = wrapper.clientWidth;
const wrapperHeight = wrapper.clientHeight;

const mapImg = map.querySelector("img");
const mapWidth = mapImg.offsetWidth * scale;
const mapHeight = mapImg.offsetHeight * scale;

currentX = (wrapperWidth - mapWidth) / 2;
currentY = (wrapperHeight - mapHeight) / 2;

updateTransform();