export function initSlideToUnlock({
  containerId = 'slide-unlock-container',
  redirectUrl = '/unlocked',
}) {
  if (typeof window === 'undefined') return;

  const handle = document.getElementById('slider-handle');
  const track = document.getElementById('slider-track');
  const text = document.getElementById('slider-text');

  if (!handle || !track || !text) return;

  let isDragging = false;
  let startX = 0;
  let offsetX = 0;

  const reset = () => {
    handle.style.transition = 'transform 0.3s ease';
    handle.style.transform = `translateX(0px)`;
    setTimeout(() => {
      handle.style.transition = '';
    }, 300);
  };

  const unlock = () => {
    text.textContent = 'Unlocked';
    handle.style.transform = `translateX(${track.offsetWidth - handle.offsetWidth}px)`;
    setTimeout(() => {
      window.location.href = redirectUrl;
    }, 300);
  };

  const onMove = (clientX) => {
    const speedFactor = 2;
    offsetX = Math.max(0, Math.min((clientX - startX) * speedFactor, track.offsetWidth - handle.offsetWidth));
    handle.style.transform = `translateX(${offsetX}px)`;
  };

  const onEnd = () => {
    isDragging = false;
    const threshold = track.offsetWidth - handle.offsetWidth - 10;
    offsetX >= threshold ? unlock() : reset();
  };

  // Mouse
  handle.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
  });

  document.addEventListener('mousemove', (e) => {
    if (isDragging) onMove(e.clientX);
  });

  document.addEventListener('mouseup', onEnd);

  // Touch
  handle.addEventListener('touchstart', (e) => {
    isDragging = true;
    startX = e.touches[0].clientX;
  });

  document.addEventListener('touchmove', (e) => {
    if (isDragging) onMove(e.touches[0].clientX);
  });

  document.addEventListener('touchend', onEnd);
}
