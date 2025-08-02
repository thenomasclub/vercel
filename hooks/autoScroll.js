export function initAutoScroll(className = 'auto-scroll', speed = 0.5) {
  const scrollState = new Map();

  const startScroll = (el) => {
    let scrollX = 0;
    let frameId;
    let isPaused = false;

    const animate = () => {
      if (!isPaused) {
        scrollX += speed;
        if (scrollX >= el.scrollWidth / 2) {
          scrollX = 0;
        }
        el.style.transform = `translateX(-${scrollX}px)`;
      }
      frameId = requestAnimationFrame(animate);
    };

    const onEnter = () => (isPaused = true);
    const onLeave = () => (isPaused = false);
    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);

    animate();

    scrollState.set(el, { frameId, onEnter, onLeave });
  };

  const checkAndInit = () => {
    const elements = document.querySelectorAll(`.${className}`);
    elements.forEach((el) => {
      if (!scrollState.has(el)) {
        startScroll(el);
      }
    });
  };

  // Initial check
  checkAndInit();

  // Watch DOM for future additions
  const observer = new MutationObserver(() => {
    checkAndInit();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  return () => {
    scrollState.forEach(({ frameId, onEnter, onLeave }, el) => {
      cancelAnimationFrame(frameId);
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
    });
    observer.disconnect();
  };
}
