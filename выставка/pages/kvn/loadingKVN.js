 const circle = document.getElementById('circle');
const btn = document.getElementById('goBtn');
const dotsCount = 60;
const step = 360 / dotsCount;

for (let i = 0; i < dotsCount; i++) {
  const dot = document.createElement('div');
  dot.classList.add('dot');
  dot.style.setProperty('--angle', i * step);
  dot.style.setProperty('--i', i);
  circle.appendChild(dot);
}

btn.addEventListener('click', () => {
  if (circle.classList.contains('active')) return;

  circle.classList.add('active');
  btn.disabled = true;
  btn.textContent = 'Loading';

  const lastDot = circle.lastElementChild;

  lastDot.addEventListener('animationend', () => {
    window.location.href = 'second.html';
  }, { once: true });
});